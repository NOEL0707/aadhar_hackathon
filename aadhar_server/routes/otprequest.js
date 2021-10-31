const express = require("express");
const app = express();
const { exec } = require("child_process");
const router = require("express").Router();

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

router.post("/", (req, res) => {
  let aadharid = req.body.aadharid;
  //console.log(req.body);
  //   let aadharid = 999988887777;
  //   aadharid = 99998864778;
  let status = "";
  exec(
    `java -jar ../otpapiclient/target/otpapiclient-1.0-SNAPSHOT-jar-with-dependencies.jar ${aadharid}`,
    (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
      status = stdout.slice(-4, -1);
      //console.log(stdout);
      let txnID = stdout.split(" ")[2].slice(0, -6);
      let status2 = Number(status);
      console.log(status);
      if (status == "ull") {
        res.status(200);
        res.send({ res: responses[200], txnID: txnID, stat: 200 });
      } else if (status2 in responses) {
        console.log("inside else");
        // res.status(status2);
        res.send({ res: responses[status], stat: status2 });
      } else {
        // res.status(500);
        res.send({ res: "internal server error", stat: 500 });
      }
    }
  );
  // res.send("OTP send Successfully");
});

module.exports = router;
