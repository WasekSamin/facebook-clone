import { Container, Grid } from "@mui/material";
import React from "react";
import Navbar from "../../components/navbar/Navbar";
import ProfileTop from "./ProfileTop";
import "../../css/profile/Profile.css";
import ProfilePages from "./ProfilePages";
import ProfilePostLeftSidebar from "./ProfilePostLeftSidebar";
import ProfilePost from "./ProfilePost";
import ProfileImageViewModal from "../../components/profile/ProfileImageViewModal";

const Profile = () => {
  return (
    <div>
      <Navbar />

      <div id="profile__mainDiv">
        <Container maxWidth="lg">
          <ProfileTop />
          <ProfilePages currentProfilePage="profile_post" />

          <Grid id="profile__postGridDiv" container spacing={2}>
            <Grid item xs={5}>
                <ProfilePostLeftSidebar />
            </Grid>
            <Grid item xs={7}>
                <ProfilePost />
            </Grid>
          </Grid>
        </Container>
      </div>
    </div>
  );
};

export default Profile;
