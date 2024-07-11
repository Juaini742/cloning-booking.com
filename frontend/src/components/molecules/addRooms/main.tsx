import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { FaRegTrashCan } from "react-icons/fa6";
import { RoomsType } from "../../../interfaces";
import * as apiClient from "../../../api-client";
import { RiArrowLeftDoubleLine } from "react-icons/ri";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAppContext } from "../../../contexts/AppContext";
import { roomType, roomFacilities } from "../../../config/hotel-options-config";

const initialFormValue = {
  roomNumber: "",
  type: "",
  pricePerNight: "",
  adultCount: "",
  childCount: "",
  facilities: [],
  description: "",
  imageFiles: null,
  imageUrls: [],
};

interface FormDataObject {
  [index: string]: {
    [field: string]: string | File | FileList | string[];
  };
}

function MainAddRooms({ id }: { id?: string }) {
  const navigate = useNavigate();
  const { showToast } = useAppContext();
  const { mutate } = useMutation(apiClient.addRooms, {
    onSuccess: () => {
      showToast({ message: "Room Saved", type: "SUCCESS" });
      navigate("/my-hotels");
    },
    onError: () => {
      showToast({ message: "Error Saving Room", type: "ERROR" });
    },
  });
  const { register, handleSubmit, watch, setValue } = useForm<RoomsType>();
  const [rooms, setRooms] = useState<RoomsType>({
    rooms: [initialFormValue],
  });

  const handleAddRoom = () => {
    setRooms({
      rooms: [...rooms.rooms, initialFormValue],
    });
  };

  const handleDeleteRoom = (index: number) => {
    if (index > 0) {
      setRooms((prev) => {
        const updateRooms = [...prev.rooms];
        updateRooms.splice(index, 1);
        return { rooms: updateRooms };
      });
    }
  };

  const onSubmit: SubmitHandler<RoomsType> = async (data: RoomsType) => {
    const formData = new FormData();

    data.rooms.forEach((room, index) => {
      formData.append(`rooms[${index}][roomNumber]`, room.roomNumber);
      formData.append(`rooms[${index}][type]`, room.type);
      formData.append(`rooms[${index}][pricePerNight]`, room.pricePerNight);
      formData.append(`rooms[${index}][adultCount]`, room.adultCount);
      formData.append(`rooms[${index}][childCount]`, room.childCount);
      formData.append(`rooms[${index}][facilities]`, room.facilities.join(","));
      formData.append(`rooms[${index}][description]`, room.description);
      room.imageUrls.forEach((url, urlIndex) => {
        formData.append(`rooms[${index}][imageUrls][${urlIndex}]`, url);
      });

      if (room.imageFiles) {
        Array.from(room.imageFiles).forEach((file) => {
          formData.append("imageFiles", file);
        });
      }
    });

    const formDataObj: FormDataObject = {};
    for (const [key, value] of formData.entries()) {
      const match = key.match(/\[(.*?)\]\.(.*)/);
      if (match) {
        const [, index, field] = match;
        formDataObj[index] = formDataObj[index] || {};
        formDataObj[index][field] = value;
      }
    }

    await mutate({ formData, id });
  };

  const handleImageFilesChange = (index: number, files: FileList | null) => {
    if (files && files.length > 0) {
      const urls = Array.from(files).map((file) => URL.createObjectURL(file));
      setValue(`rooms.${index}.imageUrls`, urls);
    }
  };

  return (
    <section className="flex flex-col gap-3">
      <div className="flex justify-between  sticky top-3">
        <button
          onClick={() => navigate(-1)}
          className="btn-warning px-3 py-2 rounded-md flex items-center"
        >
          <RiArrowLeftDoubleLine className="text-2xl" />
          Back
        </button>
        <button
          onClick={handleAddRoom}
          className="btn-indigo px-4 py-2 rounded-md flex items-center gap-2"
        >
          <FaPlus />
          Add more rooms
        </button>
      </div>
      {rooms?.rooms?.map((_, index) => {
        const typeWatch = watch(`rooms.${index}.type`);
        const existingImageUrl = watch(`rooms.${index}.imageUrls`);

        const handleDelete = (
          event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
          imageUrl: string
        ) => {
          event.preventDefault();
          setValue(
            `rooms.${index}.imageUrls`,
            existingImageUrl?.filter((url) => url !== imageUrl)
          );
        };

        return (
          <div
            key={index}
            className="flex flex-col gap-2 p-4 border shadow-md rounded-xl"
          >
            <div className="flex justify-between">
              <h3 className="font-bold text-xl">Room {index + 1}</h3>
              <button
                onClick={() => handleDeleteRoom(index)}
                className="btn-danger px-2 py-2 rounded-md"
              >
                <FaRegTrashCan />
              </button>
            </div>
            <div>
              <label
                htmlFor={`roomNumber-${index}`}
                className="flex flex-col w-full"
              >
                <span>Room Number</span>
                <input
                  type="number"
                  id={`roomNumber-${index}`}
                  {...register(`rooms.${index}.roomNumber` as const)}
                  className="border border-zinc-800 rounded-md w-full py-1 px-2 outline-none"
                />
              </label>
            </div>
            <div>
              <label
                htmlFor={`pricePerNight-${index}`}
                className="flex flex-col w-full"
              >
                <span>Price Per night</span>
                <input
                  type="number"
                  id={`pricePerNight-${index}`}
                  {...register(`rooms.${index}.pricePerNight` as const)}
                  className="border border-zinc-800 rounded-md w-full py-1 px-2 outline-none"
                />
              </label>
            </div>
            <div className="flex  gap-2">
              <label
                htmlFor={`adultCount-${index}`}
                className="flex flex-col w-full"
              >
                <span>Adult Count</span>
                <input
                  type="number"
                  min={1}
                  id={`adultCount-${index}`}
                  {...register(`rooms.${index}.adultCount` as const)}
                  className="border border-zinc-800 rounded-md w-full py-1 px-2 outline-none"
                />
              </label>
              <label
                htmlFor={`childCount-${index}`}
                className="flex flex-col w-full"
              >
                <span>Child Count</span>
                <input
                  type="number"
                  min={1}
                  id={`childCount-${index}`}
                  {...register(`rooms.${index}.childCount` as const)}
                  className="border border-zinc-800 rounded-md w-full py-1 px-2 outline-none"
                />
              </label>
            </div>
            <div>
              <span>Type</span>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                {roomType.map((type, i) => (
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
                      {...register(`rooms.${index}.type` as const)}
                      className="hidden"
                    />
                    <span className="">{type}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <span>Facilities</span>
              <div className="grid grid-cols-2 md:grid-cols-4 items-center gap-3">
                {roomFacilities.map((facility, i) => (
                  <label key={i} className="text-sm flex gap-1 text-gray-900">
                    <input
                      type="checkbox"
                      value={facility}
                      {...register(`rooms.${index}.facilities` as const, {
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
              <label
                htmlFor={`description-${index}`}
                className="flex flex-col w-full"
              >
                <span>Description</span>
                <input
                  type="text"
                  id={`description-${index}`}
                  {...register(`rooms.${index}.description` as const)}
                  className="border border-zinc-800 rounded-md w-full py-1 px-2 outline-none"
                />
              </label>
            </div>

            <div className="border border-zinc-800 rounded-md p-3 flex flex-col gap-4">
              {existingImageUrl && (
                <div className="grid grid-cols-6 gap-4">
                  {existingImageUrl.map((url, i) => (
                    <div key={i} className="relative group">
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
                {...register(`rooms.${index}.imageFiles` as const)}
                onChange={(e) => handleImageFilesChange(index, e.target.files)}
              />
            </div>
          </div>
        );
      })}

      <button
        onClick={handleSubmit(onSubmit)}
        className="w-full py-2 rounded-full btn-primary mt-3"
      >
        Save Rooms
      </button>
    </section>
  );
}

export default MainAddRooms;
