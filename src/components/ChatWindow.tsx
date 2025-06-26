"use client"; // Tells Next.js this component runs on the client side (needed for hooks like useEffect)


import { useEffect, useRef } from "react";

// Type definitions for messages and connection status
import type { Message, ConnectionStatus } from "chat";

// Props interface for the ChatWindow component
interface ChatWindowProps {
  messages: Message[];              // List of all messages in the chat
  status: ConnectionStatus;         // WebSocket connection status (connected, connecting, or error)
}

// The ChatWindow component displays the list of messages and connection status
export default function ChatWindow({ messages, status }: ChatWindowProps) {
  const messageEndRef = useRef<HTMLDivElement>(null); // Used to scroll to the bottom of the chat on new messages

  // Scroll to the latest message whenever messages update
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 bg-gray-50 rounded-lg p-4 overflow-y-auto shadow-inner">
      
      {/* Connection status indicator (green, yellow, or red) */}
      <div className="flex items-center mb-4 space-x-2">
        <div
          className={`h-3 w-3 rounded-full ${
            status === "connected"
              ? "bg-green-500"
              : status === "connecting"
              ? "bg-yellow-500"
              : "bg-red-500"
          }`}
        />
        <span className="text-sm text-gray-600 capitalize">{status}</span>
      </div>

      {/* Chat message list */}
      <div className="space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.direction === "outgoing" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs lg:max-w-md rounded-2xl shadow-sm p-3 ${
                message.direction === "outgoing"
                  ? "bg-blue-500 text-white"    // Outgoing message style
                  : "bg-white text-blue-300"    // Incoming message style
              }`}
            >
              {/* Message content */}
              <p className="text-sm break-words">
                {message.content.includes("Request served by")
                  ? "📡 Server Response"         // Replace server echo with clearer label
                  : message.content}
              </p>
              {/* Timestamp */}
              <p className="text-xs mt-1 text-gray-400">
                {new Date(message.timestamp).toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}

        {/* Invisible div to scroll into view (auto-scroll to bottom) */}
        <div ref={messageEndRef} />
      </div>
    </div>
  );
}
