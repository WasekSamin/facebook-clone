import { IconButton, Stack } from "@mui/material";
import React from "react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import "../../css/profile/ProfileImageViewModal.css";
import dummy1 from "../../dummy/images/img1.jpg";

const ProfileImageViewModal = ({ profileViewedImg, setProfileViewedImg }) => {
  return (
    <div id="profile__viewImageModal">
      <Stack direction="column" justifyContent="space-between" spacing={1} style={{ height: "100%" }}>
        <Stack direction="row" justifyContent="flex-end" alignItems="center">
          <IconButton onClick={() => setProfileViewedImg(null)} color="error">
            <CloseOutlinedIcon />
          </IconButton>
        </Stack>

        <div id="profile__viewImgDiv">
            <img src={dummy1} alt="" />
        </div>
      </Stack>
    </div>
  );
};

export default ProfileImageViewModal;
