import { Stack, Typography, Container } from "@mui/material";
import React from "react";
import Navbar from "../../components/navbar/Navbar";
import ProfilePages from "./ProfilePages";
import ProfileTop from "./ProfileTop";
import "../../css/profile/ProfilePhotos.css";
import dummy1 from "../../dummy/images/img1.jpg";

const ProfilePhotos = () => {
  return (
    <div>
      <Navbar />

      <div id="profile__mainDiv">
        <Container maxWidth="lg">
          <ProfileTop />
          <ProfilePages currentProfilePage="profile_photos" />

          <div id="profile__photosDiv">
            <Stack direction="column" spacing={2}>
              <Typography variant="h6" style={{ fontWeight: "600" }}>Your Photos</Typography>

              <div id="profile__allPhotosDiv">
                <div className="profile__photoImgDiv">
                    <img src={dummy1} alt="" />
                </div>
                <div className="profile__photoImgDiv">
                    <img src={dummy1} alt="" />
                </div>
                <div className="profile__photoImgDiv">
                    <img src={dummy1} alt="" />
                </div>
                <div className="profile__photoImgDiv">
                    <img src={dummy1} alt="" />
                </div>
                <div className="profile__photoImgDiv">
                    <img src={dummy1} alt="" />
                </div>
                <div className="profile__photoImgDiv">
                    <img src={dummy1} alt="" />
                </div>
                <div className="profile__photoImgDiv">
                    <img src={dummy1} alt="" />
                </div>
                <div className="profile__photoImgDiv">
                    <img src={dummy1} alt="" />
                </div>
                <div className="profile__photoImgDiv">
                    <img src={dummy1} alt="" />
                </div>
                <div className="profile__photoImgDiv">
                    <img src={dummy1} alt="" />
                </div>
                <div className="profile__photoImgDiv">
                    <img src={dummy1} alt="" />
                </div>
                <div className="profile__photoImgDiv">
                    <img src={dummy1} alt="" />
                </div>
                <div className="profile__photoImgDiv">
                    <img src={dummy1} alt="" />
                </div>
                <div className="profile__photoImgDiv">
                    <img src={dummy1} alt="" />
                </div>
                <div className="profile__photoImgDiv">
                    <img src={dummy1} alt="" />
                </div>
                <div className="profile__photoImgDiv">
                    <img src={dummy1} alt="" />
                </div>
                <div className="profile__photoImgDiv">
                    <img src={dummy1} alt="" />
                </div>
                <div className="profile__photoImgDiv">
                    <img src={dummy1} alt="" />
                </div>
                <div className="profile__photoImgDiv">
                    <img src={dummy1} alt="" />
                </div>
              </div>
            </Stack>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default ProfilePhotos;
