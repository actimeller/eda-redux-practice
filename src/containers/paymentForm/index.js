/* eslint-disable no-underscore-dangle */
import React, { useState } from "react";
import { connect } from "react-redux";
import {
  setState,
  setAmount,
  paymentReset,
  paymentError,
} from "../../store/payment/actions";
import { PaymentAmountSelection } from "../../components/paymentAmountSelection";
import { paymentState as PaymentState } from "../../store/payment/reducer";
import { TwoFactor } from "../get2FACode";
import { PasswordAuth } from "../../components/passwordAuth";
import { TwofactorAuth } from "../../components/twofactorAuth";
import { fakeServer } from "../../fakeServer";

const PaymentForm_ = ({
  paymentState,
  reset,
  setAmount,
  error,
  setState,
  onError,
  clearError,
  amount,
}) => {
  const [errors, setErrors] = useState(0);
  const [token, setToken] = useState("");

  const onSetAmount = (amount) => {
    setAmount(amount);
    setState(PaymentState.passwordAuth);
  };

  const onAuthorize = (name, password) => {
    const response = fakeServer.authorize(name, password);
    response
      .then((data) => {
        setToken(data);
        setState(PaymentState.twoFactorAuth);
        setErrors(0);
        clearError();
      })
      .catch((e) => {
        if (errors > 4) {
          onError("Failed auth. Reseting form");
          setTimeout(() => {
            reset();
          }, 2000);
        } else {
          onError(e);
          setErrors(errors + 1);
        }
      });
  };

  const onTwofactorAuth = (code) => {
    const response = fakeServer.send2FACode(code, token);
    response.then((status) => {
      if (status === "success") {
        setState(PaymentState.paymentSuccess);
        setErrors(0);
        clearError();
      } else if (errors > 4) {
        onError("Failed 2FA. Going back to password auth");
        setTimeout(() => {
          setState(PaymentState.passwordAuth);
          setErrors(0);
          clearError();
        }, 2000);
      } else {
        onError(status);
        setErrors(errors + 1);
      }
    });
  };

  return (
    <>
      <div style={{ display: "flex", width: "800px" }}>
        {paymentState === PaymentState.amountSelection ? (
          <PaymentAmountSelection onConfirmAmount={onSetAmount} />
        ) : null}
        {paymentState === PaymentState.passwordAuth ? (
          <PasswordAuth onAuth={onAuthorize} />
        ) : null}
        {paymentState === PaymentState.twoFactorAuth ? (
          <>
            <TwofactorAuth onAuth={onTwofactorAuth} />
            <TwoFactor />
          </>
        ) : null}
        {paymentState === PaymentState.paymentSuccess ? (
          <div style={{ color: "green" }}>
            Success! You paid {amount} of something for nothing!{" "}
            <button onClick={reset}>Restart</button>
          </div>
        ) : null}
      </div>
      {error ? <div style={{ color: "red" }}>{error}</div> : null}
    </>
  );
};

const mapStateToProps = (state) => ({
  paymentState: state.paymentReducer.paymentState,
  error: state.paymentReducer.error,
  amount: state.paymentReducer.amount,
});

const mapDispatchToProps = (dispatch) => {
  return {
    setState: (state) => dispatch(setState(state)),
    setAmount: (amount) => dispatch(setAmount(amount)),
    reset: () => dispatch(paymentReset()),
    onError: (error) => dispatch(paymentError(error)),
    clearError: () => dispatch(paymentError(null)),
  };
};

export const PaymentForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentForm_);
