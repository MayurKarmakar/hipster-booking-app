import { Link, Outlet, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Film, List, User } from 'lucide-react';

export default function Layout() {
  const { userId } = useParams();

  return (
    <div className={cn("flex-1 grow w-full bg-background")}>
      <header className={cn("border-b")}>
        <div className={cn("container mx-auto px-3 sm:px-4 py-3 sm:py-4")}>
          <nav className={cn("flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0")}>
            <div className={cn("flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6 w-full sm:w-auto")}>
              <h1 className={cn("text-xl sm:text-2xl font-bold flex items-center gap-2")}>
                <Film className={cn("w-5 h-5 sm:w-6 sm:h-6")} />
                Movie Booking
              </h1>
              <div className={cn("flex gap-2 flex-wrap")}>
                <Button variant="ghost" size="sm" asChild>
                  <Link to={`/booking/${userId}/book`}>
                    <Film className={cn("w-4 h-4 mr-1 sm:mr-2")} />
                    <span className={cn("text-xs sm:text-sm")}>Book Tickets</span>
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <Link to={`/booking/${userId}/bookings`}>
                    <List className={cn("w-4 h-4 mr-1 sm:mr-2")} />
                    <span className={cn("text-xs sm:text-sm")}>My Bookings</span>
                  </Link>
                </Button>
              </div>
            </div>
            <div className={cn("flex items-center gap-2")}>
              <User className={cn("w-3 h-3 sm:w-4 sm:h-4")} />
              <span className={cn("text-xs sm:text-sm text-muted-foreground")}>User ID: {userId}</span>
            </div>
          </nav>
        </div>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}