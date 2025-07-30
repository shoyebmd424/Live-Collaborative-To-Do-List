import { Server, Socket } from 'socket.io';
import { registerSocketEvents, handleDisconnect } from './socketHandlers';

let io: Server;

export const initSocket = (server: any): Server => {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    },
  });

  io.on("connection", (socket: Socket) => {
    console.log(`🔌 Connected: ${socket.id}`);
    registerSocketEvents(socket);

    socket.on("disconnect", () => {
      handleDisconnect(socket);
    });
  });

  return io;
};

export const getIO = (): Server => {
  if (!io) throw new Error("Socket.io not initialized!");
  return io;
};
