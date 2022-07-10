import { IconButton } from "@mui/material";
import React, { useRef, useEffect } from "react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import "../../css/profile/ProfileImageViewModal.css";
import dummyImg from "../../dummy/static_images/default_profile.png";
import { APIStore } from "../store/Store";

const ProfileImageViewModal = ({ profileViewedImg, setProfileViewedImg }) => {
  const profileViewImageModalRef = useRef(null);
  const MYAPI = APIStore((state) => state.MYAPI);

  const closeProfileImageViewModal = (event) => {
    if (
      profileViewImageModalRef.current !== null &&
      !profileViewImageModalRef.current.contains(event.target)
    ) {
      setProfileViewedImg(null);
    }
  };

  useEffect(() => {
    document.addEventListener("click", closeProfileImageViewModal, true);

    return () => {
      document.removeEventListener("click", closeProfileImageViewModal, true);
    };
  }, []);

  return (
    <div id="profile__viewImageModal" ref={profileViewImageModalRef}>
      <div>
        <IconButton
          id="preview__imgModalCloseBtn"
          onClick={() => setProfileViewedImg(null)}
          color="error"
        >
          <CloseOutlinedIcon />
        </IconButton>

        <div id="profile__viewImgDiv">
          <img
            src={
              profileViewedImg !== null
                ? `${MYAPI}${profileViewedImg}`
                : dummyImg
            }
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileImageViewModal;
