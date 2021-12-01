import React, { useState } from "react";

export const PaymentAmountSelection = ({ onConfirmAmount }) => {
  const [amount, setAmount] = useState(20);
  return (
    <div style={{ display: "flex", flexDirection: "column", width: "300px" }}>
      <label>Amount</label>
      <input
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        type="number"
      />
      <button
        onClick={() => {
          onConfirmAmount(amount);
        }}
      >
        Confirm
      </button>
    </div>
  );
};
