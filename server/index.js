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

let currentURL = "";
let currentKing = "";

const OnlineTab = [];
const Queue = [];

io.on("connection", (socket) => {
  if(Queue.length == 0){
    socket.emit("url", currentURL);
  } else {
    socket.emit("url", Queue[0].url)
  }
  socket.emit("id", socket.id);
  socket.emit("king", currentKing);

  OnlineTab.push(socket.id);

  io.emit("OnlineTab", OnlineTab);

  console.log(`${socket.id} connected`);
  console.log(`online list: ${OnlineTab}`);
  console.log(socket.username);

  socket.on("disconnect", () => {
    OnlineTab.pop(socket.id, 1);
    io.emit("OnlineTab", OnlineTab);

    console.log(`${socket.id} disconnected`);
    console.log(`online list: ${OnlineTab}`);
  });

  socket.on("url", (data) => {
    currentURL = data;
    if(Queue.length == 0){
      currentKing = socket.id
    }
    let vidData = {
      url: data,
      sender: socket.id,
    };
    Queue.push(vidData);

    io.emit("playlist", JSON.stringify(Queue));
    console.log(`sending whole queue ${Queue} to 'playlist'`);

    io.emit("url", Queue[0].url);
    io.emit("king", Queue[0].sender);

    console.log(Queue);
    console.log(`${socket.id} sent new url ${data}`);
  });

  socket.on("urlEnd", (data) => {
    console.log(`user said ${data} ended`);
    Queue.splice(0, 1);
    if (Queue.length !== 0) {
      io.emit("url", Queue[0].url);
      io.emit("king", Queue[0].sender);
      console.log(`now playing ${Queue[0].url} from ${Queue[0].sender}`);
    } else {
      io.emit("url", null);
    }
    io.emit("playlist", JSON.stringify(Queue));
    console.log(`sending whole queue ${Queue} to 'playlist'`);
  });

  socket.on("playing", (data) => {
    io.emit("playing", data);

    console.log(`${socket.id} played video ${data}`);
  });

  socket.on("time", (data) => {
    if (socket.id == currentKing) {
      io.emit("time", data);

      console.log(`host time is ${Math.floor(data)}`);
    }
  });
});

server.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
});
