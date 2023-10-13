import { combineReducers } from "redux";
import openModal from "./openModal";
import loginSlice from "./loginSlice";
import darkmodeSlice from "./darkmode";

const rootReducer = combineReducers({
  modalSlice: openModal,
  loginSlice: loginSlice,
  darkmodeSlice: darkmodeSlice,
});
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
