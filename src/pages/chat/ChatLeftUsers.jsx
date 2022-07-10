import { Avatar, Stack, Typography } from "@mui/material";
import React, { useState, useEffect, memo, useRef } from "react";
import dummyImg from "../../dummy/static_images/default_profile.png";
import "../../css/chat/ChatLeftUsers.css";
import { colorTheme } from "../../components/colorTheme/ColorTheme";
import {
  AccountStore,
  APIStore,
  SocketStore,
} from "../../components/store/Store";
import axios from "axios";
import RefreshIcon from "@mui/icons-material/Refresh";

const ChatLeftUsers = () => {
  const chatLeftAllUserRef = useRef(null);
  const loggedInUserInfo = AccountStore((state) => state.loggedInUserInfo);
  const [friendsWithChat, setFriendsWithChat] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadMoreFriendsWithChat, setLoadMoreFriendsWithChat] = useState(false);
  const [
    numberOfFriendWithChatRequest,
    setNumberOfFriendWithChatRequest,
  ] = useState(10);
  const socket = SocketStore((state) => state.socket);
  const MYAPI = APIStore((state) => state.MYAPI);

  const fetchUserFriendsWithLastMessage = async (userUid, numberOfRequest) => {
    await axios
      .get(
        `${MYAPI}/chat/fetch-friend-with-last-message/${userUid}/${numberOfRequest}/`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        if (res.data.error && res.data.friend_obj_not_found) {
          setIsLoading(false);
        } else if (res.data.error) {
          setIsLoading(false);
        } else if (
          !res.data.error &&
          res.data.get_friends_with_last_msg_success
        ) {
          if (res.data.friends_with_last_message.length > 0) {
            setLoadMoreFriendsWithChat(true);

            friendsWithChat.length === 0
              ? setFriendsWithChat(res.data.friends_with_last_message)
              : setFriendsWithChat((prev) => [
                  ...prev,
                  ...res.data.friends_with_last_message,
                ]);

            res.data.friends_with_last_message.length < 10 &&
              setLoadMoreFriendsWithChat(false);
          } else {
            setLoadMoreFriendsWithChat(false);
          }
        }
      })
      .catch((err) => console.error(err));

    setIsLoading(false);
  };

  useEffect(() => {
    let isCancelled = false;
    setIsLoading(true);

    if (loggedInUserInfo !== null && !isCancelled) {
      friendsWithChat.length === 0 &&
        fetchUserFriendsWithLastMessage(
          loggedInUserInfo.uid,
          numberOfFriendWithChatRequest
        );
    }

    return () => {
      isCancelled = true;
    };
  }, [loggedInUserInfo]);

  const loadMoreFriendsOnScroll = () => {
    if (chatLeftAllUserRef.current !== null && loggedInUserInfo !== null) {
      if (
        chatLeftAllUserRef.current.scrollTop +
          chatLeftAllUserRef.current.offsetHeight !==
        chatLeftAllUserRef.current.scrollHeight
      )
        return;

      setNumberOfFriendWithChatRequest(numberOfFriendWithChatRequest + 10);
      fetchUserFriendsWithLastMessage(
        loggedInUserInfo.uid,
        numberOfFriendWithChatRequest + 10
      );
    }
  };

  useEffect(() => {
    let isCancelled = false;

    if (!isCancelled) {
      window.addEventListener("scroll", loadMoreFriendsOnScroll, true);
    }

    return () => {
      isCancelled = true;
      window.removeEventListener("scroll", loadMoreFriendsOnScroll, true);
    };
  }, [friendsWithChat]);

  useEffect(() => {
    let isCancelled = false;

    if (socket !== null) {
      socket.on("receive-message", (chatMessageObj) => {
        if (!isCancelled) {
          console.log(chatMessageObj);
        }
      });

      socket.on("receive-message-to-self", (chatMessageObj) => {
        if (!isCancelled) {
          console.log(chatMessageObj);
          const msgObj = chatMessageObj.chatMessageObj;
          let receiverObj = null;

          if (msgObj.chat.user1.uid === msgObj.sender.uid) {
            receiverObj = msgObj.chat.user2;
          } else if (msgObj.chat.user2.uid === msgObj.sender.uid) {
            receiverObj = msgObj.chat.user1;
          }

          if (receiverObj !== null) {
            setFriendsWithChat((friendsWithChat) =>
              friendsWithChat.filter(
                (fwc) => fwc.friend.uid !== receiverObj.uid
              )
            );
            setFriendsWithChat((prev) => [
              {
                friend: {
                  uid: receiverObj.uid,
                  username: receiverObj.username,
                  email: receiverObj.email,
                  current_profile_pic: receiverObj.current_profile_pic,
                },
                last_msg: msgObj.message,
              },
              ...prev,
            ]);
          }
        }
      });
    }

    return () => {
      isCancelled = true;
    };
  }, [socket, friendsWithChat]);

  return (
    <div style={{ height: "calc(100% - 110px)" }}>
      <Stack
        ref={chatLeftAllUserRef}
        id="chat__leftUserAllUsersDiv"
        direction="column"
        spacing={0.5}
      >
        {friendsWithChat.length > 0 ? (
          friendsWithChat.map((fwc) => (
            <div
              key={fwc.friend.uid}
              style={{ color: "black", cursor: "pointer" }}
            >
              <Stack
                className="chat__leftUser"
                direction="row"
                alignItems="center"
                spacing={1}
              >
                <div style={{ position: "relative" }}>
                  <Avatar
                    alt={fwc.friend.username}
                    src={
                      fwc.friend.current_profile_pic !== null
                        ? `${MYAPI}${fwc.friend.current_profile_pic}`
                        : dummyImg
                    }
                  />
                  <div className="chat__leftUserStatusBadge">
                    <div
                      style={{ backgroundColor: `${colorTheme.palette.green}` }}
                    ></div>
                  </div>
                </div>
                <Stack direction="column">
                  <Typography
                    variant="p"
                    className="chat__leftUsernameText"
                    style={{ fontSize: "1rem", fontWeight: "600" }}
                  >
                    {fwc.friend.username}
                  </Typography>
                  <Typography
                    variant="p"
                    className="chat__leftUserLastText"
                    style={{
                      color: `${
                        fwc.last_msg !== null
                          ? "var(--slate-500)"
                          : colorTheme.palette.secondary.main
                      }`,
                    }}
                  >
                    {fwc.last_msg !== null
                      ? fwc.last_msg
                      : "No chat with this person yet!"}
                  </Typography>
                </Stack>
              </Stack>
            </div>
          ))
        ) : isLoading ? (
          <Stack direction="row" justifyContent="center">
            <RefreshIcon
              className="profile__allPicsSpinner"
              style={{ color: "var(--slate-500)", marginBottom: "1rem" }}
            />
          </Stack>
        ) : (
          <Stack direction="row" justifyContent="center">
            <Typography
              variant="p"
              style={{
                fontWeight: "bold",
                marginBottom: "1rem",
                color: `${colorTheme.palette.secondary.main}`,
              }}
            >
              No friends found yet!
            </Typography>
          </Stack>
        )}

        {friendsWithChat.length > 0 && loadMoreFriendsWithChat && (
          <Stack direction="row" justifyContent="center">
            <RefreshIcon
              className="profile__allPicsSpinner"
              style={{ color: "var(--slate-500)", marginBottom: "1rem" }}
            />
          </Stack>
        )}
      </Stack>
    </div>
  );
};

export default memo(ChatLeftUsers);
