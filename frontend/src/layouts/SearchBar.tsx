import DatePicker from "react-datepicker";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import { MdOutlineLocalHotel } from "react-icons/md";
import { useSearchContext2 } from "../contexts/SearchContext2";

function SearchBar() {
  const navigate = useNavigate();
  const { setQuerySearch } = useSearchContext2();
  const [localSearch, setLocalSearch] = useState({
    destination: "",
    checkIn: new Date(),
    checkOut: new Date(),
    adultCount: 1,
    childCount: 0,
  });

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    setQuerySearch((prev) => ({
      ...prev,
      destination: localSearch.destination,
      adultCount: localSearch.adultCount,
      childCount: localSearch.childCount,
    }));

    console.log(localSearch);

    navigate("/search");
  };

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  return (
    <form
      onSubmit={handleSubmit}
      className="-mt-14 lg:-mt-8 p-[3px] bg-yellow rounded shadow-md grid grid-cols-1 lg:grid-cols-4 items-center gap-[3px]"
    >
      <div className="flex flex-row items-center flex-1 bg-white rounded p-2 ">
        <MdOutlineLocalHotel size={25} className="mr-2" />
        <input
          type="text"
          placeholder="Where are you going"
          className="w-full bg-transparent focus:outline-none"
          value={localSearch.destination || ""}
          onChange={(event) =>
            setLocalSearch((prev) => ({
              ...prev,
              destination: event.target.value ? event.target.value : "",
            }))
          }
        />
      </div>
      <div className="bg-white grid grid-cols-2 items-center rounded h-full px-1 pl-3">
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
            // onChange={(event) => setAdultCount(parseInt(event.target.value))}
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
            // onChange={(event) => setChildCount(parseInt(event.target.value))}
          />
        </label>
      </div>
      <div className="h-full grid grid-cols-2 items-center bg-white rounded pl-3">
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
            minDate={minDate}
            maxDate={maxDate}
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
            selectsStart
            startDate={localSearch.checkIn}
            endDate={localSearch.checkOut}
            minDate={minDate}
            maxDate={maxDate}
            placeholderText="Check Out Date"
            className="focus:outline-none bg-transparent"
          />
        </div>
      </div>
      <div className="flex gap-1">
        <button className="btn-primary w-full rounded p-2 text-xl">
          Search
        </button>
        {/* <button className="w-1/3 bg-red-600 text-white h-full p-2 font-bold text-xl hover:bg-red-500">
          Clear
        </button> */}
      </div>
    </form>
  );
}
export default SearchBar;
