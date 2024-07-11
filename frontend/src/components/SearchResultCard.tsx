import { AiFillStar } from "react-icons/ai";
import { Link } from "react-router-dom";
import { HotelType } from "../interfaces";

type Props = {
  hotel: HotelType;
  index: number;
};

function SearchResultCard({ hotel, index }: Props) {
  const cheapestPricePerNight =
    hotel.rooms &&
    hotel.rooms.reduce((minPrice, room) => {
      const price = parseFloat(room.pricePerNight || "0");
      return price < minPrice ? price : minPrice;
    }, Infinity);
  return (
    <div className="grid grid-cols-1 xl:grid-cols-[2fr_3fr] border border-l-slate-300 rounded-lg p-8 gap-8">
      <div className="w-full h-[300px]" key={index}>
        <img
          src={hotel.imageUrls[0]}
          alt={hotel.name}
          className="w-full h-full object-cover object-center"
        />
      </div>
      <div className="grid grid-rows-[1fr_2fr_1fr]">
        <div>
          <div className="flex items-center">
            <span className="flex">
              {Array.from({ length: hotel.starRating }).map(() => (
                <AiFillStar className="fill-yellow" />
              ))}
            </span>
            <span className="ml-1">{hotel.hotelType}</span>
          </div>
          <Link
            to={`/detail/${hotel._id}`}
            className="text-2xl font-bold cursor-pointer"
          >
            {hotel.name}
          </Link>
        </div>
        <div className="">
          <div className="line-clamp-4">{hotel.description}</div>
        </div>
        <div className="grid grid-cols-2 items-end whitespace-nowrap">
          <div className="flex flex-wrap gap-1 items-center">
            {hotel.rooms &&
              hotel.hotelFacilities.map((facility, index) => (
                <span
                  key={index}
                  className="bg-zinc-200 p-2 rounded-lg text-xs whitespace-nowrap"
                >
                  {facility}
                </span>
              ))}
            {/* <span className="text-sm">
              {hotel.facilities.length > 3 &&
                `+${hotel.facilities.length - 3} more`}
            </span> */}
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="font-bold">
              Start from ${cheapestPricePerNight || 0}
            </span>
            <Link
              to={`/detail/${hotel._id}`}
              className="btn-primary px-5 py-2 rounded-md"
            >
              View more
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
export default SearchResultCard;
