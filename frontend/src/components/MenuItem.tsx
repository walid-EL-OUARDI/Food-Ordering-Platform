import { Menu } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

type Props = {
  menu: Menu;
};
const MenuItem = ({ menu }: Props) => {
  return (
    <Card className="cursor-pointer">
      <CardHeader>
        <CardTitle>{menu.name}</CardTitle>
      </CardHeader>
      <CardContent className="font-bold">{menu.price}</CardContent>
    </Card>
  );
};

export default MenuItem;
