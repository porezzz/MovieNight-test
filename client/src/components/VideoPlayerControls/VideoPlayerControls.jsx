import React, { useEffect, useState } from "react";
import { socket } from "../../socket";
import ReactPlayer from "react-player";
import classes from "./VideoPlayerControls.module.css";
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
      setUrl("");
    } else {
      console.log("There was an error with link");
    }
  };
  return (
    <div className={classes.inputContainer}>
      <input
        type="text"
        onChange={handleChange}
        value={url}
        className={`${classes.VideoPlayerControlsText}`}
      />
      <button
        onClick={handleClick}
        className={`${classes.VideoPlayerControlsButton}`}
      >
        Send Url!
      </button>
    </div>
  );
};

export default VideoPlayerControls;
