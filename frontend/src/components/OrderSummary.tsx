import { CartItem } from "@/pages/DetailsPage";
import { CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Trash } from "lucide-react";
import { Separator } from "./ui/separator";
import { Restaurant } from "@/types";

type Props = {
  cartItems: CartItem[];
  restaurant: Restaurant;
  removeCartItem: (cartItem: CartItem) => void;
};
const OrderSummary = ({ cartItems, restaurant, removeCartItem }: Props) => {
  const getTotalCost = (cartItems: CartItem[]) => {
    const totalPrice = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    );
    return totalPrice + restaurant.delivery_price;
  };
  return (
    <>
      <CardHeader>
        <CardTitle className="text-2xl font-bold tracking-tight flex justify-between">
          <span>Your Order</span>
          <span>{getTotalCost(cartItems)} DH</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        {cartItems.map((cartItem, index) => (
          <div
            className="flex justify-between"
            key={index}
          >
            <span>
              <Badge
                variant="outline"
                className="mr-2"
              >
                {cartItem.quantity}
              </Badge>
              {cartItem.name}
            </span>
            <span className="flex items-center gap-1">
              <Trash
                className="cursor-pointer"
                color="red"
                size={20}
                onClick={() => removeCartItem(cartItem)}
              />
              {cartItem.price * cartItem.quantity} DH
            </span>
          </div>
        ))}
        <Separator />
        <div className="flex justify-between">
          <span>Delivery</span>
          <span>{restaurant.delivery_price} DH</span>
        </div>
        <Separator />
      </CardContent>
    </>
  );
};

export default OrderSummary;
