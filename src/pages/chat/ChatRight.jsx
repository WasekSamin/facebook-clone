import { Stack } from "@mui/material";
import React from "react";

import ChatRightHeader from "./ChatRightHeader";
import ChatRightMessage from "./ChatRightMessage";
import "../../css/chat/ChatRight.css";
import NoChatroomSelected from "./NoChatroomSelected";
import {
  ChatStore,
} from "../../components/store/Store";

const ChatRight = () => {
  const chatroomObj = ChatStore(state => state.chatroomObj);

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
