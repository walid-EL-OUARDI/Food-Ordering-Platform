import { useGetRestaurantByIdQuery } from "@/app/api/restaurantApiSlice";
import Menu from "@/components/MenuItem";
import RestaurantInfo from "@/components/RestaurantInfo";
import { AspectRatio } from "@/components/ui/aspect-ratio";

import { url } from "@/helpres";
import { useParams } from "react-router-dom";

const DetailsPage = () => {
  const { restaurantId } = useParams();
  const { data } = useGetRestaurantByIdQuery(Number(restaurantId));
  console.log(data);
  if (data?.restaurant) {
    return (
      <div className="flex flex-col gap-10">
        <AspectRatio ratio={16 / 5}>
          <img
            src={url(data?.restaurant?.image_url)}
            className="rounded-md object-cover h-full w-full"
          />
        </AspectRatio>
        <div className="grid md:grid-cols-[4fr_2fr] gap-5 md:px-32">
          <div className="flex flex-col gap-4">
            <RestaurantInfo restaurant={data.restaurant} />
            <span className="text-2xl font-bold tracking-tight">Menu</span>
            {data.restaurant.menus.map((menu) => (
              <Menu menu={menu} />
            ))}
          </div>
        </div>
      </div>
    );
  }
};

export default DetailsPage;
