"use client"; // Marks this component to run on the client (required for useState and events)


import { useState } from 'react'

// Props interface for the message input component
interface MessageInputProps {
  onSend: (message: string) => void  // Callback to send a new message
  disabled?: boolean                 // Optional flag to disable input when WebSocket is disconnected
}

// The MessageInput component provides a text input and send button for users to send messages
export default function MessageInput({ onSend, disabled = false }: MessageInputProps) {
  const [input, setInput] = useState('')                 // Local state to track input field
  const MAX_MESSAGE_LENGTH = 280                         // Limit message size

  // Form submit handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim() && !disabled) {
      onSend(input)       // Trigger send
      setInput('')        // Clear input field
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mt-4">
      {/* Text input field */}
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)} // Update input state
        placeholder={disabled ? "Connection unavailable" : "Type a message..."}
        className={`flex-1 rounded-lg border text-black px-4 py-2 focus:outline-none focus:ring-2 ${
          disabled 
            ? 'bg-gray-100 border-gray-200 cursor-not-allowed' // Disabled input styling
            : 'border-gray-300 focus:ring-blue-500 '            // Enabled input styling
        }`}
        maxLength={MAX_MESSAGE_LENGTH}
        disabled={disabled} // Disable typing if WebSocket is down
      />

      {/* Send button */}
      <button
        type="submit"
        className={`px-6 py-2 rounded-lg focus:outline-none focus:ring-2 ${
          disabled || !input.trim()
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'  // Disabled button style
            : 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500' // Active button
        }`}
        disabled={disabled || !input.trim()}
      >
        Send
      </button>

      {/* Character counter (only visible when connected) */}
      {!disabled && (
        <div className="text-xs text-gray-500 self-center">
          {input.length}/{MAX_MESSAGE_LENGTH}
        </div>
      )}
    </form>
  )
}
