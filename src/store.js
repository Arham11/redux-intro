import { applyMiddleware, combineReducers, createStore } from "redux";
import accountReducer from "./feature/accounts/accountSlice";
import customerReducer from "./feature/customers/customerSlice";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

// composeWithDevTools for redux chrome extension devtool
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
