const OpenAI = require("openai");

// Initialize OpenAI with OpenRouter API
const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENAI_API_KEY,
});

const VALID_INTENTS = ["INFO", "PRICING", "DEMO", "SUBSCRIBE", "UNKNOWN"];

// Extract clean intent from LLM output
const parseIntent = (raw) => {
  if (!raw) return "UNKNOWN";

  const text = raw.toUpperCase();

  // find any valid intent inside response
  for (const intent of VALID_INTENTS) {
    if (text.includes(intent)) {
      return intent;
    }
  }

  return "UNKNOWN";
};

const classifyIntent = async (message) => {
  try {
    const res = await client.chat.completions.create({
      model: "nvidia/nemotron-3-nano-30b-a3b:free",

      messages: [
        {
          role: "system",
          content: `
You are an intent classifier.

Classify the user message into EXACTLY one of:
INFO, PRICING, DEMO, SUBSCRIBE, UNKNOWN

Rules:
- Return ONLY the intent word
- No sentences
- No explanation
          `,
        },
        {
          role: "user",
          content: message,
        },
      ],

      temperature: 0, //  deterministic output
      max_tokens: 5, //  prevents long responses
    });

    const rawOutput = res.choices?.[0]?.message?.content?.trim();

    return parseIntent(rawOutput);
  } catch (err) {
    console.error("Intent Classification Error:", err.message);
    return "UNKNOWN";
  }
};

module.exports = { classifyIntent };
