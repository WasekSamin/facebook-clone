import { Container, Grid, Stack } from "@mui/material";
import React from "react";
import Navbar from "../../components/navbar/Navbar";
import ChatLeft from "./ChatLeft";
import ChatRight from "./ChatRight";
import "../../css/chat/Chat.css";

const Chat = () => {
  return (
    <div style={{ height: "100vh", overflow: "hidden" }}>
      <Navbar />

      <div id="chat__mainDiv">
        <Container maxWidth="lg">
        <Grid id="chat__mainGridContainer" container style={{ overflow: "hidden" }}>
          <Grid item xs={3}>
            <ChatLeft />
          </Grid>
          <Grid item xs={9}>
          <ChatRight />
          </Grid>
        </Grid>
        </Container>
      </div>
    </div>
  );
};

export default Chat;
