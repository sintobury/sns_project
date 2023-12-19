import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isDarkmode: false,
};

const darkmodeSlice = createSlice({
  name: "darkmodeSlice",
  initialState,
  reducers: {
    toggleDarkmode(state) {
      state.isDarkmode = !state.isDarkmode;
    },
  },
});

export const { toggleDarkmode } = darkmodeSlice.actions;
export default darkmodeSlice.reducer;
