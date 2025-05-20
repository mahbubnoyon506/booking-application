import { Link } from "react-router-dom";
import { HotelType } from "../shared/types";

type Props = {
  hotel: HotelType;
};

const LatestDestinationCard = ({ hotel }: Props) => {
  return (
    <Link
      to={`/hotels/${hotel._id}`}
      className="relative cursor-pointer overflow-hidden rounded-md"
    >
      <div className="h-[300px]">
        <img
          src={hotel.imageURLs[0]}
          className="w-full h-full object-cover object-center"
        />
      </div>

      <div className="absolute bottom-0 p-4 bg-black bg-opacity-50 w-full rounded-b-md">
        <p className="text-white font-bold tracking-tight text-xl">
          {hotel.name}
        </p>
        <p className="text-white text-md ">
          {hotel.city + ", " + hotel.country}
        </p>
      </div>
    </Link>
  );
};

export default LatestDestinationCard;
