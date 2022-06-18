import { Divider, Stack } from "@mui/material";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import "../../css/chat/ChatLeft.css";
import { motion, AnimatePresence } from "framer-motion/dist/framer-motion";
import ChatLeftUsers from "./ChatLeftUsers";

const ChatLeft = () => {
  const [chatSearchUserText, setChatSearchUserText] = useState("");

  return (
    <div>
      <div id="chat__leftDiv">
        <Stack style={{ height: "100%" }} direction="column" spacing={2}>
          <Stack direction="column" spacing={1}>
            <Stack
              direction="row"
              alignItems="center"
              id="chat__leftSearchUser"
            >
              <SearchIcon style={{ color: "var(--slate-500)" }} />
              <input
                value={chatSearchUserText}
                onChange={(e) => setChatSearchUserText(e.target.value)}
                type="text"
                placeholder="Search people..."
              />
              <AnimatePresence initial={false} exitBeforeEnter={true}>
                {chatSearchUserText.length > 0 && (
                  <motion.div
                    style={{ display: "flex" }}
                    initial={{
                      x: "150%",
                      opacity: 0,
                    }}
                    animate={{
                      x: 0,
                      opacity: 1,
                    }}
                    exit={{
                      x: "150%",
                      opacity: 0,
                    }}
                  >
                    <CloseIcon
                      onClick={() => setChatSearchUserText("")}
                      style={{ color: "var(--slate-500)", cursor: "pointer" }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </Stack>

            <Divider />
          </Stack>

          <ChatLeftUsers />
        </Stack>
      </div>
    </div>
  );
};

export default ChatLeft;
