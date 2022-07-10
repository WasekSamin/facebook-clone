import { IconButton, Stack } from "@mui/material";
import React, { useState, useRef } from "react";
import SendIcon from "@mui/icons-material/Send";
import "../../css/chat/ChatRightMessageInput.css";
import axios from "axios";
import {
  AccountStore,
  APIStore,
  ChatStore,
  SocketStore,
  TokenStore,
} from "../../components/store/Store";

const ChatRightMessageInput = () => {
  const MYAPI = APIStore((state) => state.MYAPI);
  const loggedInUserInfo = AccountStore((state) => state.loggedInUserInfo);
  const [chatInputText, setChatInputText] = useState("");
  const chatMessageSendButtonRef = useRef(null);
  const chatroomObj = ChatStore((state) => state.chatroomObj);
  const token = TokenStore((state) => state.token);
  const socket = SocketStore((state) => state.socket);

  const sendMessage = async () => {
    if (!chatInputText || chatInputText.trim() === "") return;

    if (
      chatMessageSendButtonRef.current !== null &&
      loggedInUserInfo !== null
    ) {
      chatMessageSendButtonRef.current.disabled = true;

      let formData = new FormData();
      formData.append("senderUid", loggedInUserInfo.uid);
      formData.append("message", chatInputText.trim());
      formData.append("chatroomUid", chatroomObj.uid);
      formData.append("sendMessage", true);

      await axios
        .post(`${MYAPI}/chat/chat-message-list/`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `token ${token}`,
          },
        })
        .then((res) => {
          if (res.data.error && res.data.invalid_request) {
            alert("Invalid request! Failed to send message...");
          } else if (res.data.error) {
            alert("Failed to send the message!");
          } else if (!res.data.error && res.data.message_send_success) {
            getChatMessageObj(
              res.data.chat_message_uid,
              res.data.receiver_token
            );
            setChatInputText("");
          }
        })
        .catch((err) => console.error(err));

        chatMessageSendButtonRef.current.disabled = false;
    }
  };

  async function getChatMessageObj(chatMessageUid, receiverToken) {
    await axios
      .get(`${MYAPI}/chat/chat-message-detail/${chatMessageUid}/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `token ${token}`,
        },
      })
      .then((res) => {
        socket.emit("send-message", {
          chatMessageObj: res.data,
          receiverToken: receiverToken,
          userToken: token,
        });
      })
      .catch((err) => console.error(err));
  }

  return (
    <div id="chat__rightMessageInputParentDiv">
      <div id="chat__rightMessageInputDiv">
        <Stack
          direction="row"
          justifyContent="space-between"
          spacing={2}
          alignItems="center"
        >
          <textarea
            value={chatInputText}
            onChange={(e) => setChatInputText(e.target.value)}
            id="chat__rightMessageInputField"
            type="text"
            placeholder="Type your message..."
            rows={1}
          ></textarea>
          <IconButton
            ref={chatMessageSendButtonRef}
            onClick={sendMessage}
            disabled={chatInputText.length > 0 ? false : true}
            color="secondary"
          >
            <SendIcon />
          </IconButton>
        </Stack>
      </div>
    </div>
  );
};

export default ChatRightMessageInput;
