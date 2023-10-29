import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  usernames: [],
  roomId: "",
  roomName: "",
};

const chatRoomSlice = createSlice({
  name: "chatRoomSlice",
  initialState,
  reducers: {
    setRoom(state, action) {
      const { usernames, roomId, roomName } = action.payload;
      state.roomId = roomId;
      state.usernames = usernames;
      state.roomName = roomName;
    },
  },
});

export const { setRoom } = chatRoomSlice.actions;
export default chatRoomSlice.reducer;
