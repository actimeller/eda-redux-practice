import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  asyncSend2FACode,
  paymentError,
  errorReset,
  setState,
} from "../../store/payment/actions";
import { paymentState as PaymentState } from "../../store/payment/reducer";

export const TwofactorAuth = () => {
  const [twofactor, setTwofactor] = useState("");
  const { authToken, errorCounter } = useSelector(
    (state) => state.paymentReducer
  );
  const dispatch = useDispatch();

  const onAuth = () => {
    dispatch(asyncSend2FACode({ code: twofactor, token: authToken }));
  };

  useEffect(() => {
    if (errorCounter > 4) {
      dispatch(paymentError("Failed auth. Reseting form"));

      setTimeout(() => {
        dispatch(errorReset());
        dispatch(setState(PaymentState.amountSelection));
      }, 2000);
    }
  }, [errorCounter, dispatch]);

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "300px" }}>
      <label>Code</label>
      <input
        value={twofactor}
        onChange={(e) => setTwofactor(e.target.value)}
        type="text"
      />
      <button
        onClick={() => {
          onAuth();
        }}
      >
        Authorize
      </button>
    </div>
  );
};
