import React from "react";
import { Provider } from "react-redux";

import configureStore from "./redux";
import { PaymentForm } from "./containers/paymentForm";

function App() {
  const store = configureStore();
  return (
    <Provider store={store}>
      <div className="App">
        <PaymentForm />
      </div>
    </Provider>
  );
}

export default App;
