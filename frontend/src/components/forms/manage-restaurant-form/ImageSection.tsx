import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { getImage, url } from "@/helpres";
import { useFormContext } from "react-hook-form";

const ImageSection = () => {
  const { control, watch } = useFormContext();
  const imageUrl = watch("imageUrl");
  const openFile = (image: File | null) => {
    if (!!image) {
      getImage(image, "output");
    }
    return;
  };

  return (
    <div className="space-y-2">
      <div>
        <h2 className="text-2xl font-bold">Image</h2>
        <FormDescription>
          Add an image that will be displayed on your restaurant listing in the
          search results. Adding a new image will overwrite the existing one.
        </FormDescription>
      </div>
      <div className="flex flex-col gap-5 md:w-[50%]">
        <FormField
          control={control}
          name="imageFile"
          render={({ field }) => (
            <FormItem>
              <FormControl className="bg-white">
                <Input
                  type="file"
                  placeholder="image"
                  accept="jpg,jpeg,png"
                  onChange={(e) => {
                    openFile(e.target.files ? e.target.files[0] : null);
                    field.onChange(e.target.files ? e.target.files[0] : null);
                  }}
                />
              </FormControl>
              <FormMessage className="text-red-600" />
            </FormItem>
          )}
        />
        {imageUrl ? (
          <AspectRatio ratio={16 / 9}>
            <img
              id="output"
              src={url(imageUrl)}
              className="rounded-md object-cover h-full w-full"
            />
          </AspectRatio>
        ) : (
          <AspectRatio ratio={16 / 9}>
            <img
              id="output"
              className="rounded-md object-cover h-full w-full"
            />
          </AspectRatio>
        )}
      </div>
    </div>
  );
};

export default ImageSection;
