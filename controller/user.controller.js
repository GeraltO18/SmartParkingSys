const User = require("../model/user.model");

const getUser = async (id) => {
  const user = await User.findById(id);
  return user;
};

module.exports = { getUser };
