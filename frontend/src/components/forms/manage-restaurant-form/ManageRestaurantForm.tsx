import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import DetailsSection from "./DetailsSection";
import { Separator } from "@/components/ui/separator";
import CuisinesSection from "./CuisinesSection";
import MenuSection from "./MenuSection";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import ImageSection from "./ImageSection";
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import { useEffect } from "react";
import { setRestaurantData } from "@/features/restaurant/restaurantSlice";
import { RestaurantState } from "@/types";
const formSchema = z.object({
  restaurantName: z.string({
    required_error: "restuarant name is required",
  }),
  city: z.string({
    required_error: "city name is required",
  }),
  country: z.string({
    required_error: "country name is required",
  }),
  deliveryPrice: z.coerce.number({
    required_error: "country name is required",
    invalid_type_error: "must be a valid number",
  }),
  estimatedDeliveryTime: z.coerce.number({
    required_error: "estimated delivery time is required",
    invalid_type_error: "must be a valid number",
  }),
  cuisines: z.array(z.string()).nonempty({
    message: "please select at least one item",
  }),
  menuItems: z.array(
    z.object({
      name: z.string().min(1, "name is required"),
      price: z.coerce
        .number({ invalid_type_error: "must be a valid number" })
        .min(2, "price is required"),
    })
  ),
  imageUrl: z.string().optional(),
  imageFile: z.instanceof(File, {
    message: "image is required",
  }),
});

type Props = {
  restaurant?: RestaurantState;
  onSave: (resstaurantFormData: FormData) => void;
  isLoading: boolean;
  title: string;
};

export type resstaurantFormData = z.infer<typeof formSchema>;
const ManageRestaurantForm = ({
  onSave,
  isLoading,
  restaurant,
  title,
}: Props) => {
  const dispatch = useAppDispatch();
  const form = useForm<resstaurantFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      menuItems: [{ name: "", price: 0 }],
      cuisines: [],
    },
  });

  useEffect(() => {
    if (!restaurant?.restaurantData) {
      return;
    }
    

    dispatch(setRestaurantData(restaurant));
    const updatedRestaurant: resstaurantFormData = {
      restaurantName: restaurant.restaurantData.name,
      city: restaurant.restaurantData.city,
      country: restaurant.restaurantData.country,
      deliveryPrice: restaurant.restaurantData.delivery_price,
      estimatedDeliveryTime: restaurant.restaurantData.estimated_delivery_time,
      cuisines: restaurant.restaurantData.cuisines,
      menuItems: restaurant.restaurantData.menus,
      imageUrl: restaurant.restaurantData.image_url,
    };
    form.reset(updatedRestaurant);
  }, [restaurant?.restaurantData]);

  const onSubmit = (restaurantFormData: resstaurantFormData) => {
    const restaurantData = new FormData();
    restaurantData.append("name", restaurantFormData.restaurantName);
    restaurantData.append("country", restaurantFormData.country);
    restaurantData.append("city", restaurantFormData.city);
    restaurantData.append(
      "delivery_price",
      restaurantFormData.deliveryPrice.toString()
    );
    restaurantData.append(
      "estimated_delivery_time",
      restaurantFormData.estimatedDeliveryTime.toString()
    );
    restaurantFormData.menuItems.forEach((menuItem, index) => {
      restaurantData.append(`menus[${index}][name]`, menuItem.name);
      restaurantData.append(
        `menus[${index}][price]`,
        menuItem.price.toString()
      );
    });
    restaurantFormData.cuisines.forEach((cuisine, index) => {
      restaurantData.append(`cuisines[${index}]`, cuisine);
    });
    restaurantData.append("image", restaurantFormData.imageFile);

    onSave(restaurantData);
  };

  return (
    <Form {...form}>
      <form
        className="space-y-8 bg-gray-50 p-10 rounded-lg"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <DetailsSection />
        <Separator />
        <CuisinesSection />
        <Separator />
        <MenuSection />
        <Separator />
        <ImageSection />
        <div>
          {isLoading ? (
            <LoadingButton />
          ) : (
            <Button type="submit">{title}</Button>
          )}
        </div>
      </form>
    </Form>
  );
};

export default ManageRestaurantForm;
