import { useQuery } from "@tanstack/react-query";
import { fetchMyHotels } from "../api-clients";
import { HotelType } from "../shared/types";
import { Link } from "react-router-dom";
import { BsBuilding, BsMap } from "react-icons/bs";
import { BiHotel, BiMoney, BiStar } from "react-icons/bi";
import Loader from "../components/Loader";

const MyHotels = () => {
  const { data: hotels, isLoading } = useQuery<HotelType[], Error>({
    queryKey: ["my-hotels"],
    queryFn: fetchMyHotels,
  });

  return (
    <div className="space-y-5">
      <span className="flex justify-between">
        <h1 className="text-3xl font-bold">My Hotels</h1>
        <Link
          to="/add-hotel"
          className=" bg-blue-600 text-white text-md font-semibold px-4 py-2 hover:bg-blue-500"
        >
          Add Hotel
        </Link>
      </span>
      <div className="grid grid-cols-1 gap-8">
        {isLoading ? (
          <Loader />
        ) : hotels && hotels.length > 0 ? (
          hotels.map((hotel, index) => (
            <div
              data-testid="hotel-card"
              className="flex flex-col justify-between border border-slate-300 rounded-lg p-8 gap-5"
              key={index}
            >
              <h2 className="text-2xl font-bold">{hotel.name}</h2>
              <div className="whitespace-pre-line">{hotel.description}</div>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-2">
                <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                  <BsMap className="mr-1" />
                  {hotel.city}, {hotel.country}
                </div>
                <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                  <BsBuilding className="mr-1" />
                  {hotel.type}
                </div>
                <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                  <BiMoney className="mr-1" />£{hotel.pricePerNight} per night
                </div>
                <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                  <BiHotel className="mr-1" />
                  {hotel.adultCount} adults, {hotel.childCount} children
                </div>
                <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                  <BiStar className="mr-1" />
                  {hotel.starRating} Star Rating
                </div>
              </div>
              <span className="flex justify-end">
                <Link
                  to={`/upate-hotel/${hotel._id}`}
                  className=" bg-blue-600 text-white text-md font-semibold px-4 py-2 hover:bg-blue-500"
                >
                  View Details
                </Link>
              </span>
            </div>
          ))
        ) : (
          <p className="text-lg font-medium">No hotels found</p>
        )}
      </div>
    </div>
  );
};

export default MyHotels;
