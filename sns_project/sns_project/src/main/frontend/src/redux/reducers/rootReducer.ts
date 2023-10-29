import { combineReducers } from "redux";
import openModal from "./openModal";
import loginSlice from "./loginSlice";
import darkmodeSlice from "./darkmode";
import chatRoomSlice from "./chatRoomSlice";

const rootReducer = combineReducers({
  modalSlice: openModal,
  loginSlice: loginSlice,
  darkmodeSlice: darkmodeSlice,
  chatRoomSlice: chatRoomSlice,
});
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
