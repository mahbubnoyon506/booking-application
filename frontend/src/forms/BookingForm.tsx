import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { PaymentIntentResponse, UserType } from "../shared/types";
import { useForm } from "react-hook-form";
import { StripeCardElement } from "@stripe/stripe-js";
import { useSearchContext } from "../contexts/SearchContext";
import { useNavigate, useParams } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import { useMutation } from "@tanstack/react-query";
import { createRoomBooking } from "../api-clients";

type Props = {
  currentUser: UserType;
  paymentIntentData: PaymentIntentResponse;
};

export type BookingFormData = {
  firstName: string;
  lastName: string;
  email: string;
  adultCount: number;
  childCount: number;
  checkIn: string;
  checkOut: string;
  hotelId: string;
  paymentIntentId: string;
  totalCost: number;
};

const BookingForm = ({ currentUser, paymentIntentData }: Props) => {
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const search = useSearchContext();
  const { showToast } = useAppContext();
  const { hotelId } = useParams();

  const { register, handleSubmit } = useForm<BookingFormData>({
    defaultValues: {
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      email: currentUser.email,
      adultCount: search.adultCount,
      childCount: search.childCount,
      checkIn: search.checkIn.toISOString(),
      checkOut: search.checkOut.toISOString(),
      hotelId: hotelId,
      totalCost: paymentIntentData.totalCost,
      paymentIntentId: paymentIntentData.paymentIntentId,
    },
  });

  const { mutate: bookRoom, isPending } = useMutation({
    mutationFn: createRoomBooking,
    onSuccess: async () => {
      showToast({
        message: "Booking successful!",
        type: "SUCCESS",
      });
      navigate("/my-bookings");
    },
    onError: () => {
      showToast({
        message: "An error occurred. Please try again.",
        type: "ERROR",
      });
    },
  });
  const onSubmit = async (data: BookingFormData) => {
    if (!stripe || !elements) {
      return;
    }
    const result = await stripe?.confirmCardPayment(
      paymentIntentData.clientSecret,
      {
        payment_method: {
          card: elements?.getElement(CardElement) as StripeCardElement,
        },
      }
    );

    if (result?.paymentIntent?.status === "succeeded") {
      bookRoom({ ...data, paymentIntentId: result.paymentIntent.id });
    }
  };

  return (
    <form
      className="grid grid-cols-1 rounded-lg gap-5 border border-slate-300 p-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <span className="text-3xl font-bold">Confirm Your Details</span>
      <div className="grid grid-cols-2 gap-6">
        <label className="text-gray-700 text-sm font-bold flex-1">
          First Name
          <input
            className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal"
            type="text"
            readOnly
            disabled
            {...register("firstName")}
          />
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Last Name
          <input
            className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal"
            type="text"
            readOnly
            disabled
            {...register("lastName")}
          />
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Email
          <input
            className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal"
            type="text"
            readOnly
            disabled
            {...register("email")}
          />
        </label>
      </div>

      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Your Price Summary</h2>

        <div className="bg-blue-200 p-4 rounded-md">
          <div className="font-semibold text-lg">
            Total Cost: £{paymentIntentData.totalCost.toFixed(2)}
          </div>
          <div className="text-xs">Includes taxes and charges</div>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-semibold"> Payment Details</h3>
        <CardElement
          id="payment-element"
          className="border rounded-md p-2 text-sm"
        />
      </div>

      <div className="flex justify-end">
        <button
          disabled={isPending}
          type="submit"
          className=" bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-md disabled:bg-gray-500"
        >
          {isPending ? "Saving..." : "Confirm Booking"}
        </button>
      </div>
    </form>
  );
};

export default BookingForm;
