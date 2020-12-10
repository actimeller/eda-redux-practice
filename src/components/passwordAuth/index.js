import React, { useState } from "react";

export const PasswordAuth = ({ onAuth }) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
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
