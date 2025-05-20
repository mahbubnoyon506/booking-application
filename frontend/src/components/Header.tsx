import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import { useAppContext } from "../contexts/AppContext";
import { FiMenu } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import { useState } from "react";

type Props = {
  isHomeRoute: boolean;
};

function Header({ isHomeRoute }: Props) {
  const { isLoggedIn } = useAppContext();
  const [showPhoneMenu, setShowPhoneMenu] = useState(false);

  return (
    <div
      className={`relative bg-blue-800 pt-6 ${isHomeRoute ? "pb-16" : "pb-6"}`}
    >
      <div className="px-[4%] lg:px-[8%] flex justify-between">
        <span className="text-3xl text-bold text-white tracking-tight">
          <Link to="/">Holidays.com</Link>
        </span>
        <span className="flex space-x-2">
          {isLoggedIn ? (
            <>
              <div className="space-x-2 hidden md:flex">
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
                <LogoutButton />
              </div>
              <FiMenu
                className="md:hidden cursor-pointer"
                fontSize={32}
                color="white"
                onClick={() => setShowPhoneMenu(!showPhoneMenu)}
              />
            </>
          ) : (
            <Link
              to="/sign-in"
              className="flex items-center bg-white text-blue-600 px-3 font-bold hover:bg-gray-200"
            >
              Sign In
            </Link>
          )}
        </span>
      </div>
      <div
        className={`md:hidden absolute w-full bg-white p-5 space-y-3 transition-all duration-500 z-50 ${
          showPhoneMenu ? "top-0 right-0" : "-top-[200px] right-0 "
        } top-0 right-0 `}
      >
        <div className="flex justify-end">
          <MdClose
            className="cursor-pointer"
            fontSize={24}
            onClick={() => setShowPhoneMenu(false)}
          />
        </div>
        <Link
          className="flex items-center text-gray-600 px-3 font-bold"
          to="/my-bookings"
        >
          My Bookings
        </Link>
        <Link
          className="flex items-center text-gray-600 px-3 font-bold"
          to="/my-hotels"
        >
          My Hotels
        </Link>
        <LogoutButton />
      </div>
    </div>
  );
}

export default Header;
