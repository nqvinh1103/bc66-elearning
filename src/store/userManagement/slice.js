import { createSlice } from "@reduxjs/toolkit";
import { storage } from "utils";

const initialState = {
  userLogin: storage.get("userLogin") || null,
  accessToken: storage.get("accessToken"),
};

const userManagementSlice = createSlice({
  name: "userManagement",
  initialState,
  reducers: {
    login: (state, { payload }) => {
      storage.save("accessToken", payload?.accessToken);
      state.accessToken = payload.accessToken;
      state.userLogin = payload;
    },
  },
});
export const {
  actions: userManagementActions,
  reducer: userManagementReducer,
} = userManagementSlice;
