import { Avatar, Stack, Typography } from "@mui/material";
import React from "react";
import profileImg from "../../dummy/images/portImg.png";
import "../../css/chat/ChatLeftUsers.css";
import { colorTheme } from "../../components/colorTheme/ColorTheme";
import { Link } from "react-router-dom";

const ChatLeftUsers = () => {
  return (
    <div style={{ height: "calc(100% - 110px)" }}>
      <Stack id="chat__leftUserAllUsersDiv" direction="column" spacing={0.5}>
        <Link to="#" style={{ color: "black" }}>
          <Stack
            className="chat__leftUser"
            direction="row"
            alignItems="center"
            spacing={1}
          >
            <div style={{ position: "relative" }}>
              <Avatar alt="Wasek Samin" src={profileImg} />
              <div className="chat__leftUserStatusBadge">
                <div
                  style={{ backgroundColor: `${colorTheme.palette.green}` }}
                ></div>
              </div>
            </div>
            <Stack direction="column">
              <Typography
                variant="p"
                className="chat__leftUsernameText"
                style={{ fontSize: "1rem", fontWeight: "600" }}
              >
                Wasek Samin
              </Typography>
              <Typography
                variant="p"
                className="chat__leftUserLastText"
                style={{ color: "var(--slate-500)" }}
              >
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugit
                inventore, itaque modi tenetur illo aliquam quis obcaecati
                beatae eveniet dolorum.
              </Typography>
            </Stack>
          </Stack>
        </Link>

        <Link to="#" style={{ color: "black" }}>
          <Stack
            className="chat__leftUser"
            direction="row"
            alignItems="center"
            spacing={1}
          >
            <div style={{ position: "relative" }}>
              <Avatar alt="Wasek Samin" src={profileImg} />
              <div className="chat__leftUserStatusBadge">
                <div
                  style={{ backgroundColor: `${colorTheme.palette.green}` }}
                ></div>
              </div>
            </div>
            <Stack direction="column">
              <Typography
                variant="p"
                className="chat__leftUsernameText"
                style={{ fontSize: "1rem", fontWeight: "600" }}
              >
                Wasek Samin
              </Typography>
              <Typography
                variant="p"
                className="chat__leftUserLastText"
                style={{ color: "var(--slate-500)" }}
              >
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugit
                inventore, itaque modi tenetur illo aliquam quis obcaecati
                beatae eveniet dolorum.
              </Typography>
            </Stack>
          </Stack>
        </Link>
        <Link to="#" style={{ color: "black" }}>
          <Stack
            className="chat__leftUser"
            direction="row"
            alignItems="center"
            spacing={1}
          >
            <div style={{ position: "relative" }}>
              <Avatar alt="Wasek Samin" src={profileImg} />
              <div className="chat__leftUserStatusBadge">
                <div
                  style={{ backgroundColor: `${colorTheme.palette.green}` }}
                ></div>
              </div>
            </div>
            <Stack direction="column">
              <Typography
                variant="p"
                className="chat__leftUsernameText"
                style={{ fontSize: "1rem", fontWeight: "600" }}
              >
                Wasek Samin
              </Typography>
              <Typography
                variant="p"
                className="chat__leftUserLastText"
                style={{ color: "var(--slate-500)" }}
              >
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugit
                inventore, itaque modi tenetur illo aliquam quis obcaecati
                beatae eveniet dolorum.
              </Typography>
            </Stack>
          </Stack>
        </Link>
        <Link to="#" style={{ color: "black" }}>
          <Stack
            className="chat__leftUser"
            direction="row"
            alignItems="center"
            spacing={1}
          >
            <div style={{ position: "relative" }}>
              <Avatar alt="Wasek Samin" src={profileImg} />
              <div className="chat__leftUserStatusBadge">
                <div
                  style={{ backgroundColor: `${colorTheme.palette.green}` }}
                ></div>
              </div>
            </div>
            <Stack direction="column">
              <Typography
                variant="p"
                className="chat__leftUsernameText"
                style={{ fontSize: "1rem", fontWeight: "600" }}
              >
                Wasek Samin
              </Typography>
              <Typography
                variant="p"
                className="chat__leftUserLastText"
                style={{ color: "var(--slate-500)" }}
              >
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugit
                inventore, itaque modi tenetur illo aliquam quis obcaecati
                beatae eveniet dolorum.
              </Typography>
            </Stack>
          </Stack>
        </Link>
        <Link to="#" style={{ color: "black" }}>
          <Stack
            className="chat__leftUser"
            direction="row"
            alignItems="center"
            spacing={1}
          >
            <div style={{ position: "relative" }}>
              <Avatar alt="Wasek Samin" src={profileImg} />
              <div className="chat__leftUserStatusBadge">
                <div
                  style={{ backgroundColor: `${colorTheme.palette.green}` }}
                ></div>
              </div>
            </div>
            <Stack direction="column">
              <Typography
                variant="p"
                className="chat__leftUsernameText"
                style={{ fontSize: "1rem", fontWeight: "600" }}
              >
                Wasek Samin
              </Typography>
              <Typography
                variant="p"
                className="chat__leftUserLastText"
                style={{ color: "var(--slate-500)" }}
              >
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugit
                inventore, itaque modi tenetur illo aliquam quis obcaecati
                beatae eveniet dolorum.
              </Typography>
            </Stack>
          </Stack>
        </Link>
        <Link to="#" style={{ color: "black" }}>
          <Stack
            className="chat__leftUser"
            direction="row"
            alignItems="center"
            spacing={1}
          >
            <div style={{ position: "relative" }}>
              <Avatar alt="Wasek Samin" src={profileImg} />
              <div className="chat__leftUserStatusBadge">
                <div
                  style={{ backgroundColor: `${colorTheme.palette.green}` }}
                ></div>
              </div>
            </div>
            <Stack direction="column">
              <Typography
                variant="p"
                className="chat__leftUsernameText"
                style={{ fontSize: "1rem", fontWeight: "600" }}
              >
                Wasek Samin
              </Typography>
              <Typography
                variant="p"
                className="chat__leftUserLastText"
                style={{ color: "var(--slate-500)" }}
              >
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugit
                inventore, itaque modi tenetur illo aliquam quis obcaecati
                beatae eveniet dolorum.
              </Typography>
            </Stack>
          </Stack>
        </Link>
        <Link to="#" style={{ color: "black" }}>
          <Stack
            className="chat__leftUser"
            direction="row"
            alignItems="center"
            spacing={1}
          >
            <div style={{ position: "relative" }}>
              <Avatar alt="Wasek Samin" src={profileImg} />
              <div className="chat__leftUserStatusBadge">
                <div
                  style={{ backgroundColor: `${colorTheme.palette.green}` }}
                ></div>
              </div>
            </div>
            <Stack direction="column">
              <Typography
                variant="p"
                className="chat__leftUsernameText"
                style={{ fontSize: "1rem", fontWeight: "600" }}
              >
                Wasek Samin
              </Typography>
              <Typography
                variant="p"
                className="chat__leftUserLastText"
                style={{ color: "var(--slate-500)" }}
              >
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugit
                inventore, itaque modi tenetur illo aliquam quis obcaecati
                beatae eveniet dolorum.
              </Typography>
            </Stack>
          </Stack>
        </Link>
        <Link to="#" style={{ color: "black" }}>
          <Stack
            className="chat__leftUser"
            direction="row"
            alignItems="center"
            spacing={1}
          >
            <div style={{ position: "relative" }}>
              <Avatar alt="Wasek Samin" src={profileImg} />
              <div className="chat__leftUserStatusBadge">
                <div
                  style={{ backgroundColor: `${colorTheme.palette.green}` }}
                ></div>
              </div>
            </div>
            <Stack direction="column">
              <Typography
                variant="p"
                className="chat__leftUsernameText"
                style={{ fontSize: "1rem", fontWeight: "600" }}
              >
                Wasek Samin
              </Typography>
              <Typography
                variant="p"
                className="chat__leftUserLastText"
                style={{ color: "var(--slate-500)" }}
              >
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugit
                inventore, itaque modi tenetur illo aliquam quis obcaecati
                beatae eveniet dolorum.
              </Typography>
            </Stack>
          </Stack>
        </Link>
        <Link to="#" style={{ color: "black" }}>
          <Stack
            className="chat__leftUser"
            direction="row"
            alignItems="center"
            spacing={1}
          >
            <div style={{ position: "relative" }}>
              <Avatar alt="Wasek Samin" src={profileImg} />
              <div className="chat__leftUserStatusBadge">
                <div
                  style={{ backgroundColor: `${colorTheme.palette.green}` }}
                ></div>
              </div>
            </div>
            <Stack direction="column">
              <Typography
                variant="p"
                className="chat__leftUsernameText"
                style={{ fontSize: "1rem", fontWeight: "600" }}
              >
                Wasek Samin
              </Typography>
              <Typography
                variant="p"
                className="chat__leftUserLastText"
                style={{ color: "var(--slate-500)" }}
              >
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugit
                inventore, itaque modi tenetur illo aliquam quis obcaecati
                beatae eveniet dolorum.
              </Typography>
            </Stack>
          </Stack>
        </Link>
        <Link to="#" style={{ color: "black" }}>
          <Stack
            className="chat__leftUser"
            direction="row"
            alignItems="center"
            spacing={1}
          >
            <div style={{ position: "relative" }}>
              <Avatar alt="Wasek Samin" src={profileImg} />
              <div className="chat__leftUserStatusBadge">
                <div
                  style={{ backgroundColor: `${colorTheme.palette.green}` }}
                ></div>
              </div>
            </div>
            <Stack direction="column">
              <Typography
                variant="p"
                className="chat__leftUsernameText"
                style={{ fontSize: "1rem", fontWeight: "600" }}
              >
                Wasek Samin
              </Typography>
              <Typography
                variant="p"
                className="chat__leftUserLastText"
                style={{ color: "var(--slate-500)" }}
              >
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugit
                inventore, itaque modi tenetur illo aliquam quis obcaecati
                beatae eveniet dolorum.
              </Typography>
            </Stack>
          </Stack>
        </Link>
        <Link to="#" style={{ color: "black" }}>
          <Stack
            className="chat__leftUser"
            direction="row"
            alignItems="center"
            spacing={1}
          >
            <div style={{ position: "relative" }}>
              <Avatar alt="Wasek Samin" src={profileImg} />
              <div className="chat__leftUserStatusBadge">
                <div
                  style={{ backgroundColor: `${colorTheme.palette.green}` }}
                ></div>
              </div>
            </div>
            <Stack direction="column">
              <Typography
                variant="p"
                className="chat__leftUsernameText"
                style={{ fontSize: "1rem", fontWeight: "600" }}
              >
                Wasek Samin
              </Typography>
              <Typography
                variant="p"
                className="chat__leftUserLastText"
                style={{ color: "var(--slate-500)" }}
              >
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugit
                inventore, itaque modi tenetur illo aliquam quis obcaecati
                beatae eveniet dolorum.
              </Typography>
            </Stack>
          </Stack>
        </Link>
        <Link to="#" style={{ color: "black" }}>
          <Stack
            className="chat__leftUser"
            direction="row"
            alignItems="center"
            spacing={1}
          >
            <div style={{ position: "relative" }}>
              <Avatar alt="Wasek Samin" src={profileImg} />
              <div className="chat__leftUserStatusBadge">
                <div
                  style={{ backgroundColor: `${colorTheme.palette.green}` }}
                ></div>
              </div>
            </div>
            <Stack direction="column">
              <Typography
                variant="p"
                className="chat__leftUsernameText"
                style={{ fontSize: "1rem", fontWeight: "600" }}
              >
                Wasek Samin
              </Typography>
              <Typography
                variant="p"
                className="chat__leftUserLastText"
                style={{ color: "var(--slate-500)" }}
              >
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugit
                inventore, itaque modi tenetur illo aliquam quis obcaecati
                beatae eveniet dolorum.
              </Typography>
            </Stack>
          </Stack>
        </Link>
        <Link to="#" style={{ color: "black" }}>
          <Stack
            className="chat__leftUser"
            direction="row"
            alignItems="center"
            spacing={1}
          >
            <div style={{ position: "relative" }}>
              <Avatar alt="Wasek Samin" src={profileImg} />
              <div className="chat__leftUserStatusBadge">
                <div
                  style={{ backgroundColor: `${colorTheme.palette.green}` }}
                ></div>
              </div>
            </div>
            <Stack direction="column">
              <Typography
                variant="p"
                className="chat__leftUsernameText"
                style={{ fontSize: "1rem", fontWeight: "600" }}
              >
                Wasek Samin
              </Typography>
              <Typography
                variant="p"
                className="chat__leftUserLastText"
                style={{ color: "var(--slate-500)" }}
              >
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugit
                inventore, itaque modi tenetur illo aliquam quis obcaecati
                beatae eveniet dolorum.
              </Typography>
            </Stack>
          </Stack>
        </Link>
        <Link to="#" style={{ color: "black" }}>
          <Stack
            className="chat__leftUser"
            direction="row"
            alignItems="center"
            spacing={1}
          >
            <div style={{ position: "relative" }}>
              <Avatar alt="Wasek Samin" src={profileImg} />
              <div className="chat__leftUserStatusBadge">
                <div
                  style={{ backgroundColor: `${colorTheme.palette.green}` }}
                ></div>
              </div>
            </div>
            <Stack direction="column">
              <Typography
                variant="p"
                className="chat__leftUsernameText"
                style={{ fontSize: "1rem", fontWeight: "600" }}
              >
                Wasek Samin
              </Typography>
              <Typography
                variant="p"
                className="chat__leftUserLastText"
                style={{ color: "var(--slate-500)" }}
              >
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugit
                inventore, itaque modi tenetur illo aliquam quis obcaecati
                beatae eveniet dolorum.
              </Typography>
            </Stack>
          </Stack>
        </Link>
        <Link to="#" style={{ color: "black" }}>
          <Stack
            className="chat__leftUser"
            direction="row"
            alignItems="center"
            spacing={1}
          >
            <div style={{ position: "relative" }}>
              <Avatar alt="Wasek Samin" src={profileImg} />
              <div className="chat__leftUserStatusBadge">
                <div
                  style={{ backgroundColor: `${colorTheme.palette.green}` }}
                ></div>
              </div>
            </div>
            <Stack direction="column">
              <Typography
                variant="p"
                className="chat__leftUsernameText"
                style={{ fontSize: "1rem", fontWeight: "600" }}
              >
                Last One
              </Typography>
              <Typography
                variant="p"
                className="chat__leftUserLastText"
                style={{ color: "var(--slate-500)" }}
              >
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugit
                inventore, itaque modi tenetur illo aliquam quis obcaecati
                beatae eveniet dolorum.
              </Typography>
            </Stack>
          </Stack>
        </Link>
      </Stack>
    </div>
  );
};

export default ChatLeftUsers;
