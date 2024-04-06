import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { CircleUserRound, Menu } from "lucide-react";
import MobileNavLinks from "./MobileNavLinks";

const MobilNav = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu />
      </SheetTrigger>
      <SheetContent className="space-y-3">
        <SheetTitle>
          {true ? (
            <div className="flex  gap-2 justify-center items-center font-bold hover:text-orange-500">
              <CircleUserRound className="text-orange-500" />
              <span>walid@gmail.com</span>
            </div>
          ) : (
            <div className="text-center">Welcome to our Food Platform</div>
          )}
        </SheetTitle>
        <Separator className="my-4" />
        <SheetDescription className="flex flex-col gap-2">
          {true ? (
            <MobileNavLinks />
          ) : (
            <Button className="flex-1 font-bold bg-orange-500">Log in</Button>
          )}
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
};

export default MobilNav;
