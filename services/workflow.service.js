const axios = require("axios");

const triggerWorkflow = async (data) => {
  await axios.post(process.env.N8N_WEBHOOK_URL, data);
};

module.exports = { triggerWorkflow };
