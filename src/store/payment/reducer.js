import { PAYMENT_ERROR, PAYMENT_RESET, SET_STATE, SET_AMOUNT } from "./actions";

export const paymentState = {
  amountSelection: "amountSelection",
  passwordAuth: "passwordAuth",
  twoFactorAuth: "twoFactorAuth",
  paymentSuccess: "paymentSuccess",
};

const initialState = {
  paymentState: paymentState.amountSelection,
  error: null,
  amount: 0,
};

export const paymentReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AMOUNT: {
      return {
        ...state,
        amount: action.payload.amount,
      };
    }

    case PAYMENT_RESET: {
      return initialState;
    }

    case PAYMENT_ERROR: {
      return {
        ...state,
        error: action.payload.error,
      };
    }

    case SET_STATE: {
      return {
        ...state,
        paymentState: action.payload.state,
      };
    }

    default:
      return state;
  }
};
