import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { ControllerRenderProps, FieldValues } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
type Props = {
  cuisine: string;
  field: ControllerRenderProps<FieldValues, "cuisines">;
};

const CuisineCheckbox = ({ cuisine, field }: Props) => {
  return (
    <FormItem className="flex flex-row items-center space-x-1 space-y-0 mt-2">
      <FormControl>
        <Checkbox
          checked={field.value?.includes(cuisine)}
          onCheckedChange={(checked) => {
            return checked
              ? field.onChange([...field.value, cuisine])
              : field.onChange(
                  field.value?.filter((value: string) => value !== cuisine)
                );
          }}
        />
      </FormControl>
      <FormLabel className="text-sm font-normal">{cuisine}</FormLabel>
    </FormItem>
  );
};

export default CuisineCheckbox;
