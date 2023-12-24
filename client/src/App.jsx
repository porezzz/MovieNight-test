import './App.css'
import ReactPlayer from 'react-player';
import { socket } from './socket';
import { useEffect, useState } from 'react';


function App() {

  useEffect(() => {
    socket.on("message", (data) => {
      setupdatedURL(data)
      console.log(`recived data`)
      console.log(data)
    });
    socket.on('connect', () => {
      console.log('CONNECTED')
    })
  }, []);

  const [url, setUrl] = useState('');
  const [updatedURL, setupdatedURL] = useState(url)
  const [recivedData, setRecivedData] = useState('')

  const handleChange = e => {
    setUrl(e.target.value);
  }

  const handleClick = () => {
    setupdatedURL(url)
    socket.emit('message', url)
  }
  

  return (
    <>
      <input type="text" onChange={handleChange} value={url}/>
      <button onClick={handleClick}>Send LINK!</button>
      <p>url: {url}</p>
      <p>updatedURL: {updatedURL}</p>
      <p>recivedURL: {recivedData}</p>
      <ReactPlayer url={updatedURL} playing={true} muted={true} controls={true}/>
    </>
  )
}

export default App
