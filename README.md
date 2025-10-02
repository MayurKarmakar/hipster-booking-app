# Booking App

Movie ticket booking micro frontend for the booking application.

## Setup

### Installation

```bash
cd booking-app
pnpm install
```

### Development

```bash
pnpm run dev
```

Runs on `http://localhost:3002`

### Build

```bash
pnpm run build
pnpm run preview
```

## Architecture Decisions

### Module Federation

Uses Vite Plugin Federation to expose booking management components as remote modules.

**Exposed Components:**
- `./BookingForm` → `src/pages/booking-form.tsx`
- `./BookingList` → `src/pages/booking-list.tsx`

**Remote Dependencies:**
- `storeApp` (http://localhost:3004) - Centralized state management

**Shared Dependencies:**
- `react`, `react-dom`, `react-router-dom` - Core React libraries
- `react-hook-form`, `zod`, `@hookform/resolvers` - Form management
- `lucide-react`, `class-variance-authority`, `clsx`, `tailwindcss` - UI utilities

Extensive shared dependencies ensure consistency across federated modules and prevent duplicate bundle loading.

### Technology Stack

- **React 19** with TypeScript
- **Vite** - Build tool and dev server
- **Tailwind CSS 4** - Utility-first styling
- **Shadcn UI** - Component library (Card, Button, Input, Select, Dialog, Tabs)
- **React Hook Form** + **Zod** - Form management and validation
- **Lucide React** - Icon library
- **Module Federation** - Micro frontend architecture

### Form Validation

Zod schema validates booking input:
- Movie (required)
- Theater (required)
- Show Date (required, must be today or future)
- Show Time (required, valid time format)
- Number of Seats (1-10 range)
- User authentication check (must be logged in)

### Responsive Design

Mobile-first approach with Tailwind breakpoints (`sm:`, `md:`, `lg:`). Components use responsive grid layouts, flexible typography, and adaptive spacing for optimal viewing across devices.

## Communication Design

### State Management

Communicates with other micro frontends through the centralized Zustand store:

```typescript
import { useAppStore, type Booking } from "storeApp/store";
```

### Store Interface

```typescript
interface Booking {
  id: string;
  userId: string;
  movie: string;
  theater: string;
  showDate: string;
  showTime: string;
  seats: number;
  status: "upcoming" | "completed" | "cancelled";
  bookedAt: string;
}
```

### Store Actions

**`addBooking(booking: Booking)`**
- Adds new booking to global bookings array
- Generates unique `id` using `crypto.randomUUID()`
- Sets `bookedAt` timestamp
- Initial status is "upcoming"

**`updateBookingStatus(id: string, status: Booking["status"])`**
- Updates booking status (upcoming → completed/cancelled)
- Used in booking list for status management

**`deleteBooking(id: string)`**
- Removes booking from store
- Used for cancellation/deletion

**`bookings`**
- Array of all bookings across all users
- Persisted via Zustand persist middleware
- Filtered by `userId` in components

**`user`**
- Current authenticated user from auth-app
- Required for creating bookings
- Used to filter user-specific bookings

### Communication Flow

**Create Booking Flow:**
1. User must be authenticated (checks `useAppStore((state) => state.user)`)
2. If not logged in, shows message to login first
3. User fills booking form with movie, theater, date, time, seats
4. Form validates against Zod schema
5. Creates booking object with `userId` from current user
6. Calls `addBooking()` to persist
7. Shows success message and resets form

**View Bookings Flow:**
1. Reads all bookings: `useAppStore((state) => state.bookings)`
2. Filters by current user: `bookings.filter(b => b.userId === user.userId)`
3. Categorizes by status (upcoming, completed, cancelled)
4. Displays in responsive cards with action buttons
5. Calculates statistics (total, upcoming, completed, cancelled)

**Update Booking Flow:**
1. User clicks status change button (Complete/Cancel)
2. Calls `updateBookingStatus(id, newStatus)`
3. Store updates immediately
4. UI re-renders with new status
5. Statistics recalculate automatically

**Delete Booking Flow:**
1. User clicks delete button
2. Calls `deleteBooking(id)`
3. Booking removed from store
4. UI updates to remove card
5. Statistics recalculate

### Cross-App Communication

**Dependency on Auth App:**
- Requires `user` object from store
- Cannot create bookings without authentication
- User data (userId, name) embedded in booking records

**Data for Reports App:**
- Provides booking data for analytics
- Reports app consumes same `bookings` array from store
- Enables cross-app reporting on booking patterns

**State Synchronization:**
All apps share the same Zustand store instance. Changes in booking-app (create, update, delete) immediately reflect in reports-app charts and shell-app if displayed.
