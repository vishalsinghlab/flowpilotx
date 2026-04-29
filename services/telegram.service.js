const axios = require("axios");

const TELEGRAM_API = `https://api.telegram.org/bot${process.env.BOT_TOKEN}`;

const sendMessage = async (chatId, text) => {
  await axios.post(`${TELEGRAM_API}/sendMessage`, {
    chat_id: chatId,
    text,
  });
};

module.exports = { sendMessage };
