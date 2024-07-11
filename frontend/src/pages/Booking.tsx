import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import BookingForm from "../forms/BookingForm/BookingForm";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import BookingDetailSummery from "../components/BookingDetailSummery";
import { Elements } from "@stripe/react-stripe-js";
import { useAppContext } from "../contexts/AppContext";
import { useBookingContext } from "../contexts/BookingContext";

function Booking() {
  const { hotelId } = useParams();
  const { stripePromise } = useAppContext();
  const { bookingData } = useBookingContext();

  const [numberOfNights, setNumberOfNights] = useState<number>(0);

  useEffect(() => {
    if (bookingData.checkIn && bookingData.checkOut) {
      const nights =
        Math.abs(
          bookingData.checkOut.getTime() - bookingData.checkIn.getTime()
        ) /
        (1000 * 60 * 60 * 24);

      setNumberOfNights(Math.ceil(nights));
    }
  }, [bookingData.checkIn, bookingData.checkOut]);

  const { data: paymentIntentData } = useQuery(
    "createPaymentIntent",
    () =>
      apiClient.createPaymentIntent(
        bookingData.roomId as string,
        numberOfNights.toString()
      ),
    {
      enabled: !!bookingData.roomId && numberOfNights > 0,
    }
  );

  const { data: hotel } = useQuery(
    "fetchHotelById",
    () => apiClient.fetchHotelById(hotelId as string),
    {
      enabled: !!hotelId,
    }
  );

  const { data: currentUser } = useQuery(
    "fetchCurrentUser",
    apiClient.fetchCurrentUser
  );

  if (!hotel) {
    return <></>;
  }

  return (
    <div className="grid md:grid-cols-[1fr_2fr]">
      <BookingDetailSummery
        checkIn={bookingData.checkIn}
        checkOut={bookingData.checkOut}
        adultCount={bookingData.adultCount}
        childCount={bookingData.childCount}
        numberOfNights={numberOfNights}
        hotel={hotel}
      />
      {currentUser && paymentIntentData && (
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret: paymentIntentData.clientSecret,
          }}
        >
          <BookingForm
            currentUser={currentUser}
            paymentIntent={paymentIntentData}
          />
        </Elements>
      )}
    </div>
  );
}
export default Booking;
