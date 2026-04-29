# PROJECT STRUCTURE

flowpilotx/
│
├── backend/
│ ├── server.js
│ ├── app.js
│ ├── config/
│ ├── models/
│ ├── services/
│ ├── engine/
│ └── routes/
│
├── n8n-workflows/
│ └── flowpilotx-lead.json
│
├── .env.example
├── package.json
└── README.md

---

# README.md

# 🚀 FlowPilotX – Telegram Lead Automation System

FlowPilotX is a workflow-driven automation backend system that integrates Telegram bots, Node.js backend services, MongoDB, and n8n to build scalable lead capture and automation pipelines.

## 📌 Features

- 🤖 Telegram bot integration (Webhook-based)
- ⚙️ Node.js backend for orchestration
- 🧠 Rule-based automation engine
- 🗄️ MongoDB for persistent user state
- 🔁 n8n workflow automation integration
- 📧 Email notification system
- 🔌 API-driven architecture (decoupled services)
- 📊 Scalable event-driven design

## 🏗️ System Architecture

Telegram User → Telegram Bot Webhook → Node.js Backend (FlowPilotX) → Rule Engine + State Manager (MongoDB) → n8n Workflow Engine → External Systems (Email / CRM / APIs)

## ⚙️ Tech Stack

- Node.js + Express
- MongoDB + Mongoose
- n8n (Workflow automation)
- Telegram Bot API
- Axios (API communication)

## 🚀 How It Works

1. User sends message on Telegram
2. Backend processes webhook
3. Rule engine determines flow: INFO → ask email → email → store lead
4. Data stored in MongoDB
5. n8n workflow triggered
6. Email + external integrations executed

## 📦 Installation

### 1. Clone repo

git clone https://github.com/yourusername/flowpilotx.git
cd flowpilotx/backend

### 2. Install dependencies

npm install

### 3. Setup environment variables

PORT=3000
MONGO_URI=your_mongodb_url
BOT_TOKEN=your_telegram_bot_token
N8N_WEBHOOK_URL=your_n8n_webhook_url

### 4. Run server

node server.js

## 🔗 n8n Workflow

Import workflow from: n8n-workflows/flowpilotx-lead.json

Workflow handles: Lead validation, Data formatting, Email notifications, External integrations

## 🧠 Key Concepts Demonstrated

- Webhook-based event systems
- Backend orchestration layer design
- State management with MongoDB
- Workflow automation (n8n)
- API integration patterns
- Production-style system architecture

## 📈 Future Improvements

- AI agent layer (LLM integration)
- Redis queue system
- Admin dashboard (React)
- Multi-channel automation (Instagram / WhatsApp)
- SaaS multi-tenant architecture

## 👨‍💻 Author

Vishal Singh
Full Stack Developer | Backend & AI Systems
GitHub: https://github.com/vishalsinghlab
