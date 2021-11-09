const mongoose = require("mongoose");
const { v4 } = require("uuid");


const userSchema = mongoose.Schema({
  _id: {
    type: String,
    default: v4().toString(),
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  debt: {
    type: Number,
    default: 0,
  },
  history: [
    {
      slot: {
        type: String,
        required: true,
      },
      model: {
        type: String,
        default: null,
      },
      checkin: {
        type: Date,
        required: true,
      },
      checkout: {
        type: Date,
        default: null,
      },
      cost: {
        type: Number,
      },
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
