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

const formSchema = z.object({
  email: z.string().min(2).max(15).email(),
  password: z.string().min(6).max(16),
});

const LoginPage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="bg-orange-500 p-4 rounded-md max-w-[400px] w-[400px] ">
        <h1 className="text-center text-3xl font-bold mb-4">Log in</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
          >
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
                  <FormMessage className="text-black"/>
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

export default LoginPage;
