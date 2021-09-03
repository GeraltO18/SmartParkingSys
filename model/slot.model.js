const mongoose = require("mongoose");
const { v4 } = require("uuid");

const slotSchema = mongoose.Schema({
  _id: {
    type: String,
    default: v4().toString(),
  },
  slotname: {
    type: String,
    required: true,
    unique: true,
  },
  model: {
    type: String,
    default: null,
  },
  userid: {
    type: String,
    default: null,
  },
  checkin: {
    type: Date,
    default: null,
  },
  history: [
    {
      userid: {
        type: String,
        ref: "User",
      },
      checkin: {
        type: Date,
      },
      checkout: {
        type: Date,
      },
    },
  ],
});

module.exports = mongoose.model("Slot", slotSchema);
