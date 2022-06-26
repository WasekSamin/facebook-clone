import { Stack, Typography, Container } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import ProfilePages from "./ProfilePages";
import ProfileTop from "./ProfileTop";
import "../../css/profile/ProfilePhotos.css";
import dummy1 from "../../dummy/images/img1.jpg";
import ProfileImageViewModal from "../../components/profile/ProfileImageViewModal";
import { motion, AnimatePresence } from "framer-motion/dist/framer-motion";
import {
  APIStore,
  ProfileStore,
  TokenStore,
} from "../../components/store/Store";
import axios from "axios";
import { colorTheme } from "../../components/colorTheme/ColorTheme";
import RefreshIcon from "@mui/icons-material/Refresh";

const ProfilePhotos = () => {
  const profleAllPhotosRef = useRef(null);
  const [profileViewedImg, setProfileViewedImg] = useState(null);
  const currentProfile = ProfileStore((state) => state.currentProfile);
  const MYAPI = APIStore((state) => state.MYAPI);
  const updateCurrentProfile = ProfileStore(
    (state) => state.updateCurrentProfile
  );
  const token = TokenStore((state) => state.token);
  const [numberOfProfilePics, setNumberOfProfilePics] = useState(3);
  const [isLoading, setIsLoading] = useState(false);
  const [userProfilePics, setUserProfilePics] = useState([]);

  const paramData = useParams();

  const fetchProfileData = (userUid) => {
    axios
      .get(`${MYAPI}/authentication/account-detail/${userUid}/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `token ${token}`,
        },
      })
      .then((res) => {
        updateCurrentProfile(res.data);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    let isCancelled = false;

    if (paramData) {
      const { uid } = paramData;

      if (!isCancelled) {
        fetchProfileData(uid);
      }
    }

    return () => {
      isCancelled = true;
    };
  }, [paramData]);

  const fetchProfileAllProfilePics = async (userUid) => {
    console.log(numberOfProfilePics);
    await axios
      .get(
        `${MYAPI}/authentication/fetch-user-all-profile-pics/${userUid}/${numberOfProfilePics}/`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        if (res.data.error) {
          setIsLoading(false);
        } else if (!res.data.error && res.data.profile_pic_found) {
          if (numberOfProfilePics > 3) {
            setUserProfilePics((prev) => [...prev, ...res.data.profile_pics]);
          } else {
            setUserProfilePics(res.data.profile_pics);
          }
        }
      })
      .catch((err) => console.error(err));

    setIsLoading(false);
  };

  useEffect(() => {
    let isCancelled = false;
    setIsLoading(true);

    if (currentProfile !== null) {
      if (!isCancelled) {
        fetchProfileAllProfilePics(currentProfile.uid);
      }
    }

    return () => {
      isCancelled = true;
    };
  }, [currentProfile]);

  const objectObserver = new IntersectionObserver((entries, objectObserver) => {
    let objObservedArr = [];

    entries.forEach((entry) => {
      console.log(entry.isIntersecting);
      if (!entry.isIntersecting) return;
      objObservedArr.push(entry.isIntersecting);
      objectObserver.unobserve(entry.target);
    });

    if (objObservedArr.length === 3 && currentProfile !== null) {
      setNumberOfProfilePics(numberOfProfilePics + 3);
      fetchProfileAllProfilePics(currentProfile.uid, numberOfProfilePics + 3);
      objObservedArr = [];
    }
  });

  const lazyLoadObjects = () => {
    if (profleAllPhotosRef.current !== null) {
      const imgDivs = profleAllPhotosRef.current.querySelectorAll(
        ".profile__photoImgDiv"
      );

      imgDivs.forEach((obj) => {
        objectObserver.observe(obj);
      });
    }
  };

  useEffect(() => {
    lazyLoadObjects();
  }, [userProfilePics]);

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

              {userProfilePics.length > 0 ? (
                <div ref={profleAllPhotosRef} id="profile__allPhotosDiv">
                  {userProfilePics.map((profilePic) => (
                    <div
                      key={profilePic.uid}
                      onClick={() => setProfileViewedImg(profilePic.image)}
                      className="profile__photoImgDiv"
                    >
                      <img src={`${MYAPI}${profilePic.image}`} alt="" />
                    </div>
                  ))}
                </div>
              ) : isLoading ? (
                <Stack direction="row" justifyContent="center">
                  <RefreshIcon
                    className="profile__allPicsSpinner"
                    style={{ color: "var(--slate-500)", marginBottom: "1rem" }}
                  />
                </Stack>
              ) : (
                <Stack direction="row" justifyContent="center">
                  <Typography
                    variant="p"
                    style={{
                      fontWeight: "bold",
                      marginBottom: "1rem",
                      color: `${colorTheme.palette.secondary.main}`,
                    }}
                  >
                    No Picture found yet!
                  </Typography>
                </Stack>
              )}
            </Stack>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default ProfilePhotos;
