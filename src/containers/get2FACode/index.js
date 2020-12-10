import React, { useState, useEffect } from "react";
import { fakeServer } from "../../fakeServer";

export const TwoFactor = () => {
  const [code, setCode] = useState("");

  useEffect(() => {
    fakeServer.subscribe2FA(setCode);
    return () => {
      fakeServer.unsubscribe2FA(setCode);
    };
  }, [code]);

  return (
    <div style={{ width: "300px", height: "200px", border: "1px solid red" }}>
      <div>Имитация мобильного 2FA</div>
      <div
        style={{
          width: "calc(100% - 8px)",
          height: "32px",
          border: "1px solid gray",
          margin: "4px",
        }}
      >
        {code}
      </div>
    </div>
  );
};
