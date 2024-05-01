import { createSlice } from "@reduxjs/toolkit";
type PaymentState = {
  ycPay: any;
};
const initialState: PaymentState = {
  ycPay: null,
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    setycPay: (state) => {
      state.ycPay = new YCPay(import.meta.env.VITE_PUBLIC_KEY, {
        formContainer: "#payment-container",
        locale: "en",
        isSandbox: true,
        errorContainer: "#error-container",
      });
      state.ycPay.renderAvailableGateways(["CashPlus", "CreditCard"]);
    },
    deleteycPay: (state) => {
      state.ycPay = null;
    },
  },
});

export const { setycPay, deleteycPay } = paymentSlice.actions;
export default paymentSlice.reducer;
