import { Link } from "react-router-dom";
import UserMenu from "./UserMenu";

const DesktopNav = () => {
  return (
    <div>
      {
        (true ? (
          <UserMenu />
        ) : (
          <Link
            to="/login"
            className="text-2xl font-bold tracking-tight hidden md:block hover:text-orange-500 "
          >
            Log in
          </Link>
        ))
      }
    </div>
  );
};

export default DesktopNav;
