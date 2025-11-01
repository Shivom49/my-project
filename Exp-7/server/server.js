const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

let messages = [];

// REST API to fetch old messages
app.get("/api/messages", (req, res) => {
  res.json(messages);
});

// Handle WebSocket connections
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("send_message", (data) => {
    const message = {
      id: Date.now(),
      user: data.user,
      text: data.text,
      ts: new Date().toISOString(),
      senderId: socket.id, // ✅ identify sender
    };
    messages.push(message);

    // broadcast message to all (including sender)
    io.emit("receive_message", message);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(5000, () => {
  console.log("✅ Server running on http://localhost:5000");
});
