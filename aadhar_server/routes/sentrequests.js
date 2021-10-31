const express = require("express");
const app = express();
const userschema = require("../models/userschema");
const router = require("express").Router();
const checkauth = require("./Authcheck.js");

router.get("/", checkauth, (req, res) => {
  let datatobesent = [];
  // console.log(req.user.Sent);
  req.user.Sent.map((landlord) => {
    let data = landlord.Status;
    let uid = "xxxxxxxx" + (""+landlord.LandlordID).slice(-4);
    datatobesent.push({
      _id : landlord._id,
      status: data,
      landlordid: uid,
      ChangedAddress: landlord.ChangedAddress,
      LandlordAddress: landlord.LandlordAddress,
    });
  });
  console.log(datatobesent);
  res.send(datatobesent);
});



router.post("/update",checkauth,(req,res)=>{

  console.log("body is ",req.body);
  let aadharnoBearer;
  for(let i=0;i<req.user.Sent.length;i++){
      if (req.user.Sent[i].id === req.body[0]){
          aadharnoBearer=req.user.Sent[i].LandlordID;
      }
  }
  console.log("aadhaaar no is ",aadharnoBearer);

  async function mypostdelete() {
    const result = await userschema.updateOne(
      { _id: req.user.id, "Sent.LandlordID": aadharnoBearer,},
      {
        $set: {
          "Sent.$.ChangedAddress": req.body[1],
       },
      } 
      )
  }
  mypostdelete();

  
  async function updatedata() {
      const result = await userschema.updateOne(
        { UID: aadharnoBearer, "Received.BearersID": req.user.UID,},
        {
          $set: {
            "Received.$.ChangedAddress": req.body[1],
         },
      } 
   )
   res.send("Updated successfully")
  };
  updatedata();
  
});



module.exports = router;
