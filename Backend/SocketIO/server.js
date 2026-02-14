import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);
const allowedOrigins = [
  "https://chatsphere-2-cztb.onrender.com",
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5175",
];

const io = new Server(server, {
  cors: {
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (
        allowedOrigins.includes(origin) ||
        (origin && origin.startsWith("http://localhost"))
      ) {
        return callback(null, true);
      }
      return callback(new Error("CORS not allowed by server"));
    },
    methods: ["GET", "POST"],
    credentials: true,
  },
});

export const getReceiverSocketId=(receiverId)=>{
    return users[receiverId];
}
const users={}
io.on("connection", (socket) => {
  console.log("a user connected", socket.id);
  const userId=socket.handshake.query.userId
  if(userId){
    users[userId]=socket.id
    console.log("Hello",users)
  }
  io.emit("getOnline",Object.keys(users));


  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
    delete users[userId];
    io.emit("getOnline",Object.keys(users));
  });
});
export { app, server, io };
