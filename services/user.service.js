const User = require("../models/User");

const getOrCreateUser = async (chatId) => {
  let user = await User.findOne({ chatId });

  if (!user) {
    user = await User.create({ chatId, state: "NEW" });
  }

  return user;
};

const updateUser = async (chatId, data) => {
  return await User.findOneAndUpdate({ chatId }, { $set: data }, { new: true });
};

module.exports = { getOrCreateUser, updateUser };
