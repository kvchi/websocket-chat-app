// Declares a module named 'chat' so its types can be imported across the app
declare module 'chat' {

  // Represents a chat message object
  export interface Message {
    id: string                      // Unique identifier for the message (usually UUID)
    content: string                 // Text content of the message
    timestamp: number               // Time the message was sent or received (in ms)
    direction: 'incoming' | 'outgoing' // Direction determines if the message is sent or received
  }

  // Represents the current status of the WebSocket connection
  export type ConnectionStatus = 
    | 'connecting'      // WebSocket is attempting to connect
    | 'connected'       // WebSocket is connected and ready
    | 'disconnected'    // WebSocket has been closed or interrupted
    | 'error'           // An error occurred with the WebSocket
}

