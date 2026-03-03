import { Server } from "socket.io";

let io;
const onlineUsers = new Map(); // userId -> socketId

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*", 
    },
  });

  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    // user joins with userId
    socket.on("join", (userId) => {
      onlineUsers.set(userId, socket.id);
      console.log("User online:", userId);
    });

    // one-to-one message
    socket.on("send_message", (data) => {
      const { senderId, receiverId, message } = data;
      const receiverSocketId = onlineUsers.get(receiverId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("receive_message", {
          senderId,
          message,
          time: new Date()
        });
      }
    });

    socket.on("disconnect", () => {
      for (const [userId, socketId] of onlineUsers.entries()) {
        if (socketId === socket.id) {
          onlineUsers.delete(userId);
          break;
        }
      }
      console.log("Socket disconnected:", socket.id);
    });
  });
};

export const getIO = () => io;