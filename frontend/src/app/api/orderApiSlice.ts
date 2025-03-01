import { CartItem } from "@/pages/DetailsPage";
import { apiSlice } from "./apiSlice";
import { Order } from "@/types";

const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    storeOrder: builder.mutation<
      { order: Order },
      { restaurantId: string; cartItems: CartItem[] }
    >({
      query: (data) => ({
        url: `store-order`,
        method: "POST",
        body: data,
      }),
    }),
    payOrder: builder.mutation<{ token: string }, string>({
      query: (orderId) => ({
        url: `pay-order/${orderId}`,
        method: "POST",
      }),
    }),
    markOrderAsPaid: builder.mutation<{ order: Order }, string>({
      query: (orderId) => ({
        url: `mark-order-aspaid/${orderId}`,
        method: "POST",
      }),
    }),
    getUserOrders: builder.query<{ orders: Order[] }, void>({
      query: () => ({
        url: `get-user-orders`,
        method: "GET",
      }),
    }),
    getRestaurantOrders: builder.query<{ orders: Order[] }, void>({
      query: () => ({
        url: `get-restaurant-orders`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useStoreOrderMutation,
  usePayOrderMutation,
  useMarkOrderAsPaidMutation,
  useGetUserOrdersQuery,
  useGetRestaurantOrdersQuery
} = userApiSlice;
