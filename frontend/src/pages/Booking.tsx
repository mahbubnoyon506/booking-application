import { useSearchContext } from "../contexts/SearchContext";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import BookingDetailsSummary from "../components/BookingDetailsSummary";
import { createPaymentIntent, getHotelById } from "../api-clients";
import { useQuery } from "@tanstack/react-query";
import BookingForm from "../forms/BookingForm";
import { Elements } from "@stripe/react-stripe-js";
import { useAppContext } from "../contexts/AppContext";

const Booking = () => {
  const { meData, stripePromise } = useAppContext();
  const search = useSearchContext();
  const { hotelId } = useParams();

  const [numberOfNights, setNumberOfNights] = useState<number>(0);

  useEffect(() => {
    if (search.checkIn && search.checkOut) {
      const nights =
        Math.abs(search.checkOut.getTime() - search.checkIn.getTime()) /
        (1000 * 60 * 60 * 24);

      setNumberOfNights(Math.ceil(nights));
    }
  }, [search.checkIn, search.checkOut]);

  const { data: paymentIntentData } = useQuery({
    queryKey: ["createPaymentIntent", hotelId],
    queryFn: () =>
      createPaymentIntent(hotelId || "", numberOfNights.toString()),
    enabled: !!hotelId && numberOfNights > 0,
  });

  const { data: hotel } = useQuery({
    queryKey: ["hotel-id", hotelId],
    queryFn: () => getHotelById(hotelId || ""),
    enabled: !!hotelId,
  });

  return (
    <div className="grid md:grid-cols-[1fr_2fr]">
      <BookingDetailsSummary
        checkIn={search.checkIn}
        checkOut={search.checkOut}
        adultCount={search.adultCount}
        childCount={search.childCount}
        numberOfNights={numberOfNights}
        hotel={hotel}
      />
      {meData && paymentIntentData && (
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret: paymentIntentData.clientSecret,
          }}
        >
          <BookingForm
            currentUser={meData}
            paymentIntentData={paymentIntentData}
          />
        </Elements>
      )}
    </div>
  );
};

export default Booking;
