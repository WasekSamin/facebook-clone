import { Button, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PhoneIphoneOutlinedIcon from "@mui/icons-material/PhoneIphoneOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import MaleOutlinedIcon from "@mui/icons-material/MaleOutlined";
import FemaleOutlinedIcon from "@mui/icons-material/FemaleOutlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import { Link } from "react-router-dom";
import "../../css/profile/ProfilePostLeftSidebar.css";
import profileImg from "../../dummy/images/portImg.png";
import dummy1 from "../../dummy/images/img1.jpg";
import ProfileImageViewModal from "../../components/profile/ProfileImageViewModal";
import { motion, AnimatePresence } from "framer-motion/dist/framer-motion";

const ProfilePostLeftSidebar = () => {
  const [profileViewedImg, setProfileViewedImg] = useState(null);

  return (
    <div>
      {/* Profile image viewed modal starts */}
      {profileViewedImg !== null && (
        <div id="profile__viewImgModalOverlay"></div>
      )}

      <AnimatePresence initial={false} exitBeforeEnter={true}>
        {profileViewedImg !== null && (
          <motion.div
            id="profile__viewImageModalMotionDiv"
            initial={{
            //   y: "120%",
            scale: 0,
              opacity: 0,
            }}
            animate={{
            //   y: 0,
            scale: 1,
              opacity: 1,
            }}
            exit={{
            //   y: "120%",
            scale: 0,
              opacity: 0,
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

      <Stack direction="column" spacing={2}>
        <Stack
          direction="column"
          spacing={1}
          style={{
            backgroundColor: "white",
            padding: "10px",
            borderRadius: "10px",
          }}
        >
          <Typography
            variant="h6"
            style={{ fontWeight: "600", marginBottom: "0.5rem" }}
          >
            Intro
          </Typography>
          <Stack direction="column" spacing={1.5}>
            <Stack direction="row" spacing={1} alignItems="center">
              <PersonOutlineOutlinedIcon
                style={{ color: "var(--slate-500)" }}
              />
              <Typography
                style={{ color: "var(--slate-600)", fontSize: "1rem" }}
                variant="p"
              >
                Wasek Samin
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <HomeOutlinedIcon style={{ color: "var(--slate-500)" }} />
              <Typography
                style={{ color: "var(--slate-600)", fontSize: "1rem" }}
                variant="p"
              >
                Home address Lorem, ipsum dolor sit amet consectetur adipisicing
                elit. Sequi, mollitia.
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <WorkOutlineOutlinedIcon style={{ color: "var(--slate-500)" }} />
              <Typography
                style={{ color: "var(--slate-600)", fontSize: "1rem" }}
                variant="p"
              >
                Currently a student
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <SchoolOutlinedIcon style={{ color: "var(--slate-500)" }} />
              <Typography
                style={{ color: "var(--slate-600)", fontSize: "1rem" }}
                variant="p"
              >
                Studying at Some Institution
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <PhoneIphoneOutlinedIcon style={{ color: "var(--slate-500)" }} />
              <Typography
                style={{ color: "var(--slate-600)", fontSize: "1rem" }}
                variant="p"
              >
                1234567890
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <FavoriteBorderOutlinedIcon
                style={{ color: "var(--slate-500)" }}
              />
              <Typography
                style={{ color: "var(--slate-600)", fontSize: "1rem" }}
                variant="p"
              >
                Single
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <MaleOutlinedIcon style={{ color: "var(--slate-500)" }} />
              <Typography
                style={{ color: "var(--slate-600)", fontSize: "1rem" }}
                variant="p"
              >
                Male
              </Typography>
            </Stack>
          </Stack>

          <Button
            variant="contained"
            color="success"
            style={{ marginTop: "1.5rem" }}
          >
            <ModeEditOutlineOutlinedIcon style={{ marginRight: "0.12rem" }} />{" "}
            Edit Details
          </Button>
        </Stack>

        {/* Photos */}
        <Stack
          id="profile__leftSidePhotoDiv"
          direction="column"
          spacing={1}
          style={{
            backgroundColor: "white",
            padding: "10px",
            borderRadius: "10px",
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography
              variant="h6"
              style={{ fontWeight: "600", marginBottom: "0.5rem" }}
            >
              Photos
            </Typography>
            <Link to="#">
              <Button color="secondary" style={{ textTransform: "capitalize" }}>
                See All
              </Button>
            </Link>
          </Stack>

          {/* ONLY SHOW 9 IMAGES */}
          <div className="profile__sidebarPhotosGrid">
            <div
              onClick={() => setProfileViewedImg(1)}
              className="profile__sidebarPhoto"
            >
              <img src={dummy1} alt="" />
            </div>
            <div className="profile__sidebarPhoto">
              <img src={dummy1} alt="" />
            </div>
            <div className="profile__sidebarPhoto">
              <img src={dummy1} alt="" />
            </div>
            <div className="profile__sidebarPhoto">
              <img src={dummy1} alt="" />
            </div>
            <div className="profile__sidebarPhoto">
              <img src={dummy1} alt="" />
            </div>
            <div className="profile__sidebarPhoto">
              <img src={dummy1} alt="" />
            </div>
            <div className="profile__sidebarPhoto">
              <img src={dummy1} alt="" />
            </div>
            <div className="profile__sidebarPhoto">
              <img src={dummy1} alt="" />
            </div>
            <div className="profile__sidebarPhoto">
              <img src={dummy1} alt="" />
            </div>
          </div>
        </Stack>

        {/* Friends */}
        <Stack
          direction="column"
          spacing={1}
          style={{
            backgroundColor: "white",
            padding: "10px",
            borderRadius: "10px",
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography
              variant="h6"
              style={{ fontWeight: "600", marginBottom: "0.5rem" }}
            >
              Friends
            </Typography>
            <Link to="/friend-list/">
              <Button color="secondary" style={{ textTransform: "capitalize" }}>
                See All
              </Button>
            </Link>
          </Stack>

          {/* ONLY SHOW 9 IMAGES */}
          <div className="profile__sidebarPhotosGrid">
            <Stack direction="column" spacing={0.7} alignItems="center">
              <Link to="#" className="profile__sidebarPhoto">
                <img src={dummy1} alt="" />
              </Link>
              <Link to="#" style={{ color: "black", textAlign: "center" }}>
                <Typography
                  className="profile__sidebarFriendUsernameText"
                  variant="p"
                  style={{ fontSize: "0.95rem", color: "var(--slate-600)" }}
                >
                  Wasek Samin
                </Typography>
              </Link>
            </Stack>
            <Stack direction="column" spacing={0.7} alignItems="center">
              <Link to="#" className="profile__sidebarPhoto">
                <img src={dummy1} alt="" />
              </Link>
              <Link to="#" style={{ color: "black", textAlign: "center" }}>
                <Typography
                  className="profile__sidebarFriendUsernameText"
                  variant="p"
                  style={{ fontSize: "0.95rem", color: "var(--slate-600)" }}
                >
                  Wasek Samin
                </Typography>
              </Link>
            </Stack>
            <Stack direction="column" spacing={0.7} alignItems="center">
              <Link to="#" className="profile__sidebarPhoto">
                <img src={dummy1} alt="" />
              </Link>
              <Link to="#" style={{ color: "black", textAlign: "center" }}>
                <Typography
                  className="profile__sidebarFriendUsernameText"
                  variant="p"
                  style={{ fontSize: "0.95rem", color: "var(--slate-600)" }}
                >
                  Wasek Samin
                </Typography>
              </Link>
            </Stack>
            <Stack direction="column" spacing={0.7} alignItems="center">
              <Link to="#" className="profile__sidebarPhoto">
                <img src={dummy1} alt="" />
              </Link>
              <Link to="#" style={{ color: "black", textAlign: "center" }}>
                <Typography
                  className="profile__sidebarFriendUsernameText"
                  variant="p"
                  style={{ fontSize: "0.95rem", color: "var(--slate-600)" }}
                >
                  Wasek Samin
                </Typography>
              </Link>
            </Stack>
            <Stack direction="column" spacing={0.7} alignItems="center">
              <Link to="#" className="profile__sidebarPhoto">
                <img src={dummy1} alt="" />
              </Link>
              <Link to="#" style={{ color: "black", textAlign: "center" }}>
                <Typography
                  className="profile__sidebarFriendUsernameText"
                  variant="p"
                  style={{ fontSize: "0.95rem", color: "var(--slate-600)" }}
                >
                  Wasek Samin
                </Typography>
              </Link>
            </Stack>
            <Stack direction="column" spacing={0.7} alignItems="center">
              <Link to="#" className="profile__sidebarPhoto">
                <img src={dummy1} alt="" />
              </Link>
              <Link to="#" style={{ color: "black", textAlign: "center" }}>
                <Typography
                  className="profile__sidebarFriendUsernameText"
                  variant="p"
                  style={{ fontSize: "0.95rem", color: "var(--slate-600)" }}
                >
                  Wasek Samin
                </Typography>
              </Link>
            </Stack>
            <Stack direction="column" spacing={0.7} alignItems="center">
              <Link to="#" className="profile__sidebarPhoto">
                <img src={dummy1} alt="" />
              </Link>
              <Link to="#" style={{ color: "black", textAlign: "center" }}>
                <Typography
                  className="profile__sidebarFriendUsernameText"
                  variant="p"
                  style={{ fontSize: "0.95rem", color: "var(--slate-600)" }}
                >
                  Wasek Samin
                </Typography>
              </Link>
            </Stack>
            <Stack direction="column" spacing={0.7} alignItems="center">
              <Link to="#" className="profile__sidebarPhoto">
                <img src={dummy1} alt="" />
              </Link>
              <Link to="#" style={{ color: "black", textAlign: "center" }}>
                <Typography
                  className="profile__sidebarFriendUsernameText"
                  variant="p"
                  style={{ fontSize: "0.95rem", color: "var(--slate-600)" }}
                >
                  Wasek Samin
                </Typography>
              </Link>
            </Stack>
            <Stack direction="column" spacing={0.7} alignItems="center">
              <Link to="#" className="profile__sidebarPhoto">
                <img src={dummy1} alt="" />
              </Link>
              <Link to="#" style={{ color: "black", textAlign: "center" }}>
                <Typography
                  className="profile__sidebarFriendUsernameText"
                  variant="p"
                  style={{ fontSize: "0.95rem", color: "var(--slate-600)" }}
                >
                  Wasek Samin
                </Typography>
              </Link>
            </Stack>
          </div>
        </Stack>
      </Stack>
    </div>
  );
};

export default ProfilePostLeftSidebar;
