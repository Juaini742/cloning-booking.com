import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import * as apiClient from "../api-client";
import { BsBuilding } from "react-icons/bs";
import { BiHotel, BiMoney } from "react-icons/bi";
import { FaPlus, FaRegEye, FaStar } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { FaRegTrashCan } from "react-icons/fa6";

function MyHotels() {
  const { data: hotelData } = useQuery(
    "fetchMyHotels",
    apiClient.fetchMyHotels,
    {
      onError: () => {},
      onSuccess: () => {},
    }
  );

  if (!hotelData) {
    return <span>No Hotels found</span>;
  }

  return (
    <div className="space-y-5">
      <span className="flex justify-between">
        <h1 className="text-3xl font-bold">My Hotels</h1>
        <Link
          to="/add-hotel"
          className="btn-primary px-5 py-2 rounded-md font-bold flex items-center gap-2"
        >
          <FaPlus />
          Add hotel
        </Link>
      </span>
      <div className="grid grid-cols-1 gap-3">
        {hotelData?.map((hotel, index) => {
          const cheapestPricePerNight =
            hotel.rooms &&
            hotel.rooms.reduce((minPrice, room) => {
              const price = parseFloat(room.pricePerNight);
              return price < minPrice ? price : minPrice;
            }, Infinity);

          return (
            <div
              key={index}
              className="flex flex-col justify-between border border-zinc-700 shadow-md rounded-lg p-8 gap-5"
            >
              <h2 className="text-2xl font-bold">{hotel.name}</h2>
              <div className="whitespace-pre-line">{hotel.description}</div>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
                <div className="border border-zinc-700 rounded p-3 flex items-center text-sm">
                  <IoLocationOutline className="mr-1" />
                  {hotel.city}, {hotel.country}
                </div>
                <div className="border border-zinc-700 rounded p-3 flex items-center text-sm">
                  <BsBuilding className="mr-1" />
                  {hotel.rooms?.length}{" "}
                  {hotel.rooms && hotel.rooms?.length > 1 ? "rooms" : "room"}
                </div>
                <div className="border border-zinc-700 rounded p-3 flex items-center text-sm">
                  <BiMoney className="mr-1" />${cheapestPricePerNight} Price per
                  night
                </div>
                <div className="border border-zinc-700 rounded p-3 flex items-center text-sm">
                  <BiHotel className="mr-1" />
                  {/* {hotel.rooms && hotel.rooms[index].adultCount} adult,{" "}
                  {hotel.rooms && hotel.rooms[index].childCount} children */}
                </div>
                <div className="border border-zinc-700 rounded p-3 flex items-center text-sm">
                  <FaStar className="mr-1 fill-yellow" />
                  {hotel.starRating} Start Rating
                </div>
              </div>
              <div className="self-end flex gap-2">
                <Link
                  title="Add rooms hotel"
                  to={`/add-rooms/${hotel._id}`}
                  className="btn-primary px-4 py-2 rounded-md font-bold flex items-center gap-2"
                >
                  <FaPlus />
                </Link>
                <Link
                  title="See details"
                  to={`/my-hotel/${hotel._id}`}
                  className="btn-success px-4 py-2 rounded-md font-bold flex items-center gap-2"
                >
                  <FaRegEye />
                </Link>
                <Link
                  title="Edit hotel"
                  to={`/edit-hotel/${hotel._id}`}
                  className="btn-warning px-4 py-2 rounded-md font-bold flex items-center gap-2"
                >
                  <HiOutlinePencilAlt />
                </Link>
                <button
                  title="Delete hotel"
                  className="btn-danger px-4 py-2 rounded-md font-bold flex items-center gap-2"
                >
                  <FaRegTrashCan />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default MyHotels;
