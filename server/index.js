const express = require("express")
const app = express()
const http = require("http")
const cors=require("cors")
const {Server} = require("socket.io")
app.use(cors())
const server = http.createServer(app)
const frontUrl = process.env.FRONTEND_URL
const io= new Server(server,{
    cors:{
        origin:"https://3000-yisas93-chatapp-46ztkqjggj0.ws-us90.gitpod.io",
        methods:["GET", "POST"]
    }
} )

io.on("connection", (socket)=>{
    console.log(`user connected: ${socket.id}`)
    socket.on("join_room", (data)=>{
        socket.join(data)
        console.log(`User with ID: ${socket.id} joined Room: ${data}`)
    })
    socket.on("send_message", (data)=>{
        socket.to(data.room).emit("receive_message", data)
    })
    socket.on("disconnect", ()=>{
        console.log("user disconnected", socket.id)
    })
})


server.listen(3001, ()=>{
    console.log("server running")
})