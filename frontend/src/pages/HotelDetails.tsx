import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import { getHotelById } from "../api-clients";

const HotelDetails = () => {
  const { hotelId } = useParams();
  console.log(hotelId);

  const { data: hotel, isLoading } = useQuery({
    queryKey: ["hotel-id", hotelId],
    queryFn: () => getHotelById(hotelId || ""),
    enabled: !!hotelId,
  });
  console.log(hotel);

  return <div>HotelDetails</div>;
};

export default HotelDetails;
