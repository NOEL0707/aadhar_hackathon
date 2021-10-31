import React from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css";
import { useHistory } from "react-router-dom";
import Login from "./Login";
const Navbar = () => {
  let history=useHistory();
  const myFunction = function () {
    var x = document.getElementsByClassName("links");
    var y = document.getElementsByClassName("lines");
    if (x[0].style.display === "none") {
      x[0].style.display = "flex";
      y[0].style.backgroundColor = "rgba(1,1,1,0.5)";
      x[0].style.maxHeight = "300px";
      x[0].style.animation = "mymove 1s ";
    } else {
      x[0].style.maxHeight = "0px";
      x[0].style.animation = "mymove1 0.3s ";
      x[0].style.display = "none";
      y[0].style.backgroundColor = "";
    }
  };
  window.addEventListener("resize", function (event) {
    if (window.innerWidth >= 768) {
      var x = document.getElementsByClassName("links");
      if (x[0].style.display !== "flex") {
        x[0].style.display = "flex";
      }
    }
  });
  window.addEventListener("resize", function (event) {
    if (window.innerWidth <= 768) {
      var x = document.getElementsByClassName("links");
      if (x[0].style.display === "flex") {
        x[0].style.display = "none";
      }
    }
  });

  return (
    <nav className="navbar">
      <div className="logo">
        <img
          src={"https://uidai.gov.in/images/logo/aadhaar_english_logo.svg"}
          alt=""
          style={{
            marginLeft: "0px",
            width: "60px",
            height: "60px",
            borderRadius: "50%",
          }}
        />
        <span style={{ textAlign: "center", color: "#686868" }}>Aadhar</span>
      </div>
      <ul className="links">
        <Link to="/home">
          <li className="link">Home</li>
        </Link>
        {((localStorage.getItem("jwt")===null)&&<Link to="/login">
          <li className="link">Login</li>
        </Link>)}
        {((localStorage.getItem("jwt")!==null)&&<ul>
            <li className="link"
              onClick={()=>{
                localStorage.clear()
                history.push('/login')
                window.location.reload(); 
              }}
              >
                Logout
            </li>
        </ul>)}
        <Link to="/sentrequests">
          <li className="link">Sent Requests</li>
        </Link>
        <Link to="/receivedrequests">
          <li className="link">Received Requests</li>
        </Link>
      </ul>
      <div className="lines" onClick={myFunction}>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>
    </nav>
  );
};

export default Navbar;
