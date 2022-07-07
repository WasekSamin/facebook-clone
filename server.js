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
  });

  socket.on("sender-delete-friend-request", (friendRequestData) => {
    if (friendRequestData) {
      const room = friendRequestData.receiverToken;
      socket.join(room);
      socket
        .to(room)
        .emit("friend-request-deleted-from-receiver", friendRequestData);
    }
  });

  socket.on("receiver-delete-friend-request", (friendRequestData) => {
    if (friendRequestData) {
      const room = friendRequestData.receiverToken;
      socket.join(room);
      socket
        .to(room)
        .emit("friend-request-deleted-by-receiver", friendRequestData);

      const receiverRoom = friendRequestData.userToken;
      socket.join(receiverRoom);
      socket
        .to(receiverRoom)
        .emit("friend-request-deleted-by-receiver", friendRequestData);
    }
  });

  socket.on("receiver-accept-friend-request", (friendRequestData) => {
    if (friendRequestData) {
      const room = friendRequestData.receiverToken;
      socket.join(room);
      socket
        .to(room)
        .emit("friend-request-accepted-by-receiver", friendRequestData);

      const receiverRoom = friendRequestData.userToken;
      socket.join(receiverRoom);
      socket.to(receiverRoom).emit("friend-request-accepted-by-receiver", friendRequestData);
    }
  });

  socket.on("remove-user-from-friend-list", (friendData) => {
    if (friendData) {
      const room = friendData.receiverToken;
      socket.join(room);
      socket.to(room).emit("friend-removed-from-user-list", friendData);

      const userRoom = friendData.userToken;
      socket.join(userRoom);
      socket.to(userRoom).emit("friend-removed-from-user-list", friendData);
    }
  });

  // After user accept or removed friend request from notification
  socket.on("send-friend-request-notification", notificationObj => {
    if (notificationObj) {
      const room = notificationObj.receiverToken;
      socket.join(room);
      socket.to(room).emit("receive-friend-request-notification", notificationObj);

      const userRoom = notificationObj.userToken;
      socket.join(userRoom);
      socket.to(userRoom).emit("receive-friend-request-notification", notificationObj);
    }
  })
});
