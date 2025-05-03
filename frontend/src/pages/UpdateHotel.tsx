import { useQuery } from "@tanstack/react-query";
import { fetchHotelById } from "../api-clients";
import { useParams } from "react-router-dom";

const UpdateHotel = () => {
  const { hotelId } = useParams();
  console.log(hotelId);

  const { data: hotel, isLoading } = useQuery({
    queryKey: ["my-hotel-id", hotelId],
    queryFn: () => fetchHotelById(hotelId || ""),
    enabled: !!hotelId,
  });
  console.log(hotel);

  return <div>UpdateHotel</div>;
};

export default UpdateHotel;
