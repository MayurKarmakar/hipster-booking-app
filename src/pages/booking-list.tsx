import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Calendar,
  Clock,
  Download,
  Eye,
  Film,
  Filter,
  MapPin,
  MoreHorizontal,
  Search,
  Ticket,
  X,
  AlertCircle,
} from "lucide-react";
import { useState } from "react";
import { useAppStore, type Booking } from "storeApp/store";
import "../index.css"

type BookingStatus = "confirmed" | "cancelled" | "completed" | "upcoming";

interface DisplayBooking {
  id: string;
  movie: string;
  theaterLocation: string;
  date: string;
  time: string;
  seats: string[];
  totalCost: number;
  bookingNumber: string;
  status: BookingStatus;
  bookedOn: string;
}

function getStatusVariant(status: BookingStatus) {
  const variants = {
    confirmed: "default",
    cancelled: "destructive",
    completed: "default",
    upcoming: "secondary",
  } as const;
  return variants[status];
}

function determineBookingStatus(booking: Booking): BookingStatus {
  const bookingDate = new Date(`${booking.date} ${booking.time}`);
  const now = new Date();

  if (bookingDate < now) {
    return "completed";
  }
  return "upcoming";
}

export default function BookingList() {
  const removeBooking = useAppStore((state: any) => state.removeBooking);
  const bookings = useAppStore((state: any) => state.bookings) as Booking[];
  const user = useAppStore((state: any) => state.user);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedBooking, setSelectedBooking] = useState<DisplayBooking | null>(
    null
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Transform bookings to display format
  const displayBookings: DisplayBooking[] = bookings?.map((booking: any) => ({
    ...booking,
    bookingNumber: `BK${booking.id}`,
    status: determineBookingStatus(booking),
    bookedOn: new Date(parseInt(booking.id)).toISOString(),
  }));

  const filteredBookings = displayBookings.filter((booking) => {
    const matchesSearch =
      booking.bookingNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking?.movie.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || booking.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  function handleViewDetails(booking: DisplayBooking) {
    setSelectedBooking(booking);
    setIsDialogOpen(true);
  }

  function handleDownloadTicket(booking: DisplayBooking) {
    alert(`Downloading ticket for ${booking.bookingNumber}`);
  }

  function handleCancelBooking(booking: DisplayBooking) {
    if (
      confirm(
        `Are you sure you want to cancel booking ${booking.bookingNumber}?`
      )
    ) {
      removeBooking(booking.id);
      alert(`Booking ${booking.bookingNumber} has been cancelled`);
    }
  }

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  function formatDateTime(dateTimeString: string) {
    return new Date(dateTimeString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  function getBookingStats() {
    return {
      total: displayBookings.length,
      upcoming: displayBookings.filter((b) => b.status === "upcoming").length,
      completed: displayBookings.filter((b) => b.status === "completed").length,
      cancelled: displayBookings.filter((b) => b.status === "cancelled").length,
    };
  }

  const stats = getBookingStats();

  if (!user) {
    return (
      <div className={cn("flex-1 w-full mx-auto py-8 px-4 gap-3")}>
        <div className={cn("mb-8")}>
          <h1 className={cn("text-4xl font-bold mb-2 flex items-center gap-2")}>
            <Ticket className={cn("w-10 h-10")} />
            Booking History
          </h1>
          <p className={cn("text-muted-foreground")}>
            View and manage all your movie bookings
          </p>
        </div>
        <Alert variant="destructive" className={cn("max-w-2xl mx-auto")}>
          <AlertCircle className={cn("h-4 w-4")} />
          <AlertTitle>Authentication Required</AlertTitle>
          <AlertDescription>
            You need to be logged in to view your booking history. Please log in to access your bookings.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className={cn("flex-1 w-full mx-auto py-8 px-4 gap-3")}>
      <div className={cn("mb-8")}>
        <h1 className={cn("text-4xl font-bold mb-2 flex items-center gap-2")}>
          <Ticket className={cn("w-10 h-10")} />
          Booking History
        </h1>
        <p className={cn("text-muted-foreground")}>
          View and manage all your movie bookings
        </p>
      </div>

      <div className={cn("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6")}>
        <Card>
          <CardHeader className={cn("pb-3")}>
            <CardDescription>Total Bookings</CardDescription>
            <CardTitle className={cn("text-3xl")}>{stats.total}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className={cn("pb-3")}>
            <CardDescription>Upcoming</CardDescription>
            <CardTitle className={cn("text-3xl text-yellow-600")}>
              {stats.upcoming}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className={cn("pb-3")}>
            <CardDescription>Completed</CardDescription>
            <CardTitle className={cn("text-3xl text-green-600")}>
              {stats.completed}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className={cn("pb-3")}>
            <CardDescription>Cancelled</CardDescription>
            <CardTitle className={cn("text-3xl text-red-600")}>
              {stats.cancelled}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      <Card className={cn("mb-6")}>
        <CardHeader>
          <CardTitle className={cn("text-lg flex items-center gap-2")}>
            <Filter className={cn("w-5 h-5")} />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className={cn("flex flex-col md:flex-row gap-4")}>
            <div className={cn("flex-1 relative")}>
              <Search className={cn("absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4")} />
              <Input
                placeholder="Search by booking number or movie..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={cn("pl-10")}
              />
            </div>
            <div className={cn("w-full md:w-48")}>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="upcoming">Upcoming</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>All Bookings ({filteredBookings.length})</CardTitle>
          <CardDescription>
            Complete list of your movie ticket bookings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className={cn("overflow-x-auto")}>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Booking #</TableHead>
                  <TableHead>Movie</TableHead>
                  <TableHead>Theater</TableHead>
                  <TableHead>Show Date & Time</TableHead>
                  <TableHead>Seats</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Booked On</TableHead>
                  <TableHead className={cn("text-right")}>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBookings.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={9}
                      className={cn("text-center py-8 text-muted-foreground")}
                    >
                      No bookings found matching your criteria
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredBookings.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell className={cn("font-medium")}>
                        {booking.bookingNumber}
                      </TableCell>
                      <TableCell>
                        <div className={cn("flex items-center gap-2")}>
                          <Film className={cn("w-4 h-4 text-muted-foreground")} />
                          <span className={cn("font-medium")}>{booking.movie}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className={cn("flex items-center gap-2")}>
                          <MapPin className={cn("w-4 h-4 text-muted-foreground")} />
                          <span className={cn("text-sm")}>
                            {booking.theaterLocation}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className={cn("space-y-1")}>
                          <div className={cn("flex items-center gap-1 text-sm")}>
                            <Calendar className={cn("w-3 h-3")} />
                            {formatDate(booking.date)}
                          </div>
                          <div className={cn("flex items-center gap-1 text-sm text-muted-foreground")}>
                            <Clock className={cn("w-3 h-3")} />
                            {booking.time}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className={cn("flex gap-1 flex-wrap max-w-[120px]")}>
                          {booking.seats.map((seat) => (
                            <Badge
                              key={seat}
                              variant="outline"
                              className={cn("text-xs")}
                            >
                              {seat}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className={cn("font-semibold")}>
                        ${booking.totalCost.toFixed(2)}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={getStatusVariant(booking.status)}
                          className={cn("capitalize")}
                        >
                          {booking.status}
                        </Badge>
                      </TableCell>
                      <TableCell className={cn("text-sm text-muted-foreground")}>
                        {formatDateTime(booking.bookedOn)}
                      </TableCell>
                      <TableCell className={cn("text-right")}>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className={cn("w-4 h-4")} />
                              <span className={cn("sr-only")}>Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => handleViewDetails(booking)}
                            >
                              <Eye className={cn("w-4 h-4 mr-2")} />
                              View Details
                            </DropdownMenuItem>
                            {(booking.status === "upcoming" ||
                              booking.status === "confirmed") && (
                              <DropdownMenuItem
                                onClick={() => handleDownloadTicket(booking)}
                              >
                                <Download className={cn("w-4 h-4 mr-2")} />
                                Download Ticket
                              </DropdownMenuItem>
                            )}
                            {(booking.status === "upcoming" ||
                              booking.status === "confirmed") && (
                              <>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  onClick={() => handleCancelBooking(booking)}
                                  className={cn("text-red-600")}
                                >
                                  <X className={cn("w-4 h-4 mr-2")} />
                                  Cancel Booking
                                </DropdownMenuItem>
                              </>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className={cn("max-w-2xl")}>
          <DialogHeader>
            <DialogTitle>Booking Details</DialogTitle>
            <DialogDescription>
              Complete information about your booking
            </DialogDescription>
          </DialogHeader>
          {selectedBooking && (
            <div className={cn("space-y-6")}>
              <div className={cn("grid grid-cols-2 gap-4")}>
                <div>
                  <p className={cn("text-sm text-muted-foreground")}>
                    Booking Number
                  </p>
                  <p className={cn("font-semibold")}>
                    {selectedBooking.bookingNumber}
                  </p>
                </div>
                <div>
                  <p className={cn("text-sm text-muted-foreground")}>Status</p>
                  <Badge
                    variant={getStatusVariant(selectedBooking.status)}
                    className={cn("capitalize")}
                  >
                    {selectedBooking.status}
                  </Badge>
                </div>
              </div>

              <div className={cn("border-t pt-4")}>
                <h4 className={cn("font-semibold mb-3")}>Movie Information</h4>
                <div className={cn("space-y-2")}>
                  <div className={cn("flex items-center gap-2")}>
                    <Film className={cn("w-4 h-4 text-muted-foreground")} />
                    <span>{selectedBooking.movie}</span>
                  </div>
                  <div className={cn("flex items-center gap-2")}>
                    <MapPin className={cn("w-4 h-4 text-muted-foreground")} />
                    <span>{selectedBooking.theaterLocation}</span>
                  </div>
                  <div className={cn("flex items-center gap-2")}>
                    <Calendar className={cn("w-4 h-4 text-muted-foreground")} />
                    <span>{formatDate(selectedBooking.date)}</span>
                  </div>
                  <div className={cn("flex items-center gap-2")}>
                    <Clock className={cn("w-4 h-4 text-muted-foreground")} />
                    <span>{selectedBooking.time}</span>
                  </div>
                </div>
              </div>

              <div className={cn("border-t pt-4")}>
                <h4 className={cn("font-semibold mb-3")}>Seat Information</h4>
                <div className={cn("flex gap-2 flex-wrap")}>
                  {selectedBooking.seats.map((seat) => (
                    <Badge key={seat} variant="secondary">
                      {seat}
                    </Badge>
                  ))}
                </div>
                <p className={cn("text-sm text-muted-foreground mt-2")}>
                  Total Seats: {selectedBooking.seats.length}
                </p>
              </div>

              <div className={cn("border-t pt-4")}>
                <div className={cn("flex justify-between items-center")}>
                  <span className={cn("text-lg font-semibold")}>Total Amount</span>
                  <span className={cn("text-2xl font-bold")}>
                    ${selectedBooking.totalCost.toFixed(2)}
                  </span>
                </div>
                <p className={cn("text-sm text-muted-foreground mt-2")}>
                  Booked on: {formatDateTime(selectedBooking.bookedOn)}
                </p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Close
            </Button>
            {selectedBooking &&
              (selectedBooking.status === "upcoming" ||
                selectedBooking.status === "confirmed") && (
                <Button onClick={() => handleDownloadTicket(selectedBooking)}>
                  <Download className={cn("w-4 h-4 mr-2")} />
                  Download Ticket
                </Button>
              )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
