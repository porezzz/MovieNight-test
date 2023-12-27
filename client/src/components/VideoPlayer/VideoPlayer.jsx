import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { socket } from "../../socket";
const VideoPlayer = () => {
  let id;
  const player = useRef()
  useEffect(() => {
    socket.on("url", (data) => {
      setupdatedURL(data);
      console.log(`recived url data from server: ${data}`);
    });
    socket.on("playing", (data) => {
      setIsPlaying(data);
    });
    socket.on("king", data => {
      setCurrentKing(data)
      console.log('current king ' + data)
    })
    socket.on("id", data => {
      id = data;
      console.log(id)
    })
    socket.on("time", data => {
      player.current.seekTo(data, "fraction")
    })
  }, []);


  const pause = () => {
    setIsPlaying(false);
    socket.emit("playing", false);
  };
  const play = () => {
    setIsPlaying(true);
    socket.emit("playing", true);
  };
  // PLACEHOLDER CHANGE BEFORE UPLOADING !!!!
  const placeHolderURL = 'https://www.youtube.com/watch?v=KdOCYsRM9mw'

  const [updatedURL, setupdatedURL] = useState(placeHolderURL);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentKing, setCurrentKing] = useState();

  const callback = (data) => {
    socket.emit("time", data)
  }
  return (
    <ReactPlayer
      ref={player}

      url={updatedURL}
      playing={isPlaying}

      onPause={pause}
      onPlay={play}
      
      muted={false}
      controls={true}
      light={true}

      onProgress={callback}
    />
  );
};

export default VideoPlayer;
