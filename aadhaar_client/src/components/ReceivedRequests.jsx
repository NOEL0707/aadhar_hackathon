import {React,useState,useEffect} from "react";
import Rcard from "./Rcard";
import axios from "axios";
import Loader from "./Loader";
const ReceivedRequests = () => {
  const [loading, setloading] = useState(false)
  const [sentdata, setsentdata] = useState([]);
  const [flag, setflag] = useState(false);
  useEffect(() => {
  setloading(true); //while calling api setting loading state to false.
  axios
    .get(`http://localhost:4444/receivedrequests`, {
      withCredentials: true,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
    })
    .then((res) => {
      if (res.data.length>0) {
        //checking if user is logged in
        setsentdata(res.data);
        console.log(res.data);
        
      } else {
        setflag(true);
      }
      setloading(false);
    });
}, []);
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        // border: "1px solid red",
        justifyContent: "space-between",
        flexWrap: "wrap",
      }}
    >
      <h1 style={{width:"100%",textAlign:"center",margin:"auto",marginTop:"20px"}}>Received Requests</h1>
      {((!loading) && <div style={{margin:"auto"}}>
        {sentdata.map((data) => (
          <Rcard
            key={data._id}
            ID={data._id}
            status={data.status}
            BearersID={data.BearersID}
            landLordAddress={data.LandlordAddress}
            changedAddress={data.ChangedAddress}
          />
        ))}
    </div>)}
    {((flag)&&<h1 style={{width:"100%",marginTop:"20%",textAlign:"center"}}>No Posts to show</h1>)}
    {((loading && !flag)&&<Loader/>)}
    </div>
  );
};

export default ReceivedRequests;
