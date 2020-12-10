import { combineReducers } from "redux";

import { paymentReducer } from "../store/payment/reducer";

export const rootReducer = combineReducers({
  paymentReducer,
});
