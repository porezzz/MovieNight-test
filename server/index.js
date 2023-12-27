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

let currentURL = "https://www.youtube.com/watch?v=lOKASgtr6kU";
let currentKing;
io.on("connection", (socket) => {
  console.log("user connected: " + socket.id);
  
  socket.emit("url", currentURL);
  socket.emit("id", socket.id)


  socket.on("disconnect", () => {

    console.log("user disconnected: " + socket.id);
  });

  socket.on("url", (data) => {
    console.log(`new URL ${data}, ${socket.id}`);
    currentURL = data;
    currentKing = socket.id
    io.emit("url", data);
    io.emit("king", currentKing)
  });

  socket.on("playing", (data) => {
    console.log(`playing changed ${socket.id}: ${data}`);
    io.emit("playing", data);
  });

  socket.on("time", (data) => {
    if(socket.id == currentKing){
      console.log(data, socket.id);
      io.emit("time", data)
    }
  });
});

server.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
});
