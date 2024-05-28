import { Order } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { ORDER_STATUS } from "@/config/order-status-options";

type Props = { order: Order; hundleStatusChange: (status: string) => void };
const OrderItemCard = ({ order, hundleStatusChange }: Props) => {
  const getTime = () => {
    const orderCreatedTime = new Date(order.created_at);
    const hour = orderCreatedTime.getHours();
    const minutes = orderCreatedTime.getMinutes();
    const formatedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${hour} : ${formatedMinutes}`;
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle className="grid md:grid-cols-4 gap-4 justify-between mb-3">
          <div>
            Customer Name:
            <span className="ml-2 font-normal">{order.user.name}</span>
          </div>
          <div>
            Delivery address:
            <span className="ml-2 font-normal">
              {order.user.address}, {order.user.city}
            </span>
          </div>
          <div>
            Time:
            <span className="ml-2 font-normal">{getTime()}</span>
          </div>
          <div>
            Total Cost:
            <span className="ml-2 font-normal">{order.total_price} DH</span>
          </div>
        </CardTitle>
        <Separator />
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          {order.menus.map((menu) => (
            <span>
              <Badge
                variant="outline"
                className="mr-2"
              >
                {menu.quantity}
              </Badge>
              {menu.name}
            </span>
          ))}
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="status">What is the status of this order?</Label>
          <Select
            onValueChange={hundleStatusChange}
            defaultValue={order.status}
          >
            <SelectTrigger
              id="status"
              className="w-[180px]"
            >
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {ORDER_STATUS.map((status) => (
                  <SelectItem value={status.value}>{status.label}</SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderItemCard;
