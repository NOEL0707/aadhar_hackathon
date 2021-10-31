import React, { useState, useEffect } from "react";
// import Select from "react-select";
import { useHistory } from "react-router";
// import Multiselect from 'multiselect-react-dropdown';
import "../styles/Addform.css";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Teamup_form = (props) => {
  const [co, setco] = useState("");
  const [Houseno, setHouseno] = useState(props.address.house);
  const [street, setStreet] = useState(props.address.street);
  // const [landmark, setLandmark] = useState("");
  const [area, setArea] = useState("");
  const [village, setVillage] = useState(props.address.vtc);
  const [district, setDistrict] = useState(props.address.dist);
  const [state, setState] = useState(props.address.state);
  const [pinCode, setPinCode] = useState(props.address.pc);
  const [country, setCountry] = useState(props.address.country);
  const [btn_disable, setbtn_disable] = useState(false);
  let history = useHistory();

  const HandleInputs = async (event) => {
    setbtn_disable(true);
    event.preventDefault();
    let url = `http://localhost:4444/sentrequests/update`;

      const datatobesent = {
        co:co,
        house: Houseno,
        street: street,
        vtc: village,
        loc: area,
        dist: district,
        state: state,
        pc: pinCode,
        country:country
      };
      console.log(datatobesent);

      const res = await axios.post(url, [props.ID,datatobesent], {
        withCredentials: true,
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("jwt"),
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        }
      });
      console.log(res.status);
      if (res.status === 200) {
        // return <Redirect to="/myposts"/>
        window.location.reload()
      } else {
        setbtn_disable(false);
      }
    
  };
  useEffect(() => {
    if (Houseno.length > 50) {
      alert("Houseno cannot be more than 50 characters");
      setHouseno(Houseno.slice(0, 50));
    }
    if (street.length > 50) {
      alert("street cannot be more than 50 characters");
      setStreet(street.slice(0, 50));
    }
    //address minimal change checking
  }, [Houseno, street, area, village, district, state, pinCode,country]);

  // useEffect(() => {
  //   axios(
  //     {
  //       method: "get",
  //       url: "http://localhost:4444/address/get",
  //     },
  //     {
  //       withCredentials: true,
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //         "Access-Control-Allow-Credentials": true,
  //       },
  //     }
  //   ).then((res) => {
  //     console.log(res);
  //     if (res.data.s === "y") {
  //       console.log("succes");
  //       setHouseno(res.data.houseno);
  //       setLandmark(res.data.landmark);
  //       setVillage(res.data.village);
  //       setArea(res.data.area);
  //       setDistrict(res.data.district);
  //       setPinCode(res.data.pinCode);
  //       setState(res.data.state);
  //       setStreet(res.data.street);
  //     } else {
  //       toast.error("error! reaload the page");
  //       document.getElementById("otpb").disabled = false;
  //       let x = document.getElementsByClassName("otpcontainer");
  //       x[0].style.display = "none";
  //     }
  //   });
  // }, []);

  return (
    <div>
      <form className="Form" onSubmit={HandleInputs}>
        <div className="Title">
          <p>Aadhar Address Update Form</p>
        </div>
        <div className="forminput">
          <label>
            CO<span style={{ color: "red" }}>*</span>
          </label>
          <input
            className="input"
            type="text"
            required
            id="name"
            placeholder=""
            value={co}
            onChange={(e) => setco(e.target.value)}
          ></input>
        </div>
        <div className="forminput">
          <label>
            House No/Bldg/Apt<span style={{ color: "red" }}>*</span>
          </label>
          <input
            className="input"
            type="text"
            required
            id="name"
            placeholder=""
            value={Houseno}
            onChange={(e) => setHouseno(e.target.value)}
          ></input>
        </div>
        <div className="forminput">
          <label>
            Street/Road/Lane<span style={{ color: "red" }}>*</span>
          </label>
          <input
            className="input"
            type="text"
            required
            id="street"
            placeholder="xyz street/colony"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
          ></input>
        </div>

        {/* <div className="forminput">
          <label>
            Landmark<span style={{ color: "red" }}>*</span>
          </label>
          <input
            className="input"
            type="text"
            required
            id="landmark"
            placeholder="near bus stand/near mall"
            value={landmark}
            onChange={(e) => setLandmark(e.target.value)}
          ></input>
        </div> */}

        <div className="forminput">
          <label>
            Area/Locality/Sector<span style={{ color: "red" }}>*</span>
          </label>
          <input
            className="input"
            type="text"
            required
            id="area"
            placeholder="munciplity/mandal"
            value={area}
            onChange={(e) => setArea(e.target.value)}
          ></input>
        </div>

        <div className="forminput">
          <label>
            Village/Town/city<span style={{ color: "red" }}>*</span>
          </label>
          <input
            className="input"
            type="text"
            required
            id="village"
            placeholder=""
            value={village}
            onChange={(e) => setVillage(e.target.value)}
            disabled
          ></input>
        </div>

        <div className="forminput">
          <label>
            District<span style={{ color: "red" }}>*</span>
          </label>
          <input
            className="input"
            type="text"
            required
            id="district"
            placeholder=""
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            disabled
          ></input>
        </div>

        <div className="forminput">
          <label>
            state<span style={{ color: "red" }}>*</span>
          </label>
          <input
            className="input"
            type="text"
            required
            id="state"
            placeholder=""
            value={state}
            onChange={(e) => setState(e.target.value)}
            disabled
          ></input>
        </div>
        <div className="forminput">
          <label>
            country<span style={{ color: "red" }}>*</span>
          </label>
          <input
            className="input"
            type="text"
            required
            id="country"
            placeholder=""
            value={country}
            onChange={(e) => setCountry(e.target.value)}
             disabled
          ></input>
        </div>

        <div className="forminput">
          <label>
            pincode<span style={{ color: "red" }}>*</span>
          </label>
          <input
            className="input"
            type="text"
            required
            id="pincode"
            placeholder=""
            value={pinCode}
            onChange={(e) => setPinCode(e.target.value)}
            disabled
          ></input>
        </div>

        {/* <div className="forminput">
          <label>Description</label>
          <textarea
            rows="5"
            cols="50"
            placeholder="Enter teamup Description"
            value={Description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div> */}
        <div className="btndiv">
          <button className="btn" type="submit" disabled={btn_disable}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Teamup_form;
