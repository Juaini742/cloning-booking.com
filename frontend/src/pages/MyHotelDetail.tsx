import { useQuery } from "react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as apiClient from "../api-client";
import { AiFillStar } from "react-icons/ai";
import { FaCheck, FaPlus, FaUser } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { RiArrowLeftDoubleLine } from "react-icons/ri";
import { HiPencilSquare } from "react-icons/hi2";
import { FaRegTrashCan } from "react-icons/fa6";

function MyHotelDetail() {
  const navigate = useNavigate();
  const { hotelId } = useParams();
  const { data: hotel } = useQuery(
    "fetchHotelById",
    () => apiClient.fetchHotelById(hotelId as string),
    {
      enabled: !!hotelId,
    }
  );

  if (!hotel) {
    return <></>;
  }
  return (
    <section className="space-y-6 overflow-hidden">
      <div className="flex justify-between  sticky top-3">
        <button
          onClick={() => navigate(-1)}
          className="btn-primary px-3 py-2 rounded-md flex items-center"
        >
          <RiArrowLeftDoubleLine className="text-2xl" />
          Back
        </button>
        <button
          onClick={() => navigate(`/add-rooms/${hotelId}`)}
          className="btn-indigo px-4 py-2 rounded-md flex items-center gap-2"
        >
          <FaPlus />
          Add room
        </button>
      </div>
      <div>
        <div className="flex">
          {Array.from({ length: hotel.starRating }).map(() => (
            <AiFillStar className="fill-yellow" />
          ))}
          <span className="text-xs px-2 py-[2px] rounded bg-zinc-200/60">
            {hotel.hotelType}
          </span>
        </div>
        <h1 className="text-3xl font-bold">{hotel.name}</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {hotel.imageUrls.map((image) => (
          <div className="h-[300px]">
            <img
              src={image}
              alt={hotel.name}
              className="rounded-md w-full h-full object-cover object-center"
            />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
        {hotel.hotelFacilities.map((facility, index) => (
          <div key={index} className="border border-slate-300 rounded-md p-3">
            {facility}
          </div>
        ))}
      </div>

      <div className="w-full pb-3 border-b border-zinc-300">
        <p className="whitespace-pre-line">{hotel.description}</p>
      </div>

      <div className="w-full">
        <h2 className="text-xl font-bold">Availability</h2>
        <div className="overflow-x-auto max-w-[600px] bg-red-500 md:max-w-full">
          <table className="min-w-[600px] md:w-full bg-white border border-gray-200 table-fixed">
            <thead>
              <tr className="bg-blue-200">
                <th className="py-2 px-4 border-b border-gray-300 text-left text-gray-600">
                  Room Number
                </th>
                <th className="py-2 px-4 border-b border-gray-300 text-left text-gray-600">
                  Room Type
                </th>
                <th className="py-2 px-4 border-b border-gray-300 text-left text-gray-600">
                  Number of Guests
                </th>
                <th className="py-2 px-4 border-b border-gray-300 text-left text-gray-600">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {hotel.rooms &&
                hotel.rooms.map((room, index) => (
                  <tr key={index} className="even:bg-gray-100 hover:bg-gray-50">
                    <td className="py-2 px-4 border-b border-gray-300">
                      {room.roomNumber}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-300">
                      {room.type}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-300 flex items-center">
                      <span className="flex text-sm items-center mr-2">
                        {[...Array(room.adultCount)].map((_, index) => (
                          <FaUser key={index} className="text-gray-600" />
                        ))}
                      </span>
                      |
                      <span className="flex text-sm items-center ml-2">
                        {[...Array(room.childCount)].map((_, index) => (
                          <FaUser key={index} className="text-gray-400" />
                        ))}
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b border-gray-300">
                      {room.available ? (
                        <FaCheck className="text-green-500" />
                      ) : (
                        <IoClose className="text-red-500" />
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="w-full">
        <h2 className="text-xl font-bold">More Rooms Details</h2>
        <div className="overflow-x-auto max-w-[600px] bg-red-500 md:max-w-full">
          <table className="min-w-[600px] md:w-full bg-white border border-gray-200 table-fixed">
            <thead>
              <tr className="bg-blue-200">
                <th className="py-2 px-4 border-b border-gray-300 text-left text-gray-600">
                  Room Number
                </th>
                <th className="py-2 px-4 border-b border-gray-300 text-left text-gray-600">
                  Room Type
                </th>
                <th className="py-2 px-4 border-b border-gray-300 text-left text-gray-600">
                  Number of Guests
                </th>
                <th className="py-2 px-4 border-b border-gray-300 text-left text-gray-600">
                  Facilities
                </th>
                <th className="py-2 px-4 border-b border-gray-300 text-left text-gray-600">
                  Price
                </th>
              </tr>
            </thead>
            <tbody>
              {hotel.rooms &&
                hotel.rooms.map((room, index) => (
                  <tr key={index} className="even:bg-gray-100 hover:bg-gray-50">
                    <td className="py-2 px-4 border-b border-gray-300">
                      {room.roomNumber}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-300">
                      {room.type}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-300 flex items-center">
                      <span className="flex text-sm items-center mr-2">
                        {[...Array(room.adultCount)].map((_, index) => (
                          <FaUser key={index} className="text-gray-600" />
                        ))}
                      </span>
                      |
                      <span className="flex text-sm items-center ml-2">
                        {[...Array(room.childCount)].map((_, index) => (
                          <FaUser key={index} className="text-gray-400" />
                        ))}
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b border-gray-300">
                      {room.facilities.join(", ")}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-300">
                      ${room.pricePerNight}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="w-full flex justify-between">
        <Link
          to={`/edit-hotel/${hotelId}`}
          className="btn-warning px-5 py-2 rounded"
        >
          <HiPencilSquare />
        </Link>
        <button className="btn-danger px-5 py-2 rounded">
          <FaRegTrashCan />
        </button>
      </div>
    </section>
  );
}

export default MyHotelDetail;
