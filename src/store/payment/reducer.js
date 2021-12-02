import * as types from "./types";

export const paymentState = {
  amountSelection: "amountSelection",
  passwordAuth: "passwordAuth",
  twoFactorAuth: "twoFactorAuth",
  paymentSuccess: "paymentSuccess",
};

const initialState = {
  paymentState: paymentState.amountSelection,
  errorCounter: 0,
  amount: 0,
  authToken: null,
};

export const paymentReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_AMOUNT: {
      return {
        ...state,
        amount: action.payload.amount,
      };
    }

    case types.PAYMENT_RESET: {
      return initialState;
    }

    case types.PAYMENT_ERROR: {
      return {
        ...state,
        error: action.payload.error,
      };
    }

    case types.SET_STATE: {
      return {
        ...state,
        paymentState: action.payload.state,
      };
    }

    case types.SET_AUTH_TOKEN: {
      return {
        ...state,
        authToken: action.payload.token,
      };
    }

    case types.ERROR_INCREMENT: {
      return {
        ...state,
        errorCounter: state.errorCounter + 1,
      };
    }

    case types.ERROR_RESET: {
      return {
        ...state,
        errorCounter: 0,
        error: null,
      };
    }

    default:
      return state;
  }
};

export default paymentReducer;
