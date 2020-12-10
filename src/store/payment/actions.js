export const SET_AMOUNT = "SET_AMOUNT";

export const setAmount = (amount) => ({
  type: SET_AMOUNT,
  payload: {
    amount,
  },
});

export const SET_STATE = "SET_STATE";

export const setState = (state) => ({
  type: SET_STATE,
  payload: {
    state,
  },
});

export const PAYMENT_ERROR = "PAYMENT_ERROR";
export const paymentError = (error) => ({
  type: PAYMENT_ERROR,
  payload: {
    error,
  },
});

export const PAYMENT_RESET = "PAYMENT_RESET";

export const paymentReset = (error) => ({
  type: PAYMENT_RESET,
  payload: {
    error,
  },
});
