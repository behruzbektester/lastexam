import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuth: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isAuth = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuth = true;
    },
    isAuthReady: (state) => {
      state.isAuth = true;
    },
  },
});

export const { login, logout, isAuthReady } = userSlice.actions;
export default userSlice.reducer;
