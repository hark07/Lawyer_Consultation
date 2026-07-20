import { io } from "socket.io-client";

const socket = io("https://lawyer-consultation-o63e.onrender.com", {
  transports: ["websocket"],
});

export default socket;