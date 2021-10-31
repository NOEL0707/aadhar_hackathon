const express = require("express");
const app = express();
const router = require("express").Router();
const userschema = require("../models/userschema");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/keys");
const checkauth = require("./Authcheck.js");
const https = require("https");
const axios = require("axios");
const { v4: uuidv4 } = require("uuid");
const xml2js = require("xml2js");
let responses = {
  110: "Aadhar Number does not have email ID",
  111: "Aadhar Number does not have mobile number",
  112: "Aadharr Number does not have both email ID and mobile number",
  113: "Aadharr Number doesn't have verified email ID",
  114: "Aadharr Number doesn't have verified Mobile Number",
  115: "Aadharr Number doesn't have verified email and mobile",
  510: "Invalid OTP XML format",
  515: "Invalid VID Number in input",
  517: "Expired VID is used in input",
  520: "Invalid device",
  521: "Invalid mobile number",
  522: "Invalid “type” attribute",
  523: "Invalid ts attribute. Either it is not in correct format or is older  than 20 min.",
  530: "Invalid AUA code.",
  540: "Invalid OTP XML version.",
  542: "AUA not authorized for ASA. This error will be returned if AUA and ASA do not have linking in the portal.",
  543: "Sub-AUA not associated with AUA. This error will be returned if  Sub-AUA specified in “sa” attribute is not added as “Sub-AUA” in portal",
  565: "AUA License key has expired or is invalid",
  566: "ASA license key has expired or is invalid",
  569: "Digital signature verification failed.",
  570: "Invalid key info in digital signature (this means that certificateused for signing the OTP request is not valid – it is either expired, or does not belong to the AUA or is not created by a CA).",
  940: "Unauthorized ASA channel",
  941: "Unspecified ASA channel",
  950: "Could not generate and/or send OTP",
  952: "OTP Flooding error",
  998: "Unknown error",
  200: "OTP sent successfully",
};

router.post("/otp", checkauth, (req, res) => {
  let aadharid = req.body.aadharid;
  let TXNID = uuidv4();
  //console.log(req.body);
  //   let aadharid = 999988887777;
  //   aadharid = 99998864778;
  //   let response;
  console.log("OTP TXN:", TXNID);
  axios(
    {
      method: "post",
      url: "https://stage1.uidai.gov.in/onlineekyc/getOtp/",
      data: {
        uid: `${req.body.aadharid}`,
        vid: "************9999",
        txnId: `${TXNID}`,
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
  )
    .then((response) => {
      console.log(response.data);
      //response = res;
      if (response.data.status == "y" || response.data.status == "Y") {
        res.send({ res: responses[200], txnID: TXNID, stat: 200 });
      } else if (Number(response.errCode) in responses) {
        res.send({ res: responses[Number(response.errCode)], stat: 301 });
      } else {
        res.send({ res: "internal server error", stat: 500 });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/login", checkauth, (req, res) => {
  let aadharid = req.body.aadharid;
  let txnid = req.body.txnid;
  let otp = req.body.otp;
  console.log("EKYC TXN:", txnid);
  // console.log(req.body);
  axios(
    {
      method: "post",
      url: "https://stage1.uidai.gov.in/onlineekyc/getEkyc/",
      data: {
        uid: `${req.body.aadharid}`,
        vid: "************9999",
        txnId: `${req.body.txnid}`,
        otp: req.body.otp,
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
  )
    .then((response) => {
      //console.log(response.data);
      //response = res;
      if (response.data.status == "y" || response.data.status == "Y") {
        //string evaluation
        // XML string to be parsed to JSON
        let kycString = `${response.data.eKycString}`;
        let kycJson;
        let addressObject;
        // convert XML to JSON
        xml2js.parseString(kycString, (err, result) => {
          if (err) {
            throw err;
          }
          //kycJson = JSON.stringify(result, null, 4);
          kycJson = result;
          // log JSON string
          //{ co: 'S/O Balijapelly Kishan',
          // country: 'India',
          // dist: 'Adilabad',
          // house: '6-64',
          // loc: 'Kasipet',
          // pc: '504215',
          // state: 'Andhra Pradesh',
          // street: 'Kasipet',
          // vtc: 'Kasipet' }
          let addressObject = kycJson.KycRes.UidData[0].Poa[0].$;
          // console.log(kycJson.KycRes.UidData[0].Poa[0].$);

          let address = {
           co: addressObject.co,
          country: addressObject.country,
          dist: addressObject.dist,
          house: addressObject.house,
          loc: addressObject.loc,
          pc: addressObject.pc,
          state: addressObject.state,
          street: addressObject.street,
          vtc: addressObject.vtc }
          
          let aadharnoBearer;
          for(let i=0;i<req.user.Received.length;i++){
              if (req.user.Received[i].id === req.body.postid){
                  aadharnoBearer=req.user.Received[i].BearersID;
              }
          }
          console.log("aadhaaar no is ",aadharnoBearer);

          async function updatedata() {
            const result = await userschema.updateOne(
              { UID: aadharnoBearer, "Sent.LandlordID": req.user.UID,"Sent.Status": 0 },
              {
                $set: {
                  "Sent.$.Status": 1,
                  "Sent.$.LandlordAddress":address,
                  
               },
             } 
            )
          };
          updatedata();
          

          async function updatedata2() {
            const result = await userschema.updateOne(
              { _id: req.user.id, "Received.BearersID": aadharnoBearer, "Received.Status": 0 },
              {
                $set: {
                  "Received.$.Status": 1,
                  "Received.$.YourAddress":address,
               },
             } 
            )
            // res.send("Accepted successfully")
          };
          updatedata2();





        });
        res.send({ res: responses[Number(response.errCode)], stat: 200 });
      } else if (Number(response.errCode) in responses) {
        res.send({ res: responses[Number(response.errCode)], stat: 301 });
      } else {
        res.send({ res: "internal server error", stat: 500 });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
