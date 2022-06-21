import { IconButton, Stack } from "@mui/material";
import React, { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import "../../css/chat/ChatRightMessageInput.css";

const ChatRightMessageInput = () => {
  const [chatInputText, setChatInputText] = useState("");

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
