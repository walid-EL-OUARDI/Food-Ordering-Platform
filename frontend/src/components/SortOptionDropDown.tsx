import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";

type Props = {
  sortOption: string;
  onChange: (option: string) => void;
};

const SortOptionDropDown = ({ onChange, sortOption }: Props) => {
  const SORT_OPTIONS = [
    {
      label: "Best match",
      value: "best_match",
    },
    {
      label: "Delivery price",
      value: "delivery_price",
    },
    {
      label: "Estimated delivery time",
      value: "estimated_delivery_time",
    },
  ];
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer">
        <Button
          variant="outline"
          className="w-full"
        >
          Sort by : {sortOption}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {SORT_OPTIONS.map((option) => (
          <DropdownMenuItem onClick={() => onChange(option.value)}>
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SortOptionDropDown;
