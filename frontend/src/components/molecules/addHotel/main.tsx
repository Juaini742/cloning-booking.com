import { SubmitHandler, useForm } from "react-hook-form";
import * as apiClient from "../../../api-client";
import { useMutation, useQuery } from "react-query";
import { useAppContext } from "../../../contexts/AppContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HotelForm } from "../../../interfaces";
import {
  hotelFacilities,
  hotelType,
} from "../../../config/hotel-options-config";

function MainAddHotel() {
  const navigate = useNavigate();
  const { showToast } = useAppContext();
  const { refetch } = useQuery("fetchMyHotels", apiClient.fetchMyHotels);
  const { mutate } = useMutation(apiClient.addHotel, {
    onSuccess: () => {
      showToast({ message: "Hotel Saved", type: "SUCCESS" });
      navigate("/my-hotels");
    },
    onError: () => {
      showToast({ message: "Error Saving Hotel", type: "ERROR" });
    },
  });

  const { register, handleSubmit, watch, setValue } = useForm<HotelForm>({
    defaultValues: {
      imageUrls: [],
    },
  });
  const typeWatch = watch("hotelType");
  const imageFiles = watch("imageFiles");
  const existingImageUrl = watch("imageUrls");

  useEffect(() => {
    if (imageFiles && imageFiles.length > 0) {
      const urls = Array.from(imageFiles).map((file) =>
        URL.createObjectURL(file)
      );
      setValue("imageUrls", urls);
    }
  }, [imageFiles, setValue]);

  const handleDelete = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    imageUrl: string
  ) => {
    event.preventDefault();
    setValue(
      "imageUrls",
      existingImageUrl?.filter((url) => url !== imageUrl)
    );
  };

  const onSubmit: SubmitHandler<HotelForm> = async (data: HotelForm) => {
    try {
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("city", data.city);
      formData.append("country", data.country);
      formData.append("hotelType", data.hotelType);
      formData.append("hotelFacilities", data.hotelFacilities);
      formData.append("description", data.description);
      formData.append("starRating", data.starRating.toString());

      if (data.imageUrls) {
        data.imageUrls.forEach((url, index) => {
          formData.append(`imageUrls[${index}]`, url);
        });
      }

      Array.from(data.imageFiles).forEach((imageFile) => {
        formData.append("imageFiles", imageFile);
      });

      await mutate(formData);
      refetch();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Hotel Form</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-2 mt-3"
      >
        <div>
          <label htmlFor="name" className="flex flex-col w-full">
            <span>Name</span>
            <input
              type="text"
              {...register("name", { required: "This filed is required" })}
              className="border border-zinc-800 rounded-md w-full py-1 px-2 outline-none"
            />
          </label>
        </div>
        <div className="flex gap-2">
          <label htmlFor="country" className="flex flex-col w-full">
            <span>Country</span>
            <input
              type="text"
              {...register("country", { required: "This filed is required" })}
              className="border border-zinc-800 rounded-md w-full py-1 px-2 outline-none"
            />
          </label>
          <label htmlFor="country" className="flex flex-col w-full">
            <span>City</span>
            <input
              type="text"
              {...register("city", { required: "This filed is required" })}
              className="border border-zinc-800 rounded-md w-full py-1 px-2 outline-none"
            />
          </label>
        </div>
        <div>
          <label htmlFor="name" className="flex flex-col w-full">
            <span>Start Rating</span>
            <input
              type="number"
              {...register("starRating", {
                required: "This filed is required",
              })}
              className="border border-zinc-800 rounded-md w-full py-1 px-2 outline-none"
            />
          </label>
        </div>
        <div>
          <span>Type</span>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            {hotelType.map((type, i) => (
              <label
                key={i}
                className={
                  typeWatch === type
                    ? "cursor-pointer bg-secondary text-white text-sm rounded-full px-4 py-2"
                    : "cursor-pointer bg-zinc-200 text-sm rounded-full px-4 py-2"
                }
              >
                <input
                  type="radio"
                  value={type}
                  {...register("hotelType")}
                  className="hidden"
                />
                <span className="">{type}</span>
              </label>
            ))}
          </div>
        </div>
        <div>
          <span>Facilities</span>
          <div className="grid grid-cols-5 gap-3">
            {hotelFacilities.map((facility, index) => (
              <label key={index} className="text-sm flex gap-1 text-gray-900">
                <input
                  type="checkbox"
                  value={facility}
                  {...register("hotelFacilities", {
                    validate: (facilities) => {
                      if (facilities && facilities.length > 0) {
                        return true;
                      } else {
                        return "At least one facility is required";
                      }
                    },
                  })}
                />
                {facility}
              </label>
            ))}
          </div>
        </div>
        <div>
          <label htmlFor="name" className="flex flex-col w-full">
            <span>Description</span>
            <textarea
              rows={8}
              {...register("description", {
                required: "This filed is required",
              })}
              className="border border-zinc-800 rounded-md w-full py-1 px-2 outline-none"
            ></textarea>
          </label>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-2">Images</h2>
          <div className="border border-zinc-800 rounded-md p-3 flex flex-col gap-4">
            {existingImageUrl && (
              <div className="grid grid-cols-6 gap-4">
                {existingImageUrl.map((url, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={url}
                      alt="Hotel Images"
                      className="min-h-full object-cover"
                    />
                    <button
                      onClick={(event) => handleDelete(event, url)}
                      className=" absolute inset-0 flex items-center justify-center bg-black/20 group-hover:opacity-100 text-white"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            )}
            <input
              type="file"
              multiple
              accept="image/*"
              className="w-full text-gray-700 font-normal"
              {...register("imageFiles", {
                validate: (imageFiles) => {
                  const totalLength =
                    imageFiles.length + (existingImageUrl?.length || 0);

                  if (totalLength === 0) {
                    return "At least one image should be added";
                  }

                  if (totalLength > 6) {
                    return "Total number of images cannot be more then 6";
                  }
                },
              })}
            />
          </div>
          {/* {errors.imageFiles && (
        <span className="text-sm bg-red-500">{errors.imageFiles?.message}</span>
      )} */}
        </div>
        <div>
          <button className="btn-primary py-2 w-full rounded-full">Save</button>
        </div>
      </form>
    </div>
  );
}

export default MainAddHotel;
