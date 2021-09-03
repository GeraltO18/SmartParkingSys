const Slot = require("../model/slot.model");
const User = require("../model/user.model");

const createCheckIn = async (req, res) => {
  const { userid, vehicle } = req.body;
  const slot = Slot.findOne({ userid: null });
  slot.userid = userid;
  slot.checkin = vehicle.checkin;
  slot.model = vehicle.model;
  slot.save();
};

const checkoutAndBill = async (slotid, checkOutTime) => {
  let slot = await Slot.findById(slotid);
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
  slot.modal = null;
  slot.history.push(update);
  user.save();
  slot.save();
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
