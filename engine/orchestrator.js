const { sendMessage } = require("../services/telegram.service");
const { updateUser } = require("../services/user.service");
const { triggerWorkflow } = require("../services/workflow.service");
const { processRules } = require("./ruleEngine");

const orchestrate = async (user, text) => {
  const result = processRules(user, text);

  switch (result.action) {
    case "ASK_EMAIL":
      await updateUser(user.chatId, { state: result.state });
      await sendMessage(user.chatId, "Send your email to subscribe.");
      break;

    case "SUBSCRIBE":
      await updateUser(user.chatId, {
        state: result.state,
        email: result.email,
      });

      await sendMessage(user.chatId, "Thanks! We saved your email 🚀");

      await triggerWorkflow({
        email: result.email,
        chatId: user.chatId,
      });
      break;

    default:
      await sendMessage(user.chatId, "Send INFO to start.");
  }
};

module.exports = { orchestrate };
