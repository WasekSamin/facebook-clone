import { Avatar, Stack, Typography } from "@mui/material";
import React, { useRef, useEffect } from "react";
import "../../css/chat/ChatRightMessage.css";
import ChatRightMessageInput from "./ChatRightMessageInput";
import profileImg from "../../dummy/images/portImg.png";
import { colorTheme } from "../../components/colorTheme/ColorTheme";

const ChatRightMessage = () => {
  const scrollToBottomDivRef = useRef(null);

  useEffect(() => {
    if (scrollToBottomDivRef.current !== null) {
      scrollToBottomDivRef.current.scrollTop = scrollToBottomDivRef.current.scrollHeight;
    }
  }, []);

  return (
    <div id="chat__rightMessageDiv">
      <Stack
        direction="column"
        justifyContent="space-between"
        style={{ height: "calc(100vh - 13rem)" }}
      >
        <div style={{ height: "100%" }}>
          <Stack ref={scrollToBottomDivRef} direction="column" spacing={2} id="chat__rightAllMessaages">
            <Stack
              style={{ width: "70%" }}
              direction="row"
              spacing={1}
              alignItems="flex-end"
            >
              <Avatar alt="Wasesk Samin" src={profileImg} />
              <Stack
                className="chat__rightOtherUserMessage"
                direction="column"
                spacing={0.2}
              >
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
            </Stack>

            <Stack
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
            </Stack>

            <Stack
              style={{ width: "70%" }}
              direction="row"
              spacing={1}
              alignItems="flex-end"
            >
              <Avatar alt="Wasesk Samin" src={profileImg} />
              <Stack
                className="chat__rightOtherUserMessage"
                direction="column"
                spacing={0.2}
              >
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
            </Stack>
            <Stack
              style={{ width: "70%" }}
              direction="row"
              spacing={1}
              alignItems="flex-end"
            >
              <Avatar alt="Wasesk Samin" src={profileImg} />
              <Stack
                className="chat__rightOtherUserMessage"
                direction="column"
                spacing={0.2}
              >
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
            </Stack>

            <Stack
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
            </Stack>
            <Stack
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
            </Stack>
            <Stack
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
            </Stack>
            <Stack
              style={{ width: "70%" }}
              direction="row"
              spacing={1}
              alignItems="flex-end"
            >
              <Avatar alt="Wasesk Samin" src={profileImg} />
              <Stack
                className="chat__rightOtherUserMessage"
                direction="column"
                spacing={0.2}
              >
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
            </Stack>
            <Stack
              style={{ width: "70%" }}
              direction="row"
              spacing={1}
              alignItems="flex-end"
            >
              <Avatar alt="Wasesk Samin" src={profileImg} />
              <Stack
                className="chat__rightOtherUserMessage"
                direction="column"
                spacing={0.2}
              >
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
            </Stack>
            <Stack
              style={{ width: "70%" }}
              direction="row"
              spacing={1}
              alignItems="flex-end"
            >
              <Avatar alt="Wasesk Samin" src={profileImg} />
              <Stack
                className="chat__rightOtherUserMessage"
                direction="column"
                spacing={0.2}
              >
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
            </Stack>
            <Stack
              style={{ width: "70%" }}
              direction="row"
              spacing={1}
              alignItems="flex-end"
            >
              <Avatar alt="Wasesk Samin" src={profileImg} />
              <Stack
                className="chat__rightOtherUserMessage"
                direction="column"
                spacing={0.2}
              >
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
            </Stack>
            <Stack
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
            </Stack>
            <Stack
              style={{ width: "70%" }}
              direction="row"
              spacing={1}
              alignItems="flex-end"
            >
              <Avatar alt="Wasesk Samin" src={profileImg} />
              <Stack
                className="chat__rightOtherUserMessage"
                direction="column"
                spacing={0.2}
              >
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
            </Stack>
            <Stack
              style={{ width: "70%" }}
              direction="row"
              spacing={1}
              alignItems="flex-end"
            >
              <Avatar alt="Wasesk Samin" src={profileImg} />
              <Stack
                className="chat__rightOtherUserMessage"
                direction="column"
                spacing={0.2}
              >
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
            </Stack>
            <Stack
              style={{ width: "70%" }}
              direction="row"
              spacing={1}
              alignItems="flex-end"
            >
              <Avatar alt="Wasesk Samin" src={profileImg} />
              <Stack
                className="chat__rightOtherUserMessage"
                direction="column"
                spacing={0.2}
              >
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
            </Stack>
            <Stack
              style={{ width: "70%" }}
              direction="row"
              spacing={1}
              alignItems="flex-end"
            >
              <Avatar alt="Wasesk Samin" src={profileImg} />
              <Stack
                className="chat__rightOtherUserMessage"
                direction="column"
                spacing={0.2}
              >
                <Typography style={{ fontSize: "1rem" }} variant="p">
                  Last Message
                </Typography>
                <Typography variant="p" style={{ color: "var(--slate-600)" }}>
                  Datetime
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </div>
      </Stack>
      <div>
        <ChatRightMessageInput />
      </div>
    </div>
  );
};

export default ChatRightMessage;
