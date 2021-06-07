import React from "react";
import "./Button.css";

const Button = ({ clicked, children }) => {
  return (
    <React.Fragment>
      <button onClick={clicked}>{children}</button>
    </React.Fragment>
  );
};

export default Button;
