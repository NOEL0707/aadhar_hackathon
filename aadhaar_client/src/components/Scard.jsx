import { React, useState } from "react";
import "../styles/Scard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import Teamup_form from "./AddressForm";
const Scard = (props) => {
  const [form, setform] = useState(false);
  const [status,setstatus]=useState(props.status)
  return (
    <div className="sbox">
      <div className="scard">
          <button className="btn status" style={{background:"whitesmoke"}}>
            <FontAwesomeIcon icon={faCircle} size="1x" />
            <span>   status : </span>
            {(status===0) && (
                <span>Pending</span>
            )}
            {(status===-1) && (
                <span>Rejected</span>
            )}
            {(status===1) && (
                <span>Accepted</span>
            )}
          </button>
        <div className="cbox" style={{ height: "100px" }}>

          <p>You have requested <b>"{props.landLordID}"</b> to send the address</p>
        </div>
        <div className="cbox" style={{ marginTop: "auto", height: "50px" }}>
          {((status===1)&&<button
            className="btn edit"
            onClick={() => {
              setform(!form);
            }}
          >
            <FontAwesomeIcon icon={faEdit} size="1x" />

            <span>Edit</span>
          </button>)}
          
        </div>
        {form && <Teamup_form ID={props.ID} address={props.landLordAddress}/>}
      </div>
    </div>
  );
};

export default Scard;
