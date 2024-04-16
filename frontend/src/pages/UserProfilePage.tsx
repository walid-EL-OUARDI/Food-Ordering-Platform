import UserProfileForm, {
  UserFormData,
} from "@/components/forms/UserProfileForm";
import { useUpdateUserInfoMutation } from "@/app/api/userApiSlice";
import { ToastContainer, toast } from "react-toastify";
import { updateUserCredentials } from "@/features/auth/authSlice";
import { useAppDispatch } from "@/app/hooks/hooks";
const UserProfilePage = () => {
  const [updateUserInfo, { isLoading }] = useUpdateUserInfoMutation();
  const dispatch = useAppDispatch();

  const updateUserData = async (values: UserFormData) => {
    try {
      const res = await updateUserInfo(values).unwrap();
      dispatch(updateUserCredentials(res));
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

  return (
    <>
      <ToastContainer />
      <UserProfileForm
        onSave={updateUserData}
        isLoading={isLoading}
      />
    </>
  );
};

export default UserProfilePage;
