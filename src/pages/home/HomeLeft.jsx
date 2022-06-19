import React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import "../../css/home/HomeLeft.css";
import Avatar from "@mui/material/Avatar";
import profileImg from "../../dummy/images/portImg.png";
import { Link } from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import Badge from "@mui/material/Badge";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import { Button } from "@mui/material";

const HomeLeft = () => {
  return (
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
          <List>
            <ListItem disablePadding>
              <Link to="/profile/">
                <ListItemButton>
                  <Avatar alt="Wasek Samin" src={profileImg} />
                  <ListItemText
                    primary="Wasek Samin"
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
              >
                Create
              </Button>
            </div>
          </List>
        </div>
      </Box>
    </div>
  );
};

export default HomeLeft;
