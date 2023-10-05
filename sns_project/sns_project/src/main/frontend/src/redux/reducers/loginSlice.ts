import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogin: false,
  username: "",
};

const loginSlice = createSlice({
  name: "loginSlice",
  initialState,
  reducers: {
    login(state, action) {
      const { username } = action.payload;
      state.isLogin = true;
      state.username = username;
    },
    logout(state) {
      state.isLogin = false;
      state.username = "";
    },
  },
});

export const { login, logout } = loginSlice.actions;
export default loginSlice.reducer;
