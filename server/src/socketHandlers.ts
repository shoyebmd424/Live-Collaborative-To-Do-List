// socketHandlers.ts
import { Socket } from 'socket.io';

export const registerSocketEvents = (socket: Socket) => {
  socket.on("joinRoom", ({ roomId, username }) => {
    socket.join(roomId);
    socket.data.username = username;
    socket.data.roomId = roomId;

    console.log(`👤 ${username} joined room ${roomId}`);
    socket.to(roomId).emit("userJoined", { username, socketId: socket.id });
  });

  socket.on("cursorMove", ({ x, y }) => {
    const { roomId, username } = socket.data;
    if (!roomId || !username) return;

    socket.to(roomId).emit("cursorUpdate", {
      username,
      x,
      y,
      socketId: socket.id,
    });
  });

  // Add other shared handlers here (typing, presence, etc.)
};

export const handleDisconnect = (socket: Socket) => {
  const { roomId, username } = socket.data;
  if (roomId && username) {
    console.log(`❌ ${username} left room ${roomId}`);
    socket.to(roomId).emit("userLeft", { username, socketId: socket.id });
  }
};
