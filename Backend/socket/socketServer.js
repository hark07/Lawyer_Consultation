import { Server } from "socket.io";

const users = {};

export const initSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("User Connected:", socket.id);

    socket.on("join", (userId) => {
      users[userId] = socket.id;
      console.log("Joined:", userId);
    });

    socket.on("sendMessage", ({ message, receiverId }) => {
      const receiverSocket = users[receiverId];

      if (receiverSocket) {
        io.to(receiverSocket).emit("newMessage", message);
      }
    });

    socket.on("disconnect", () => {
      Object.keys(users).forEach((userId) => {
        if (users[userId] === socket.id) {
          delete users[userId];
        }
      });
    });
  });

  return io;
};
