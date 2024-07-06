import {useFormContext} from "react-hook-form";
import {HotelFormData} from "./ManageHotelForm";

function DetailsSection() {
  const {
    register,
    formState: {errors},
  } = useFormContext<HotelFormData>();
  return (
    <div className="flex flex-col gap-4 ">
      <h1 className="text-3xl font-bold mb-3">Add Hotel</h1>
      <label
        htmlFor="firstName"
        className="text-gray-700 text-sm font-bold flex-1"
      >
        Name
        <input
          type="text"
          className="border rounded w-full py-1 px-2 font-bold"
          {...register("name", {required: "This filed is required"})}
        />
        {errors.name && (
          <span className="text-red-500">{errors.name?.message}</span>
        )}
      </label>
      <div className="flex gap-4 w-full">
        <label className="text-gray-700 text-sm font-bold w-full">
          City
          <input
            type="text"
            className="border rounded w-full py-1 px-2 font-bold"
            {...register("city", {required: "This filed is required"})}
          />
          {errors.city && (
            <span className="text-red-500">{errors.city.message}</span>
          )}
        </label>
        <label className="text-gray-700 text-sm font-bold w-full">
          Country
          <input
            type="text"
            className="border rounded w-full py-1 px-2 font-bold"
            {...register("country", {required: "This filed is required"})}
          />
          {errors.country && (
            <span className="text-red-500">{errors.country.message}</span>
          )}
        </label>
      </div>
      <label className="text-gray-700 text-sm font-bold w-full">
        Description
        <textarea
          rows={10}
          className="border rounded w-full py-1 px-2 font-bold"
          {...register("description", {required: "This filed is required"})}
        ></textarea>
        {errors.description && (
          <span className="text-red-500">{errors.description.message}</span>
        )}
      </label>
      <label className="text-gray-700 text-sm font-bold w-full max-w-[50%]">
        Price Per Night
        <input
          type="number"
          min={1}
          className="border rounded w-full py-1 px-2 font-bold"
          {...register("pricePerNight", {required: "This filed is required"})}
        />
        {errors.pricePerNight && (
          <span className="text-red-500">{errors.pricePerNight.message}</span>
        )}
      </label>
      <label className="text-gray-700 text-sm font-bold w-full max-w-[50%]">
        Star Rating
        <select
          {...register("starRating", {required: "This filed is required"})}
          className="border rounded w-full p-2 text-gray-700 font-normal"
        >
          <option value="" className="text-sm font-bold">
            Select as Rating
          </option>
          {[1, 2, 3, 4, 5].map((num, index) => (
            <option key={index} value={num}>
              {num}
            </option>
          ))}
        </select>
        {errors.starRating && (
          <span className="text-red-500">{errors.starRating.message}</span>
        )}
      </label>
    </div>
  );
}
export default DetailsSection;
