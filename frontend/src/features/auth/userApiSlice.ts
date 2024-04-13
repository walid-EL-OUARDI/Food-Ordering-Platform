import { apiSlice } from "@/app/api/apiSlice";
import {
  UserLoginCredentials,
  UserRegisterCredentials,
  UserState,
} from "@/types";

const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<UserState, UserRegisterCredentials>({
      query: (data) => ({
        url: `register`,
        method: "POST",
        body: data,
      }),
    }),
    login: builder.mutation<UserState, UserLoginCredentials>({
      query: (data) => ({
        url: `login`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation<any, void>({
      query: () => ({
        url: `logout`,
        method: "POST",
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useLogoutMutation } =
  userApiSlice;
