import React, { useState } from "react";

export const TwofactorAuth = ({ onAuth }) => {
  const [twofactor, setTwofactor] = useState("");
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
          onAuth(twofactor);
        }}
      >
        Authorize
      </button>
    </div>
  );
};
