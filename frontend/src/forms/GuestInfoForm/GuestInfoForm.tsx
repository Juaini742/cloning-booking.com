import ReactDatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
import { useSearchContext } from "../../contexts/SearchContext";
import { useAppContext } from "../../contexts/AppContext";
import { useLocation, useNavigate } from "react-router-dom";
import { useSearchContext2 } from "../../contexts/SearchContext2";
import { HotelType } from "../../interfaces";

type Props = {
  hotelId: string;
  hotel: HotelType;
};

type GUestInfoFormData = {
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
};

function GuestInfoForm({ hotelId, hotel }: Props) {
  const { querySearch, setQuerySearch } = useSearchContext2();
  const { isLoggedIn } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    watch,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<GUestInfoFormData>({
    defaultValues: {
      checkIn: querySearch.checkIn,
      checkOut: querySearch.checkOut,
      adultCount: querySearch.adultCount,
      childCount: querySearch.childCount,
    },
  });

  const checkIn = watch("checkIn");
  const checkOut = watch("checkOut");

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  const onSignInClick = (data: GUestInfoFormData) => {
    // search.saveSearchValues(
    //   "",
    //   data.checkIn,
    //   data.checkOut,
    //   data.adultCount,
    //   data.childCount
    // );
    navigate("/sign-in", { state: { from: location } });
  };

  const onSubmit = (data: GUestInfoFormData) => {
    // search.saveSearchValues(
    //   "",
    //   data.checkIn,
    //   data.checkOut,
    //   data.adultCount,
    //   data.childCount
    // );

    console.log(hotel);
    console.log(data);
    // navigate(`/hotel/${hotelId}/booking`);
  };

  return (
    <div className="flex flex-col p-4 bg-blue-300 gap-4">
      {/* <h3 className="text-md font-bold">
        {hotel.rooms && hotel.rooms[0].pricePerNight}
      </h3> */}
      <form
        onSubmit={
          isLoggedIn ? handleSubmit(onSubmit) : handleSubmit(onSignInClick)
        }
      >
        <div className="grid grid-cols-1 gap-4 items-center">
          <div>
            <ReactDatePicker
              selected={checkIn}
              onChange={(date) => setValue("checkIn", date as Date)}
              selectsStart
              startDate={checkIn}
              endDate={checkOut}
              minDate={minDate}
              maxDate={maxDate}
              placeholderText="Check in Date"
              className="min-w-full bg-white p-2 focus:outline-none"
              wrapperClassName="min-w-full"
            />
          </div>
          <div>
            <ReactDatePicker
              selected={checkOut}
              onChange={(date) => setValue("checkOut", date as Date)}
              selectsStart
              startDate={checkIn}
              endDate={checkOut}
              minDate={minDate}
              maxDate={maxDate}
              placeholderText="Check in Date"
              className="min-w-full bg-white p-2 focus:outline-none"
              wrapperClassName="min-w-full"
            />
          </div>

          <div className="flex bg-white px-2 py-1 gap-2">
            <label className="items-center flex">
              Adults:
              <input
                className="w-full p-1 focus:outline-none font-bold"
                type="number"
                min={1}
                max={20}
                {...register("adultCount", {
                  required: "This field is required",
                  min: {
                    value: 1,
                    message: "There must be at least one adult",
                  },
                  valueAsNumber: true,
                })}
              />
            </label>
            <label className="items-center flex">
              Children:
              <input
                className="w-full p-1 focus:outline-none font-bold"
                type="number"
                min={0}
                max={20}
                {...register("childCount", {
                  valueAsNumber: true,
                })}
              />
            </label>
            {errors.adultCount && (
              <span className="text-red-500 font-semibold text-sm">
                {errors.adultCount.message}
              </span>
            )}
          </div>
        </div>
        {isLoggedIn ? (
          <button className="w-full mt-4 bg-blue-600 text-white h-full p-2 font-bold text-xl hover:bg-blue-500">
            Book Now
          </button>
        ) : (
          <button className="w-full mt-4 bg-blue-600 text-white h-full p-2 font-bold text-xl hover:bg-blue-500">
            Sign in to Book
          </button>
        )}
      </form>
    </div>
  );
}
export default GuestInfoForm;
