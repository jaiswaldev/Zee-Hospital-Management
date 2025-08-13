import { Server } from "socket.io";
import http from "http";
import express from "express";
import { app } from "../app.js";

const httpServer = http.createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: [`${process.env.CORS_ORIGIN}`],
    credentials: true,
    methods: ["GET", "POST"],
  },
});

// Used to store online users
const userSocketMap = {}; // { userId: socketId }

export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

io.on("connection", (socket) => {
  // console.log("A user connected:", socket.id);
  const userId = socket.handshake.query.userId;

  if (userId) {
    userSocketMap[userId] = socket.id;

   
    socket.join(userId);
    // console.log(`User ${userId} joined room:`, userId);
  }

  // Notify all clients of current online users
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    // console.log("A user disconnected:", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, app, httpServer };
