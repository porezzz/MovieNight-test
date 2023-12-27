import React, { useEffect, useRef } from 'react'
import { socket } from '../../socket';
import classes from './UserInfo.module.css'
const UserInfo = () => {
    const King = useRef()
    const OnlineCount = useRef()

    useEffect(() => {
        let id;
        socket.on("OnlineTab", data => {
            OnlineCount.current.innerText = `Currently online: ${data.length}`
        })
        socket.on("id", data => {
            id = data
        })
        socket.on("king", data => {
            King.current.innerText = `Submited by: ${data}`
            if(data == id){
                King.current.innerText = `Submited by: ${data} (You)`
            }
        })
    }, []);

  return (
    <div className={classes.UserInfoContainer}>
        <p ref={King}>Submited by: </p>
        <p ref={OnlineCount}>Currently online: </p>
    </div>
  )
}

export default UserInfo