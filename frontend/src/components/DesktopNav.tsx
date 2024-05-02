import { Link } from "react-router-dom";
import DesktopNavLinks from "./DesktopNavLinks";
import { useAppSelector } from "@/app/hooks/hooks";
import { Function } from "@/types";

const DesktopNav = ({ logout }: Function) => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  return (
    <div>
      {isAuthenticated ? (
        <div className="flex items-center gap-6">
          <Link
            to="/orders-status"
            className="font-bold hover:text-orange-500 tracking-tight"
          >
            Order status
          </Link>
          <DesktopNavLinks logout={logout} />
        </div>
      ) : (
        <Link
          to="/login"
          className="text-2xl font-bold tracking-tight hidden md:block hover:text-orange-500 "
        >
          Log in
        </Link>
      )}
    </div>
  );
};

export default DesktopNav;
