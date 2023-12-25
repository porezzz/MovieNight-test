const express = require("express");
const { createServer } = require("node:http");
const { join } = require("node:path");
const { Server } = require("socket.io");
const cors = require("cors");
const app = express();
const server = createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 10000;

app.use(cors());
app.get("/", (req, res) => {
  app.use(express.static("../client/dist"));
  res.sendFile(join(__dirname, "../client/dist/index.html"));
});

let currentURL = 'https://www.youtube.com/watch?v=lOKASgtr6kU';
io.on("connection", (socket) => {
  console.log("user connected: " + socket.id);
  socket.emit("url", currentURL);
  socket.on("disconnect", () => {
    console.log("user disconnected: " + socket.id);
  });
  socket.on("url", (data) => {
    console.log(`url from ${socket.id}: ${data}`);
    currentURL = data;
    io.emit("url", data);
  });
  socket.on("playing", (data) => {
    console.log(`playing changed ${socket.id}: ${data}`);
    io.emit("playing", data);
  });
  socket.on("currentTime", (data) => {
    console.log(`${socket.id} wysyła czas: ${data} sekund filmu`)
    io.emit("currentTime", data);
  });
});

server.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
});
