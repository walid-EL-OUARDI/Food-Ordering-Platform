import { Restaurant, RestaurantState } from "@/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: RestaurantState = {
  restaurantData: {} as Restaurant,
};

const restaurantSlice = createSlice({
  name: "restaurant",
  initialState,
  reducers: {
    setRestaurantData: (state, action: PayloadAction<RestaurantState>) => {
      state.restaurantData = action.payload?.restaurantData;
    },
    deleteRestaurant: (state) => {
      state.restaurantData = {} as Restaurant;
    },
  },
});

export const { setRestaurantData,deleteRestaurant } = restaurantSlice.actions;
export default restaurantSlice.reducer;
