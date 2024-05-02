import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Function } from "@/types";

const MobileNavLinks = ({ logout }: Function) => {
  return (
    <>
      <Link
        to="/orders-status"
        className="font-bold bg-white hover:text-orange-500"
      >
        Order Status
      </Link>
      <Link
        to="/manage-restaurant"
        className="font-bold bg-white hover:text-orange-500"
      >
        Manage Restaurant
      </Link>
      <Link
        to="/user-profile"
        className="font-bold bg-white hover:text-orange-500"
      >
        User Profile
      </Link>
      <Button
        onClick={logout}
        className="flex-1 font-bold bg-orange-500"
      >
        Log out
      </Button>
    </>
  );
};

export default MobileNavLinks;
