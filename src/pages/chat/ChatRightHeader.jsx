import { Avatar, Stack, Typography } from "@mui/material";
import React from "react";
import { colorTheme } from "../../components/colorTheme/ColorTheme";
import dummyImg from "../../dummy/static_images/default_profile.png";
import "../../css/chat/ChatRightHeader.css";
import { Link } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import {
  AccountStore,
  APIStore,
  ChatStore,
} from "../../components/store/Store";

const ChatRightHeader = () => {
  const loggedInUserInfo = AccountStore((state) => state.loggedInUserInfo);
  const chatroomObj = ChatStore((state) => state.chatroomObj);
  const MYAPI = APIStore((state) => state.MYAPI);

  return (
    <div id="chat__rightHeader">
      <Stack direction="row" justifyContent="space-between" spacing={2}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <div style={{ position: "relative" }}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Link to="/chat/" id="chat__goBackBtn">
                <KeyboardBackspaceIcon />
              </Link>
              {chatroomObj !== null && loggedInUserInfo !== null && (
                <Link
                  to={
                    chatroomObj.user1.uid === loggedInUserInfo.uid
                      ? `/profile/${chatroomObj.user2.uid}/${chatroomObj.user2.username}/`
                      : `/profile/${chatroomObj.user1.uid}/${chatroomObj.user1.username}/`
                  }
                >
                  <Avatar
                    alt={
                      chatroomObj.user1.uid === loggedInUserInfo.uid
                        ? chatroomObj.user2.username
                        : chatroomObj.user1.username
                    }
                    src={
                      chatroomObj.user1.uid === loggedInUserInfo.uid
                        ? chatroomObj.user2.current_profile_pic !== null
                          ? `${MYAPI}${chatroomObj.user2.current_profile_pic}`
                          : dummyImg
                        : chatroomObj.user1.current_profile_pic !== null
                        ? `${MYAPI}${chatroomObj.user1.current_profile_pic}`
                        : dummyImg
                    }
                  />
                </Link>
              )}
            </Stack>
            <div className="chat__leftUserStatusBadge">
              <div
                style={{ backgroundColor: `${colorTheme.palette.green}` }}
              ></div>
            </div>
          </div>

          {chatroomObj !== null && loggedInUserInfo !== null && (
            <Link
              to={
                chatroomObj.user1.uid === loggedInUserInfo.uid
                  ? `/profile/${chatroomObj.user2.uid}/${chatroomObj.user2.username}/`
                  : `/profile/${chatroomObj.user1.uid}/${chatroomObj.user1.username}/`
              }
              style={{ color: "black" }}
            >
              <Typography
                className="chat__headerUsernameText"
                variant="p"
                style={{ fontSize: "1rem", fontWeight: "600" }}
              >
                {chatroomObj.user1.uid === loggedInUserInfo.uid
                  ? chatroomObj.user2.username
                  : chatroomObj.user1.username}
              </Typography>
            </Link>
          )}
        </Stack>
      </Stack>
    </div>
  );
};

export default ChatRightHeader;
