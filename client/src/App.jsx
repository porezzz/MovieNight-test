import "./App.css";
import ReactPlayer from "react-player";
import { socket } from "./socket";
import React, { useEffect, useRef, useState } from "react";

function App() {
  const playerRef = useRef();
  const sendSyncButton = useRef();
  const serverTimeDiv = useRef();

  const connectedUsers = useRef();

  let LocalCurrentTime;
  let ServerCurrentTime;

  useEffect(() => {
    socket.on("url", (data) => {
      setupdatedURL(data);
      console.log(`recived url data from server: ${data}`);
    });
    socket.on("connect", () => {
      console.log("Connected to the server");
    });
    socket.on("playing", (data) => {
      setIsPlaying(data);
    });
    socket.on("currentTime", (data, user) => {
      serverTimeDiv.current.innerText = `Server synced to: ${user}`;
      console.log(`recived timeData from server: ${data}s`);
      ServerCurrentTime = data;
      playerRef.current.seekTo(ServerCurrentTime);
    });
    socket.on("connectedUsersTab", (data) => {
      console.log(data);
      connectedUsers.current.innerText = data.join(", ")
    });
  }, []);
  const [url, setUrl] = useState("");
  const [updatedURL, setupdatedURL] = useState("");

  const handleChange = (e) => {
    setUrl(e.target.value);
  };

  const handleClick = () => {
    if (ReactPlayer.canPlay(url)) {
      setupdatedURL(url);
      socket.emit("url", url);
    } else {
      console.log("There was an error with link");
    }
  };

  const [isPlaying, setIsPlaying] = useState(true);

  const pause = () => {
    setIsPlaying(false);
    socket.emit("playing", false);
  };
  const play = () => {
    setIsPlaying(true);
    socket.emit("playing", true);
  };

  const currentTimeInterval = (currentTime) => {
    LocalCurrentTime = currentTime.playedSeconds;
  };
  const sendCurrentTime = () => {
    socket.emit("currentTime", LocalCurrentTime);
    sendSyncButton.current.disabled = true;
    setTimeout(() => {
      sendSyncButton.current.disabled = false;
    }, 5000);
  };
  return (
    <>
      <div ref={serverTimeDiv}>Server Time: s</div>
      <button ref={sendSyncButton} onClick={sendCurrentTime}>
        Send Sync
      </button>
      <input type="text" onChange={handleChange} value={url} />
      <button onClick={handleClick}>Send LINK!</button>
      <p>currently playing: {updatedURL}</p>
      <ReactPlayer
        ref={playerRef}
        url={updatedURL}
        playing={isPlaying}
        muted={false}
        controls={true}
        onPause={pause}
        onPlay={play}
        light={true}
        onProgress={currentTimeInterval}
      />
      <div ref={connectedUsers}></div>
    </>
  );
}

export default App;
