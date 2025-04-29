import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/Appcontext";
import LogoutButton from "./LogoutButton";

function Header() {
  const { isLoggedIn } = useAppContext();

  return (
    <div className=" bg-blue-800 py-6">
      <div className="container mx-auto flex justify-between">
        <span className="text-3xl text-bold text-white tracking-tight">
          <Link to="/">Holidays.com</Link>
        </span>
        <span className="flex space-x-2">
          {isLoggedIn ? (
            <LogoutButton />
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
    </div>
  );
}

export default Header;
