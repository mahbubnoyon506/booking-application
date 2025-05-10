import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchMyHotelById, updateMyHotel } from "../api-clients";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm";
import { useAppContext } from "../contexts/AppContext";

const UpdateHotel = () => {
  const { hotelId } = useParams();
  const { showToast } = useAppContext();

  const { data: hotel, isLoading } = useQuery({
    queryKey: ["my-hotel-id", hotelId],
    queryFn: () => fetchMyHotelById(hotelId || ""),
    enabled: !!hotelId,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (hotelFormData: FormData) =>
      updateMyHotel(hotelId || "", hotelFormData),
    onSuccess: async () => {
      showToast({
        message: "Hotel updated",
        type: "SUCCESS",
      });
    },
    onError: () => {
      showToast({
        message: "Error creating new hotel",
        type: "ERROR",
      });
    },
  });

  const handleSave = (hotelFormData: FormData) => {
    mutate(hotelFormData);
  };

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <ManageHotelForm
          hotel={hotel}
          isPending={isPending}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default UpdateHotel;
