import { Avatar, IconButton, Stack, Typography } from "@mui/material";
import React from "react";
import { colorTheme } from "../../components/colorTheme/ColorTheme";
import profileImg from "../../dummy/images/portImg.png";
import "../../css/chat/ChatRightHeader.css";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Link } from "react-router-dom";

const ChatRightHeader = () => {
  return (
    <div id="chat__rightHeader">
      <Stack direction="row" justifyContent="space-between" spacing={2}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <div style={{ position: "relative" }}>
            <Avatar alt="Wasek Samin" src={profileImg} />
            <div className="chat__leftUserStatusBadge">
              <div
                style={{ backgroundColor: `${colorTheme.palette.green}` }}
              ></div>
            </div>
          </div>

          <Link to="#" style={{ color: "black" }}>
            <Typography
              className="chat__headerUsernameText"
              variant="p"
              style={{ fontSize: "1rem", fontWeight: "600" }}
            >
              Wasek Samin
            </Typography>
          </Link>
        </Stack>

        <IconButton color="error">
          <ExitToAppIcon />
        </IconButton>
      </Stack>
    </div>
  );
};

export default ChatRightHeader;
