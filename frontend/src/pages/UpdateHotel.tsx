import { useQuery } from "@tanstack/react-query";
import { fetchHotelById } from "../api-clients";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm";

const UpdateHotel = () => {
  const { hotelId } = useParams();

  const { data: hotel, isLoading } = useQuery({
    queryKey: ["my-hotel-id", hotelId],
    queryFn: () => fetchHotelById(hotelId || ""),
    enabled: !!hotelId,
  });

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
