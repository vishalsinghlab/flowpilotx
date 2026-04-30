const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  chatId: { type: String, unique: true },
  email: String,
  state: { type: String, default: "NEW" },
  lastMessage: String,
  updatedAt: { type: Date, default: Date.now },
  conversation: [
    {
      role: String, // "user" | "assistant"
      content: String,
      timestamp: { type: Date, default: Date.now },
    },
  ],
  leadScore: { type: Number, default: 0 },
});

module.exports = mongoose.model("User", userSchema);
