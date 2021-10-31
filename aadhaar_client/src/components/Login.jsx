import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "../styles/loginpage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSync } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();
const Login = () => {
  let [aadharuid, setAadharuid] = useState("");
  let [captchaValue, setcaptchaValue] = useState("");
  let [checkBox, setCheckBox] = useState(false);
  let [otpvalue, setotpvalue] = useState("");
  let [txnid, settxnid] = useState("");
  let history = useHistory();

  function aadharNoCheck() {
    var d = [
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      [1, 2, 3, 4, 0, 6, 7, 8, 9, 5],
      [2, 3, 4, 0, 1, 7, 8, 9, 5, 6],
      [3, 4, 0, 1, 2, 8, 9, 5, 6, 7],
      [4, 0, 1, 2, 3, 9, 5, 6, 7, 8],
      [5, 9, 8, 7, 6, 0, 4, 3, 2, 1],
      [6, 5, 9, 8, 7, 1, 0, 4, 3, 2],
      [7, 6, 5, 9, 8, 2, 1, 0, 4, 3],
      [8, 7, 6, 5, 9, 3, 2, 1, 0, 4],
      [9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
    ];
    var p = [
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      [1, 5, 7, 6, 2, 8, 3, 0, 9, 4],
      [5, 8, 0, 3, 7, 9, 6, 1, 4, 2],
      [8, 9, 1, 6, 0, 4, 3, 5, 2, 7],
      [9, 4, 5, 3, 1, 2, 6, 8, 7, 0],
      [4, 2, 8, 6, 5, 7, 3, 9, 0, 1],
      [2, 7, 9, 3, 8, 0, 6, 4, 1, 5],
      [7, 0, 4, 6, 9, 1, 3, 2, 5, 8],
    ];
    // console.log(aadharuid);
    var uidNumber = Number(aadharuid);
    if (isNaN(uidNumber)) {
      return false;
    }
    var c = 0;
    var invertedArray = uidNumber.toString().split("").map(Number).reverse();

    for (var i = 0; i < invertedArray.length; i++) {
      c = d[c][p[i % 8][invertedArray[i]]];
    }

    return c === 0 && aadharuid.length === 12;
  }

  function getOTP() {
    if (!aadharNoCheck()) {
      alert("Invalid Aaadhar Number");
      return;
    } else if (checkBox === false) {
      alert("Please provide your consent");
      return;
    } else {
      document.getElementById("otpb").disabled = true;
      //make a api request here
      axios(
        {
          method: "post",
          url: "http://localhost:4444/otprequest",
          data: {
            aadharid: aadharuid,
          },
        },
        {
          withCredentials: true,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
          },
        }
      ).then((res) => {
        console.log(res);

        if (res.data.stat === 200) {
          toast.success(res.data.res);
          let x = document.getElementsByClassName("otpcontainer");
          x[0].style.display = "flex";
          settxnid(res.data.txnID);
        } else {
          toast.error(res.data.res);
          document.getElementById("otpb").disabled = false;
        }
      });
    }
  }

  function authOTP() {
    axios(
      {
        method: "post",
        url: "http://localhost:4444/otpauth",
        data: {
          aadharid: aadharuid,
          otp: otpvalue,
          txnid: txnid,
        },
      },
      {
        withCredentials: true,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      }
    ).then((res) => {
      console.log(res);
      if (res.data.s === "y") {
        console.log("succes");
        toast.success("Logged in succesfully!");
        localStorage.setItem("jwt", res.data.t);
        history.push("/home");
        window.location.reload(); 
      } else {
        toast.error("error!");
        document.getElementById("otpb").disabled = false;
        let x = document.getElementsByClassName("otpcontainer");
        x[0].style.display = "none";
      }
    });
  }

  return (
    <div className="container">
      <div className="logincontainer">
        <div className="header">
          <img
            src="https://uidai.gov.in/images/logo/aadhaar_english_logo.svg"
            alt="Aadhaar Logo"
          />
          <h4 style={{ textAlign: "center", fontSize: "large", color: "red" }}>
            Login Page
          </h4>
        </div>
        <div className="inputBox">
          <span className="inputName">Aadhar Number</span>
          <input
            className="uidText"
            type="text"
            id="aadharNo"
            name="aadharNo"
            maxLength="12"
            value={aadharuid}
            onChange={(e) => {
              setAadharuid(e.target.value);
            }}
            required
            placeholder="Enter Aaadhar Number or VID"
          />
        </div>

        <div className="consentBox">
          <input
            style={{
              width: "20px",
              height: "20px",
              alignSelf: "center",
              marginLeft: "25px",
              cursor: "pointer",
            }}
            type="checkbox"
            id="vehicle1"
            name="vehicle1"
            value="Bike"
            onChange={(e) => {
              setCheckBox(!checkBox);
            }}
          />
          <span style={{ width: "80%" }}>
            Please provide consent for using Aadhaar OTP Authentication
          </span>
        </div>
        <button
          type="submit"
          onClick={() => {
            getOTP();
          }}
          className="otpbutton"
          id="otpb"
        >
          Generate OTP
        </button>
        <div className="otpcontainer">
          <span className="inputName" style={{ marginLeft: "25px" }}>
            OTP
          </span>
          <div className="inputBox">
            <input
              className="captchaText"
              type="text"
              id="aadharNo"
              name="aadharNo"
              value={otpvalue}
              onChange={(e) => setotpvalue(e.target.value)}
              required
              placeholder="Enter OTP "
              style={{ marginLeft: "0px" }}
            />
          </div>
          <button
            type="submit"
            onClick={() => {
              authOTP();
            }}
            className="otpbutton"
            style={{ marginTop: "45px" }}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
