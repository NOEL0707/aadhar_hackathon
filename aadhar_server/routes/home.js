const express = require("express");
const app = express();
const userschema = require("../models/userschema");
const { exec } = require("child_process");
const router = require("express").Router();
const checkauth = require("./Authcheck.js");

router.get("/getpasscode", checkauth, (req, res) => {
  let passcode = req.user.UID;
  console.log(passcode);
  res.send({ passcode: passcode });
});

router.post("/sendrequest", checkauth, (req, res) => {
  let getlandlorddata = {};
  let getlandlord = async () => {
    getlandlorddata = await userschema.findOne({
      UID: req.body.passcode,
    });
    //console.log("get post data", getpostdata);
    if (getlandlorddata == null) {
      res.send("no landlord found");
    }
    else{
      saving();
    }
  };
  getlandlord();

  // const data = {
  //   status: 0,
  //   LandlordID: req.body.aadharid,
  //   LandlordAddress: {},
  //   ChangedAddress: {},
  // };

  async function saving() {
    // console.log(mypostarray);
    const saveddata = await userschema.updateOne(
      { _id: req.user.id },
      {
        $push: {
          Sent: {
            Status: 0,
            LandlordID: req.body.passcode,
            LandlordAddress: {},
            ChangedAddress: {},
          },
        },
      }
    );
    const saveddatal = await userschema.updateOne(
      { UID : req.body.passcode },
      {
        $push: {
          Received: {
            Status: 0,
            BearersID: req.user.UID,
            ChangedAddress: {},
            YourAddress: {},
          },
        },
      }
    );
    res.sendStatus(200);
  }
  
});

// // router.get("/", checkauth, (req, res) => {
// //   async function getdata() {
// //     const data = await teamupschema.find({
// //       Type: 1,
// //       User_Id: { $ne: req.user.id },
// //     });
// //     let datatobesent = [];
// //     const reqArray = req.user.Myrequests;
// //     for (let i = 0; i < data.length; i++) {
// //       flag = true;
// //       for (let j = 0; j < reqArray.length; j++) {
// //         if (data[i].id == reqArray[j].Post_id) {
// //           flag = false;
// //           break;
// //         }
// //       }
// //       if (flag == true) datatobesent.push(data[i]);
// //     }
// //     // console.log(datatobesent);
// //     // console.log(data);
// //     res.send(datatobesent);
// //   }
// //   getdata();
// // });

module.exports = router;
