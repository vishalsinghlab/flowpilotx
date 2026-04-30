# 🚀 FlowPilotX – AI-Powered DM Automation System (Instagram-style)

FlowPilotX is an **AI-driven DM automation engine** that simulates Instagram Auto-DM workflows using Telegram, Node.js, MongoDB, and n8n.

It combines **rule-based automation + AI intelligence + workflow orchestration** to build scalable, real-world conversational marketing systems.

---

## 📌 Features

- 🤖 DM automation via Telegram (Instagram-style simulation)
- ⚡ Trigger-based messaging (INFO, PRICING, DEMO, etc.)
- 🧠 AI Intent Classification (LLM-powered)
- 💬 Context-aware AI replies (conversation memory)
- 📊 Lead scoring system (behavior-based)
- 🔁 Automated follow-up sequences (n8n workflows)
- 🗄️ MongoDB for persistent user state (CRM-like storage)
- 🔌 API-driven architecture (decoupled services)
- 📧 External integrations (Email / CRM / APIs)

---

## 🏗️ System Architecture

```
User
  ↓
Telegram Bot Webhook
  ↓
Node.js Backend (FlowPilotX)
  ↓
Rule Engine → AI Intent Layer → AI Reply Layer
  ↓
State Manager (MongoDB: user, history, score)
  ↓
Workflow Engine (n8n)
  ↓
External Systems (Email / CRM / APIs)
```

---

## 🧠 Core Engine Design

FlowPilotX uses a **hybrid decision system**:

```
User Input
   ↓
Rule Engine (deterministic)
   ↓
If no match →
   ↓
AI Intent Classifier
   ↓
If intent matched → trigger flow
Else → AI generates reply (with memory)
```

---

## 🚀 Automation Flow Example

### Lead Capture + AI + Follow-up

1. User sends **"INFO"**
2. Bot asks for email
3. User submits email → stored in MongoDB
4. Lead scoring is updated dynamically
5. n8n workflow is triggered:
   - ⏱ 10s → Welcome message
   - ⏱ 1 min → Product intro
   - ⏱ 5 min → Offer message

---

### AI-Based Interaction

User message:

```
"how much does this cost?"
```

Flow:

```
Rule Engine → DEFAULT
→ AI Intent → PRICING
→ Trigger pricing response
```

---

## 📊 Lead Scoring System

User behavior dynamically increases score:

| Action              | Score |
| ------------------- | ----- |
| Mentions "price"    | +10   |
| Mentions "demo"     | +20   |
| Shows buying intent | +30   |

👉 When score > threshold:

- Triggers **HIGH_INTENT_LEAD workflow**
- Sends aggressive conversion messages

---

## 💬 Conversation Memory

- Stores last N messages per user
- AI uses history for context-aware replies
- Enables **natural conversational experience**

---

## ⚙️ Tech Stack

- **Backend:** Node.js, Express
- **Database:** MongoDB, Mongoose
- **Automation:** n8n
- **Messaging:** Telegram Bot API
- **AI Layer:** OpenAI-compatible LLM
- **HTTP Client:** Axios

---

## 📦 Project Structure

```
flowpilotx/
│
├── backend/
│   ├── server.js
│   ├── app.js
│   ├── config/
│   ├── models/
│   ├── services/
│   │   ├── ai.service.js
│   │   ├── ai.intent.js
│   │   ├── leadScore.service.js
│   │   ├── user.service.js
│   │   └── workflow.service.js
│   ├── engine/
│   │   ├── ruleEngine.js
│   │   └── orchestrator.js
│   └── routes/
│
├── n8n-workflows/
│   └── flowpilotx-automation.json
│
├── .env.example
├── package.json
└── README.md
```

---

## 🔗 n8n Workflow

Import workflow from:

```
n8n-workflows/flowpilotx-automation.json
```

### Workflow Handles:

- Lead segmentation (new vs high intent)
- Delayed follow-up sequences
- Telegram messaging via HTTP nodes
- Campaign-style DM automation

---

## 📦 Installation

### 1. Clone repository

```bash
git clone https://github.com/yourusername/flowpilotx.git
cd flowpilotx/backend
```

---

### 2. Install dependencies

```bash
npm install
```

---

### 3. Setup environment variables

Create `.env` file:

```
PORT=3000
MONGO_URI=your_mongodb_url
BOT_TOKEN=your_telegram_bot_token
N8N_WEBHOOK_URL=your_n8n_webhook_url
OPENAI_API_KEY=your_openai_key
DEMO_LINK=your_demo_link
```

---

### 4. Run server

```bash
node server.js
```

---

## 🧪 Testing Flow

### Option 1: Postman

```json
{
  "chatId": "123456789",
  "email": "test@example.com"
}
```

---

### Option 2: Full System

```
Telegram → Backend → n8n → Telegram
```

---

## 🎯 Use Cases

FlowPilotX replicates real-world systems used for:

- Instagram DM automation
- Lead generation funnels
- Conversational marketing
- CRM integrations
- Automated follow-up campaigns

---

## 🧠 Key Concepts Demonstrated

- Hybrid AI + rule-based systems
- Intent classification using LLMs
- Context-aware conversational AI
- Lead scoring & segmentation
- Workflow automation (n8n)
- Event-driven backend architecture
- Webhook-based integrations

---

## 🔮 Future Improvements

- 🤖 AI agent workflows (multi-step reasoning)
- 📊 Admin dashboard (React)
- ⚙️ Redis queue (scalability)
- 📱 Multi-channel (Instagram / WhatsApp)
- 🧠 Intent confidence scoring
- 🏢 Multi-tenant SaaS platform

---

## 👨‍💻 Author

**Vishal Singh**
Full Stack Developer | Backend & AI Systems
GitHub: https://github.com/vishalsinghlab
