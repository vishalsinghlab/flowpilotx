const express = require("express");
const connectDB = require("./config/db");

const { getOrCreateUser } = require("./services/user.service");
const { orchestrate } = require("./engine/orchestrator");
const User = require("./models/User");

const app = express();
app.use(express.json());

connectDB();

const processedUpdates = new Set();

app.post("/webhook", async (req, res) => {
  const updateId = req.body.update_id;
  const message = req.body.message;

  if (!message || !message.text) return res.sendStatus(200);

  if (processedUpdates.has(updateId)) return res.sendStatus(200);
  processedUpdates.add(updateId);

  const chatId = message.chat.id;
  const text = message.text;

  const user = await getOrCreateUser(chatId);

  await orchestrate(user, text);

  res.sendStatus(200);
});

app.post("/store-lead", async (req, res) => {
  const { chatId, email, status } = req.body;

  if (!chatId) {
    return res.status(400).json({ error: "chatId missing" });
  }

  await User.updateOne(
    { chatId },
    { $set: { email, updatedAt: new Date(), state: status || "new_lead" } },
    { upsert: true },
  );

  res.json({ success: true });
});

app.listen(3000, () => {
  console.log("FlowPilotX running");
});
