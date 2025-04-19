import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  status: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.accessToken = action.payload.access_token;
      state.refreshToken = action.payload.refresh_token;
      state.status = true;

      // Simpan ke cookies
      Cookies.set("accessToken", action.payload.access_token, { expires: 1 }); // expired 1 hari
      Cookies.set("refreshToken", action.payload.refresh_token, { expires: 7 }); // expired 7 hari
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.status = false;

      // Hapus dari cookies
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
