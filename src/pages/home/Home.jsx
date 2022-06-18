import { Stack } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import Navbar from "../../components/navbar/Navbar";
import HomeLeft from "./HomeLeft";
import HomeMiddle from "./HomeMiddle";
import HomeRight from "./HomeRight";
import "../../css/home/Home.css";

const Home = () => {
  return (
    <div>
      <Navbar />

      <div className="home__mainDiv">
        <Container maxWidth="lg">
          <Stack direction="row" id="home__mainDivStack">
            <HomeLeft />
            <HomeMiddle />
            <HomeRight />
          </Stack>
        </Container>
      </div>
    </div>
  );
};

export default Home;
