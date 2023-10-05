import { combineReducers } from "redux";
import openModal from "./openModal";
import loginSlice from "./loginSlice";

const rootReducer = combineReducers({
  modalSlice: openModal,
  loginSlice: loginSlice,
});
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
