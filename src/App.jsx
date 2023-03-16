import './App.css';
import io from "socket.io-client"
import { useState } from 'react';
import { Chat } from './chat.jsx';
const socket = io.connect("http://localhost:3001");
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
        <div>
        <h3>join chat</h3>
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