const { model } = require("mongoose");
const Slot = require("../model/slot.model");
const User = require("../model/user.model");

let costmap = { SUV: 30, Sedan: 20 };
const findcost = (inTime, outTime, model) => {
  return 5 * costmap["SUV"];
};

const createCheckIn = async (req, res) => {
  console.log(req.body);
  const { userid, vehicle } = req.body;
  const slot = await Slot.findOne({ userid: null });
  slot.userid = userid;
  slot.checkin = vehicle.checkin;
  slot.model = vehicle.model;
  await slot.save();
  res.send(slot);
};

const checkoutAndBill = async (slotid, checkOutTime) => {
  console.log(slotid);
  let slot = await Slot.findById(slotid);
  console.log(slot);
  let user = await User.findById(slot.userid);
  let pay = findcost(slot.checkin, checkOutTime, slot.model);
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
  };
  user.history.push(userUpdate);
  user.debt += pay;
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
