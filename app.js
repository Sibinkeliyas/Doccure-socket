const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log('he is joined');
  });

   socket.on("send_message", (data) => {
      socket.to(data.room).emit("receive_message", data);
    });
  socket.on('videoCall' , (data) => {
    socket.to(data.to).emit('recieve-videoCall' , data)
  })

  socket.on('videoCallAction' , data => {
    socket.to(data.to).emit('recieved-videoCall-action' , data)
  })
  socket.on('videoCallReject' , data => {
    socket.to(data.to).emit('recieved-videoCall-rejection' , data)
  })

  socket.on("disconnect", () => {
  });
});

server.listen(3002, () => {
  console.log("SERVER RUNNING");
});
