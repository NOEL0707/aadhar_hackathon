const express = require("express");
const app = express();
const userschema = require("../models/userschema");
const router = require("express").Router();
const checkauth = require("./Authcheck.js");

router.get("/", checkauth, (req, res) => {
  let datatobesent = [];
  console.log(req.user.Received);
  req.user.Received.map((landlord) => {
    let data = landlord.Status;
    let uid = "xxxxxxxx" + (""+landlord.BearersID).slice(-4);
    datatobesent.push({ 
      _id: landlord.id,    
      status: data,
      BearersID: uid,
      ChangedAddress: landlord.ChangedAddress,
      LandlordAddress: landlord.YourAddress,
    });
  });
  console.log(datatobesent);
  res.send(datatobesent);
});

router.post("/reject",checkauth,(req,res)=>{

    let aadharnoBearer;
    for(let i=0;i<req.user.Received.length;i++){
        if (req.user.Received[i].id === req.body.postid){
            aadharnoBearer=req.user.Received[i].BearersID;
        }
    }
    console.log("aadhaaar no is ",aadharnoBearer);

    async function mypostdelete() {
        const result = await userschema.updateOne(
          { _id: req.user.id },
          {
            $pull: {
              Received: { _id: req.body.postid},
            },
          }
        );
    }
    mypostdelete();

    
    async function updatedata() {
        const result = await userschema.updateOne(
          { UID: aadharnoBearer, "Sent.LandlordID": req.user.UID,"Sent.Status": 0 },
          {
            $set: {
              "Sent.$.Status": -1,
           },
        } 
    )
    res.send("rejected successfully")
   };
    updatedata();
    
});










module.exports = router;
