import React, { useState } from "react";
import "../styles/loginpage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSync } from "@fortawesome/free-solid-svg-icons";

const CaptchaComponent = (props) => {
  console.log(props.captchaValue);
  return (
    <div className="captchaBox">
      <div className="captchaImageBox">
        <img className="captchaImage" src={props.captchaImg} alt="Captcha" />
        <FontAwesomeIcon
          style={{ width: "10%", cursor: "pointer" }}
          icon={faSync}
          size="2x"
        />
      </div>
      <div className="inputBox">
        <span className="inputName">Captcha</span>
        <input
          className="captchaText"
          type="text"
          id="aadharNo"
          name="aadharNo"
          value={props.captchaValue}
          required
          placeholder="Enter captcha "
          onChange={(e) => {
            props.setcaptchaValue(e.target.value);
          }}
        />
      </div>
    </div>
  );
};
