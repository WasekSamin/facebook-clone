import { Stack, Typography, Container } from "@mui/material";
import React, {useState} from "react";
import Navbar from "../../components/navbar/Navbar";
import ProfilePages from "./ProfilePages";
import ProfileTop from "./ProfileTop";
import "../../css/profile/ProfilePhotos.css";
import dummy1 from "../../dummy/images/img1.jpg";
import ProfileImageViewModal from "../../components/profile/ProfileImageViewModal";
import { motion, AnimatePresence } from "framer-motion/dist/framer-motion";

const ProfilePhotos = () => {
    const [profileViewedImg, setProfileViewedImg] = useState(null);

    const profileImageViewModal = () => {
        return (
          <>
            {/* Profile image viewed modal starts */}
            {profileViewedImg !== null && (
              <div id="profile__viewImgModalOverlay"></div>
            )}
    
            <AnimatePresence initial={false} exitBeforeEnter={true}>
              {profileViewedImg !== null && (
                <motion.div
                  id="profile__viewImageModalMainDiv"
                  initial={{
                    opacity: 0,
                    y: "120%",
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: "120%",
                  }}
                >
                  <ProfileImageViewModal
                    profileViewedImg={profileViewedImg}
                    setProfileViewedImg={setProfileViewedImg}
                  />
                </motion.div>
              )}
            </AnimatePresence>
            {/* Profile image viewed modal ends */}
          </>
        );
      };

  return (
    <div>
      <Navbar />

      <div id="profile__mainDiv">
        <Container maxWidth="lg">
          {/* Profile image viewed modal */}
          {profileImageViewModal()}

          <ProfileTop />
          <ProfilePages currentProfilePage="profile_photos" />

          <div id="profile__photosDiv">
            <Stack direction="column" spacing={2}>
              <Typography variant="h6" style={{ fontWeight: "600" }}>
                Your Photos
              </Typography>

              <div id="profile__allPhotosDiv">
                <div onClick={() => setProfileViewedImg(1)} className="profile__photoImgDiv">
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
