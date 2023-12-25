import "./App.css";
import ReactPlayer from "react-player";
import { socket } from "./socket";
import React, { useEffect, useRef, useState } from "react";

function App() {
  const playerRef = useRef();
  const syncButton = useRef();
  const sendSyncButton = useRef();
  const serverTimeDiv = useRef();

  let LocalCurrentTime;
  let ServerCurrentTime;

  useEffect(() => {
    syncButton.current.addEventListener("click", () => {
      playerRef.current.seekTo(ServerCurrentTime);
      syncButton.current.disabled = true;
      setTimeout(() => {
        syncButton.current.disabled = false;
      }, 5000);
    });
    socket.on("url", (data) => {
      setupdatedURL(data);
      console.log(`recived data: ${data}`);
    });
    socket.on("connect", () => {
      console.log("CONNECTED");
    });
    socket.on("playing", (data) => {
      setIsPlaying(data);
    });
    socket.on("currentTime", (data) => {
      console.log(serverTimeDiv);
      serverTimeDiv.current.innerText = `Server Time: ${Math.floor(data)}s`;
      ServerCurrentTime = data;
      console.log(`${data} sekundy | server`);
    });
  }, []);
  const [url, setUrl] = useState("");
  // const [updatedURL, setupdatedURL] = useState(url);
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
    console.log(LocalCurrentTime);
  };
  const sendCurrentTime = () => {
    console.log(LocalCurrentTime);
    socket.emit("currentTime", LocalCurrentTime);
    sendSyncButton.current.disabled = true;
    setTimeout(() => {
      sendSyncButton.current.disabled = false;
    }, 5000);
  };
  return (
    <>
      <div ref={serverTimeDiv}>Server Time: s</div>
      <button ref={syncButton}>Sync</button>
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
    </>
  );
}

export default App;
