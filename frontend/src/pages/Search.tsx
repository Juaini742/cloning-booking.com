import { useQuery } from "react-query";
import { HotelType } from "../interfaces";
import * as apiClient from "../api-client";
import PriceFilter from "../components/ui/PriceFilter";
import HotelTypeFilter from "../components/HotelTypeFilter";
import FacilitiesFilter from "../components/FacilitiesFilter";
import SearchResultCard from "../components/SearchResultCard";
import { useSearchContext2 } from "../contexts/SearchContext2";
import StarRatingFilter from "../components/ui/StarRatingFilter";

function Search() {
  const { querySearch, setQuerySearch } = useSearchContext2();

  const { data: hotelData } = useQuery(["searchHotels", querySearch], () =>
    apiClient.searchHotels2(querySearch)
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div className="rounded-lg border border-slate-300 p-5 h-fit sticky top-10">
        <div className="space-y-5">
          <h3 className="text-lg font-semibold border-b border-slate-300 p-5">
            FIlter By:
          </h3>
          <StarRatingFilter setQuerySearch={setQuerySearch} />
          <HotelTypeFilter setQuerySearch={setQuerySearch} />
          <FacilitiesFilter setQuerySearch={setQuerySearch} />
          <PriceFilter
            querySearch={querySearch}
            setQuerySearch={setQuerySearch}
          />
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex justify-between items-center">
          {/* <span className="text-xl font-bold">
            {hotelData?.pagination.total} Hotels found
          </span> */}
          <select className="p-2 border rounded-md">
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
        {hotelData?.map((hotel: HotelType, index: number) => (
          <SearchResultCard index={index} hotel={hotel} />
        ))}

        {/* {hotelData?.map((hotel: HotelType, index: number) => {
          return (
            <ul key={index} className="p-3 border border-zinc-600 rounded-md">
              <li>{hotel.name}</li>
              <li>{hotel.country}</li>
              <li>{hotel.city}</li>
              <li>star: {hotel.starRating}</li>
              <li>
                room number:{" "}
                {hotel.rooms[index] && hotel.rooms[index].roomNumber}
              </li>
              <li>
                price: {hotel.rooms[index] && hotel.rooms[index].pricePerNight}
              </li>
              <li>
                facilities:{" "}
                {hotel.rooms[index] && hotel.rooms[index].facilities.join(", ")}
              </li>
              <li>type:{hotel.rooms[index] && hotel.rooms[index].type}</li>
            </ul>
          );
        })} */}

        <div className="">
          {/* <Pagination
            page={hotelData?.pagination.page || 1}
            pages={hotelData?.pagination.pages || 1}
            onPageChange={(page) => setPage(page)}
          /> */}
        </div>
      </div>
    </div>
  );
}
export default Search;
