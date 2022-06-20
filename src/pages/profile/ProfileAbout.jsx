import { Button, Container, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import "../../css/profile/ProfileAbout.css";
import ProfilePages from "./ProfilePages";
import ProfileTop from "./ProfileTop";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

const ProfileAbout = () => {
  const [workStatus, setWorkStatus] = useState(null);
  const [gender, setGender] = useState(null);
  const [relationStatus, setRelationStatus] = useState(null);

  const profileAboutFormSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <Navbar />

      <div id="profile__mainDiv">
        <Container maxWidth="lg">
          <ProfileTop />
          <ProfilePages currentProfilePage="profile_about" />

          <div id="profile__aboutCard">
            <Typography
              variant="h6"
              style={{ fontWeight: "600", marginBottom: "1rem" }}
            >
              Profile Intro
            </Typography>
            <form onSubmit={profileAboutFormSubmit} method="post">
              <Stack direction="column" spacing={2}>
                <TextField
                  id="username"
                  label="Username..."
                  variant="outlined"
                />
                <TextField
                  id="address"
                  label="Address..."
                  variant="outlined"
                  multiline={true}
                  maxRows={4}
                />
                <FormControl>
                  <FormLabel id="profile__workingStatus">Studying or Working?</FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="profile__gender"
                    defaultValue="studying"
                    name="radio-buttons-group"
                    value={workStatus}
                    onChange={e => setWorkStatus(e.target.value)}
                  >
                    <FormControlLabel
                      value="studying"
                      control={<Radio />}
                      label="Studying"
                    />
                    <FormControlLabel
                      value="working"
                      control={<Radio />}
                      label="Working"
                    />
                    <FormControlLabel
                      value="both"
                      control={<Radio />}
                      label="Both"
                    />
                    <FormControlLabel
                      value="none"
                      control={<Radio />}
                      label="None"
                    />
                  </RadioGroup>
                </FormControl>

                {(workStatus === "studying" ||
                  workStatus === "both") && (
                  <TextField
                    id="studying_place"
                    label="Studying At..."
                    variant="outlined"
                  />
                )}
                {(workStatus === "working" ||
                  workStatus === "both") && (
                  <TextField
                    id="working__place"
                    label="Working At..."
                    variant="outlined"
                  />
                )}

                <TextField
                  id="profile__phnNo"
                  label="Phone No..."
                  variant="outlined"
                />

                <FormControl>
                  <FormLabel id="profile__gender">Gender</FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="profile__gender"
                    defaultValue="male"
                    name="radio-buttons-group"
                    value={gender}
                    onChange={e => setGender(e.target.value)}
                  >
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="Male"
                    />
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label="Female"
                    />
                    <FormControlLabel
                      value="other"
                      control={<Radio />}
                      label="Other"
                    />
                  </RadioGroup>
                </FormControl>

                <FormControl>
                  <FormLabel id="demo-radio-buttons-group-label">
                    Relationship Status
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="single"
                    name="radio-buttons-group"
                    value={relationStatus}
                    onChange={e => setRelationStatus(e.target.value)}
                  >
                    <FormControlLabel
                      value="single"
                      control={<Radio />}
                      label="Single"
                    />
                    <FormControlLabel
                      value="married"
                      control={<Radio />}
                      label="Married"
                    />
                  </RadioGroup>
                </FormControl>

                <Button type="submit" variant="contained" color="secondary">Update Profile</Button>
              </Stack>
            </form>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default ProfileAbout;
