import { Grid, Stack } from "@mui/material";
import React from "react";
import Navbar from "../../components/navbar/Navbar";
import ChatLeft from "./ChatLeft";
import ChatRight from "./ChatRight";
import "../../css/chat/Chat.css";

const Chat = () => {
  return (
    <div style={{ overflow: "hidden" }}>
      <Navbar />

      <div id="chat__mainDiv">
        <Grid container>
          <Grid item xs={3}>
            <ChatLeft />
          </Grid>
          <Grid item xs={9}>
          <ChatRight />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Chat;
