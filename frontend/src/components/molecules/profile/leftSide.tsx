import { BsBarChartSteps } from "react-icons/bs";
import { FaUserFriends } from "react-icons/fa";
import { FaUserGear } from "react-icons/fa6";
import { IoIosCard, IoMdNotifications } from "react-icons/io";
import { MdOutlineSecurity, MdPrivacyTip } from "react-icons/md";
import { Link } from "react-router-dom";

function LeftSideProfile() {
  const navItems = [
    {
      name: "Personal details",
      path: "/user",
      icon: <FaUserGear />,
    },
    {
      name: "Preferences",
      path: "/user",
      icon: <BsBarChartSteps />,
    },
    {
      name: "Security",
      path: "/user",
      icon: <MdOutlineSecurity />,
    },
    {
      name: "Payment details",
      path: "/user",
      icon: <IoIosCard />,
    },
    {
      name: "Privacy",
      path: "/user",
      icon: <MdPrivacyTip />,
    },
    {
      name: "Email notifications",
      path: "/user",
      icon: <IoMdNotifications />,
    },
    {
      name: "Other travelers",
      path: "/user",
      icon: <FaUserFriends />,
    },
  ];

  return (
    <div className="border rounded-md">
      {navItems.map((item) => (
        <Link
          to={item.path}
          className="flex items-center p-3 hover:bg-zinc-200/55 trans-300 md:w-72 border-b"
        >
          <span className="p-2 rounded-full bg-zinc-200">{item.icon}</span>
          <span className="ml-2">{item.name}</span>
        </Link>
      ))}
    </div>
  );
}

export default LeftSideProfile;
