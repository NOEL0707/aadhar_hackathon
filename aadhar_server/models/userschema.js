const mongoose = require("mongoose");
const userschema = new mongoose.Schema({
  UID: Number,
  Sent: [
    {
      Status: Number,
      LandlordID: Number,
      LandlordAddress: {
        co: String,
        country: String,
        dist: String,
        house: String,
        loc: String,
        pc: String,
        state: String,
        street: String,
        vtc: String,
      },

      ChangedAddress: {
        co: String,
        country: String,
        dist: String,
        house: String,
        loc: String,
        pc: String,
        state: String,
        street: String,
        vtc: String,
      },
    },
  ],

  Received: [
    {
      Status: Number,
      BearersID: Number,
      ChangedAddress: {
        co: String,
        country: String,
        dist: String,
        house: String,
        loc: String,
        pc: String,
        state: String,
        street: String,
        vtc: String,
      },
      YourAddress: {
        co: String,
        country: String,
        dist: String,
        house: String,
        loc: String,
        pc: String,
        state: String,
        street: String,
        vtc: String,
      },
    },
  ],
});
const User = mongoose.model("UserData", userschema);

module.exports = User;
