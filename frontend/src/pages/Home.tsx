import LatestDestinationCard from "../components/LatestDestinationCard";
import { fetchHotels } from "../api-clients";
import { useQuery } from "@tanstack/react-query";
import { HotelType } from "../shared/types";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const { data: hotels } = useQuery<HotelType[], Error>({
    queryKey: ["query-hotels"],
    queryFn: fetchHotels,
  });

  const topRowHotels = hotels?.slice(0, 2) || [];
  const bottomRowHotels = hotels?.slice(2) || [];

  return (
    <>
      <div className="flex flex-col-reverse md:flex-row md:items-center gap-5 md:gap-8 pb-5 md:pb-10">
        <div className="flex-1 space-y-3 md:space-y-5">
          <div className="space-y-3 md:space-y-5">
            <p className="text-xl md:text-5xl font-bold text-gray-800">
              Explore Our Exquisite Hotel
            </p>
            <p className="text-md: md:text-xl text-gray-800">
              Experience an Exquisite Hotel Immersed in Rich History and
              Timeless Elegance.
            </p>
            <button
              onClick={() => navigate("/search")}
              className=" w-36 bg-blue-600 text-white text-md font-semibold px-4 py-2 hover:bg-blue-500 disabled:bg-gray-500"
            >
              Get Started
            </button>
          </div>
          <div className="flex justify-between gap-3" ref={ref}>
            <div className="flex flex-col items-center gap-1 md:gap-4">
              <p className="text-md md:text-lg font-medium text-gray-800">
                Basic Room
              </p>
              <CountUp
                className="text-2xl md:text-6xl font-bold text-gray-800"
                end={50}
                duration={3}
                start={inView ? undefined : 0}
              />
            </div>
            <div className="flex flex-col items-center gap-1 md:gap-4">
              <p className="text-md md:text-lg text-lg font-medium text-gray-800">
                Luxury Room
              </p>
              <CountUp
                className="text-2xl md:text-6xl font-bold text-gray-800"
                end={150}
                duration={3}
                start={inView ? undefined : 0}
              />
            </div>
            <div className="flex flex-col items-center gap-1 md:gap-4">
              <p className="text-md md:text-lg text-lg font-medium text-gray-800">
                Family Room
              </p>
              <CountUp
                className="text-2xl md:text-6xl font-bold text-gray-800"
                end={100}
                duration={3}
                start={inView ? undefined : 0}
              />
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-5">
          <div className="h-72">
            <img
              className="w-full h-full rounded-2xl"
              src="/assets/images/hero-cover.jpg"
              alt=""
            />
          </div>
          <div className="flex gap-3 md:gap-5">
            <div className="flex-1">
              <img
                className="object-cover w-full h-44 rounded-2xl"
                src="/assets/images/hero-sub.jpg"
                alt=""
              />
            </div>
            <div className="flex-1">
              <img
                className="object-cover w-full h-44 rounded-2xl"
                src="/assets/images/hero-sub2.jpg"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-3 mt-5 md:mt-8">
        <h2 className="text-xl md:text-3xl font-bold text-gray-800">
          Latest Destinations
        </h2>
        <p className="text-gray-800">
          Most recent desinations added by our hosts
        </p>
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
    </>
  );
};

export default Home;
