const User = require("../models/User");

const updateLeadScore = async (user, text) => {
  let score = user.leadScore || 0;

  const msg = text.toLowerCase();

  if (msg.includes("price")) score += 10;
  if (msg.includes("demo")) score += 20;
  if (msg.includes("buy")) score += 30;
  if (msg.includes("interested")) score += 15;

  await User.updateOne({ chatId: user.chatId }, { leadScore: score });

  return score;
};

module.exports = { updateLeadScore };
