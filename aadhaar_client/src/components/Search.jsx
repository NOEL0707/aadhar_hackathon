import {React,useState} from "react";
import "../styles/sendreceive.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Search = () => {
  let [passcodeinp, setPassInp] = useState();
  function post(p) {
    document.getElementById("su").disabled = false;
        axios.post("http://localhost:4444/home/sendrequest", {
          passcode: passcodeinp,
 
        }, {
          headers: {
            "Authorization": "Bearer " + localStorage.getItem("jwt"),
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
          }
      })
      .then((res) => {
        if(res.data==="no landlord found"){
          toast.error("!wrong input")
           document.getElementById("su").disabled = true;
        }
        else if(res.status===200) {
          toast.success("sent request")
          window.location.reload()
        }
      })
      .catch((error) => {
          console.log(error)
      })
  }
  return (
    <div className="searchCodeContainer">
      <input
        className="searchCode"
        type="text"
        id="aadharNo"
        name="aadharNo"
        maxLength="12"
        value={passcodeinp}
        onChange={(e) => {
          setPassInp(e.target.value);
        }}
        required
        placeholder="Enter Passcode to send request"
      />
      <button type="submit" className="submit" id="su" onClick={()=>{post()}}>
        <FontAwesomeIcon icon={faChevronRight} size="3x" />
      </button>
    </div>
  );
};

export default Search;
