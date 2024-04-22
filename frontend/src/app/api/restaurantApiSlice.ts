import { apiSlice } from "@/app/api/apiSlice";
import {  RestaurantState } from "@/types";

const restaurantApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createRestaurant: builder.mutation<RestaurantState,FormData>({
      query: (data) => ({
        url: `add-restaurant`,
        method: "POST",
        body: data,
      }),
    }),
    updateRestaurant: builder.mutation<RestaurantState,FormData>({
      query: (data) => ({
        url: `update-restaurant`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ['Restaurant'],
    }),
    getUserRestaurant: builder.query<RestaurantState,void>({
      query: () => ({
        url: `get-restaurant`,
        method: "GET",
      }),
      providesTags: ['Restaurant'],
    }),
  }),
});

export const { useCreateRestaurantMutation,useGetUserRestaurantQuery,useUpdateRestaurantMutation } = restaurantApiSlice;
