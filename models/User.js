const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  chatId: { type: String, unique: true },
  email: String,
  state: { type: String, default: "NEW" },
  lastMessage: String,
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", userSchema);
