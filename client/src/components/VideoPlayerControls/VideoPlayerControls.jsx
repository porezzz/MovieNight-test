import React, { useEffect, useState } from "react";
import { socket } from "../../socket";
import ReactPlayer from "react-player";

const VideoPlayerControls = () => {
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to the server");
    });
  }, []);
  const [url, setUrl] = useState("");
  const handleChange = (e) => {
    setUrl(e.target.value);
  };
  const handleClick = () => {
    if (ReactPlayer.canPlay(url)) {
      socket.emit("url", url);
    } else {
      console.log("There was an error with link");
    }
  };
  return (
    <div>
      <input type="text" onChange={handleChange} value={url} />
      <button onClick={handleClick}>Send LINK!</button>
    </div>
  );
};

export default VideoPlayerControls;
