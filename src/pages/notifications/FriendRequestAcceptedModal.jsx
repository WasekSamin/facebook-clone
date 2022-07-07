import { IconButton, Stack, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import "../../css/notifications/FriendRequestAcceptedModal.css";
import { motion, AnimatePresence } from "framer-motion/dist/framer-motion";
import { AccountStore, SocketStore } from "../../components/store/Store";

const FriendRequestAcceptedModal = () => {
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [username, setUsername] = useState(null);
  const socket = SocketStore((state) => state.socket);
  const loggedInUserInfo = AccountStore((state) => state.loggedInUserInfo);

  useEffect(() => {
    if (showNotificationModal) {
      const timer = setTimeout(() => {
        setShowNotificationModal(false);
        setUsername(null);
      }, [5000]);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [showNotificationModal]);

  useEffect(() => {
    let isCancelled = false;

    if (socket !== null) {
      if (!isCancelled && loggedInUserInfo !== null) {
        socket.on("receive-friend-request-notification", (notificationObj) => {
          if (
            notificationObj.friendRequestAccepted &&
            loggedInUserInfo.uid === notificationObj.receiver
          ) {
            setUsername(notificationObj.sender.username);
            setShowNotificationModal(true);
          }
        });
      }
    }

    return () => {
      isCancelled = true;
    };
  }, [socket]);

  return (
    <div>
      <AnimatePresence initial={false} exitBeforeEnter={true}>
        {showNotificationModal && (
          <div id="friend__requestAcceptedModalMainDiv">
            <motion.div
              initial={{
                opacity: 0,
                y: "120%",
              }}
              animate={{
                opacity: 1,
                y: "100%",
              }}
              exit={{
                opacity: 0,
                y: "120%",
              }}
              id="friend__requestAcceptedModalDiv"
            >
              <Stack direction="row" justifyContent="flex-end">
                <IconButton
                  onClick={() => setShowNotificationModal(false)}
                  color="error"
                >
                  <CloseIcon />
                </IconButton>
              </Stack>
              {username !== null && (
                <Typography variant="p">
                  <span
                    style={{
                      fontWeight: "600",
                      color: "var(--slate-600)",
                      fontSize: "1rem",
                    }}
                  >
                    {username.length > 11 ? `${username.slice(0, 8)}...` : username}
                  </span>{" "}
                  accepted your friend request!
                </Typography>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FriendRequestAcceptedModal;
