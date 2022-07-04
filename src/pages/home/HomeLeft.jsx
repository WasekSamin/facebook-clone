import React, { useState } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import "../../css/home/HomeLeft.css";
import Avatar from "@mui/material/Avatar";
import dummyImg from "../../dummy/static_images/default_profile.png";
import { Link } from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import Badge from "@mui/material/Badge";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import { Button, Stack } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion/dist/framer-motion";
import CreatePostModal from "../../components/post/CreatePostModal";
import { AccountStore, APIStore } from "../../components/store/Store";
import RefreshIcon from "@mui/icons-material/Refresh";

const HomeLeft = () => {
  const [openCreatePostModal, setOpenCreatePostModal] = useState(false);
  const loggedInUserInfo = AccountStore((state) => state.loggedInUserInfo);
  const MYAPI = APIStore(state => state.MYAPI);

  const createPostModal = () => {
    return (
      <>
        {openCreatePostModal && <div id="create__postOverlay"></div>}

        {/* Create post modal */}
        <AnimatePresence initial={false} exitBeforeEnter={true}>
          {openCreatePostModal && (
            <motion.div
              initial={{
                scale: 0,
                opacity: 0,
              }}
              animate={{
                scale: 1,
                opacity: 1,
              }}
              exit={{
                scale: 0,
                opacity: 0,
              }}
              className="createPostModalMainDiv"
            >
              <CreatePostModal
                openCreatePostModal={openCreatePostModal}
                setOpenCreatePostModal={setOpenCreatePostModal}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  };

  return (
    <>
      {createPostModal()}
      <div className="home__leftMainDiv">
        <Box
          sx={{
            width: "100%",
            maxWidth: 360,
            bgcolor: "background.paper",
            borderRadius: "10px",
          }}
        >
          <div className="home__leftLinkList">
            {loggedInUserInfo !== null ? (
              <List>
                <ListItem disablePadding>
                  <Link
                    to={`/profile/${loggedInUserInfo.uid}/${loggedInUserInfo.username}/`}
                  >
                    <ListItemButton>
                      <Avatar
                        alt={loggedInUserInfo.username}
                        src={loggedInUserInfo.current_profile_pic !== null ? `${MYAPI}${loggedInUserInfo.current_profile_pic}` : dummyImg}
                      />
                      <ListItemText
                        primary={loggedInUserInfo.username}
                        id="home__leftProfileUsernameText"
                      />
                    </ListItemButton>
                  </Link>
                </ListItem>
                <Divider />
                <ListItem disablePadding>
                  <Link to="/">
                    <ListItemButton>
                      <ListItemIcon>
                        <HomeOutlinedIcon />
                      </ListItemIcon>
                      <ListItemText primary="Home" />
                    </ListItemButton>
                  </Link>
                </ListItem>
                <ListItem disablePadding>
                  <Link to="/chat/">
                    <ListItemButton>
                      <ListItemIcon>
                        <Badge
                          color="secondary"
                          badgeContent={10}
                          max={9}
                          className="home__leftLinkBadges"
                        >
                          <ChatBubbleOutlineIcon />
                        </Badge>
                      </ListItemIcon>
                      <ListItemText primary="Messages" />
                    </ListItemButton>
                  </Link>
                </ListItem>
                <ListItem disablePadding>
                  <Link to="/notifications/">
                    <ListItemButton>
                      <ListItemIcon>
                        <Badge
                          color="secondary"
                          badgeContent={10}
                          max={9}
                          className="home__leftLinkBadges"
                        >
                          <NotificationsNoneIcon />
                        </Badge>
                      </ListItemIcon>
                      <ListItemText primary="Notifications" />
                    </ListItemButton>
                  </Link>
                </ListItem>
                <ListItem disablePadding>
                  <Link to="/friend-requests/">
                    <ListItemButton>
                      <ListItemIcon>
                        <Badge
                          color="secondary"
                          badgeContent={10}
                          max={9}
                          className="home__leftLinkBadges"
                        >
                          <PeopleOutlineIcon />
                        </Badge>
                      </ListItemIcon>
                      <ListItemText primary="Friend Requests" />
                    </ListItemButton>
                  </Link>
                </ListItem>
                <Divider style={{ marginBottom: "1rem" }} />
                <div style={{ padding: "0 6px 0 0" }}>
                  <Button
                    variant="contained"
                    color="secondary"
                    style={{
                      borderRadius: "9999px",
                      width: "93%",
                      margin: "0 10px",
                    }}
                    onClick={() => setOpenCreatePostModal(true)}
                  >
                    Create
                  </Button>
                </div>
              </List>
            ) : (
              <Stack
                style={{
                  display: "flex",
                  backgroundColor: "white",
                  paddingTop: "1rem",
                  borderRadius: "10px",
                }}
                justifyContent="center"
                alignItems="center"
              >
                <RefreshIcon
                  className="profile__allPicsSpinner"
                  style={{ color: "var(--slate-500)", marginBottom: "1rem" }}
                />
              </Stack>
            )}
          </div>
        </Box>
      </div>
    </>
  );
};

export default HomeLeft;
