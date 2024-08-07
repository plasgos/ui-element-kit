import React from "react";

const Input = ({ label, value, onChange, type = "text", placeholder }) => (
  <div className="form-group">
    {label && <label>{label}</label>}
    <input
      value={value || ""}
      onChange={onChange}
      type={type}
      className="form-control"
      placeholder={placeholder}
    />
  </div>
);

export default Input;
