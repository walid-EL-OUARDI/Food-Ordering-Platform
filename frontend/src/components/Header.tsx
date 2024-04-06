import { Link } from "react-router-dom";
import MobilNav from "./MobilNav";
import DesktopNav from "./DesktopNav";

const Header = () => {
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
          <DesktopNav />
        </div>
        <div className="md:hidden">
          <MobilNav></MobilNav>
        </div>
      </div>
    </div>
  );
};

export default Header;
