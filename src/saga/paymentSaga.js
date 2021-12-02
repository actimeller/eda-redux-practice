import { put, takeEvery } from "redux-saga/effects";
import {
  setAuthToken,
  setState,
  errorIncrement,
  errorReset,
  paymentError,
} from "../store/payment/actions";

import {
  ASYNC_AUTH_REQUEST,
  ASYNC_SEND_2FA_CODE,
} from "../store/payment/types";

import { fakeServer } from "../fakeServer";
import { paymentState as PaymentState } from "../store/payment/reducer";

function* authRequestWorker(props) {
  const { name, password } = props.payload.credentials;

  try {
    yield put(paymentError());
    const response = yield fakeServer.authorize(name, password);
    yield put(setAuthToken(response));
    yield put(setState(PaymentState.twoFactorAuth));
    yield put(errorReset());
  } catch (error) {
    yield put(errorIncrement());
    yield put(paymentError(error));
  }
}

function* asyncSend2FACodeWorker(props) {
  const { code, token } = props.payload;
  try {
    yield put(paymentError());
    const response = yield fakeServer.send2FACode(code, token);
    if (response === "success") {
      yield put(setState(PaymentState.paymentSuccess));
      yield put(errorReset());
    } else {
      yield put(errorIncrement());
      yield put(paymentError(response));
    }
  } catch (error) {
    yield put(errorIncrement());
    yield put(paymentError(error));
  }
}

export function* userWatcher() {
  yield takeEvery(ASYNC_AUTH_REQUEST, authRequestWorker);
  yield takeEvery(ASYNC_SEND_2FA_CODE, asyncSend2FACodeWorker);
}
