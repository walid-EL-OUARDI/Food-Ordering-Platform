import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useRegisterMutation } from "../features/auth/userApiSlice";
import { setCredentials } from "../features/auth/authSlice";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/app/hooks/hooks";
import { ToastContainer, toast } from "react-toastify";

const formSchema = z
  .object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().max(16),
    password_confirmation: z.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Password must match",
    path: ["password_confirmation"],
  });

const RegistrationPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [register] = useRegisterMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // console.log(values);
    try {
      const res = await register(values).unwrap();
      dispatch(setCredentials({ ...res, isAuthenticated: true }));
      navigate("/");
      console.log(res);
    } catch (res: any) {
      if (res.data.errors) {
        Object.values(res.data.errors).forEach((value: any) => {
          toast.error(value[0]);
        });
      }
      if (res.data.message) {
        toast.error(res.data.message);
      }
    }
  };
  return (
    <>
      <ToastContainer />
      <div className="w-full h-screen flex justify-center items-center">
        <div className="bg-orange-500 p-4 rounded-md max-w-[400px] w-[400px] ">
          <h1 className="text-center text-3xl font-bold mb-4">Registration</h1>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8"
            >
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
                    <FormMessage className="text-black" />
                  </FormItem>
                )}
              />
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
                    <FormMessage className="text-black" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black text-lg">
                      Password
                    </FormLabel>
                    <FormControl className="bg-white">
                      <Input
                        type="password"
                        placeholder="Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-black" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password_confirmation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black text-lg">
                      Password Comfirmation
                    </FormLabel>
                    <FormControl className="bg-white">
                      <Input
                        type="password"
                        placeholder="Repeat Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-black" />
                  </FormItem>
                )}
              />
              <div className="flex flex-col gap-2 ">
                <Link to="/login">Already have an account?</Link>
                <Button type="submit">Register</Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
};

export default RegistrationPage;
