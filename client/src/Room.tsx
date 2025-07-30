// Room.tsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import App from "./App";

const socket = io(import.meta.env.VITE_API_URL || "http://localhost:5000");

interface CursorData {
  x: number;
  y: number;
  username: string;
  socketId: string;
}

function Room() {
  const { roomId } = useParams();
  const [username] = useState(() => `User-${Math.floor(Math.random() * 1000)}`);
  const [cursors, setCursors] = useState<Record<string, CursorData>>({});

  useEffect(() => {
    if (!roomId) return;

    socket.emit("joinRoom", { roomId, username });

    const handleMouseMove = (e: MouseEvent) => {
      socket.emit("cursorMove", { x: e.clientX, y: e.clientY });
    };

    document.addEventListener("mousemove", handleMouseMove);

    socket.on("cursorUpdate", (data: CursorData) => {
      setCursors((prev) => ({ ...prev, [data.socketId]: data }));
    });

    socket.on("userLeft", ({ socketId }) => {
      setCursors((prev) => {
        const updated = { ...prev };
        delete updated[socketId];
        return updated;
      });
    });

    return () => {
      socket.off("cursorUpdate");
      socket.off("userLeft");
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [roomId, username]);

  return (
    <div style={{ height: "100vh", position: "relative" }}>
      <h1>Room: {roomId}</h1>
      <p>Share this link to collaborate: {window.location.href}</p>
      <App />
      {Object.values(cursors).map((cursor) => (
        <div
          key={cursor.socketId}
          style={{
            position: "absolute",
            left: cursor.x,
            top: cursor.y,
            background: "red",
            padding: "2px 5px",
            color: "white",
            borderRadius: 4,
            transform: "translate(-50%, -50%)",
            pointerEvents: "none",
            zIndex: 1000,
            fontSize: 12,
          }}
        >
          {cursor.username}
        </div>
      ))}
    </div>
  );
}

export default Room;
