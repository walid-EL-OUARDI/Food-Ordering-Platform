import { useGetRestaurantOrdersQuery } from "@/app/api/orderApiSlice";
import {
  useCreateRestaurantMutation,
  useGetUserRestaurantQuery,
  useUpdateRestaurantMutation,
} from "@/app/api/restaurantApiSlice";
import { useAppDispatch } from "@/app/hooks/hooks";
import OrderItemCard from "@/components/OrderItemCard";
import ManageRestaurantForm from "@/components/forms/manage-restaurant-form/ManageRestaurantForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { setRestaurantData } from "@/features/restaurant/restaurantSlice";
import { ToastContainer, toast } from "react-toastify";

const ManageRestaurantPage = () => {
  const dispatch = useAppDispatch();
  const { data, isError } = useGetUserRestaurantQuery();
  const { data: userRestaurantOrders } = useGetRestaurantOrdersQuery();
  const [updateRestaurant, { isLoading }] = useUpdateRestaurantMutation();
  const [createRestaurant] = useCreateRestaurantMutation();
  const onSave = async (restaurantData: FormData) => {
    try {
      const res = await createRestaurant(restaurantData).unwrap();
      dispatch(setRestaurantData(res));
      toast.success("Restaurant created successfully");
    } catch (err: any) {
      console.log(err);
      if (err.data.errors) {
        Object.values(err.data.errors).forEach((value: any) => {
          toast.error(value[0]);
        });
      }
    }
  };
  const onUpdate = async (restaurantData: FormData) => {
    try {
      const res = await updateRestaurant(restaurantData).unwrap();
      dispatch(setRestaurantData(res));
      toast.success("Restaurant updated successfully");
    } catch (err: any) {
      console.log(err);
      if (err.data.errors) {
        Object.values(err.data.errors).forEach((value: any) => {
          toast.error(value[0]);
        });
      }
    }
  };

  const hundleStatusChange = (value: string) => {
    console.log(value);
  };
  if (isError) {
    toast.error("Somthing went wrong");
  }

  return (
    <>
      <ToastContainer />
      <Tabs
        defaultValue="orders"
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="manage-restaurant">Manage Restaurant</TabsTrigger>
        </TabsList>
        <TabsContent value="manage-restaurant">
          <ManageRestaurantForm
            title={
              data?.restaurantData ? "Update Restaurant" : "Create Restaurant"
            }
            restaurant={data}
            onSave={data?.restaurantData ? onUpdate : onSave}
            isLoading={isLoading}
          />
        </TabsContent>
        <TabsContent value="orders">
          <h2 className="text-2xl font-bold space-y-10">
            {userRestaurantOrders?.orders.length} active orders
          </h2>
          {userRestaurantOrders?.orders.map((order) => (
            <OrderItemCard
              hundleStatusChange={hundleStatusChange}
              order={order}
            />
          ))}
        </TabsContent>
      </Tabs>
    </>
  );
};

export default ManageRestaurantPage;
