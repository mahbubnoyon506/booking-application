import { useState } from "react";
import { useSearchContext } from "../contexts/SearchContext";
import { useQuery } from "@tanstack/react-query";
import { searchHotels } from "../api-clients";
import SearchResultsCard from "./SearchResultsCard";
import { HotelType } from "../shared/types";
import Pagination from "../components/Pagination";
import Loader from "../components/Loader";

const Search = () => {
  const search = useSearchContext();
  const [page, setPage] = useState<number>(1);
  const [sortOption, setSortOption] = useState<string>("");

  const searchParams = {
    destination: search.destination,
    checkIn: search.checkIn.toISOString(),
    checkOut: search.checkOut.toISOString(),
    adultCount: search.adultCount.toString(),
    childCount: search.childCount.toString(),
    page: page.toString(),
  };

  const { data: hotelData, isLoading } = useQuery({
    queryKey: ["search-hotels", searchParams],
    queryFn: () => searchHotels(searchParams),
    staleTime: 0,
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div className="rounded-lg border border-slate-300 p-5 h-fit sticky top-10">
        <div className="space-y-5">
          <h3 className="text-lg font-semibold border-b border-slate-300 pb-5">
            Filter by:
          </h3>
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold">
            {hotelData?.pagination.total} Hotels found
            {search.destination ? ` in ${search.destination}` : ""}
          </span>
          <select
            value={sortOption}
            onChange={(event) => setSortOption(event.target.value)}
            className="p-2 border rounded-md"
          >
            <option value="">Sort By</option>
            <option value="starRating">Star Rating</option>
            <option value="pricePerNightAsc">
              Price Per Night (low to high)
            </option>
            <option value="pricePerNightDesc">
              Price Per Night (high to low)
            </option>
          </select>
        </div>
        {isLoading ? (
          <Loader />
        ) : (
          hotelData?.data.map((hotel: HotelType) => (
            <SearchResultsCard key={hotel._id} hotel={hotel} />
          ))
        )}
        <div>
          <Pagination
            page={hotelData?.pagination.currentPage}
            pages={hotelData?.pagination.pages}
            onPageChange={(page) => setPage(page)}
          />
        </div>
      </div>
    </div>
  );
};

export default Search;
