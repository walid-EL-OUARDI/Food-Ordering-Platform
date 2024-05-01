import {
  useMarkOrderAsPaidMutation,
  usePayOrderMutation,
  useStoreOrderMutation,
} from "@/app/api/orderApiSlice";
import { useGetRestaurantByIdQuery } from "@/app/api/restaurantApiSlice";
import { useUpdateUserInfoMutation } from "@/app/api/userApiSlice";
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import CheckoutButton from "@/components/CheckoutButton";
import Menu from "@/components/MenuItem";
import OrderSummary from "@/components/OrderSummary";
import RestaurantInfo from "@/components/RestaurantInfo";
import { UserFormData } from "@/components/forms/UserProfileForm";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardFooter } from "@/components/ui/card";
import { updateUserCredentials } from "@/features/auth/authSlice";
import { setOrder } from "@/features/order/OrderSlice";
import { url } from "@/helpres";
import { Menu as MenuType } from "@/types";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

export type CartItem = {
  name: string;
  price: number;
  quantity: number;
};
const DetailsPage = () => {
  const ycPay = useAppSelector((state) => state.payment.ycPay);
  const { restaurantId } = useParams();
  const { data } = useGetRestaurantByIdQuery(Number(restaurantId));
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const storedCartItems = sessionStorage.getItem(`cartItems-${restaurantId}`);
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });
  const [updateUserInfo, { isLoading }] = useUpdateUserInfoMutation();
  const [storeOrder] = useStoreOrderMutation();
  const [payOrder] = usePayOrderMutation();
  const [MarkOrderAsPaid] = useMarkOrderAsPaidMutation();
  const dispatch = useAppDispatch();
  const orderId = useAppSelector((state) => state.order.order.id);

  const addToCart = (menu: MenuType) => {
    setCartItems((prevCartItems) => {
      const cartItemExist = prevCartItems.find(
        (prevCartItem) => prevCartItem.name === menu.name
      );
      let updatedCartItems;
      if (cartItemExist) {
        updatedCartItems = prevCartItems.map((prevCartItem) =>
          prevCartItem.name === menu.name
            ? { ...prevCartItem, quantity: prevCartItem.quantity + 1 }
            : { ...prevCartItem }
        );
      } else {
        updatedCartItems = [
          ...prevCartItems,
          {
            name: menu.name,
            price: menu.price,
            quantity: 1,
          },
        ];
      }
      sessionStorage.setItem(
        `cartItems-${restaurantId}`,
        JSON.stringify(updatedCartItems)
      );

      return updatedCartItems;
    });
  };

  const removeCartItem = (cartItem: CartItem) => {
    setCartItems((prevCartItems) => {
      let updatedCartItems = prevCartItems.filter(
        (prevCartItem) => prevCartItem.name !== cartItem.name
      );
      sessionStorage.setItem(
        `cartItems-${restaurantId}`,
        JSON.stringify(updatedCartItems)
      );

      return updatedCartItems;
    });
  };

  const updateUserData = async (userData: UserFormData) => {
    try {
      const res = await updateUserInfo(userData).unwrap();
      dispatch(updateUserCredentials(res));
      if (restaurantId) {
        const orderResponse = await storeOrder({
          restaurantId,
          cartItems,
        }).unwrap();
        dispatch(setOrder(orderResponse));
      }
      toast.success("Profile updated successfully");
    } catch (res: any) {
      console.log(res);
      if (res.data.errors) {
        Object.values(res.data.errors).forEach((value: any) => {
          toast.error(value[0]);
        });
      }
    }
  };

  const hundlePayment = async () => {
    try {
      if (restaurantId) {
        const paymemtResponse = await payOrder(orderId).unwrap();
        ycPay.pay(paymemtResponse.token).then(handleYcpSuccess);
      }
    } catch (res: any) {
      console.log(res);
    }
  };

  const handleYcpSuccess = async ({ response }) => {
    try {
      if (response?.order_id) {
        console.log(response);
        const res = await MarkOrderAsPaid(response?.order_id).unwrap();
        dispatch(setOrder(res));
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (data?.restaurant) {
    return (
      <div className="flex flex-col gap-10">
        <ToastContainer />
        <AspectRatio ratio={16 / 5}>
          <img
            src={url(data.restaurant?.image_url)}
            className="rounded-md object-cover h-full w-full"
          />
        </AspectRatio>
        <div className="grid md:grid-cols-[4fr_2fr] gap-5 md:px-32">
          <div className="flex flex-col gap-4">
            <RestaurantInfo restaurant={data.restaurant} />
            <span className="text-2xl font-bold tracking-tight">Menu</span>
            {data.restaurant.menus.map((menu, index) => (
              <Menu
                key={index}
                addToCart={() => addToCart(menu)}
                menu={menu}
              />
            ))}
          </div>
          <div>
            <Card>
              <OrderSummary
                restaurant={data.restaurant}
                cartItems={cartItems}
                removeCartItem={removeCartItem}
              />
              <CardFooter>
                <CheckoutButton
                  disabled={cartItems.length === 0}
                  isLoading={isLoading}
                  onSave={updateUserData}
                  onPay={() => hundlePayment()}
                />
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    );
  }
};

export default DetailsPage;
