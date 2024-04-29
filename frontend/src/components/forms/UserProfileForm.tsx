import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import LoadingButton from "../LoadingButton";
import { Button } from "../ui/button";
import { useAppSelector } from "@/app/hooks/hooks";

export type UserFormData = z.infer<typeof formSchema>;
const formSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1, "name is required"),
  address: z.string().min(1, "Address Line 1 is required"),
  city: z.string().min(1, "City is required"),
  country: z.string().min(1, "Country is required"),
});

type Props = {
  onSave: (userProfileData: UserFormData) => void;
  isLoading: boolean;
  title?: string;
};

const UserProfileForm = ({ onSave, isLoading, title = "submit" }: Props) => {
  const currentUser = useAppSelector((state) => state.auth.clientData);
  const form = useForm<UserFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: currentUser,
  });

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSave)}
          className="space-y-8"
        >
          <div>
            <h2 className="text-2xl font-bold">User Profile Form</h2>
            <FormDescription>
              View and change your profile information here
            </FormDescription>
          </div>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black text-lg ">Email</FormLabel>
                <FormControl className="bg-white">
                  <Input
                    type="email"
                    placeholder="Email"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-600" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black text-lg ">Name</FormLabel>
                <FormControl className="bg-white">
                  <Input
                    placeholder="Name"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-600" />
              </FormItem>
            )}
          />
          <div className="flex gap-4 flex-col md:flex-row ">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="text-black text-lg">Address</FormLabel>
                  <FormControl className="bg-white">
                    <Input
                      placeholder="address Line 1"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="text-black text-lg">Country</FormLabel>
                  <FormControl className="bg-white">
                    <Input
                      placeholder="Country"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="text-black text-lg">City</FormLabel>
                  <FormControl className="bg-white">
                    <Input
                      placeholder="Repeat Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />
          </div>
          {isLoading ? (
            <LoadingButton />
          ) : (
            <Button
              type="submit"
              className="bg-orange-500"
            >
              {title}
            </Button>
          )}
        </form>
      </Form>
    </>
  );
};

export default UserProfileForm;
