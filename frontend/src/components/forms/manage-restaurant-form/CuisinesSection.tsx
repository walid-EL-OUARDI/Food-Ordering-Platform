import {
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { cuisineList } from "@/config/restaurant-cuisines-options";
import { useFormContext } from "react-hook-form";
import CuisineCheckbox from "./CuisineCheckbox";

function CuisinesSection() {
  const { control } = useFormContext();
  return (
    <div className="space-y-2">
      <div>
        <h2 className="text-2xl font-bold">Cuisines</h2>
        <FormDescription>
          Select the cuisines that your restaurant serves
        </FormDescription>
      </div>
      <FormField
        control={control}
        name="cuisines"
        render={({ field }) => (
          <FormItem>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-1">
              {cuisineList.map((cuisineItem) => (
                <div key={cuisineItem}>
                  <CuisineCheckbox
                    cuisine={cuisineItem}
                    field={field}
                  />
                </div>
              ))}
            </div>
            <FormMessage className="text-red-600" />
          </FormItem>
        )}
      />
    </div>
  );
}

export default CuisinesSection;
