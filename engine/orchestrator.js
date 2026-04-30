const { sendMessage } = require("../services/telegram.service");
const { updateUser, addMessageToHistory } = require("../services/user.service");
const { triggerWorkflow } = require("../services/workflow.service");
const { processRules } = require("./ruleEngine");
const { generateReply } = require("../services/ai.service");
const { classifyIntent } = require("../services/ai.intent");
const { updateLeadScore } = require("../services/leadScore.service");

const orchestrate = async (user, text) => {
  try {
    // =========================
    // 1. STORE USER MESSAGE
    // =========================
    await addMessageToHistory(user.chatId, "user", text);

    // =========================
    // 2. UPDATE LEAD SCORE (ALWAYS)
    // =========================
    const score = await updateLeadScore(user, text);

    // =========================
    // 3. RULE ENGINE
    // =========================
    let result = processRules(user, text);

    // =========================
    // 4. AI INTENT LAYER (FIXED)
    // =========================
    if (result.action === "DEFAULT") {
      const intent = await classifyIntent(text);

      if (intent === "PRICING") {
        result = { action: "PRICING" };
      } else if (intent === "DEMO") {
        result = { action: "DEMO" };
      } else if (intent === "INFO") {
        result = { action: "ASK_EMAIL", state: "WAITING_EMAIL" };
      }
    }

    let reply = "";

    // =========================
    // 5. ACTION HANDLER
    // =========================
    switch (result.action) {
      case "ASK_EMAIL":
        await updateUser(user.chatId, {
          state: result.state,
          lastMessage: text,
        });

        reply = "👋 Welcome! Please share your email to get started.";
        break;

      case "SUBSCRIBE":
        await updateUser(user.chatId, {
          state: result.state,
          email: result.email,
          lastMessage: text,
        });

        reply = "✅ You're subscribed! We'll send you updates shortly 🚀";

        // trigger main workflow (NEW LEAD FLOW)
        await triggerWorkflow({
          email: result.email,
          chatId: user.chatId,
          segment: "new_lead",
        });
        break;

      case "PRICING":
        reply =
          "💰 Our pricing starts at $10/month.\nReply DEMO to see it in action.";
        break;

      case "DEMO":
        reply = `🎯 Book a demo here: ${process.env.DEMO_LINK}`;
        break;

      case "INVALID_EMAIL":
        reply = "❌ That doesn't look like a valid email. Please try again.";
        break;

      default:
        // =========================
        // 6. AI FALLBACK
        // =========================
        reply = await generateReply(text, user);
    }

    // =========================
    // 7. SEND REPLY
    // =========================
    await sendMessage(user.chatId, reply);

    // =========================
    // 8. STORE BOT RESPONSE (FIXED)
    // =========================
    if (reply) {
      await addMessageToHistory(user.chatId, "assistant", reply);
    }

    // =========================
    // 9. HIGH INTENT WORKFLOW
    // =========================
    if (score > 30) {
      await triggerWorkflow({
        chatId: user.chatId,
        type: "HIGH_INTENT_LEAD",
      });
    }
  } catch (err) {
    console.error("❌ Orchestration Error:", err);

    await sendMessage(
      user.chatId,
      "⚠️ Something went wrong. Please try again.",
    );
  }
};

module.exports = { orchestrate };
