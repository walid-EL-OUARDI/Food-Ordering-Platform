import {
  useCreateRestaurantMutation,
  useGetUserRestaurantQuery,
  useUpdateRestaurantMutation,
} from "@/app/api/restaurantApiSlice";
import { useAppDispatch } from "@/app/hooks/hooks";
import ManageRestaurantForm from "@/components/forms/manage-restaurant-form/ManageRestaurantForm";
import { setRestaurantData } from "@/features/restaurant/restaurantSlice";
import { ToastContainer, toast } from "react-toastify";

const ManageRestaurantPage = () => {
  const dispatch = useAppDispatch();
  const { data, isError } = useGetUserRestaurantQuery();
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
  if (isError) {
    toast.error("Somthing went wrong");
  }
  
  return (
    <>
      <ToastContainer />
      <ManageRestaurantForm
        title={data?.restaurantData ? "Update Restaurant" : "Create Restaurant"}
        restaurant={data}
        onSave={data?.restaurantData ? onUpdate : onSave}
        isLoading={isLoading}
      />
    </>
  );
};

export default ManageRestaurantPage;
