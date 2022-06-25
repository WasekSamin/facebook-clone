import React, { useState } from "react";
import dummyImg from "../../dummy/static_images/default_profile.png";
import "../../css/profile/ProfileTop.css";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import { Button, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion/dist/framer-motion";
import EditProfileModal from "../../components/profile/EditProfileModal";
import EditProfilePicModal from "../../components/profile/EditProfilePicModal";
import ProfileImageViewModal from "../../components/profile/ProfileImageViewModal";
import {
  APIStore,
  ProfileStore,
} from "../../components/store/Store";

const ProfileTop = () => {
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [showEditProfilePicModal, setShowEditProfilePicModal] = useState(false);
  const [profileViewedImg, setProfileViewedImg] = useState(null);
  const MYAPI = APIStore((state) => state.MYAPI);
  const currentProfile = ProfileStore((state) => state.currentProfile);
  const canCurrentProfileEditable = ProfileStore(
    (state) => state.canCurrentProfileEditable
  );

  const editProfileDetailsModal = () => {
    return (
      <>
        {showEditProfileModal && <div id="editProfileModalOverlay"></div>}
        <AnimatePresence initial={false} exitBeforeEnter={true}>
          {showEditProfileModal && (
            <motion.div
              id="edit__profileModalMotionDiv"
              initial={{
                y: "120%",
                opacity: 0,
              }}
              animate={{
                y: 0,
                opacity: 1,
              }}
              exit={{
                y: "120%",
                opacity: 0,
              }}
            >
              <EditProfileModal
                showEditProfileModal={showEditProfileModal}
                setShowEditProfileModal={setShowEditProfileModal}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  };

  const editProfilePicModal = () => {
    return (
      <>
        {showEditProfilePicModal && (
          <div id="edit__profilePicModalOverlay"></div>
        )}

        <AnimatePresence initial={false} exitBeforeEnter={true}>
          {showEditProfilePicModal && (
            <motion.div
              id="edit__profilePicModalMotionDiv"
              initial={{
                y: "120%",
                opacity: 0,
              }}
              animate={{
                y: 0,
                opacity: 1,
              }}
              exit={{
                y: "120%",
                opacity: 0,
              }}
            >
              <EditProfilePicModal
                showEditProfilePicModal={showEditProfilePicModal}
                setShowEditProfilePicModal={setShowEditProfilePicModal}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  };

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
      {/* Edit profile details modal */}
      {editProfileDetailsModal()}

      {/* Edit profile pic modal */}
      {editProfilePicModal()}

      {/* Profile image viewed modal */}
      {profileImageViewModal()}

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
            <div
              onClick={() => setProfileViewedImg(1)}
              id="profile__userMainImg"
            >
              <img
                src={
                  currentProfile !== null &&
                  currentProfile.current_profile_pic !== null
                    ? `${MYAPI}${currentProfile.current_profile_pic}`
                    : dummyImg
                }
                alt=""
              />
            </div>
            {canCurrentProfileEditable && (
              <Button
                id="profile__userImgChangeBtn"
                variant="contained"
                color="secondary"
                onClick={() => setShowEditProfilePicModal(true)}
              >
                <CameraAltOutlinedIcon />
              </Button>
            )}
          </div>

          <div>
            {currentProfile !== null && (
              <Stack
                className="profile__topContentDetails"
                direction="column"
                spacing={0.2}
              >
                <Typography variant="h6" style={{ fontWeight: "bold" }}>
                  {currentProfile.username}
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
                {currentProfile.working_status !== null && (
                  <>
                    <Typography
                      variant="p"
                      style={{
                        marginTop: "0.3rem",
                        color: "var(--slate-600)",
                        fontSize: "1rem",
                        textTransform: "capitalize"
                      }}
                    >
                      {currentProfile.working_status === "Both"
                        ? "Currently working & Studying"
                        : currentProfile.working_status === "Studying"
                        ? "Currently a student"
                        : currentProfile.working_status === "Working"
                        ? `Currently working as ${currentProfile.job_position}`
                        : "Currently unemployed"}
                    </Typography>
                    {(currentProfile.working_status === "Both" ||
                      currentProfile.working_status === "Studying") && (
                      <Typography
                        variant="p"
                        style={{
                          marginTop: "0.3rem",
                          color: "var(--slate-600)",
                          fontSize: "1rem",
                          textTransform: "capitalize"
                        }}
                      >
                        Studying at {currentProfile.studying_at}
                      </Typography>
                    )}
                    {(currentProfile.working_status === "Both" ||
                      currentProfile.working_status === "Working") && (
                      <Typography
                        variant="p"
                        style={{
                          marginTop: "0.3rem",
                          color: "var(--slate-600)",
                          fontSize: "1rem",
                          textTransform: "capitalize"
                        }}
                      >
                        Working at {currentProfile.working_at}{" "}
                        {currentProfile.working_status === "Both" &&
                          `as ${currentProfile.job_position}`}
                      </Typography>
                    )}
                  </>
                )}
              </Stack>
            )}
          </div>
        </Stack>

        {canCurrentProfileEditable && (
          <Button
            className="profile__topEditUserInfoBtn"
            variant="contained"
            color="success"
            onClick={() => setShowEditProfileModal(true)}
          >
            <ModeEditOutlineOutlinedIcon style={{ marginRight: "0.12rem" }} />
            Edit Profile
          </Button>
        )}
      </Stack>
    </div>
  );
};

export default ProfileTop;
