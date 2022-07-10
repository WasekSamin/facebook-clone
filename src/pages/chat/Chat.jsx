import { Container, Grid, Stack } from "@mui/material";
import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import ChatLeft from "./ChatLeft";
import ChatRight from "./ChatRight";
import "../../css/chat/Chat.css";
import {
  AccountStore,
  APIStore,
  ChatStore,
  TokenStore,
} from "../../components/store/Store";
import axios from "axios";

const Chat = () => {
  let navigate = useNavigate();
  const chatParam = useParams();
  const loggedInUserInfo = AccountStore((state) => state.loggedInUserInfo);
  const MYAPI = APIStore((state) => state.MYAPI);
  const token = TokenStore((state) => state.token);
  const updateChatroomObj = ChatStore((state) => state.updateChatroomObj);

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
          if (loggedInUserInfo !== null) {
            (res.data.user1.uid === loggedInUserInfo.uid || res.data.user2.uid === loggedInUserInfo.uid) ?
            updateChatroomObj(res.data) : navigate("/chat/");
          }
        }
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    let isCancelled = false;

    if (Object.keys(chatParam).length > 0) {
      const chatUid = chatParam.chat_uid;

      if (!isCancelled && chatUid) {
        fetchChatObj(chatUid);
      }
    } else if (!isCancelled) {
      updateChatroomObj(null);
    }

    return () => {
      isCancelled = true;
    };
  }, [chatParam]);

  return (
    <div style={{ height: "100vh", overflow: "hidden" }}>
      <Navbar />

      <div id="chat__mainDiv">
        <Container maxWidth="lg">
          <Grid
            id="chat__mainGridContainer"
            container
            style={{ overflow: "hidden" }}
          >
            <Grid item xs={3}>
              <ChatLeft />
            </Grid>
            <Grid item xs={9}>
              <ChatRight />
            </Grid>
          </Grid>
        </Container>
      </div>
    </div>
  );
};

export default Chat;
