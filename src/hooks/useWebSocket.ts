"use client"; // Ensures this hook runs only on the client side (required for WebSocket)

import { useState, useEffect, useCallback, useRef } from 'react';
import type { Message, ConnectionStatus } from 'chat';

// Custom React hook to manage WebSocket connection, messages, and status
const useWebSocket = (url: string) => {
  // Stores chat messages (incoming and outgoing)
  const [messages, setMessages] = useState<Message[]>([]);

  // Tracks WebSocket connection status: connecting, connected, etc.
  const [status, setStatus] = useState<ConnectionStatus>('connecting');

  // Ref to store the actual WebSocket instance (persists across renders)
  const ws = useRef<WebSocket | null>(null);

  // Sends a message over WebSocket and adds it to local state
  const sendMessage = useCallback((content: string) => {
    // Only send if WebSocket is open
    if (!ws.current || ws.current.readyState !== WebSocket.OPEN) return;

    const newMessage: Message = {
      id: crypto.randomUUID(),      // Unique ID for the message
      content,                      // Message text
      timestamp: Date.now(),        // When the message was sent
      direction: 'outgoing'         // Marks this as a message from the user
    };

    ws.current.send(JSON.stringify(newMessage));     // Send as JSON string
    setMessages(prev => [...prev, newMessage]);      // Add to local message state
  }, []);

  // Establish WebSocket connection and set up event listeners
  useEffect(() => {
    ws.current = new WebSocket(url); // Create WebSocket connection

    // Handle message received from server
    const handleMessage = (event: MessageEvent) => {
      try {
        // Try parsing JSON message
        const parsed = JSON.parse(event.data);
        const received: Message = {
          ...parsed,
          id: crypto.randomUUID(),       // Assign a unique ID
          direction: 'incoming'          // Marks as server message
        };
        setMessages(prev => [...prev, received]);
      } catch {
        // If message is plain text or malformed JSON, fallback to raw string
        const fallback: Message = {
          id: crypto.randomUUID(),
          content: String(event.data),
          timestamp: Date.now(),
          direction: 'incoming'
        };
        setMessages(prev => [...prev, fallback]);
      }
    };

    // WebSocket event handlers
    const handleOpen = () => setStatus('connected');
    const handleClose = () => setStatus('disconnected');
    const handleError = () => setStatus('error');

    // Attach WebSocket listeners
    ws.current.addEventListener('open', handleOpen);
    ws.current.addEventListener('message', handleMessage);
    ws.current.addEventListener('close', handleClose);
    ws.current.addEventListener('error', handleError);

    // Cleanup on unmount or URL change
    return () => {
      ws.current?.removeEventListener('open', handleOpen);
      ws.current?.removeEventListener('message', handleMessage);
      ws.current?.removeEventListener('close', handleClose);
      ws.current?.removeEventListener('error', handleError);
      ws.current?.close(); // Close the connection
    };
  }, [url]);

  // Return messages, status, and sendMessage function for use in components
  return { messages, status, sendMessage };
};

export default useWebSocket;
