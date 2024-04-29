import { Menu } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

type Props = {
  menu: Menu;
  addToCart: () => void;
};
const MenuItem = ({ menu, addToCart }: Props) => {
  return (
    <Card
      className="cursor-pointer"
      onClick={addToCart}
    >
      <CardHeader>
        <CardTitle>{menu.name}</CardTitle>
      </CardHeader>
      <CardContent className="font-bold">{menu.price} DH</CardContent>
    </Card>
  );
};

export default MenuItem;
