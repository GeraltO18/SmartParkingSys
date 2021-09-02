const Slot = require("../model/slot.model");
const User = require("../model/user.model");

const createCheckIn = async (req, res) => {
  const { userid, model, checkInTime } = req.body;
  const slot = Slot.findOne({ userid: null });
  slot.userid = userid;
  slot.checkin = checkInTime;
  slot.model = model;
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

module.exports = { checkoutAndBill, createCheckIn };
