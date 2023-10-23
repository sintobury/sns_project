import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogin: false,
  username: "",
  id: 0,
};

const loginSlice = createSlice({
  name: "loginSlice",
  initialState,
  reducers: {
    login(state, action) {
      const { username, id } = action.payload;
      state.isLogin = true;
      state.username = username;
      state.id = id;
    },
    logout(state) {
      state.isLogin = false;
      state.username = "";
      state.id = 0;
    },
  },
});

export const { login, logout } = loginSlice.actions;
export default loginSlice.reducer;
