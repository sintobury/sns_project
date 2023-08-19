import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLogin: false,
  username: '',
  accessToken: '',
  refreshToken: '',
};

const loginSlice = createSlice({
  name: 'loginSlice',
  initialState,
  reducers: {
    login(state, action) {
      const { username, accessToken, refreshToken } = action.payload;
      state.isLogin = true;
      state.username = username;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
    },
    logout(state, action) {
      state.isLogin = false;
      state.username = '';
      state.accessToken = '';
      state.refreshToken = '';
    },
  },
});

export const { login, logout } = loginSlice.actions;
export default loginSlice.reducer;
