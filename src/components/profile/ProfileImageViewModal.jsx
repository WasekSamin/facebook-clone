import { IconButton, Stack } from "@mui/material";
import React, {useRef, useEffect} from "react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import "../../css/profile/ProfileImageViewModal.css";
import dummy1 from "../../dummy/images/img1.jpg";

const ProfileImageViewModal = ({ profileViewedImg, setProfileViewedImg }) => {
  const profileViewImageModalRef = useRef(null);

  const closeProfileImageViewModal = (event) => {
    if (profileViewImageModalRef.current !== null && !profileViewImageModalRef.current.contains(event.target)) {
      setProfileViewedImg(null);
    }
  }

  useEffect(() => {
    document.addEventListener("click", closeProfileImageViewModal, true);

    return () => {
      document.removeEventListener("click", closeProfileImageViewModal, true);
    }
  }, [])
  
  return (
    <div id="profile__viewImageModal" ref={profileViewImageModalRef}>
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
