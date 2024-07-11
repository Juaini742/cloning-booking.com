import { useQuery } from "react-query";
import LeftSideProfile from "./leftSide";
import * as apiClient from "../../../api-client";
import { useState } from "react";
import { UserType } from "../../../interfaces";

const initialFormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  month: "",
  date: "",
  year: "",
  nationality: "",
  gender: "",
  address: "",
};

function MainProfile() {
  const [isEditing, setIsEditing] = useState({
    firstName: false,
    lastName: false,
    email: false,
    phone: false,
    month: false,
    date: false,
    year: false,
    nationality: false,
    gender: false,
    address: false,
  });
  const [formData, setFormData] = useState(initialFormData);
  const { data: user, refetch } = useQuery(
    "fetchCurrentUser",
    apiClient.fetchCurrentUser
  );

  const handleVisibleEdit = (field: keyof UserType) => {
    setIsEditing({ ...isEditing, [field]: true });
    setFormData({ ...formData, [field]: user?.[field] });
  };

  const handleCancelEdit = (field: string) => {
    setIsEditing({ ...isEditing, [field]: false });
  };

  const handleInputChange = (e: {
    target: { name: string; value: string };
  }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async (field: keyof typeof formData) => {
    let formBody: { [key: string]: string };

    if (field === "date") {
      const { date, month, year } = formData;
      formBody = {
        date,
        month,
        year,
      };
    } else {
      formBody = {
        [field]: formData[field],
      };
    }
    await apiClient.updateCurrentUser({
      id: user?._id,
      formBody,
    });
    refetch();
    setIsEditing({ ...isEditing, [field]: false });
  };

  return (
    <section className="mt-10 flex gap-3 mb-10">
      <div className="h-full hidden md:block">
        <LeftSideProfile />
      </div>
      <div className="flex-1 flex flex-col gap-2">
        <div className="pb-3 border-b">
          <h2 className="text-2xl font-bold">Personal details</h2>
          <p>Update your information and find out how it{"'"}s used.</p>
        </div>
        <div className="pb-3 border-b flex justify-between">
          {isEditing.firstName ? (
            <div className="">
              <h2>First Name</h2>
              <div className="flex gap-2">
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="border rounded-md w-full outline-none p-2"
                />
                <button
                  onClick={() => handleCancelEdit("firstName")}
                  className="text-blue-600"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleSave("firstName")}
                  className="btn-primary px-2 rounded"
                >
                  Save
                </button>
              </div>
            </div>
          ) : (
            <div>
              <h2>First Name</h2>
              <p>{user?.firstName}</p>
            </div>
          )}
          {!isEditing.firstName && (
            <button
              onClick={() => handleVisibleEdit("firstName")}
              className="text-blue-600"
            >
              Edit
            </button>
          )}
        </div>
        <div className="pb-3 border-b flex justify-between">
          {isEditing.lastName ? (
            <div>
              <h2>Last Name</h2>
              <div className="flex gap-2">
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="border rounded-md w-full outline-none p-2"
                />
                <button
                  onClick={() => handleCancelEdit("lastName")}
                  className="text-blue-600"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleSave("lastName")}
                  className="btn-primary px-2 rounded"
                >
                  Save
                </button>
              </div>
            </div>
          ) : (
            <div>
              <h2>Last Name</h2>
              <p>{user?.lastName}</p>
            </div>
          )}
          {!isEditing.firstName && (
            <button
              onClick={() => handleVisibleEdit("lastName")}
              className="text-blue-600"
            >
              Edit
            </button>
          )}
        </div>
        <div className="pb-3 border-b flex justify-between">
          {isEditing.email ? (
            <div>
              <h2>Email</h2>
              <div className="flex gap-2">
                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="border rounded-md w-full outline-none p-2"
                />
                <button
                  onClick={() => handleCancelEdit("email")}
                  className="text-blue-600"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleSave("email")}
                  className="btn-primary px-2 rounded"
                >
                  Save
                </button>
              </div>
            </div>
          ) : (
            <div>
              <h2>Email</h2>
              <p>
                {user?.email}
                <span className="ml-2 px-1 rounded bg-green-700 text-white text-sm">
                  Verified
                </span>
              </p>
              <p className="text-zinc-500 text-sm">
                This is the email address you use to sign in. It’s also where we
                send your booking confirmations.
              </p>
            </div>
          )}
          {!isEditing.email && (
            <button
              onClick={() => handleVisibleEdit("email")}
              className="text-blue-600"
            >
              Edit
            </button>
          )}
        </div>
        <div className="pb-3 border-b flex justify-between">
          {isEditing.phone ? (
            <div>
              <h2>Phone</h2>
              <div className="flex gap-2">
                <input
                  type="number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="border rounded-md w-full outline-none p-2"
                />
                <button
                  onClick={() => handleCancelEdit("phone")}
                  className="text-blue-600"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleSave("phone")}
                  className="btn-primary px-2 rounded"
                >
                  Save
                </button>
              </div>
            </div>
          ) : (
            <div>
              <h2>Phone number</h2>
              <p>{user?.phone}</p>
              <p className="text-zinc-500 text-sm">
                Properties or attractions you book will use this number if they
                need to contact you.
              </p>
            </div>
          )}
          {!isEditing.phone && (
            <button
              onClick={() => handleVisibleEdit("phone")}
              className="text-blue-600"
            >
              Edit
            </button>
          )}
        </div>
        <div className="pb-3 border-b flex justify-between">
          {isEditing.date ? (
            <div>
              <h2>Date of birth</h2>
              <div className="flex gap-2">
                <input
                  type="number"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="border rounded-md w-full outline-none p-2"
                  placeholder="DD"
                />
                <select
                  name="month"
                  value={formData.month}
                  onChange={handleInputChange}
                  className="border rounded-md w-full outline-none p-2"
                >
                  <option value="">Month</option>
                  <option value="January">January</option>
                  <option value="February">February</option>
                  <option value="March">March</option>
                  <option value="April">April</option>
                  <option value="May">May</option>
                  <option value="June">June</option>
                  <option value="July">July</option>
                  <option value="August">August</option>
                  <option value="September">September</option>
                  <option value="October">October</option>
                  <option value="November">November</option>
                  <option value="December">December</option>
                </select>
                <input
                  type="number"
                  name="year"
                  value={formData.year}
                  onChange={handleInputChange}
                  className="border rounded-md w-full outline-none p-2"
                  placeholder="YYYY"
                />
                <button
                  onClick={() => handleCancelEdit("date")}
                  className="text-blue-600"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleSave("date")}
                  className="btn-primary px-2 rounded"
                >
                  Save
                </button>
              </div>
            </div>
          ) : (
            <div>
              <h2>Date of birth</h2>
              <p>{`${user?.date}/${user?.month}/${user?.year}`}</p>
            </div>
          )}
          {!isEditing.date && (
            <button
              onClick={() => handleVisibleEdit("date")}
              className="text-blue-600"
            >
              Edit
            </button>
          )}
        </div>
        <div className="pb-3 border-b flex justify-between">
          {isEditing.nationality ? (
            <div>
              <h2>Nationality</h2>
              <div className="flex gap-2">
                <input
                  type="tex"
                  name="nationality"
                  value={formData.nationality}
                  onChange={handleInputChange}
                  className="border rounded-md w-full outline-none p-2"
                />
                <button
                  onClick={() => handleCancelEdit("nationality")}
                  className="text-blue-600"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleSave("nationality")}
                  className="btn-primary px-2 rounded"
                >
                  Save
                </button>
              </div>
            </div>
          ) : (
            <div>
              <h2>Nationality</h2>
              <p>{user?.nationality}</p>
            </div>
          )}
          {!isEditing.nationality && (
            <button
              onClick={() => handleVisibleEdit("nationality")}
              className="text-blue-600"
            >
              Edit
            </button>
          )}
        </div>
        <div className="pb-3 border-b flex justify-between">
          {isEditing.gender ? (
            <div>
              <h2>Gender</h2>
              <div className="flex gap-2">
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="border rounded-md w-full outline-none p-2"
                >
                  <option value="">Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                <button
                  onClick={() => handleCancelEdit("gender")}
                  className="text-blue-600"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleSave("gender")}
                  className="btn-primary px-2 rounded"
                >
                  Save
                </button>
              </div>
            </div>
          ) : (
            <div>
              <h2>Gender</h2>
              <p>{user?.gender}</p>
            </div>
          )}
          {!isEditing.gender && (
            <button
              onClick={() => handleVisibleEdit("gender")}
              className="text-blue-600"
            >
              Edit
            </button>
          )}
        </div>
        <div className="pb-3 border-b flex justify-between">
          {isEditing.address ? (
            <div>
              <h2>Address</h2>
              <div className="flex gap-2">
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="border rounded-md w-full outline-none p-2"
                />
                <button
                  onClick={() => handleCancelEdit("address")}
                  className="text-blue-600"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleSave("address")}
                  className="btn-primary px-2 rounded"
                >
                  Save
                </button>
              </div>
            </div>
          ) : (
            <div>
              <h2>Address</h2>
              <p>{user?.address}</p>
            </div>
          )}
          {!isEditing.address && (
            <button
              onClick={() => handleVisibleEdit("address")}
              className="text-blue-600"
            >
              Edit
            </button>
          )}
        </div>
        <div className="pb-3 border-b flex justify-between">
          <div className="">
            <h2>Passport details</h2>
            <p>Juaini</p>
          </div>
          <button className="text-blue-600">Edit</button>
        </div>
      </div>
    </section>
  );
}

export default MainProfile;
