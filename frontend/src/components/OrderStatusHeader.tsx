import { Order } from "@/types";
import { Progress } from "./ui/progress";
import { ORDER_STATUS } from "@/config/order-status-options";

type Props = {
  order: Order;
};
const OrderStatusHeader = ({ order }: Props) => {
  const getExpectedDelivery = () => {
    if (order.restaurant) {
      const created = new Date(order.created_at);
      created.setMinutes(
        created.getMinutes() + order.restaurant?.estimated_delivery_time
      );
      const hour = created.getHours();
      const minutes = created.getMinutes();
      const formatedMinutes = minutes < 10 ? `0${minutes}` : minutes;
      return `${hour} : ${formatedMinutes}`;
    }
  };

  const getOrderStatusInfo = () => {
    return ORDER_STATUS.find((o) => o.value === order.status) || ORDER_STATUS[0];
  };
  return (
    <>
      <h1 className="text-4xl flex flex-col md:flex-row md:justify-between md:items-center gap-5 font-bold tracking-tighter">
        <span>Order status : {getOrderStatusInfo().label}</span>
        <span>Expected by : {getExpectedDelivery()}</span>
      </h1>
      <Progress value={getOrderStatusInfo().progressValue} />
    </>
  );
};

export default OrderStatusHeader;
