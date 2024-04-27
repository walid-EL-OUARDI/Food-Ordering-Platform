import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { z } from "zod";
import { FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { useEffect } from "react";

type Props = {
  onSubmit: (formData: SearchForm) => void;
  onReset?: () => void;
  placeHolder: string;
  searchQuery: string;
};

const formSchema = z.object({
  searchQuery: z.string({
    required_error: "restuarant name is required",
  }),
});

export type SearchForm = z.infer<typeof formSchema>;
const SearchBar = ({ onSubmit, placeHolder, onReset, searchQuery }: Props) => {
  const form = useForm<SearchForm>({
    resolver: zodResolver(formSchema),
  });

  const handleReset = () => {
    form.reset({
      searchQuery: "",
    });
    if (onReset) {
      onReset();
    }
  };

  useEffect(() => {
    form.reset({
      searchQuery,
    });
  }, [searchQuery]);
  return (
    <Form {...form}>
      <form
        className={`flex items-center gap-3 justify-between flex-row border-2 rounded-full p-3 ${
          form.formState.errors.searchQuery && "border-red-500"
        }`}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <Search
          strokeWidth={2.5}
          size={30}
          className="ml-1 text-orange-500 hidden md:block"
        />
        <FormField
          control={form.control}
          name="searchQuery"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl className="bg-white">
                <Input
                  {...field}
                  placeholder={placeHolder}
                  className="border-none shadow-none text-xl focus-visible:ring-0"
                />
              </FormControl>
              <FormMessage className="text-red-600" />
            </FormItem>
          )}
        />
        <Button
          onClick={handleReset}
          type="button"
          variant="outline"
          className="rounded-full"
        >
          Reset
        </Button>
        <Button
          type="submit"
          className="rounded-full bg-orange-500"
        >
          Search
        </Button>
      </form>
    </Form>
  );
};

export default SearchBar;
