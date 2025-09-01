const socket = require('socket.io');

const initaliseSocket = (server) => {
  
const io = socket(server, {
  cors: {
    origin: [
      "http://localhost:5176",
      "https://dev-tinder-inztuw1yi-ifnavneetrajputs-projects.vercel.app", 
    ], 
    credentials: true, 
  },
});
  
  io.on("connection", (socket) => {
    socket.on("joinChat", ({ firstName, userId, targetUserId }) => {
      const roomId = [userId, targetUserId].sort().join("_");

      console.log(firstName +" " + "joinning room" + " " +roomId);
      socket.join(roomId);
    });

    socket.on("sendMessage", ({firstName, userId, targetUserId, newMessages}) => {
      const roomId = [userId, targetUserId].sort().join("_");

      io.to(roomId).emit("messageReceived", { firstName, newMessages });
      console.log(firstName + " " + newMessages);
    });
   
    socket.on("disconnect", () => {});
  });

}

module.exports=  initaliseSocket;
