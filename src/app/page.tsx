"use client"; // Enables client-side rendering (necessary because we're using hooks and browser APIs)

// Importing the ChatWindow component which displays messages
import ChatWindow from '../components/ChatWindow'

// Importing the MessageInput component which handles message typing and sending
import MessageInput from '../components/MessageInput'

// Importing the custom WebSocket hook to manage connection, messages, and sending logic
import useWebSocket from '../hooks/useWebSocket'

// The main Home page component
export default function Home() {
  // Destructure WebSocket data and functions from the hook
  const { messages, status, sendMessage } = useWebSocket('wss://ws.postman-echo.com/raw')

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Centered chat app container */}
      <div className="max-w-2xl mx-auto h-screen flex flex-col">
        {/* Page heading */}
        <h1 className="text-3xl font-bold text-green-500 mb-4">WebSocket Chat</h1>

        {/* Chat display area */}
        <ChatWindow messages={messages} status={status} />

        {/* Message input field */}
        <MessageInput onSend={sendMessage} />
      </div>
    </div>
  )
}
