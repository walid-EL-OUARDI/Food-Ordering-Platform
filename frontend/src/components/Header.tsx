import { Link } from "react-router-dom";
import MobilNav from "./MobilNav";
import DesktopNav from "./DesktopNav";
import { useAppDispatch } from "@/app/hooks/hooks";
import { useLogoutMutation } from "@/features/auth/userApiSlice";
import { logoutUser } from "@/features/auth/authSlice";

const Header = () => {
  const dispatch = useAppDispatch();
  const [logout] = useLogoutMutation();
  const onLogout = async () => {
    try {
      await logout().unwrap();
      dispatch(logoutUser());
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="border-b-2 border-b-orange-500 py-6 ">
      <div className="container flex justify-between items-center">
        <Link
          to="/"
          className="text-3xl font-bold text-orange-500 tracking-tight"
        >
          Food Platform
        </Link>
        <div className="hidden md:block">
          <DesktopNav logout={onLogout} />
        </div>
        <div className="md:hidden">
          <MobilNav logout={onLogout} ></MobilNav>
        </div>
      </div>
    </div>
  );
};

export default Header;
