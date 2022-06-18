import { Avatar, Stack, Typography } from "@mui/material";
import React from "react";
import "../../css/chat/ChatRightMessage.css";
import ChatRightMessageInput from "./ChatRightMessageInput";
import profileImg from "../../dummy/images/portImg.png";

const ChatRightMessage = () => {
  return (
    <div id="chat__rightMessageDiv">
      <Stack
        direction="column"
        justifyContent="space-between"
        style={{ height: "calc(100% - 4rem)" }}
      >
        <div>
          <Stack direction="column" spacing={2}>
            <Stack direction="row" spacing={1} alignItems="flex-end">
              <Avatar alt="Wasesk Samin" src={profileImg} />
              <Stack direction="column" spacing={0.2}>
                <Typography style={{ fontSize: "1rem", color: "var(--slate-600)" }} variant="p">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit odio, atque est laboriosam, officiis suscipit fugit deleniti libero, incidunt in voluptas nesciunt beatae dicta alias! Quas esse quos dolorum optio!
                </Typography>
                <Typography variant="p" style={{ color: "var(--slate-500)" }}>
                    Datetime
                </Typography>
              </Stack>
            </Stack>

            <Stack direction="row" spacing={1} alignItems="flex-end">
              <Avatar alt="Wasesk Samin" src={profileImg} />
              <Stack direction="column" spacing={0.2}>
                <Typography style={{ fontSize: "1rem", color: "var(--slate-600)" }} variant="p">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit odio, atque est laboriosam, officiis suscipit fugit deleniti libero, incidunt in voluptas nesciunt beatae dicta alias! Quas esse quos dolorum optio!
                </Typography>
                <Typography variant="p" style={{ color: "var(--slate-500)" }}>
                    Datetime
                </Typography>
              </Stack>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="flex-end">
              <Avatar alt="Wasesk Samin" src={profileImg} />
              <Stack direction="column" spacing={0.2}>
                <Typography style={{ fontSize: "1rem", color: "var(--slate-600)" }} variant="p">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit odio, atque est laboriosam, officiis suscipit fugit deleniti libero, incidunt in voluptas nesciunt beatae dicta alias! Quas esse quos dolorum optio!
                </Typography>
                <Typography variant="p" style={{ color: "var(--slate-500)" }}>
                    Datetime
                </Typography>
              </Stack>
            </Stack>
          </Stack>
            {/* Updated */}
        </div>
        <div>
          <ChatRightMessageInput />
        </div>
      </Stack>
    </div>
  );
};

export default ChatRightMessage;
