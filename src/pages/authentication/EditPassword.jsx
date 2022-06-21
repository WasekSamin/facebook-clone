import { Button, Container, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import CachedIcon from "@mui/icons-material/Cached";
import Navbar from "../../components/navbar/Navbar";
import "../../css/authentication/EditPassword.css";

const EditPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleUpdatePassword = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <Navbar />

      <div id="edit__passwordMainDiv">
        <Container maxWidth="lg">
          <Stack id="edit__passwordDiv" direction="column" spacing={2}>
            <Typography variant="h6" style={{ fontWeight: "600" }}>
              Update Password
            </Typography>

            <form onSubmit={handleUpdatePassword} method="POST">
              <Stack direction="column" spacing={2}>
              <TextField
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                label="New Password"
                variant="outlined"
              />
              <TextField
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                label="Confirm New Password"
                variant="outlined"
              />

              <Button variant="contained" color="secondary">
                <CachedIcon style={{ marginRight: "0.12rem" }} /> Update
                Password
              </Button>
              </Stack>
            </form>
          </Stack>
        </Container>
      </div>
    </div>
  );
};

export default EditPassword;
