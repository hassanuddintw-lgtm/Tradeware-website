"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { io, Socket } from "socket.io-client";
import { getToken } from "@/lib/api-client";

const SOCKET_URL =
  typeof window !== "undefined"
    ? process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
    : "";

interface SocketContextValue {
  socket: Socket | null;
  connected: boolean;
  joinAuction: (auctionId: string) => void;
  leaveAuction: (auctionId: string) => void;
}

const SocketContext = createContext<SocketContextValue | null>(null);

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (!SOCKET_URL || typeof window === "undefined") return;

    const token = getToken();
    const s = io(SOCKET_URL, {
      auth: token ? { token } : {},
      transports: ["websocket", "polling"],
    });

    s.on("connect", () => setConnected(true));
    s.on("disconnect", () => setConnected(false));
    s.on("connect_error", () => {
      setConnected(false);
    });

    setSocket(s);
    return () => {
      s.removeAllListeners();
      s.disconnect();
      setSocket(null);
      setConnected(false);
    };
  }, []);

  const joinAuction = useCallback(
    (auctionId: string) => {
      if (socket?.connected && auctionId) {
        socket.emit("auction:join-room", auctionId);
      }
    },
    [socket]
  );

  const leaveAuction = useCallback(
    (auctionId: string) => {
      if (socket?.connected && auctionId) {
        socket.emit("auction:leave", auctionId);
      }
    },
    [socket]
  );

  return (
    <SocketContext.Provider
      value={{
        socket,
        connected,
        joinAuction,
        leaveAuction,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}

export function useSocket(): SocketContextValue | null {
  return useContext(SocketContext);
}
