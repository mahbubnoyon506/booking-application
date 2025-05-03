import { useQuery } from "@tanstack/react-query";
import { fetchHotelById } from "../api-clients";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm";

const UpdateHotel = () => {
  const { hotelId } = useParams();
  console.log(hotelId);

  const { data: hotel, isLoading } = useQuery({
    queryKey: ["my-hotel-id", hotelId],
    queryFn: () => fetchHotelById(hotelId || ""),
    enabled: !!hotelId,
  });
  console.log(hotel);

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <ManageHotelForm
          hotel={hotel}
          isPending={isLoading}
          onSave={() => {}}
        />
      )}
    </div>
  );
};

export default UpdateHotel;
