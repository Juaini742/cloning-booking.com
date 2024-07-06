import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import { MdOutlineAttractions, MdOutlineLocalHotel } from "react-icons/md";
import { LuPlane } from "react-icons/lu";
import { GiEarthAmerica } from "react-icons/gi";
import { LiaTaxiSolid } from "react-icons/lia";
import { PiRoadHorizonBold } from "react-icons/pi";
import SignOutButton from "../components/ui/SignOutButton";

export const Header = () => {
  const { isLoggedIn } = useAppContext();

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

  return (
    <div className="bg-primary py-6">
      <div className="container mx-auto flex justify-between">
        <span className="text-xl md:text-2xl text-white font-bold tracking-tight">
          <Link to="/">CloneBooking.com</Link>
        </span>
        <span className="flex space-x-2">
          {isLoggedIn ? (
            <>
              <Link
                className="flex items-center text-white px-3 font-bold hover:bg-blue-600"
                to="/my-bookings"
              >
                My Bookings
              </Link>
              <Link
                className="flex items-center text-white px-3 font-bold hover:bg-blue-600"
                to="/my-hotels"
              >
                My Hotels
              </Link>
              <SignOutButton />
            </>
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
        </span>
      </div>
      <div className="container mt-4 flex gap-3 overflow-x-auto">
        {attributes.map((attr, index) => (
          <button
            key={index}
            className={`min-w-44 flex items-center gap-2 text-white px-5 py-3 rounded-full hover:bg-blue-400/20 trans-300 ${
              index === 0 && "border bg-blue-400/20"
            }`}
          >
            <span className="text-3xl">{attr.icon}</span>
            <span>{attr.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
