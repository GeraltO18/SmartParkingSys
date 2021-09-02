const mongoose = require("mongoose");
const { v4 } = require("uuid");

const setAmount = (val) => (val / 100).toFixed(2);
const getAmount = (val) => val * 100;

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
    set: setAmount,
    get: getAmount,
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
        set: setAmount,
        get: getAmount,
      },
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
