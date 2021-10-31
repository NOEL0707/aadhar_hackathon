const express = require("express");
const app = express();
const { exec } = require("child_process");
const router = require("express").Router();
const User = require("../models/userschema");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/keys");
const checkauth = require("./Authcheck.js");

router.post("/", (req, res) => {
  let aadharid = req.body.aadharid;
  let txnid = req.body.txnid;
  let otp = req.body.otp;
  // console.log(req.body);
  exec(
    `java -jar ../authapiclient/target/hackathon-auth-test-1.0-SNAPSHOT-jar-with-dependencies.jar ${aadharid} ${txnid} ${otp}`,
    (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
      //console.error(`stderr: ${stderr}`);
      console.log(`sssss: ${stdout.slice(-4, -1)}`);
      let status = stdout.slice(-3, -1).trim();
      console.log(status);
      if (status === "y") {
        const data = new User({
          UID: req.body.aadharid,
        });
        //User logged in
        async function createorfind() {
          const finduser = await User.findOne({
            UID: req.body.aadharid,
          });
          // console.log("find user: ",finduser)
          let token;
          if (finduser == null) {
            //If first time a user logged in
            const result = await data.save(); //save him to database
            token = jwt.sign({ _id: result }, JWT_SECRET); //sign JWT using secret key
            console.log("printing result", result);
          } else {
            //If not the 1st time
            token = jwt.sign({ _id: finduser.id }, JWT_SECRET); //
            console.log(finduser);
            console.log("inside else");
            //audit logs
          }
          res.send({ t: token, s: status });
        }
        createorfind();
        console.log("inside if condition");
      } else {
        res.send({ s: status });
      }
    }
  );
});
router.get("/checkauth", checkauth, (req, res) => {
  console.log(req.user);
  res.send("loggedin");
});

module.exports = router;
