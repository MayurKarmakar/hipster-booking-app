import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Calendar, Clock, Film, MapPin } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAppStore } from "storeApp/store";
import { z } from "zod";
import "../index.css"

const movieSchema = z.object({
  movie: z.string().min(1, "Please select a movie"),
  theater: z.string().min(1, "Please select a theater location"),
  date: z.string().min(1, "Please select a date"),
  time: z.string().min(1, "Please select a showtime"),
});

const seatSchema = z.object({
  seats: z.array(z.string()).min(1, "Please select at least one seat"),
});

type MovieFormData = z.infer<typeof movieSchema>;
type SeatFormData = z.infer<typeof seatSchema>;

interface Seat {
  id: string;
  row: string;
  number: number;
  isBooked: boolean;
}

export default function BookingForm() {
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [movieData, setMovieData] = useState<MovieFormData | null>(null);

  const addBooking = useAppStore((state: any) => state.addBooking);
  const user = useAppStore((state: any) => state.user);

  const movieForm = useForm<MovieFormData>({
    resolver: zodResolver(movieSchema),
    defaultValues: {
      movie: "",
      theater: "",
      date: "",
      time: "",
    },
  });

  const seatForm = useForm<SeatFormData>({
    resolver: zodResolver(seatSchema),
    defaultValues: {
      seats: [],
    },
  });

  function generateSeats(): Seat[] {
    const rows = ["A", "B", "C", "D", "E", "F", "G", "H"];
    const seats: Seat[] = [];
    const bookedSeats = ["A3", "A4", "C5", "D6", "E7", "F2"];

    rows.forEach((row) => {
      for (let i = 1; i <= 10; i++) {
        const seatId = `${row}${i}`;
        seats.push({
          id: seatId,
          row,
          number: i,
          isBooked: bookedSeats.includes(seatId),
        });
      }
    });

    return seats;
  }

  const seats = generateSeats();

  function toggleSeat(seatId: string) {
    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((id) => id !== seatId)
        : [...prev, seatId]
    );
  }

  function calculateTotal() {
    const pricePerSeat = 12.99;
    return (selectedSeats.length * pricePerSeat).toFixed(2);
  }

  const handleFirstStepSubmit = movieForm.handleSubmit((data) => {
    setMovieData(data);
    setStep(2);
  });

  function handleBackToFirstStep() {
    setStep(1);
  }

  function resetForm() {
    setSelectedSeats([]);
    movieForm.reset();
    seatForm.reset();
    setMovieData(null);
    setStep(1);
  }

  function onSubmit() {
    if (selectedSeats.length === 0) {
      seatForm.setError("seats", {
        message: "Please select at least one seat",
      });
      return;
    }

    if (!movieData) {
      alert("Movie data is missing!");
      return;
    }

    const totalCost = parseFloat(calculateTotal());
    const userId = user?.userId;

    if (!userId) {
      alert("User not authenticated!");
      return;
    }

    addBooking({
      movie: movieData.movie,
      theaterLocation: movieData.theater,
      date: movieData.date,
      time: movieData.time,
      seats: selectedSeats,
      totalCost,
      userId,
    });

    alert(`Booking confirmed! Total: $${totalCost.toFixed(2)}`);
    resetForm();
  }

  return (
    <div className={cn("w-full mx-auto py-4 sm:py-6 md:py-8 px-3 sm:px-4")}>
      <div className={cn("mb-6 sm:mb-8 text-center")}>
        <h1 className={cn("text-2xl sm:text-3xl md:text-4xl font-bold mb-2 flex items-center justify-center gap-2")}>
          <Film className={cn("w-8 h-8 sm:w-10 sm:h-10")} />
          Movie Ticket Booking
        </h1>
        <p className={cn("text-sm sm:text-base text-muted-foreground")}>
          Select your movie, seats, and complete your booking
        </p>
      </div>

      {step === 1 ? (
        <Card>
          <CardHeader>
            <CardTitle>Select Movie & Showtime</CardTitle>
            <CardDescription>
              Choose your preferred movie, date, and time
            </CardDescription>
          </CardHeader>
          <CardContent className={cn("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5")}>
            <div className={cn("space-y-2")}>
              <Label
                htmlFor="movie"
                className={cn("flex items-center gap-2 text-sm")}
              >
                <Film className={cn("w-4 h-4")} />
                Movie
              </Label>
              <Select
                value={movieForm.watch("movie")}
                onValueChange={(value) => movieForm.setValue("movie", value)}
              >
                <SelectTrigger id="movie">
                  <SelectValue placeholder="Select a movie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="inception">Inception (PG-13)</SelectItem>
                  <SelectItem value="avatar">
                    Avatar: The Way of Water (PG-13)
                  </SelectItem>
                  <SelectItem value="interstellar">
                    Interstellar (PG-13)
                  </SelectItem>
                  <SelectItem value="dune">Dune: Part Two (PG-13)</SelectItem>
                  <SelectItem value="oppenheimer">Oppenheimer (R)</SelectItem>
                </SelectContent>
              </Select>
              {movieForm.formState.errors.movie && (
                <p className={cn("text-sm text-destructive")}>
                  {movieForm.formState.errors.movie.message}
                </p>
              )}
            </div>
            <div className={cn("space-y-2")}>
              <Label
                htmlFor="location"
                className={cn("flex items-center gap-2 text-sm")}
              >
                <MapPin className={cn("w-4 h-4")} />
                Theater Location
              </Label>
              <Select
                value={movieForm.watch("theater")}
                onValueChange={(value) => movieForm.setValue("theater", value)}
              >
                <SelectTrigger id="location">
                  <SelectValue placeholder="Select a location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Downtown Cinema - Main Street">
                    Downtown Cinema - Main Street
                  </SelectItem>
                  <SelectItem value="Mall Multiplex - Shopping Center">
                    Mall Multiplex - Shopping Center
                  </SelectItem>
                  <SelectItem value="Uptown Theater - Park Avenue">
                    Uptown Theater - Park Avenue
                  </SelectItem>
                </SelectContent>
              </Select>
              {movieForm.formState.errors.theater && (
                <p className={cn("text-sm text-destructive")}>
                  {movieForm.formState.errors.theater.message}
                </p>
              )}
            </div>
            <div className={cn("space-y-2")}>
              <Label htmlFor="date" className={cn("flex items-center gap-2 text-sm")}>
                <Calendar className={cn("w-4 h-4")} />
                Date
              </Label>
              <Select
                value={movieForm.watch("date")}
                onValueChange={(value) => movieForm.setValue("date", value)}
              >
                <SelectTrigger id="date">
                  <SelectValue placeholder="Select date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2025-09-30">Today - Sep 30</SelectItem>
                  <SelectItem value="2025-10-01">Tomorrow - Oct 1</SelectItem>
                  <SelectItem value="2025-10-02">Oct 2</SelectItem>
                  <SelectItem value="2025-10-03">Oct 3</SelectItem>
                </SelectContent>
              </Select>
              {movieForm.formState.errors.date && (
                <p className={cn("text-sm text-destructive")}>
                  {movieForm.formState.errors.date.message}
                </p>
              )}
            </div>
            <div className={cn("space-y-2")}>
              <Label htmlFor="time" className={cn("flex items-center gap-2 text-sm")}>
                <Clock className={cn("w-4 h-4")} />
                Showtime
              </Label>
              <Select
                value={movieForm.watch("time")}
                onValueChange={(value) => movieForm.setValue("time", value)}
              >
                <SelectTrigger id="time">
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10:00">10:00 AM</SelectItem>
                  <SelectItem value="13:00">1:00 PM</SelectItem>
                  <SelectItem value="16:00">4:00 PM</SelectItem>
                  <SelectItem value="19:00">7:00 PM</SelectItem>
                  <SelectItem value="22:00">10:00 PM</SelectItem>
                </SelectContent>
              </Select>
              {movieForm.formState.errors.time && (
                <p className={cn("text-sm text-destructive")}>
                  {movieForm.formState.errors.time.message}
                </p>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button
              className={cn("w-full")}
              onClick={handleFirstStepSubmit}
              type="button"
            >
              Continue to Seat Selection
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Select Your Seats</CardTitle>
            <CardDescription>
              {selectedSeats.length > 0
                ? `Selected seats: ${selectedSeats.join(", ")} • ${
                    selectedSeats.length
                  } ${selectedSeats.length === 1 ? "seat" : "seats"}`
                : "Click on available seats to select"}
            </CardDescription>
          </CardHeader>
          <CardContent className={cn("space-y-8")}>
            <div className={cn("space-y-4")}>
              <div className={cn("bg-gradient-to-b from-primary/20 to-primary/5 h-3 rounded-t-3xl mx-auto w-4/5 shadow-lg")}></div>
              <p className={cn("text-center text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase")}>
                Screen
              </p>
            </div>

            <div className={cn("space-y-2 sm:space-y-4 w-full max-w-6xl mx-auto px-2 sm:px-4")}>
              {["A", "B", "C", "D", "E", "F", "G", "H"].map((row) => (
                <div
                  key={row}
                  className={cn("flex items-center justify-center gap-2 sm:gap-4 md:gap-6")}
                >
                  <span className={cn("w-6 sm:w-10 text-xs sm:text-base font-bold text-center text-muted-foreground")}>
                    {row}
                  </span>
                  <div className={cn("flex gap-1 sm:gap-2 md:gap-3")}>
                    {seats
                      .filter((seat) => seat.row === row)
                      .map((seat) => {
                        const isSelected = selectedSeats.includes(seat.id);
                        const isBooked = seat.isBooked;

                        return (
                          <Button
                            key={seat.id}
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={(e) => {
                              e.preventDefault();
                              if (!isBooked) {
                                toggleSeat(seat.id);
                              }
                            }}
                            disabled={isBooked}
                            className={`
                                w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 p-0 text-xs sm:text-sm font-semibold transition-all duration-200
                                ${
                                  isBooked
                                    ? "opacity-50 cursor-not-allowed bg-destructive/10 border-destructive/30 text-destructive hover:bg-destructive/10"
                                    : isSelected
                                    ? "bg-green-500 hover:bg-green-600 text-white border-green-600 shadow-md hover:shadow-lg"
                                    : "hover:bg-primary/10 hover:border-primary/50"
                                }
                              `}
                            title={`Seat ${seat.id}`}
                            aria-label={`Seat ${seat.id} ${
                              isBooked
                                ? "booked"
                                : isSelected
                                ? "selected"
                                : "available"
                            }`}
                          >
                            {seat.number}
                          </Button>
                        );
                      })}
                  </div>
                  <span className={cn("w-6 sm:w-10 text-xs sm:text-base font-bold text-center text-muted-foreground")}>
                    {row}
                  </span>
                </div>
              ))}
            </div>

            <div className={cn("flex flex-wrap justify-center gap-4 sm:gap-8 pt-4 border-t")}>
              <div className={cn("flex items-center gap-2")}>
                <Button
                  variant="outline"
                  size="sm"
                  disabled
                  className={cn("w-8 h-8 sm:w-10 sm:h-10 p-0 pointer-events-none")}
                >
                  1
                </Button>
                <span className={cn("text-xs sm:text-sm font-medium")}>
                  Available
                </span>
              </div>
              <div className={cn("flex items-center gap-2")}>
                <Button
                  variant="outline"
                  size="sm"
                  disabled
                  className={cn("w-8 h-8 sm:w-10 sm:h-10 p-0 bg-green-500 text-white border-green-600 shadow-md pointer-events-none hover:bg-green-500")}
                >
                  2
                </Button>
                <span className={cn("text-xs sm:text-sm font-medium")}>Selected</span>
              </div>
              <div className={cn("flex items-center gap-2")}>
                <Button
                  variant="outline"
                  size="sm"
                  disabled
                  className={cn("w-8 h-8 sm:w-10 sm:h-10 p-0 opacity-50 bg-destructive/10 border-destructive/30 text-destructive pointer-events-none hover:bg-destructive/10")}
                >
                  3
                </Button>
                <span className={cn("text-xs sm:text-sm font-medium")}>Booked</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className={cn("flex-col gap-4 pt-6 border-t")}>
            {seatForm.formState.errors.seats && (
              <p className={cn("text-sm text-destructive w-full")}>
                {seatForm.formState.errors.seats.message}
              </p>
            )}
            {selectedSeats.length > 0 && (
              <div className={cn("w-full bg-muted/50 rounded-lg p-4 space-y-2")}>
                <div className={cn("flex justify-between items-center")}>
                  <span className={cn("text-sm text-muted-foreground")}>
                    Selected Seats:
                  </span>
                  <span className={cn("font-semibold")}>
                    {selectedSeats.join(", ")}
                  </span>
                </div>
                <div className={cn("flex justify-between items-center")}>
                  <span className={cn("text-sm text-muted-foreground")}>
                    Price per seat:
                  </span>
                  <span className={cn("font-semibold")}>$12.99</span>
                </div>
                <div className={cn("flex justify-between items-center pt-2 border-t border-border")}>
                  <span className={cn("text-lg font-bold")}>Total:</span>
                  <span className={cn("text-2xl font-bold text-primary")}>
                    ${calculateTotal()}
                  </span>
                </div>
              </div>
            )}
            <div className={cn("flex gap-2 w-full")}>
              <Button
                variant="outline"
                onClick={handleBackToFirstStep}
                className={cn("w-auto")}
              >
                <ArrowLeft className={cn("w-4 h-4 mr-2")} />
                Back
              </Button>
              <Button
                className={cn("flex-1")}
                size="lg"
                disabled={selectedSeats.length === 0}
                onClick={(e) => {
                  e.preventDefault();
                  onSubmit();
                }}
              >
                {selectedSeats.length === 0
                  ? "Select Seats to Continue"
                  : `Confirm Booking - ${selectedSeats.length} ${
                      selectedSeats.length === 1 ? "Seat" : "Seats"
                    } - $${calculateTotal()}`}
              </Button>
            </div>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
