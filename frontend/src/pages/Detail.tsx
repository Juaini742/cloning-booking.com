import { useQuery } from "react-query";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import * as apiClient from "../api-client";
import { AiFillStar } from "react-icons/ai";
import { FaCheck, FaUser } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { FormEvent, useState } from "react";
import { useSearchContext2 } from "../contexts/SearchContext2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useAppContext } from "../contexts/AppContext";
import { useBookingContext } from "../contexts/BookingContext";

const initialLocalSearchValue = {
  checkIn: new Date(),
  checkOut: new Date(),
  adultCount: 1,
  childCount: 0,
};

function Detail() {
  const navigate = useNavigate();
  const location = useLocation();
  const { hotelId } = useParams();
  const { isLoggedIn } = useAppContext();
  const { querySearch, setQuerySearch } = useSearchContext2();
  const { bookingData, setBookingData } = useBookingContext();
  const [localSearch, setLocalSearch] = useState(initialLocalSearchValue);

  const { data: hotel } = useQuery(
    "fetchHotelById",
    () => apiClient.fetchHotelById(hotelId as string),
    {
      enabled: !!hotelId,
    }
  );
  const { data: availableRooms } = useQuery(
    "roomAvailability",
    () => apiClient.roomAvailability(querySearch, hotelId as string),
    {
      enabled: !!hotelId,
    }
  );
  const room =
    bookingData.roomId &&
    hotel?.rooms &&
    hotel?.rooms.find((item) => item._id === bookingData.roomId);

  const handleSetSetting = (event: FormEvent) => {
    event.preventDefault();

    setQuerySearch((prev) => ({
      ...prev,
      adultCount: localSearch.adultCount,
      childCount: localSearch.childCount,
      checkIn: localSearch.checkIn,
      checkOut: localSearch.checkOut,
    }));
  };

  const handleApplyRoom = (id: string | undefined) => {
    setBookingData({
      ...bookingData,
      roomId: id,
      adultCount: localSearch.adultCount,
      childCount: localSearch.childCount,
      checkIn: localSearch.checkIn,
      checkOut: localSearch.checkOut,
    });
  };

  const handleReserveRoom = () => {
    bookingData.roomId && isLoggedIn
      ? navigate(`/hotel/${hotel?._id}/booking`)
      : navigate("/sign-in", { state: { from: location } });
  };

  if (!hotel) {
    return <></>;
  }

  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  return (
    <div className="space-y-6 overflow-hidden">
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

      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] pb-3 border-b border-zinc-300">
        <div className="whitespace-pre-line">{hotel.description}</div>
        <div className="h-fit">
          {/* <GuestInfoForm htoel={hotel} hotelId={hotel._id} /> */}
          <div className="bg-blue-200 rounded-md p-3">
            <h6 className="font-bold text-lg">{hotel.name}</h6>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Consectetur iste modi at vitae distinctio magnam autem? Quo nisi
              eius corrupti.
            </p>
            <div className="my-2 bg-white p-2 rounded-md list-none flex flex-col gap-2">
              <li>Room number: {room && room.roomNumber}</li>
              <li className="border-y-2 border-zinc-300 py-2">
                Type {room && room.type}
              </li>
              <li>
                Number of guest: {bookingData.adultCount} |{" "}
                {bookingData.childCount}
              </li>
              <li className="border-y-2 border-zinc-300 py-2">
                date: {bookingData.checkIn.toDateString()} |{" "}
                {bookingData.checkOut.toDateString()}
              </li>
            </div>
            <button
              onClick={handleReserveRoom}
              disabled={bookingData.roomId === "" && true}
              className={` px-3 py-1 rounded ${
                bookingData.roomId
                  ? "btn-primary cursor-pointer"
                  : "btn-danger cursor-not-allowed"
              }`}
            >
              Reserve room
            </button>
          </div>
        </div>
      </div>

      <div className="w-full">
        <h2 className="text-xl font-bold">Availability</h2>
        <form
          onSubmit={handleSetSetting}
          className="p-[3px] bg-yellow rounded shadow-md grid grid-cols-1 lg:grid-cols-3 items-center gap-[3px] mb-3"
        >
          <div className="bg-white grid grid-cols-2 items-center rounded h-full px-1 pl-3 py-2 lg:py-0">
            <label className="items-center flex">
              Adult:
              <input
                type="number"
                className="w-full p-1 bg-transparent focus:outline-none font-bold"
                min={1}
                max={20}
                value={localSearch.adultCount}
                onChange={(event) =>
                  setLocalSearch((prev) => ({
                    ...prev,
                    adultCount: event.target.value
                      ? parseInt(event.target.value)
                      : 0,
                  }))
                }
              />
            </label>
            <label className="items-center flex">
              Child:
              <input
                type="number"
                className="w-full p-1 bg-transparent focus:outline-none font-bold"
                min={0}
                max={20}
                value={localSearch.childCount}
                onChange={(e) =>
                  setLocalSearch((prev) => ({
                    ...prev,
                    childCount: e.target.value ? parseInt(e.target.value) : 1,
                  }))
                }
              />
            </label>
          </div>
          <div className="h-full grid grid-cols-2 items-center bg-white rounded pl-3 py-2 lg:py-0">
            <div>
              <DatePicker
                selected={localSearch.checkIn}
                onChange={(date) =>
                  setLocalSearch((prev) => ({
                    ...prev,
                    checkIn: date as Date,
                  }))
                }
                selectsStart
                startDate={localSearch.checkIn}
                endDate={localSearch.checkOut}
                minDate={new Date()}
                placeholderText="Check in Date"
                className="focus:outline-none bg-transparent"
              />
            </div>
            <div>
              <DatePicker
                selected={localSearch.checkOut}
                onChange={(date) =>
                  setLocalSearch((prev) => ({
                    ...prev,
                    checkOut: date as Date,
                  }))
                }
                selectsEnd
                startDate={localSearch.checkIn}
                endDate={localSearch.checkOut}
                minDate={localSearch.checkIn}
                placeholderText="Check Out Date"
                className="focus:outline-none bg-transparent"
              />
            </div>
          </div>
          <div className="flex gap-1">
            <button className="btn-primary w-full rounded p-2 text-xl">
              Set Setting
            </button>
            {/* <button className="w-1/3 bg-red-600 text-white h-full p-2 font-bold text-xl hover:bg-red-500">
          Clear
        </button> */}
          </div>
        </form>
        <div className="overflow-x-auto max-w-[680px] bg-red-500 md:max-w-full">
          <table className="min-w-[680px] md:w-full bg-white border border-gray-200 table-fixed">
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
                  Date
                </th>
                <th className="py-2 px-4 border-b border-gray-300 text-left text-gray-600">
                  Status
                </th>
                <th className="py-2 px-4 border-b border-gray-300 text-left text-gray-600">
                  Book
                </th>
              </tr>
            </thead>
            <tbody>
              {availableRooms?.availableRooms &&
                availableRooms.availableRooms.map((room, index) => (
                  <tr key={index} className="even:bg-gray-100 hover:bg-gray-50">
                    <td className="py-2 px-4 border-b border-gray-300">
                      {room.roomNumber}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-300">
                      {room.type}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-300">
                      <div className=" flex items-center">
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
                      </div>
                    </td>
                    <td className="py-2 px-4 border-b border-gray-300">
                      <div className=" flex items-center gap-1">
                        <span>
                          {new Date(querySearch.checkIn).toLocaleDateString()}
                        </span>
                        |
                        <span>
                          {new Date(querySearch.checkOut).toLocaleDateString()}
                        </span>
                      </div>
                    </td>
                    <td className="py-2 px-4 border-b border-gray-300">
                      {room.available ? (
                        <FaCheck className="text-green-500" />
                      ) : (
                        <IoClose className="text-red-500" />
                      )}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-300">
                      <button
                        onClick={() => handleApplyRoom(room._id)}
                        className="btn-primary px-2 rounded text-sm py-1"
                      >
                        Select room
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export default Detail;
