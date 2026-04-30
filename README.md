# 🚀 FlowPilotX – DM Automation System (Instagram-style)

FlowPilotX is a **DM automation engine** that simulates Instagram Auto-DM workflows using Telegram, Node.js, MongoDB, and n8n.

It enables **trigger-based messaging, automated follow-ups, and lead capture pipelines**, similar to modern marketing automation and CRM systems.

---

## 📌 Features

* 🤖 DM automation via Telegram (Instagram-style simulation)
* ⚡ Trigger-based messaging (INFO, PRICING, DEMO, etc.)
* 🔁 Automated follow-up sequences (delay-based workflows via n8n)
* 🧠 Rule-based conversation engine
* 🗄️ MongoDB for persistent user state (CRM-like storage)
* 🔁 Workflow orchestration using n8n
* 📧 Email notifications and external API integrations
* 🔌 Decoupled API-driven backend architecture

---

## 🏗️ System Architecture

```
User
  ↓
Telegram Bot Webhook
  ↓
Node.js Backend (FlowPilotX)
  ↓
Rule Engine + State Manager (MongoDB)
  ↓
n8n Workflow Engine
  ↓
External Systems (Email / CRM / APIs)
```

---

## 🚀 Automation Flow Example

### Lead Capture + Follow-up Sequence

1. User sends **"INFO"**
2. Bot asks for email
3. User submits email → stored in MongoDB
4. n8n workflow is triggered:

   * ⏱ After 10 seconds → Welcome message
   * ⏱ After 60 seconds → Product info / offer
5. User can trigger flows via keywords:

   * **PRICING** → pricing details
   * **DEMO** → booking link

---

## ⚙️ Tech Stack

* **Backend:** Node.js, Express
* **Database:** MongoDB, Mongoose
* **Automation:** n8n
* **Messaging:** Telegram Bot API
* **HTTP Client:** Axios

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
│   ├── engine/
│   └── routes/
│
├── n8n-workflows/
│   └── flowpilotx-lead.json
│
├── .env.example
├── package.json
└── README.md
```

---

## 🧠 Key Capabilities

* Trigger-based DM workflows
* Automated messaging sequences (multi-step flows)
* Lead capture and user state management
* Workflow orchestration using n8n
* API-based integration with external services
* Extensible architecture for multi-channel automation

---

## 🔗 n8n Workflow

Import workflow from:

```
n8n-workflows/flowpilotx-lead.json
```

This workflow handles:

* Lead validation
* Data formatting
* Follow-up automation (delayed messages)
* Email notifications
* External integrations

---

## 📦 Installation

### 1. Clone repository

```bash
git clone https://github.com/yourusername/flowpilotx.git
cd flowpilotx/backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup environment variables

Create a `.env` file:

```
PORT=3000
MONGO_URI=your_mongodb_url
BOT_TOKEN=your_telegram_bot_token
N8N_WEBHOOK_URL=your_n8n_webhook_url
```

### 4. Run server

```bash
node server.js
```

---

## 🎯 Use Case

FlowPilotX replicates how businesses:

* automate Instagram/DM conversations
* capture leads from chat interactions
* run automated follow-up campaigns
* integrate chat systems with CRM tools
* build conversational marketing funnels

---

## 🔮 Future Improvements

* 🤖 AI-powered auto replies (LLM integration)
* 📊 Admin dashboard (React)
* ⚙️ Redis queue for scalability
* 📱 Multi-channel support (Instagram / WhatsApp)
* 🏢 Multi-tenant SaaS architecture

---

## 👨‍💻 Author

**Vishal Singh**
Full Stack Developer | Backend & AI Systems
GitHub: https://github.com/vishalsinghlab
