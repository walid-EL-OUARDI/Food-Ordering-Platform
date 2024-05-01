import { Order } from "@/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
type OrderState = {
  order: Order;
};
const initialState: OrderState = {
  order: {} as Order,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrder: (state, action: PayloadAction<OrderState>) => {
      state.order = action.payload?.order;
    },
    deleteOrder: (state) => {
      state.order = {} as Order;
    },
  },
});

export const { setOrder, deleteOrder } = orderSlice.actions;
export default orderSlice.reducer;
