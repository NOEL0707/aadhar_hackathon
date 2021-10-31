import React from "react";
import { Link } from "react-router-dom";

const Requests = () => {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        border: "1px solid black",
      }}
    >
      <Link to="/sentrequests" style={{ width: "50%" }}>
        <div>sent requests</div>
      </Link>
      <Link to="/receivedrequests" style={{ width: "50%" }}>
        <div> received requests</div>
      </Link>
    </div>
  );
};

export default Requests;
