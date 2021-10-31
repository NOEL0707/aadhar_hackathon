const express = require("express");
const app = express();
const { exec } = require("child_process");
const otpapiroute = require("./routes/otprequest");
const passcode = require("./routes/home");
const sentrequests = require("./routes/sentrequests");
const receiverequest = require("./routes/receiverequest");
const otpauthroute = require("./routes/OTPauth");
const ekycroute = require("./routes/ekyc");
const cors = require("cors");
const mongoose = require("mongoose");
// for parsing application/json
app.use(express.json());

//for connecting to mongodb atlas using mongoose.
mongoose
  .connect(
    // "mongodb://localhost:/web_portal",
    `mongodb+srv://summerproject:Red3NvFiYy4NAMr@cluster0.y1pwz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
    // `mongodb+srv://college_portal:Ddik_Uk3.iWh.J4@cluster0.of7zi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
    {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    }
  )
  .then(() => console.log("connected with mongodb........"))
  .catch((err) => console.error("could not connect to mongo db", err));
// for parsing application/xwww-
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

let aadharid = 999988647718;
let txnid = "39672f6a-6cdd-4c55-88d2-f37c27cd4d69";
let otp = 226707;

app.use("/otprequest", otpapiroute);
app.use("/otpauth", otpauthroute);
app.use("/ekyc", ekycroute);
app.use("/home", passcode),
app.use("/sentrequests", sentrequests);
app.use("/receivedrequests", receiverequest);
  // exec(
  //   `java -jar ./authapiclient/target/hackathon-auth-test-1.0-SNAPSHOT-jar-with-dependencies.jar ${aadharid} ${txnid} ${otp}`,
  //   (error, stdout, stderr) => {
  //     if (error) {
  //       console.error(`exec error: ${error}`);
  //       return;
  //     }
  //     console.log(`stdout: ${stdout}`);
  //     console.error(`stderr: ${stderr}`);
  //   }
  // );

  app.listen(4444, () => {
    console.log("Listening on port 4444");
  });
