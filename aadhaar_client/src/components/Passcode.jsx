import React from "react";

const Passcode = (props) => {
  return (
    <div className="searchCodeContainer">
      <p style={{ textAlign: "center" }}>
        <span style={{ fontSize: "xx-large" }}>Your passcode is</span>
        <br />
        <span style={{ fontSize: "large", margin: "auto" }}>{props.passcode}</span>
      </p>
    </div>
  );
};

export default Passcode;
