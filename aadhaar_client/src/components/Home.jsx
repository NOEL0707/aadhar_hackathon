import React, { useState } from "react";
import "../styles/sendreceive.css";
import Search from "./Search";
import Passcode from "./Passcode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { faArrowAltCircleDown } from "@fortawesome/free-solid-svg-icons";
import Loader from "./Loader.js";
import axios from "axios";
export const SendReceive = () => {
  const [search, setSearch] = useState(false);
  const [passcode, setPasscode] = useState(false);
  const [loading,setloading]=useState(false)
  function searcht(params) {
    setPasscode(false);
    setSearch(true);
    document.getElementById("s").style.backgroundColor = "red";
    document.getElementById("r").style.backgroundColor = "cornflowerblue";

  }
  function passcodet(params) {
    setPasscode(true);
    setSearch(false);
    document.getElementById("r").style.backgroundColor = "red";
    document.getElementById("s").style.backgroundColor = "cornflowerblue";
    setloading(true)
      axios
      .get(`http://localhost:4444/home/getpasscode`, {
        withCredentials: true,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
      .then((res) => {
        setloading(false);
        // console.log(res)
        setPasscode(res.data.passcode)
      });
  }
  return (
    <div className="containerSR">
       <div className="searchCodeContainer">
        {(search && !loading) && <Search />}
        {(passcode && !loading) && <Passcode passcode={passcode} />}
        {loading && (<Loader/>)}
      </div>
      
      <div className="sendReceiveContainer">
        <button className="srButton" id="s" onClick={() => searcht()}>
          <FontAwesomeIcon icon={faPaperPlane} size="2x" />
        </button>
        <button className="srButton" id="r" onClick={() => passcodet()}>
          <FontAwesomeIcon icon={faArrowAltCircleDown} size="3x" />
        </button>
      </div>
    </div>
  );
};
