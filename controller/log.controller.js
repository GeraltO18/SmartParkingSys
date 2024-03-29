const { model } = require("mongoose");
const Slot = require("../model/slot.model");
const User = require("../model/user.model");

let costmap = { SUV: 30, Sedan: 20 };
const findcost = (inTime, outTime, model) => {
  let temp1 = new Date(inTime);
  let temp2 = new Date(outTime);
  let diff = temp2 - temp1;
  let mm = Math.floor(diff / 1000 / 60);
  return mm * costmap[model];
};

const createCheckIn = async (req, res) => {
  console.log(req.body);
  const { userid, vehicle } = req.body;
  const slot = await Slot.findOne({ userid: null });
  if (slot != null) {
    slot.userid = userid;
    slot.checkin = vehicle.checkin;
    slot.model = vehicle.model;
    await slot.save();
    res.send(slot);
  } else {
    console.log("Slots are full");
  }
};

const checkoutAndBill = async (slotid, checkOutTime) => {
  let slot = await Slot.findById(slotid);
  let user = await User.findById(slot.userid);
  //console.log(user);
  let pay = findcost(slot.checkin, checkOutTime, slot.model);
  console.log(pay);
  let slotUpdate = {
    userid: slot.userid,
    checkin: slot.checkin,
    checkout: checkOutTime,
  };
  let userUpdate = {
    slot: slotid,
    checkin: slot.checkin,
    checkout: checkOutTime,
    cost: pay,
    model: slot.model,
    usermail: user.email,
  };
  user.history.push(userUpdate);
  //user.debt += pay;
  slot.userid = null;
  slot.checkin = null;
  slot.model = null;
  slot.history.push(slotUpdate);
  await user.save();
  await slot.save();
  return userUpdate;
};

const createSlot = async (req, res) => {
  const slot = await Slot.create(req.body);
  console.log(slot);
  return res.send(slot);
};

const createUser = async (req, res) => {
  const user = await User.create(req.body);
  return res.send(user);
};
module.exports = { checkoutAndBill, createCheckIn, createSlot, createUser };
