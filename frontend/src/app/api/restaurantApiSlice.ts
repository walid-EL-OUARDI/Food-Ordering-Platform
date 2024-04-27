import { apiSlice } from "@/app/api/apiSlice";
import { Restaurant, RestaurantState, getRestaurantsResponse } from "@/types";

const restaurantApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createRestaurant: builder.mutation<RestaurantState, FormData>({
      query: (data) => ({
        url: `add-restaurant`,
        method: "POST",
        body: data,
      }),
    }),
    updateRestaurant: builder.mutation<RestaurantState, FormData>({
      query: (data) => ({
        url: `update-restaurant`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Restaurant"],
    }),
    getUserRestaurant: builder.query<RestaurantState, void>({
      query: () => ({
        url: `get-user-restaurant`,
        method: "GET",
      }),
      providesTags: ["Restaurant"],
    }),
    getRestaurants: builder.query<getRestaurantsResponse, any>({
      query: (data) => ({
        url: `get-restaurants/${data.country}?${data.link}`,
        method: "GET",
      }),
      providesTags: ["Restaurant"],
    }),
    getRestaurantById: builder.query<{ restaurant: Restaurant }, number>({
      query: (restaurantId) => ({
        url: `get-restaurant/${restaurantId}`,
        method: "GET",
      }),
      providesTags: ["Restaurant"],
    }),
  }),
});

export const {
  useCreateRestaurantMutation,
  useGetUserRestaurantQuery,
  useUpdateRestaurantMutation,
  useGetRestaurantsQuery,
  useGetRestaurantByIdQuery,
} = restaurantApiSlice;
