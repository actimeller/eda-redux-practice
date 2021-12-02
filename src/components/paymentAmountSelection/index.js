import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setState, setAmount } from "../../store/payment/actions";
import { paymentState } from "../../store/payment/reducer";

export const PaymentAmountSelection = () => {
  const [amountValue, setAmountValue] = useState();
  const dispatch = useDispatch();

  const onConfirmAmount = () => {
    dispatch(setAmount(amountValue));
    dispatch(setState(paymentState.passwordAuth));
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", width: "300px" }}>
      <label>Amount</label>
      <input
        value={amountValue}
        onChange={(e) => setAmountValue(e.target.value)}
        type="number"
      />
      <button
        onClick={() => {
          onConfirmAmount();
        }}
      >
        Confirm
      </button>
    </div>
  );
};
