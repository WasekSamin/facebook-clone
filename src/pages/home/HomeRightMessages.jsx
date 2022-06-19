import { Avatar, Button, Divider, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import "../../css/home/HomeRightMessages.css";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { motion, AnimatePresence } from "framer-motion/dist/framer-motion";
import profileImg from "../../dummy/images/portImg.png";
import { Link } from "react-router-dom";

const HomeRightMessages = () => {
  const [messageSearchText, setMessageSearchText] = useState("");

  return (
    <div style={{ height: "50vh", overflow: "hidden" }}>
      <div className="home__rightMessages">
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography
            variant="h6"
            style={{ marginBottom: "0.7rem", fontWeight: "600" }}
          >
            Messages
          </Typography>

          <Link to="/chat/" style={{ color: "black" }}>
            <Button color="secondary" style={{ textTransform: "capitalize" }}>
              See All
            </Button>
          </Link>
        </Stack>
        <Stack id="home__messageSearchDiv" direction="row" alignItems="center">
          <SearchIcon style={{ color: "var(--slate-500)" }} />
          <input
            value={messageSearchText}
            onChange={(e) => setMessageSearchText(e.target.value)}
            type="text"
            placeholder="Search Messages..."
          />
          <AnimatePresence initial={false} exitBeforeEnter={true}>
            {messageSearchText.length > 0 && (
              <motion.div
                id="home__rightMessageClearTextBtn"
                onClick={() => setMessageSearchText("")}
                initial={{
                  x: "150%",
                  opacity: 0,
                }}
                animate={{
                  x: "0",
                  opacity: 1,
                }}
                exit={{
                  x: "150%",
                  opacity: 0,
                }}
              >
                <CloseIcon style={{ color: "var(--slate-500)" }} />
              </motion.div>
            )}
          </AnimatePresence>
        </Stack>

        <Divider style={{ margin: "1rem 0" }} />
        <Stack id="home__rightAllMessages" direction="column">
          <Link to="#" style={{ color: "black" }} target="_blank">
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              className="home__rightMessageDiv"
            >
              <Avatar alt="Wasek Samin" src={profileImg} />
              <Stack direction="column" spacing={0.3}>
                <Typography
                  variant="p"
                  className="home__rightMessageUsernameText"
                  style={{ fontSize: "1rem", fontWeight: "600" }}
                >
                  Wasek Samin
                </Typography>
                <Typography
                  variant="p"
                  className="home__rightMessageUserChatText"
                  style={{ color: "var(--slate-500)" }}
                >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Optio, ratione.
                </Typography>
              </Stack>
            </Stack>
          </Link>

          <Link to="#" style={{ color: "black" }} target="_blank">
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              className="home__rightMessageDiv"
            >
              <Avatar alt="Wasek Samin" src={profileImg} />
              <Stack direction="column" spacing={0.3}>
                <Typography
                  variant="p"
                  className="home__rightMessageUsernameText"
                  style={{ fontSize: "1rem", fontWeight: "600" }}
                >
                  Wasek Samin
                </Typography>
                <Typography
                  variant="p"
                  className="home__rightMessageUserChatText"
                  style={{ color: "var(--slate-500)" }}
                >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Optio, ratione.
                </Typography>
              </Stack>
            </Stack>
          </Link>
          <Link to="#" style={{ color: "black" }} target="_blank">
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              className="home__rightMessageDiv"
            >
              <Avatar alt="Wasek Samin" src={profileImg} />
              <Stack direction="column" spacing={0.3}>
                <Typography
                  variant="p"
                  className="home__rightMessageUsernameText"
                  style={{ fontSize: "1rem", fontWeight: "600" }}
                >
                  Wasek Samin
                </Typography>
                <Typography
                  variant="p"
                  className="home__rightMessageUserChatText"
                  style={{ color: "var(--slate-500)" }}
                >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Optio, ratione.
                </Typography>
              </Stack>
            </Stack>
          </Link>
          <Link to="#" style={{ color: "black" }} target="_blank">
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              className="home__rightMessageDiv"
            >
              <Avatar alt="Wasek Samin" src={profileImg} />
              <Stack direction="column" spacing={0.3}>
                <Typography
                  variant="p"
                  className="home__rightMessageUsernameText"
                  style={{ fontSize: "1rem", fontWeight: "600" }}
                >
                  Wasek Samin
                </Typography>
                <Typography
                  variant="p"
                  className="home__rightMessageUserChatText"
                  style={{ color: "var(--slate-500)" }}
                >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Optio, ratione.
                </Typography>
              </Stack>
            </Stack>
          </Link>
          <Link to="#" style={{ color: "black" }} target="_blank">
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              className="home__rightMessageDiv"
            >
              <Avatar alt="Wasek Samin" src={profileImg} />
              <Stack direction="column" spacing={0.3}>
                <Typography
                  variant="p"
                  className="home__rightMessageUsernameText"
                  style={{ fontSize: "1rem", fontWeight: "600" }}
                >
                  Wasek Samin
                </Typography>
                <Typography
                  variant="p"
                  className="home__rightMessageUserChatText"
                  style={{ color: "var(--slate-500)" }}
                >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Optio, ratione.
                </Typography>
              </Stack>
            </Stack>
          </Link>
          <Link to="#" style={{ color: "black" }} target="_blank">
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              className="home__rightMessageDiv"
            >
              <Avatar alt="Wasek Samin" src={profileImg} />
              <Stack direction="column" spacing={0.3}>
                <Typography
                  variant="p"
                  className="home__rightMessageUsernameText"
                  style={{ fontSize: "1rem", fontWeight: "600" }}
                >
                  Wasek Samin
                </Typography>
                <Typography
                  variant="p"
                  className="home__rightMessageUserChatText"
                  style={{ color: "var(--slate-500)" }}
                >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Optio, ratione.
                </Typography>
              </Stack>
            </Stack>
          </Link>
          <Link to="#" style={{ color: "black" }} target="_blank">
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              className="home__rightMessageDiv"
            >
              <Avatar alt="Wasek Samin" src={profileImg} />
              <Stack direction="column" spacing={0.3}>
                <Typography
                  variant="p"
                  className="home__rightMessageUsernameText"
                  style={{ fontSize: "1rem", fontWeight: "600" }}
                >
                  Wasek Samin
                </Typography>
                <Typography
                  variant="p"
                  className="home__rightMessageUserChatText"
                  style={{ color: "var(--slate-500)" }}
                >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Optio, ratione.
                </Typography>
              </Stack>
            </Stack>
          </Link>
          <Link to="#" style={{ color: "black" }} target="_blank">
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              className="home__rightMessageDiv"
            >
              <Avatar alt="Wasek Samin" src={profileImg} />
              <Stack direction="column" spacing={0.3}>
                <Typography
                  variant="p"
                  className="home__rightMessageUsernameText"
                  style={{ fontSize: "1rem", fontWeight: "600" }}
                >
                  Wasek Samin
                </Typography>
                <Typography
                  variant="p"
                  className="home__rightMessageUserChatText"
                  style={{ color: "var(--slate-500)" }}
                >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Optio, ratione.
                </Typography>
              </Stack>
            </Stack>
          </Link>
          <Link to="#" style={{ color: "black" }} target="_blank">
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              className="home__rightMessageDiv"
            >
              <Avatar alt="Wasek Samin" src={profileImg} />
              <Stack direction="column" spacing={0.3}>
                <Typography
                  variant="p"
                  className="home__rightMessageUsernameText"
                  style={{ fontSize: "1rem", fontWeight: "600" }}
                >
                  Wasek Samin
                </Typography>
                <Typography
                  variant="p"
                  className="home__rightMessageUserChatText"
                  style={{ color: "var(--slate-500)" }}
                >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Optio, ratione.
                </Typography>
              </Stack>
            </Stack>
          </Link>
          <Link to="#" style={{ color: "black" }} target="_blank">
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              className="home__rightMessageDiv"
            >
              <Avatar alt="Wasek Samin" src={profileImg} />
              <Stack direction="column" spacing={0.3}>
                <Typography
                  variant="p"
                  className="home__rightMessageUsernameText"
                  style={{ fontSize: "1rem", fontWeight: "600" }}
                >
                  Wasek Samin
                </Typography>
                <Typography
                  variant="p"
                  className="home__rightMessageUserChatText"
                  style={{ color: "var(--slate-500)" }}
                >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Optio, ratione.
                </Typography>
              </Stack>
            </Stack>
          </Link>
          <Link to="#" style={{ color: "black" }} target="_blank">
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              className="home__rightMessageDiv"
            >
              <Avatar alt="Wasek Samin" src={profileImg} />
              <Stack direction="column" spacing={0.3}>
                <Typography
                  variant="p"
                  className="home__rightMessageUsernameText"
                  style={{ fontSize: "1rem", fontWeight: "600" }}
                >
                  Wasek Samin
                </Typography>
                <Typography
                  variant="p"
                  className="home__rightMessageUserChatText"
                  style={{ color: "var(--slate-500)" }}
                >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Optio, ratione.
                </Typography>
              </Stack>
            </Stack>
          </Link>

          <Link to="#" style={{ color: "black" }} target="_blank">
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              className="home__rightMessageDiv"
            >
              <Avatar alt="Wasek Samin" src={profileImg} />
              <Stack direction="column" spacing={0.3}>
                <Typography
                  variant="p"
                  className="home__rightMessageUsernameText"
                  style={{ fontSize: "1rem", fontWeight: "600" }}
                >
                  Last One
                </Typography>
                <Typography
                  variant="p"
                  className="home__rightMessageUserChatText"
                  style={{ color: "var(--slate-500)" }}
                >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Optio, ratione.
                </Typography>
              </Stack>
            </Stack>
          </Link>
        </Stack>
      </div>
    </div>
  );
};

export default HomeRightMessages;
