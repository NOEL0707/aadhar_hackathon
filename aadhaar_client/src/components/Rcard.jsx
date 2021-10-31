import { React, useState } from "react";
import "../styles/Scard.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEdit } from "@fortawesome/free-solid-svg-icons";
import Ekycform from "./Ekycform";
import { toast } from "react-toastify";
import axios from "axios";
const Rcard = (props) => {
  const [form, setform] = useState(false);
  const [status, setstatus] = useState(props.status);
  const[addr,setAddr]=useState(false)
  function reject() {
    document.getElementById("rej").disable=true;
    axios.post("http://localhost:4444/receivedrequests/reject", {
          postid:props.ID
      }, {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("jwt"),
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        }
    })
    .then((res) => {
        console.log(res);
        if (res.status === 200) {
            toast.success("Rejected")
            window.location.reload()
        } else {
          document.getElementById("rej").disable=false;
            toast.success("not Rejected")
        }
    })
    .catch((error) => {
        console.log(error)
    })
    console.log(props.key)
  }
  return (
    <div className="sbox">
      <div className="scard">
        <div className="cbox" style={{ height: "100px" }}>
          <p> {props.BearersID} is requesting the address</p>
        </div>
        <div className="cbox" style={{ marginTop: "auto", height: "50px" }}>
           {(status===0) && (<button className="btn reject" id="rej" onClick={()=> reject()} >
            <span>Reject</span>
          </button>)}
          {(status===-1) && (<button className="btn reject" style={{background:"red"}}>
            <span>Rejected</span>
          </button>)}
          {((status===0) && <button
            className="btn edit"
            onClick={() => {
              setform(!form);
              // setAddr(!addr);
            }}
            style={{ fontSize: "small" }}
          >
            <span>Accept</span>
          </button>)}
          {((status===1) && <button
            className="btn edit"
            onClick={() => {
              setAddr(!addr)
            }}
            style={{ fontSize: "small" }}
          >
            <span>See More</span>
          </button>)}
        </div>
        {form && <Ekycform status={props.status} landLordAddress={props.landLordAddress} changedaddress={props.changedAddress} ID={props.ID}/>}
      {(((props.status===1) && addr) && 
        <div style={{width:"100%",height:"400px"}}>
          <div style={{width:"100%",height:"150px",padding:"20px"}}>
            <h3 style={{color:"gray"}}>Your Address</h3>
            <p  >{props.landLordAddress.pn}</p>
            <p className="add">{props.landLordAddress.house}</p>
            <p className="add">{props.landLordAddress.street}</p>
            <p className="add">{props.landLordAddress.loc}</p>
            
            <p className="add">{props.landLordAddress.dist}</p>
            <p className="add">{props.landLordAddress.state}</p>
            <p className="add">{props.landLordAddress.country}</p>
            <p className="add">{props.landLordAddress.pc}</p>
          </div>
        
          {((JSON.stringify(props.changedAddress)!==JSON.stringify({})) && <div style={{width:"100%",height:"150px",padding:"20px"}}>
            <h3 style={{color:"gray"}}>consent's Address</h3>
            <p className="add">{props.changedAddress.house}</p>
            <p className="add">{props.changedAddress.street}</p>
            <p className="add">{props.changedAddress.loc}</p>
            <p className="add">{props.changedAddress.vtc}</p>
            <p className="add">{props.changedAddress.dist}</p>
            <p className="add">{props.changedAddress.state}</p>
            <p className="add">{props.changedAddress.country}</p>
            <p className="add">{props.changedAddress.pc}</p>
          </div>)}
            {((JSON.stringify(props.changedAddress)===JSON.stringify({})) && <div style={{width:"100%",height:"150px",padding:"20px"}}>
            <h3 style={{color:"gray"}}>consent's Address</h3>
                <p  >User did not Change</p>
          </div>)}
      </div>)}
      </div>
    </div>
  );
};

export default Rcard;
