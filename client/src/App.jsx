import "./App.css";
import ReactPlayer from "react-player";
import { socket } from "./socket";
import React, { useEffect, useRef, useState } from "react";

function App() {
  useEffect(() => {
    
    
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
  
    
  }, []);
  
  const [url, setUrl] = useState("");
  // const [updatedURL, setupdatedURL] = useState(url);
  const [updatedURL, setupdatedURL] = useState(
    "https://www.youtube.com/watch?v=lOKASgtr6kU"
  );

  const handleChange = (e) => {
    setUrl(e.target.value);
  };

  const handleClick = () => {
    if(ReactPlayer.canPlay(url)){
      setupdatedURL(url);
      socket.emit("url", url);
    } else {
      console.log('There was an error with link')
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
  
  const playerRef = useRef();

  return (
    <>
      <button>Sync</button>
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
      />
    </>
  );
}

export default App;
