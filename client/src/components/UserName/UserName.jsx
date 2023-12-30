import React, { useEffect, useRef, useState } from 'react'
import classes from './UserName.module.css'
import { socket } from '../../socket'
import Popup from '../Popup/Popup'

const UserName = () => {
    const container = useRef()
    const [name, setName] = useState('')
    const handleChange = e => {
        setName(e.target.value);
    }
    
    const handleClick = () => {
        if(name){
            container.current.style.display = 'none'
            socket.emit("username", name)
        } else {
            Popup('Error', 'username cannot be empty', 'nook') 
        }

    }
    const textinput = useRef()
    useEffect(() => {
        window.addEventListener('keypress', e => {
            if(e.key == 'Enter'){
                if(textinput.current.value){
                    container.current.style.display = 'none'
                    socket.emit("username", textinput.current.value)
                } else {
                    Popup('Error', 'username cannot be empty', 'nook') 
                }
            }
          })
        
    }, []);
    return (
    <div className={classes.container} ref={container}>
        <label htmlFor="username">Enter your username:</label>
        <input type="text" name="username" ref={textinput} value={name} onChange={handleChange}/>
        <button onClick={handleClick}>Submit</button>
    </div>
  )
}

export default UserName