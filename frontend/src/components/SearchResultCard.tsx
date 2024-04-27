import { Restaurant } from "@/types";
import { Link } from "react-router-dom";
import { AspectRatio } from "./ui/aspect-ratio";
import { url } from "@/helpres";
import { Banknote, Clock, Dot } from "lucide-react";

type Props = {
  restaurant: Restaurant;
};
const SearchResultCard = ({ restaurant }: Props) => {
  return (
    <Link
      to={`/details/${restaurant.id}`}
      className="grid lg:grid-cols-[2fr_3fr] group gap-3 mt-6"
    >
      <AspectRatio ratio={16 / 9}>
        <img
          id="output"
          src={url(restaurant.image_url)}
          className="rounded-md object-cover h-full w-full"
        />
      </AspectRatio>
      <div>
        <h3 className="text-2xl font-bold tracking-tight mb-2 group-hover:underline">
          {restaurant.name}
        </h3>
        <div
          id="card-content"
          className="grid md:grid-cols-2 gap-2"
        >
          <div className="flex flex-row flex-wrap">
            {restaurant.cuisines.map((item, index) => (
              <span
                className="flex items-center"
                key={index}
              >
                <span>{item}</span>
                {index < restaurant.cuisines.length - 1 && <Dot />}
              </span>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            <div className=" flex items-center gap-1">
              <Clock className="text-green-500" />
              {restaurant.estimated_delivery_time} mins
            </div>
            <div className=" flex items-center gap-1">
              <Banknote className="text-green-500" />
              {restaurant.delivery_price} DH
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SearchResultCard;
