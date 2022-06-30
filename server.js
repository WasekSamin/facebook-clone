const io = require("socket.io")(9000, {
  cors: {
    origin: ["http://localhost:3000"],
  },
});

io.on("connection", (socket) => {
  const userToken = socket.handshake.query.userToken;

  socket.join(userToken);

  socket.on("post-created", (postObj) => {
    if (postObj) {
      socket.broadcast.emit("receive-post", postObj);
    }
  });

  socket.on("update-account-data", (accountObj) => {
    if (accountObj) {
      socket.broadcast.emit("receive-account-update-data", accountObj);
    }
  });

  socket.on("send-friend-request", (friendRequestData) => {
    if (friendRequestData) {
      const room = friendRequestData.receiverToken;
      socket.join(room);
      socket.to(room).emit("receive-friend-request", friendRequestData);
    }
  })

  socket.on("sender-delete-friend-request", friendRequestData => {
    if (friendRequestData) {
      const room = friendRequestData.receiverToken;
      socket.join(room);
      socket.to(room).emit("friend-request-deleted-from-receiver", friendRequestData);
    }
  })
});
