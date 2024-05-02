import { useGetUserOrdersQuery } from "@/app/api/orderApiSlice";
import OrderStatusDetail from "@/components/OrderStatusDetail";
import OrderStatusHeader from "@/components/OrderStatusHeader";
import { url } from "@/helpres";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";

const OrderStatusPage = () => {
  const { data } = useGetUserOrdersQuery();
  if (data?.orders) {
    return (
      <div className="space-y-10">
        {data.orders.map((order) => (
          <div className="bg-gray-50 rounded-lg p-10 space-y-10">
            <OrderStatusHeader order={order} />
            <div className="grid md:grid-cols-2 gap-10">
              <OrderStatusDetail order={order} />
              <AspectRatio ratio={16 / 9}>
                <img
                  src={url(order.restaurant?.image_url || "")}
                  className="rounded-md object-cover h-full w-full"
                />
              </AspectRatio>
            </div>
          </div>
        ))}
      </div>
    );
  }
};

export default OrderStatusPage;
