const io = require("socket.io")(9000, {
  cors: {
    origin: ["http://localhost:3000"],
  },
});

io.on("connection", (socket) => {
    const userToken = socket.handshake.query.userToken;

    socket.join(userToken);


})