const OpenAI = require("openai");

// Initialize OpenAI with OpenRouter API
const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENAI_API_KEY,
});

//  build conversation history safely
const buildMessages = (message, user) => {
  const history = user.conversation?.slice(-6) || [];

  return [
    {
      role: "system",
      content: `
You are a DM automation assistant for FlowPilotX.

Goals:
- Help user understand product
- Guide user to share email
- Keep responses short (1-2 lines)
- Be conversational, not robotic

Rules:
- No long paragraphs
- No technical jargon
- Always move conversation forward
      `,
    },
    ...history.map((h) => ({
      role: h.role,
      content: h.content,
    })),
    {
      role: "user",
      content: message,
    },
  ];
};

//  sanitize output
const cleanReply = (text) => {
  if (!text) return null;

  let reply = text.trim();

  // remove excessive newlines
  reply = reply.replace(/\n+/g, "\n");

  // limit length (safety)
  if (reply.length > 300) {
    reply = reply.slice(0, 300) + "...";
  }

  return reply;
};

const generateReply = async (message, user) => {
  try {
    const messages = buildMessages(message, user);

    const response = await client.chat.completions.create({
      model: "nvidia/nemotron-3-nano-30b-a3b:free",

      messages,

      temperature: 0.7, //  slight creativity but controlled
      max_tokens: 100, //  prevent long replies
    });

    const raw = response.choices?.[0]?.message?.content;

    const reply = cleanReply(raw);

    return reply || "🤖 Try typing INFO to get started.";
  } catch (err) {
    console.error("AI Error:", err.message);

    return "🤖 Sorry, I couldn't process that. Try INFO.";
  }
};

module.exports = { generateReply };
