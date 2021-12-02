import { all } from "redux-saga/effects";
import { userWatcher } from "./paymentSaga";

export function* rootWatcher() {
  yield all([userWatcher()]);
}
