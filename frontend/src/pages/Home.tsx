import LatestDestinationCard from "../components/LatestDestinationCard";
import { fetchHotels } from "../api-clients";
import { useQuery } from "@tanstack/react-query";
import { HotelType } from "../shared/types";

const Home = () => {
  const { data: hotels } = useQuery<HotelType[], Error>({
    queryKey: ["query-hotels"],
    queryFn: fetchHotels,
  });

  const topRowHotels = hotels?.slice(0, 2) || [];
  const bottomRowHotels = hotels?.slice(2) || [];

  return (
    <div className="space-y-3">
      <h2 className="text-3xl font-bold">Latest Destinations</h2>
      <p>Most recent desinations added by our hosts</p>
      <div className="grid gap-4">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          {topRowHotels.map((hotel) => (
            <LatestDestinationCard hotel={hotel} />
          ))}
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {bottomRowHotels.map((hotel) => (
            <LatestDestinationCard hotel={hotel} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
