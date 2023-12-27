import React, { useEffect, useRef } from 'react'
import classes from './Playlist.module.css'
import { socket } from '../../socket';

const Playlist = () => {
  const playlistCont = useRef();
  useEffect(() => {
    socket.on("playlist", data => {
      while(playlistCont.current.firstChild){
        playlistCont.current.removeChild(playlistCont.current.firstChild)
      }
      if(!playlistCont.current.firstChild){
      const div = document.createElement('div')
      div.textContent = data
      playlistCont.current.appendChild(div)
      }
    })
  }, []);

  return (
    <div className={classes.SidePanel}>
      <h1>Queue:</h1>
      <div className={classes.catalogue} ref={playlistCont}>

      </div>
    </div>
  )
}

export default Playlist