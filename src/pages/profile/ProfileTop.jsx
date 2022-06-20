import React from "react";
import dummyImg from "../../dummy/images/img1.jpg";
import "../../css/profile/ProfileTop.css";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import { Button, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const ProfileTop = () => {
  return (
    <div>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        style={{ flexWrap: "wrap", gap: "1rem" }}
        id="profile__topMainDiv"
      >
        <Stack
          id="profile__topContentDiv"
          direction="row"
          alignItems="center"
          spacing={2}
        >
          <div id="profile__userImgMainDiv">
            <div id="profile__userMainImg">
              <img src={dummyImg} alt="" />
            </div>
            <Button
              id="profile__userImgChangeBtn"
              variant="contained"
              color="secondary"
            >
              <CameraAltOutlinedIcon />
            </Button>
          </div>

          <div>
            <Stack className="profile__topContentDetails" direction="column" spacing={0.2}>
              <Typography variant="h6" style={{ fontWeight: "bold" }}>
                Wasek Samin
              </Typography>
              <Typography
                variant="p"
                style={{
                  color: "var(--slate-600)",
                  fontSize: "1rem",
                  fontWeight: "500",
                }}
              >
                400 Friends
              </Typography>
              <Typography
                variant="p"
                style={{
                  marginTop: "0.3rem",
                  color: "var(--slate-600)",
                  fontSize: "1rem",
                }}
              >
                Currently studying & working
              </Typography>
              <Typography
                variant="p"
                style={{
                  marginTop: "0.3rem",
                  color: "var(--slate-600)",
                  fontSize: "1rem",
                }}
              >
                Studying at Some Institution
              </Typography>
              <Typography
                variant="p"
                style={{
                  marginTop: "0.3rem",
                  color: "var(--slate-600)",
                  fontSize: "1rem",
                }}
              >
                Working at Some Industry
              </Typography>
            </Stack>
          </div>
        </Stack>

        <Button
          className="profile__topEditUserInfoBtn"
          variant="contained"
          color="success"
        >
          <ModeEditOutlineOutlinedIcon style={{ marginRight: "0.12rem" }} />
          Edit Profile
        </Button>
      </Stack>
    </div>
  );
};

export default ProfileTop;
