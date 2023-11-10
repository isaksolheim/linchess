import React, { useState, useEffect } from "react";
import { WebSocketProvider, useWebSocket } from "./WebSocketContext";
import { Button } from "@/components/ui/button";

const ChatComponent: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const [receivedMessages, setReceivedMessages] = useState<string[]>([]);
  const wsContext = useWebSocket();

  useEffect(() => {
    wsContext?.webSocket?.addEventListener("message", (event) => {
      setReceivedMessages((prevMessages) => [...prevMessages, event.data]);
    });
  }, [wsContext]);

  const sendMessage = () => {
    wsContext?.sendMessage(message);
    setMessage("");
  };

  return (
    <div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
      <div>
        {receivedMessages.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>
      <Button>Click me</Button>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <WebSocketProvider>
      <ChatComponent />
    </WebSocketProvider>
  );
};

export default App;
