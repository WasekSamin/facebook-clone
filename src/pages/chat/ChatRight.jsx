import { Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ChatRightHeader from "./ChatRightHeader";
import ChatRightMessage from "./ChatRightMessage";
import "../../css/chat/ChatRight.css";
import NoChatroomSelected from "./NoChatroomSelected";
import axios from "axios";
import {
  AccountStore,
  APIStore,
  ChatStore,
  TokenStore,
} from "../../components/store/Store";

const ChatRight = () => {
  const chatParam = useParams();
  const loggedInUserInfo = AccountStore((state) => state.loggedInUserInfo);
  const MYAPI = APIStore((state) => state.MYAPI);
  const token = TokenStore((state) => state.token);
  const chatroomObj = ChatStore(state => state.chatroomObj);
  const updateChatroomObj = ChatStore(state => state.updateChatroomObj);

  const fetchChatObj = async (chatUid) => {
    axios
      .get(`${MYAPI}/chat/chat-detail/${chatUid}/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `token ${token}`,
        },
      })
      .then((res) => {
        if (res.data.error && res.data.invalid_chat_uid) {
          alert("Something went wrong!");
          window.location.href = "/chat/";
          return;
        } else {
          updateChatroomObj(res.data);
        }
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    let isCancelled = false;

    if (chatParam) {
      const chatUid = chatParam.chat_uid;

      if (!isCancelled && chatUid) {
        fetchChatObj(chatUid);
      }
    }

    return () => {
      isCancelled = true;
    };
  }, [chatParam]);

  return (
    <div style={{ height: "100%" }}>
      <div id="Chat__rightDiv">
        <Stack direction="column" style={{ height: "100%" }}>
          {chatroomObj !== null ? (
            <>
              <ChatRightHeader />
              <ChatRightMessage />
            </>
          ) : (
            <NoChatroomSelected />
          )}
        </Stack>
      </div>
    </div>
  );
};

export default ChatRight;
