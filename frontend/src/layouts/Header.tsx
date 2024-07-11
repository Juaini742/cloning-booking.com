import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import { MdOutlineAttractions, MdOutlineLocalHotel } from "react-icons/md";
import { LuPlane } from "react-icons/lu";
import { GiEarthAmerica } from "react-icons/gi";
import { LiaTaxiSolid } from "react-icons/lia";
import { PiRoadHorizonBold } from "react-icons/pi";
import SignOutButton from "../components/ui/SignOutButton";
import { useState } from "react";
import { FaRegUser, FaSwatchbook } from "react-icons/fa";
import { useQuery } from "react-query";
import * as apiClient from "../api-client";

export const Header = () => {
  const { isLoggedIn } = useAppContext();
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const attributes = [
    {
      icon: <MdOutlineLocalHotel />,
      name: "Stays",
    },
    {
      icon: <LuPlane />,
      name: "Flights",
    },
    {
      icon: <GiEarthAmerica />,
      name: "Flight + Hotel",
    },
    {
      icon: <LiaTaxiSolid />,
      name: "Car rentals",
    },
    {
      icon: <MdOutlineAttractions />,
      name: "Attractions",
    },
    {
      icon: <PiRoadHorizonBold />,
      name: "Airport taxis",
    },
  ];

  const handleVIsible = () => {
    setIsVisible((prev) => !prev);
  };

  const { data: user } = useQuery(
    "fetchCurrentUser",
    apiClient.fetchCurrentUser
  );

  return (
    <div className="bg-primary py-6">
      <div className="container mx-auto flex justify-between">
        <span className="text-xl md:text-2xl text-white font-bold tracking-tight">
          <Link to="/">CloneBooking.com</Link>
        </span>
        <div className="flex space-x-2 relative">
          {isLoggedIn ? (
            <div>
              <button
                onClick={handleVIsible}
                className="flex gap-2 items-center"
              >
                <div className="w-10 h-10 rounded-full bg-yellow"></div>
                <div className="flex flex-col">
                  <span className="text-white font-bold text-left">
                    {user?.firstName}
                  </span>
                  <span className="text-sm text-yellow">Genius level 1</span>
                </div>
              </button>
              <div
                className={`absolute top-14 right-5 w-52 flex flex-col items-center bg-white shadow-md rounded-md trans-300 ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-5 -z-50"
                }`}
              >
                <Link
                  className="flex items-center text-zinc-700 gap-2 px-3 py-3 w-full hover:bg-zinc-200/55 trans-300"
                  to="/user"
                >
                  <span className="text-2xl">
                    <FaRegUser />
                  </span>
                  Manage account
                </Link>
                <Link
                  className="flex items-center text-zinc-700 gap-2 px-3 py-3 w-full hover:bg-zinc-200/55 trans-300"
                  to="/my-bookings"
                >
                  <span className="text-2xl">
                    <FaSwatchbook />
                  </span>
                  My Bookings
                </Link>
                <Link
                  className="flex items-center text-zinc-700 gap-2 px-3 py-3 w-full hover:bg-zinc-200/55 trans-300"
                  to="/my-hotels"
                >
                  <span className="text-2xl">
                    <MdOutlineLocalHotel />
                  </span>
                  My Hotels
                </Link>
                <SignOutButton />
              </div>
            </div>
          ) : (
            <div className="flex gap-2">
              <Link
                to="/register"
                className="flex bg-white rounded text-blue-600 px-4 py-2 hover:bg-gray-100"
              >
                Register
              </Link>
              <Link
                to="/sign-in"
                className="flex bg-white rounded text-blue-600 px-4 py-2 hover:bg-gray-100"
              >
                Sign In
              </Link>
            </div>
          )}
        </div>
      </div>
      <div className="container mt-4 flex gap-2 overflow-x-auto pb-3">
        {attributes.map((attr, index) => (
          <button
            key={index}
            className={`min-w-36 flex items-center gap-2 text-white text-sm pl-3 py-2 rounded-full hover:bg-blue-400/20 trans-300 ${
              index === 0 && "border bg-blue-400/20"
            }`}
          >
            <span className="text-2xl">{attr.icon}</span>
            <span>{attr.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
