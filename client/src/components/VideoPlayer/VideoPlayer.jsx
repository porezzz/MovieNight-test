import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { socket } from "../../socket";
const VideoPlayer = () => {
  let id;

  const player = useRef();
  useEffect(() => {
    socket.on("url", (data) => {
      setupdatedURL(data);
    });
    socket.on("playing", (data) => {
      setIsPlaying(data);
    });
    socket.on("king", (data) => {
      setCurrentKing(data);
    });
    socket.on("id", (data) => {
      id = data;
      console.log(`Your id is ${data}`);
    });
    socket.on("time", (data) => {
      if (Math.floor(player.current.getCurrentTime()) != Math.floor(data)) {
        player.current.seekTo(data, "seconds");
      }
    });
  }, []);

  const pause = () => {
    setIsPlaying(false);
    socket.emit("playing", false);
  };
  const play = () => {
    setIsPlaying(true);
    socket.emit("playing", true);
  };
  const [updatedURL, setupdatedURL] = useState();
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentKing, setCurrentKing] = useState();

  const callback = (data) => {
    socket.emit("time", data.playedSeconds);
  };
  const emitEnd = () => {
    setTimeout(() => {
      socket.emit("urlEnd", updatedURL);
      socket.emit("time", 0);
    }, 300);
  };
  return (
    <ReactPlayer
      ref={player}
      url={updatedURL}
      playing={isPlaying}
      onPause={pause}
      onPlay={play}
      width={"100%"}
      height={"100%"}
      muted={false}
      controls={true}
      light={false}
      onProgress={callback}
      onEnded={emitEnd}
    />
  );
};

export default VideoPlayer;
