import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

interface WebSocketContextType {
  webSocket: WebSocket | null;
  sendMessage: (message: string) => void;
}

const WebSocketContext = createContext<WebSocketContextType | null>(null);

export const useWebSocket = () => useContext(WebSocketContext);

interface WebSocketProviderProps {
  children: ReactNode;
}

export const WebSocketProvider = ({ children }: WebSocketProviderProps) => {
  const [webSocket, setWebSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3000");
    setWebSocket(ws);

    ws.onopen = () => console.log("Connected to WebSocket");
    ws.onclose = () => console.log("Disconnected from WebSocket");

    return () => {
      ws.close();
    };
  }, []);

  const sendMessage = (message: string) => {
    if (webSocket) {
      webSocket.send(message);
    }
  };

  return (
    <WebSocketContext.Provider value={{ webSocket, sendMessage }}>
      {children}
    </WebSocketContext.Provider>
  );
};
