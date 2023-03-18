import './App.css';
import io from "socket.io-client"
import { useState } from 'react';
import { Chat } from './chat.jsx';
const apiUrl = process.env.BACKEND_URL
const socket = io.connect("https://3001-yisas93-chatapp-46ztkqjggj0.ws-us90.gitpod.io");
function App() {
  const [username, setUsername]= useState("")
  const [room, setRoom]=useState("")
  const [showchat, setShowchat]=useState(false)

  const joinRoom =()=>{
    if (username !== "" && room !== ""){
        socket.emit("join_room", room)
        setShowchat(true)
    }
  }
  return (
   
    <div className="App">
      {!showchat?(
        <div className='joinChatContainer'>
        <h3>Join Chat</h3>
        <input type="text" placeholder='John...' 
        onChange={(event)=> setUsername(event.target.value)}/>
        <input type="text" placeholder='Room ID'
        onChange={(event)=> setRoom(event.target.value)}/>
        <button onClick={joinRoom}>Join a Room</button>
        </div>
      ):(
        <Chat socket={socket} username={username} room={room}/>)}
    </div>
   
  );
}

export default App;
