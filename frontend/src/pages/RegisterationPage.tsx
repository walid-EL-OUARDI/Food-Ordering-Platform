import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z
  .object({
    name: z.string().min(4).max(15),
    email: z.string().email(),
    password: z.string().min(6).max(16),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password must match",
    path: ["confirmPassword"],
  });

const RegistrationPage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  return (
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
                  <FormLabel className="text-black text-lg">Password</FormLabel>
                  <FormControl className="bg-white">
                    <Input
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
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black text-lg">
                    Password Comfirmation
                  </FormLabel>
                  <FormControl className="bg-white">
                    <Input
                      placeholder="Repeat Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-black" />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default RegistrationPage;
