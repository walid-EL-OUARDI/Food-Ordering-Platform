import { Order } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
type OrderState = {
  order: Order[];
};
const initialState: OrderState = {
  order: [],
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
});

export const {} = ordersSlice.actions;
export default ordersSlice.reducer;
