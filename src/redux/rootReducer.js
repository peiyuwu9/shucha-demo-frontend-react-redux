import { combineReducers } from "redux";
import dataReducers from "./data/dataReducers";
import uiReducers from "./ui/uiReducers";
import userReducers from "./user/userReducers";

const rootReducer = combineReducers({
  data: dataReducers,
  ui: uiReducers,
  user: userReducers,
});

export default rootReducer;
