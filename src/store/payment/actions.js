import * as types from "./types";

export const setAmount = (amount) => ({
  type: types.SET_AMOUNT,
  payload: {
    amount,
  },
});

export const setState = (state) => ({
  type: types.SET_STATE,
  payload: {
    state,
  },
});

export const paymentError = (error) => ({
  type: types.PAYMENT_ERROR,
  payload: {
    error,
  },
});

export const errorIncrement = () => ({
  type: types.ERROR_INCREMENT,
});

export const errorReset = () => ({
  type: types.ERROR_RESET,
});

export const paymentReset = (error) => ({
  type: types.PAYMENT_RESET,
  payload: {
    error,
  },
});

export const setAuthToken = (token) => ({
  type: types.SET_AUTH_TOKEN,
  payload: {
    token,
  },
});

export const syncAuthRequest = (credentials) => ({
  type: types.ASYNC_AUTH_REQUEST,
  payload: {
    credentials,
  },
});

export const asyncSend2FACode = (payload) => ({
  type: types.ASYNC_SEND_2FA_CODE,
  payload,
});
