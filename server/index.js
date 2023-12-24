const express = require("express");
const { createServer } = require("node:http");
const { join } = require("node:path");
const { Server } = require("socket.io");
const cors = require('cors');
const app = express();
const server = createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 10000;

app.use(cors())
app.get("/", (req, res) => {
  app.use(express.static('../client/dist'));
  res.sendFile(join(__dirname, "../client/dist/index.html"));
});

io.on("connection", (socket) => {
  console.log("user connected: " + socket.id);
  socket.on("disconnect", () => {
    console.log("user disconnected: " + socket.id);
  });
  socket.on('message', (data) => {
    console.log(`message from ${socket.id}: ${data}`)
    io.emit('message', data)
  })
});

server.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
});
