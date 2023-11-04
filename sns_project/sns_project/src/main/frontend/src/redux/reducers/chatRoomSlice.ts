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
    resetRoom(state) {
      state.roomId = "";
      state.roomName = "";
      state.usernames = [];
    },
  },
});

export const { setRoom, resetRoom } = chatRoomSlice.actions;
export default chatRoomSlice.reducer;
