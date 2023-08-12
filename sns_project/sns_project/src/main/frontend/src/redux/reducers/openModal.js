import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  open: false,
};

const openModal = createSlice({
  name: 'openModal',
  initialState,
  reducers: {
    handleModal(state, action) {
      state.open = action.payload;
    },
  },
});

export const { handleModal } = openModal.actions;
export default openModal.reducer;
