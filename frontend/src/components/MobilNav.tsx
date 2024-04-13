import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Separator } from "./ui/separator";
import { CircleUserRound, Menu } from "lucide-react";
import MobileNavLinks from "./MobileNavLinks";
import { useAppSelector } from "../app/hooks/hooks";
import { Link } from "react-router-dom";
import { Function } from "@/types";

const MobilNav = ({ logout }: Function) => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const userEmail = useAppSelector((state) => state.auth.clientData?.email);
  return (
    <Sheet>
      <SheetTrigger>
        <Menu />
      </SheetTrigger>
      <SheetContent className="space-y-3">
        <SheetTitle>
          {isAuthenticated ? (
            <div className="flex  gap-2 justify-center items-center font-bold hover:text-orange-500">
              <CircleUserRound className="text-orange-500" />
              <span>{userEmail}</span>
            </div>
          ) : (
            <div className="text-center">Welcome to our Food Platform</div>
          )}
        </SheetTitle>
        <Separator className="my-4" />
        <SheetDescription className="flex flex-col gap-2">
          {isAuthenticated ? (
            <MobileNavLinks logout={logout} />
          ) : (
            <Link
              to="/login"
              className="flex-1 font-bold bg-orange-500 text-2xl tracking-tight text-black text-center rounded-md p-2"
            >
              Log in
            </Link>
          )}
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
};

export default MobilNav;
