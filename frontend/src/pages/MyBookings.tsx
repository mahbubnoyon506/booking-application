import { useQuery } from "@tanstack/react-query";
import { HotelType } from "../shared/types";
import { fetchMyBookings } from "../api-clients";
import Loader from "../components/Loader";

const MyBookings = () => {
  const { data: hotels, isLoading } = useQuery<HotelType[], Error>({
    queryKey: ["my-bookings"],
    queryFn: fetchMyBookings,
  });

  if (!hotels || hotels.length === 0) {
    return <span>No bookings found</span>;
  }
  return (
    <div className="space-y-5">
      <h1 className="text-3xl font-bold">My Bookings</h1>
      {isLoading ? (
        <Loader />
      ) : (
        hotels.map((hotel, index) => (
          <div
            key={index}
            className="grid grid-cols-1 lg:grid-cols-[1fr_3fr] border border-slate-300 rounded-lg p-8 gap-5"
          >
            <div className="lg:w-full lg:h-[250px]">
              <img
                src={hotel.imageURLs[0]}
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="flex flex-col gap-4 overflow-y-auto max-h-[300px]">
              <div className="text-2xl font-bold">
                {hotel.name}
                <div className="text-xs font-normal">
                  {hotel.city}, {hotel.country}
                </div>
              </div>
              {hotel.bookings.map((booking, index) => (
                <div key={index}>
                  <div>
                    <span className="font-bold mr-2">Dates: </span>
                    <span>
                      {new Date(booking.checkIn).toDateString()} -
                      {new Date(booking.checkOut).toDateString()}
                    </span>
                  </div>
                  <div>
                    <span className="font-bold mr-2">Guests:</span>
                    <span>
                      {booking.adultCount} adults, {booking.childCount} children
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyBookings;
