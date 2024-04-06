import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CircleUserRound } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const UserMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex  gap-2 justify-center items-center font-bold hover:text-orange-500">
        <CircleUserRound className="text-orange-500" />
        {"walid@gmail.com"}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuSeparator />
        <DropdownMenuItem >
            <Link to="/user-profile" className="font-bold hover:text-orange-500 bg-white">User Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
             <Button className="flex flex-1 font-bold bg-orange-500">Log out</Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
