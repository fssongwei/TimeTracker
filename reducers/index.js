import { combineReducers } from "redux";
import timerReducer from "./timerReducer";
import recordReducer from "./recordReducer";

export default combineReducers({
  timers: timerReducer,
  records: recordReducer,
});
