import { Container, Typography } from "@mui/material";
import React from "react";
import Navbar from "../../components/navbar/Navbar";

const ActiveAccount = () => {
  return (
    <div>
        <Navbar />

      <div style={{ position: "relative", top: "8rem" }}>
        <Container maxWidth="lg">
          <Typography
            variant="p"
            style={{ fontSize: "1rem", display: "flex", justifyContent: "center" }}
          >
            We have sent you a link in your gmail account. Kindly click on the
            link to activate your account.
          </Typography>
        </Container>
      </div>
    </div>
  );
};

export default ActiveAccount;
