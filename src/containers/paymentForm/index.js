/* eslint-disable no-underscore-dangle */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { paymentReset } from "../../store/payment/actions";
import { PaymentAmountSelection } from "../../components/paymentAmountSelection";
import { paymentState as PaymentState } from "../../store/payment/reducer";
import { TwoFactor } from "../get2FACode";
import { PasswordAuth } from "../../components/passwordAuth";
import { TwofactorAuth } from "../../components/twofactorAuth";

export const PaymentForm = () => {
  const dispatch = useDispatch();

  const { paymentState, error, amount } = useSelector(
    (state) => state.paymentReducer
  );

  return (
    <>
      <div style={{ display: "flex", width: "800px" }}>
        {paymentState === PaymentState.amountSelection ? (
          <PaymentAmountSelection />
        ) : null}
        {paymentState === PaymentState.passwordAuth ? <PasswordAuth /> : null}
        {paymentState === PaymentState.twoFactorAuth ? (
          <>
            <TwofactorAuth />
            <TwoFactor />
          </>
        ) : null}
        {paymentState === PaymentState.paymentSuccess ? (
          <div style={{ color: "green" }}>
            Success! You paid {amount} of something for nothing!{" "}
            <button onClick={() => dispatch(paymentReset())}>Restart</button>
          </div>
        ) : null}
      </div>
      {error ? <div style={{ color: "red" }}>{error}</div> : null}
    </>
  );
};
