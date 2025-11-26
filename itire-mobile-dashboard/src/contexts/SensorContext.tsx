import { createContext, useContext, useEffect, useState, useRef, ReactNode } from 'react';

interface SensorData {
  id: string;
  position: string;
  pressure: number;
  temperature: number;
  treadDepth: number;
  status: 'normal' | 'warning' | 'critical';
  lastUpdate: string;
}

interface SensorContextType {
  sensors: SensorData[];
  isConnected: boolean;
  error: string | null;
  reconnect: () => void;
}

const SensorContext = createContext<SensorContextType | undefined>(undefined);

const WS_URL = process.env.REACT_APP_WS_URL || `ws://${window.location.hostname}:3001`;
const RECONNECT_DELAY = 3000;

export function SensorProvider({ children }: { children: ReactNode }) {
  const [sensors, setSensors] = useState<SensorData[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const connect = () => {
    try {
      const ws = new WebSocket(WS_URL);
      wsRef.current = ws;

      ws.onopen = () => {
        console.log('WebSocket connected');
        setIsConnected(true);
        setError(null);
      };

      ws.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          
          if (message.type === 'initial' || message.type === 'update') {
            setSensors(message.data);
          }
        } catch (err) {
          console.error('Error parsing WebSocket message:', err);
        }
      };

      ws.onerror = (event) => {
        console.error('WebSocket error:', event);
        setError('Connection error');
      };

      ws.onclose = () => {
        console.log('WebSocket disconnected');
        setIsConnected(false);
        wsRef.current = null;

        // Attempt to reconnect after delay
        reconnectTimeoutRef.current = setTimeout(() => {
          console.log('Attempting to reconnect...');
          connect();
        }, RECONNECT_DELAY);
      };
    } catch (err) {
      console.error('Error creating WebSocket connection:', err);
      setError('Failed to connect');
    }
  };

  const reconnect = () => {
    if (wsRef.current) {
      wsRef.current.close();
    }
    connect();
  };

  useEffect(() => {
    connect();

    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  return (
    <SensorContext.Provider value={{ sensors, isConnected, error, reconnect }}>
      {children}
    </SensorContext.Provider>
  );
}

export function useSensors() {
  const context = useContext(SensorContext);
  if (context === undefined) {
    throw new Error('useSensors must be used within a SensorProvider');
  }
  return context;
}
