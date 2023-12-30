import React, { useEffect, useRef, useState } from "react";
import { socket } from "../../socket";
import ReactPlayer from "react-player";
import classes from "./VideoPlayerControls.module.css";
import Popup from "../Popup/Popup";
const VideoPlayerControls = () => {
  useEffect(() => {
    socket.on("connect", () => {
      Popup('Success', 'You Successfuly connected to the server', 'ok');
    });
    window.addEventListener('keypress', e => {
      if(e.key == 'Enter' && textinput.current.value){
        if (ReactPlayer.canPlay(textinput.current.value)) {
          socket.emit("url", textinput.current.value);
          setUrl("");
        } else {
          Popup('Error', 'There was an error with your link', 'nook');
          setUrl("")
        }
      }
    })
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
      setUrl("")
    }
  };

  const textinput = useRef()

  return (
    <div className={classes.inputContainer}>
      <input
        type="text"
        onChange={handleChange}
        value={url}
        ref={textinput}
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
