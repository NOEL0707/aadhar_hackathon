const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/keys");
const mongoose = require("mongoose");
const User = require("../models/userschema");

module.exports = (req, res, next) => {
  const authorization = req.headers.authorization;
  //authorization === Bearer ewefwegwrherhe
  // let authorization = req.body.Authorization;
  // console.log("request", req.headers);
  if (!authorization) {
    return res.send("notloggedin");
  }
  const token = authorization.replace("Bearer ", "");
  jwt.verify(token, JWT_SECRET, (err, payload) => {
    if (err) {
      return res.send("notloggedin");
    }
    const { _id } = payload;
    User.findById(_id).then((userdata) => {
      req.user = userdata;
      next();
    });
  });
};
