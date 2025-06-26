# 💬 Real-Time WebSocket Chat App

A modern, responsive WebSocket chat interface built with **Next.js 13 App Router**, **TypeScript**, and **Tailwind CSS**. This project demonstrates real-time bi-directional communication using the WebSocket API, with a clean UI and smooth UX.

## 🚀 Features

- 🔌 **WebSocket Integration** – Real-time communication using a live WebSocket server (`wss://ws.postman-echo.com/raw`).
- 🟢 **Connection Status Indicator** – Displays connection state: Connected, Connecting, Error, or Disconnected.
- 💬 **Dynamic Messaging** – Supports sending and receiving messages with automatic scroll-to-bottom behavior.
- ✨ **Responsive UI** – Styled with Tailwind CSS for a modern and mobile-friendly layout.
- 🔐 **Input Validation** – Prevents sending empty messages and disables input when disconnected.
- 🧼 **Clean State Management** – Leveraging custom hooks (`useWebSocket`) and TypeScript interfaces for robust logic.

## 🛠 Tech Stack

- **Framework**: [Next.js 13 (App Router)](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **WebSocket Server**: [Postman Echo](https://www.postman.com/postman/workspace/postman-echo/overview)

## 📦 Getting Started

Clone the repo and run it locally:

```bash
git clone https://github.com/kvchi/websocket-chat-app.git
cd chat-app
npm install
npm run dev

chat-app/
├── app/              # App router structure
│   ├── layout.tsx    # Root layout
│   └── page.tsx      # Chat UI page
├── components/       # UI components
│   ├── ChatWindow.tsx
│   └── MessageInput.tsx
├── hooks/            # Custom React hooks
│   └── useWebSocket.ts
├── styles/
│   └── globals.css   # Tailwind base styles
├── chat.d.ts         # TypeScript types
├── tailwind.config.ts
├── postcss.config.js
├── tsconfig.json
└── README.md         

📌 Notes
All stateful WebSocket logic is handled via a custom hook: useWebSocket.

Tailwind CSS utility classes are used directly in components.

App is tested and runs well on major modern browsers.

👨‍💻 About the Developer
Hi! I’m Kachi, a frontend developer based in Nigeria. I’m passionate about building clean, responsive, and scalable user interfaces using modern web technologies. My goal is to craft seamless digital experiences and solve real-world problems through thoughtful design and efficient code.
