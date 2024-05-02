import { Order } from "@/types";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";

type Props = {
  order: Order;
};

const OrderStatusDetail = ({ order }: Props) => {
  return (
    <div className="space-y-5">
      <div className="flex flex-col">
        <span className="font-bold">Delivering to:</span>
        <span>{order.user.name}</span>
        <span>
          {order.user.address}, {order.user.city}
        </span>
      </div>
      <div className="flex flex-col">
        <span className="font-bold">Your Order</span>
        {order.menus.map((menu) => {
          if (menu.quantity) {
            return (
              <span className="my-2">
                <Badge variant="outline">{menu.quantity}</Badge>
                {menu.name} : {menu.price * menu.quantity} DH
              </span>
            );
          }
        })}
      </div>
      <Separator />
      <div className="flex flex-col">
        <span className="font-bold">Total</span>
        <span>{order.total_price}</span>
      </div>
    </div>
  );
};

export default OrderStatusDetail;
