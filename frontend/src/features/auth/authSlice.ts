import { User, UserState } from "@/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: UserState = {
  clientData: localStorage.getItem("user_info")
    ? JSON.parse(localStorage.getItem("user_info") as string)
    : ({} as User),
  token: localStorage.getItem("user_token")
    ? localStorage.getItem("user_token")
    : undefined,
  isAuthenticated: Boolean(localStorage.getItem("isAuthenticated")),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<UserState>) => {
      state.clientData = action.payload.clientData;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      localStorage.setItem(
        "user_info",
        JSON.stringify(action.payload.clientData)
      );
      localStorage.setItem("user_token", JSON.stringify(action.payload.token));
      localStorage.setItem(
        "isAuthenticated",
        JSON.stringify(action.payload.isAuthenticated)
      );
    },
    updateUserCredentials: (state, action: PayloadAction<UserState>) => {
      state.clientData = action.payload.clientData;
      localStorage.setItem(
        "user_info",
        JSON.stringify(action.payload.clientData)
      );
    },
    logoutUser: (state) => {
      localStorage.clear();
      state.clientData = {} as User;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setCredentials, logoutUser, updateUserCredentials } =
  authSlice.actions;
export default authSlice.reducer;
