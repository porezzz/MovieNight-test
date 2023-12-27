import React, { useEffect, useState } from "react";
import { socket } from "../../socket";
import ReactPlayer from "react-player";
import classes from "./VideoPlayerControls.module.css";
import Popup from "../Popup/Popup";
const VideoPlayerControls = () => {
  useEffect(() => {
    socket.on("connect", () => {
      Popup('Success', 'You Successfuly connected to the server', 'ok');
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
      Popup('Error', 'There was an error with your link', 'nook');
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
