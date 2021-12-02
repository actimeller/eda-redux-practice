import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  syncAuthRequest,
  errorReset,
  paymentError,
  setState,
} from "../../store/payment/actions";
import { paymentState as PaymentState } from "../../store/payment/reducer";

export const PasswordAuth = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const { errorCounter } = useSelector((state) => state.paymentReducer);

  const dispatch = useDispatch();

  const onAuth = () => {
    dispatch(syncAuthRequest({ name, password }));
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
      <label>Name</label>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        type="text"
      />
      <label>Password</label>
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
      />
      <button
        onClick={() => {
          onAuth(name, password);
        }}
      >
        Authorize
      </button>
    </div>
  );
};
