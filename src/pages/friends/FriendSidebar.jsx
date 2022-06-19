import React, { useState } from "react";
import "../../css/friends/FriendSidebar.css";
import GroupIcon from "@mui/icons-material/Group";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Link } from "react-router-dom";

const FriendSidebar = ({selectedPage}) => {
  return (
    <div style={{ height: "100%" }}>
      <div id="friend__sidebar">
        <List>
          <ListItem disablePadding>
            <Link to="/friend-list/" style={{ color: "black", width: "100%" }}>
              <ListItemButton
                selected={selectedPage === "friendList"}
              >
                <ListItemIcon>
                  <GroupIcon />
                </ListItemIcon>
                <ListItemText primary="Friend List" />
              </ListItemButton>
            </Link>
          </ListItem>
          <ListItem disablePadding>
            <Link
              to="/friend-requests/"
              style={{ color: "black", width: "100%" }}
            >
              <ListItemButton
                selected={selectedPage === "friendRequest"}
              >
                <ListItemIcon>
                  <GroupAddIcon />
                </ListItemIcon>
                <ListItemText primary="Friend Requests" />
              </ListItemButton>
            </Link>
          </ListItem>
        </List>
      </div>
    </div>
  );
};

export default FriendSidebar;
