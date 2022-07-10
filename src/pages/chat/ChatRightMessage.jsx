import { Avatar, Stack, Typography } from "@mui/material";
import React, { useRef, useEffect, useState, memo } from "react";
import "../../css/chat/ChatRightMessage.css";
import ChatRightMessageInput from "./ChatRightMessageInput";
import dummyImg from "../../dummy/static_images/default_profile.png";
import moment from "moment";
import { colorTheme } from "../../components/colorTheme/ColorTheme";
import {
  AccountStore,
  APIStore,
  ChatStore,
  SocketStore,
} from "../../components/store/Store";
import axios from "axios";
import RefreshIcon from "@mui/icons-material/Refresh";

const ChatRightMessage = () => {
  const scrollToBottomDivRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const chatroomObj = ChatStore((state) => state.chatroomObj);
  const loggedInUserInfo = AccountStore((state) => state.loggedInUserInfo);
  const socket = SocketStore((state) => state.socket);
  const MYAPI = APIStore((state) => state.MYAPI);
  const [numberOfMessageRequest, setNumberOfMessageRequest] = useState(30);
  const [isLoading, setIsLoading] = useState(false);
  const [loadMoreMessages, setLoadMoreMessages] = useState(false);
  const [scrollAtBottom, setScrollAtBottom] = useState(true);
  const focusedAtMessageRef = useRef(null);
  const [focusedMsg, setFocusedMsg] = useState(-1);

  const fetchChatroomMessages = async (chatroomObjUid, numberOfRequest) => {
    await axios
      .get(
        `${MYAPI}/chat/fetch-chatroom-messages/${chatroomObjUid}/${numberOfRequest}/`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        if (res.data.error && res.data.invalid_chat_uid) {
          setIsLoading(false);
          alert("Failed to fetch chat messages!");
        } else if (res.data.error) {
          setIsLoading(false);
          alert("Something went wrong!");
        } else if (!res.data.error && res.data.chat_message_found) {
          setLoadMoreMessages(true);
          if (res.data.messages.length > 0) {
            res.data.messages.reverse();

            // Set the focused message uid
            setFocusedMsg(res.data.messages[res.data.messages.length - 1].uid);

            messages.length === 0
              ? setMessages(res.data.messages)
              : setMessages((prev) => [...res.data.messages, ...prev]);

            res.data.messages.length < 30 && setLoadMoreMessages(false);
          } else {
            setLoadMoreMessages(false);
            setFocusedMsg(-1);
          }
        }
      })
      .catch((err) => console.error(err));

    setIsLoading(false);
  };

  useEffect(() => {
    let isCancelled = false;
    setIsLoading(true);

    if (!isCancelled && chatroomObj !== null) {
      messages.length === 0 &&
        fetchChatroomMessages(chatroomObj.uid, numberOfMessageRequest);
    }

    return () => {
      isCancelled = true;
    };
  }, [chatroomObj]);

  // Load more messages if scrollbar is all the way to top
  const loadMoreMessagesOnScroll = () => {
    if (scrollToBottomDivRef.current !== null && chatroomObj !== null) {
      // If the user scroll to top to see a message, the scrollbar should not scroll to bottom if a new message is sent or a new message is received,
      // else the scrollbar should scroll to bottom
      if (
        scrollToBottomDivRef.current.scrollTop +
          scrollToBottomDivRef.current.offsetHeight !==
        scrollToBottomDivRef.current.scrollHeight
      ) {
        setScrollAtBottom(false);
      } else {
        setScrollAtBottom(true);
        messages.length > 0 && setFocusedMsg(messages[messages.length - 1].uid);
      }

      if (scrollToBottomDivRef.current.scrollTop !== 0) return;

      setNumberOfMessageRequest(numberOfMessageRequest + 30);
      fetchChatroomMessages(chatroomObj.uid, numberOfMessageRequest + 30);
      setScrollAtBottom(true);
    }
  };

  useEffect(() => {
    let isCancelled = false;

    if (focusedAtMessageRef.current !== null) {
      scrollAtBottom && focusedAtMessageRef.current.scrollIntoView();
    }

    if (!isCancelled) {
      window.addEventListener("scroll", loadMoreMessagesOnScroll, true);
    }

    return () => {
      isCancelled = true;
      window.removeEventListener("scroll", loadMoreMessagesOnScroll, true);
    };
  }, [messages]);

  useEffect(() => {
    let isCancelled = false;

    if (socket !== null) {
      socket.on("receive-message", (chatMessageObj) => {
        if (!isCancelled && chatroomObj !== null) {
          const msgObj = chatMessageObj.chatMessageObj;

          if (msgObj.chat.uid === chatroomObj.uid) {
            setFocusedMsg(msgObj.uid);
            setNumberOfMessageRequest((prev) => prev + 1);

            setMessages((prev) => [
              ...prev,
              {
                uid: msgObj.uid,
                sender: msgObj.sender,
                message: msgObj.message,
                created_at: msgObj.created_at,
              },
            ]);
          }
        }
      });

      socket.on("receive-message-to-self", (chatMessageObj) => {
        if (!isCancelled && chatroomObj !== null) {
          const msgObj = chatMessageObj.chatMessageObj;

          if (msgObj.chat.uid === chatroomObj.uid) {
            setFocusedMsg(msgObj.uid);
            setNumberOfMessageRequest((prev) => prev + 1);

            setMessages((prev) => [
              ...prev,
              {
                uid: msgObj.uid,
                sender: msgObj.sender,
                message: msgObj.message,
                created_at: msgObj.created_at,
              },
            ]);
          }
        }
      });
    }

    return () => {
      isCancelled = true;
    };
  }, [socket]);

  return (
    <div id="chat__rightMessageDiv">
      <Stack
        direction="column"
        justifyContent="space-between"
        style={{ height: "calc(100vh - 13rem)" }}
      >
        <div style={{ height: "100%" }}>
          <Stack
            ref={scrollToBottomDivRef}
            direction="column"
            spacing={2}
            id="chat__rightAllMessaages"
          >
            {messages.length > 0 && loadMoreMessages && (
              <Stack direction="row" justifyContent="center">
                <RefreshIcon
                  className="profile__allPicsSpinner"
                  style={{ color: "var(--slate-500)", marginBottom: "1rem" }}
                />
              </Stack>
            )}

            {messages.length > 0 ? (
              messages.map((message) => (
                <Stack
                  ref={message.uid === focusedMsg ? focusedAtMessageRef : null}
                  key={message.uid}
                  className={
                    loggedInUserInfo !== null &&
                    loggedInUserInfo.uid === message.sender.uid
                      ? "chat__rightSelfUserMessage"
                      : ""
                  }
                  style={{
                    width: "70%",
                  }}
                  direction="row"
                  spacing={1}
                  alignItems="flex-end"
                >
                  {loggedInUserInfo !== null &&
                    loggedInUserInfo.uid !== message.sender.uid && (
                      <Avatar
                        alt={message.sender.username}
                        src={
                          message.sender.current_profile !== null
                            ? `${MYAPI}${message.sender.current_profile_pic}`
                            : dummyImg
                        }
                      />
                    )}
                  <Stack
                    className="chat__rightOtherUserMessage"
                    direction="column"
                    spacing={0.2}
                    style={{
                      backgroundColor: `${
                        loggedInUserInfo !== null &&
                        loggedInUserInfo.uid === message.sender.uid
                          ? colorTheme.palette.primary.main
                          : ""
                      }`,
                    }}
                  >
                    <Typography style={{ fontSize: "1rem" }} variant="p">
                      {message.message}
                    </Typography>
                    <Typography
                      variant="p"
                      style={{ color: "var(--slate-600)" }}
                    >
                      {moment(message.created_at).format("lll")}
                    </Typography>
                  </Stack>
                </Stack>
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
                  No chat with this person yet!
                </Typography>
              </Stack>
            )}

            {/* <Stack
              style={{
                width: "70%",
                backgroundColor: `${colorTheme.palette.primary.main}`,
              }}
              className="chat__rightSelfUserMessage"
              direction="row"
              spacing={1}
              alignItems="flex-end"
            >
              <Stack direction="column" spacing={0.2}>
                <Typography style={{ fontSize: "1rem" }} variant="p">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Velit odio, atque est laboriosam, officiis suscipit fugit
                  deleniti libero, incidunt in voluptas nesciunt beatae dicta
                  alias! Quas esse quos dolorum optio!
                </Typography>
                <Typography variant="p" style={{ color: "var(--slate-600)" }}>
                  Datetime
                </Typography>
              </Stack>
            </Stack> */}
          </Stack>
        </div>
      </Stack>
      <div>
        <ChatRightMessageInput />
      </div>
    </div>
  );
};

export default memo(ChatRightMessage);
