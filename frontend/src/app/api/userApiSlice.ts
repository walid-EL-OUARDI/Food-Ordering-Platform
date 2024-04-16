import { apiSlice } from "@/app/api/apiSlice";
import {
  User,
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
    updateUserInfo: builder.mutation<UserState, User>({
      query: (data) => ({
        url: `update-user-profile`,
        method: "PUT",
        body:data
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useLogoutMutation, useUpdateUserInfoMutation } =
  userApiSlice;
