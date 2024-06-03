import { combineReducers, createStore } from "redux";
import accountReducer from "./feature/accounts/accountSlice";
import customerReducer from "./feature/customers/customerSlice";

const rootStore = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

const store = createStore(rootStore);

export default store;
