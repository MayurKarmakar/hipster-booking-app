import './index.css';
import BookingForm from "./pages/booking-form";

function App() {
  // const user = useAppStore((state: any) => state.user);

  // if (!user) {
  //   return (
  //     <div className={cn("flex items-center justify-center min-h-screen p-6")}>
  //       <Card className={cn("w-full max-w-md")}>
  //         <CardHeader>
  //           <div className={cn("flex items-center gap-3")}>
  //             <ShieldAlert className={cn("h-8 w-8 text-amber-500")} />
  //             <CardTitle>Authentication Required</CardTitle>
  //           </div>
  //           <CardDescription>
  //             Please log in to access the booking system
  //           </CardDescription>
  //         </CardHeader>
  //         <CardContent>
  //           <p className={cn("text-sm text-muted-foreground")}>
  //             You need to be authenticated to make bookings and view your
  //             booking history.
  //           </p>
  //         </CardContent>
  //       </Card>
  //     </div>
  //   );
  // }

  return <BookingForm />

  // return (
  //   <Routes>
  //     <Route path="booking/:userId" element={<Layout />}>
  //       <Route path="book" element={<BookingForm />} />
  //       <Route path="bookings" element={<BookingList />} />
  //       <Route index element={<Navigate to="book" replace />} />
  //     </Route>

  //     <Route path="*" element={<Navigate to="booking/1/book" replace />} />
  //   </Routes>
  // );
}

export default App;
