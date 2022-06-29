import { Stack, Typography, Container } from "@mui/material";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import ProfilePages from "./ProfilePages";
import ProfileTop from "./ProfileTop";
import "../../css/profile/ProfilePhotos.css";
import ProfileImageViewModal from "../../components/profile/ProfileImageViewModal";
import { motion, AnimatePresence } from "framer-motion/dist/framer-motion";
import {
  AccountStore,
  APIStore,
  ProfileStore,
  SocketStore,
  TokenStore,
} from "../../components/store/Store";
import axios from "axios";
import { colorTheme } from "../../components/colorTheme/ColorTheme";
import RefreshIcon from "@mui/icons-material/Refresh";

const ProfilePhotos = () => {
  const profileAllPhotosRef = useRef(null);
  const [profileViewedImg, setProfileViewedImg] = useState(null);
  const currentProfile = ProfileStore((state) => state.currentProfile);
  const MYAPI = APIStore((state) => state.MYAPI);
  const updateCurrentProfile = ProfileStore(
    (state) => state.updateCurrentProfile
  );
  const token = TokenStore((state) => state.token);
  const [isLoading, setIsLoading] = useState(false);
  const [userProfilePics, setUserProfilePics] = useState([]);
  const loggedInUserInfo = AccountStore((state) => state.loggedInUserInfo);
  const updateCanCurrentProfileEditable = ProfileStore(
    (state) => state.updateCanCurrentProfileEditable
  );
  const [loadMorePics, setLoadMorePics] = useState(false);
  const [currentProfilePic, setCurrentProfilePic] = useState(null);
  const socket = SocketStore((state) => state.socket);

  const paramData = useParams();

  useEffect(() => {
    const userLocalStorageSettings =
      localStorage.getItem("user_storage_settings") &&
      JSON.parse(localStorage.getItem("user_storage_settings"));

    if (
      userLocalStorageSettings &&
      Object.keys(userLocalStorageSettings).length > 0
    ) {
      userLocalStorageSettings["pic_requests"] = 5;

      localStorage.setItem(
        "user_storage_settings",
        JSON.stringify(userLocalStorageSettings)
      );
    }

    window.scrollTo({
      top: 0,
      left: 0,
    });
  }, []);

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

  const fetchProfileAllProfilePics = async (userUid, numberOfProfilePics) => {
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
          if (res.data.profile_pics.length > 0) {
            setLoadMorePics(true);
            currentProfilePic === null &&
              setCurrentProfilePic(res.data.account_current_profile_pic);

            userProfilePics.length === 0
              ? setUserProfilePics(res.data.profile_pics)
              : setUserProfilePics((prev) => [
                  ...prev,
                  ...res.data.profile_pics,
                ]);

            res.data.profile_pics.length < 5 && setLoadMorePics(false);
          } else {
            setLoadMorePics(false);
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
        const userLocalStorageSettings =
          localStorage.getItem("user_storage_settings") &&
          JSON.parse(localStorage.getItem("user_storage_settings"));

        if (
          userLocalStorageSettings &&
          Object.keys(userLocalStorageSettings).length > 0
        ) {
          const numberOfPics = userLocalStorageSettings["pic_requests"];
          userProfilePics.length === 0 &&
            fetchProfileAllProfilePics(currentProfile.uid, numberOfPics);
        }
      }

      // If user added new profile pic, then fetch all the profile pics again
      if (currentProfilePic !== null) {
        if (
          currentProfile.current_profile_pic !== null &&
          currentProfilePic !== "No Image Yet" &&
          currentProfile.current_profile_pic !== currentProfilePic
        ) {
          setUserProfilePics([]);
          setCurrentProfilePic(null);

          if (!isCancelled) {
            const userLocalStorageSettings =
              localStorage.getItem("user_storage_settings") &&
              JSON.parse(localStorage.getItem("user_storage_settings"));

            if (
              userLocalStorageSettings &&
              Object.keys(userLocalStorageSettings).length > 0
            ) {
              userLocalStorageSettings["pic_requests"] = 5;

              localStorage.setItem(
                "user_storage_settings",
                JSON.stringify(userLocalStorageSettings)
              );

              const numberOfPics = userLocalStorageSettings["pic_requests"];
              fetchProfileAllProfilePics(currentProfile.uid, numberOfPics);
            }
          }
        }
      }

      if (
        loggedInUserInfo !== null &&
        loggedInUserInfo.uid === currentProfile.uid
      ) {
        if (!isCancelled) {
          updateCanCurrentProfileEditable(true);
        }
      } else {
        if (!isCancelled) {
          updateCanCurrentProfileEditable(false);
        }
      }
    }

    return () => {
      isCancelled = true;
    };
  }, [currentProfile, loggedInUserInfo]);

  useEffect(() => {
    let isCancelled = false;

    if (socket !== null) {
      socket.on("receive-account-update-data", (accountObj) => {
        if (accountObj.uid === currentProfile.uid) {
          setUserProfilePics([]);

          if (!isCancelled) {
            const userLocalStorageSettings =
              localStorage.getItem("user_storage_settings") &&
              JSON.parse(localStorage.getItem("user_storage_settings"));

            if (
              userLocalStorageSettings &&
              Object.keys(userLocalStorageSettings).length > 0
            ) {
              userLocalStorageSettings["pic_requests"] = 5;

              localStorage.setItem(
                "user_storage_settings",
                JSON.stringify(userLocalStorageSettings)
              );

              const numberOfPics = userLocalStorageSettings["pic_requests"];
              userProfilePics.length === 0 &&
                fetchProfileAllProfilePics(accountObj.uid, numberOfPics);
            }
          }
        }
      });
    }

    return () => {
      isCancelled = true;
    };
  }, [socket]);

  // Load more pic on observer
  const objectObserver = new IntersectionObserver(
    (entries, objectObserver) => {
      let objObservedArr = [];

      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        objObservedArr.push(entry.isIntersecting);
        objectObserver.unobserve(entry.target);

        if (objObservedArr.length >= 3 && currentProfile !== null) {
          const userLocalStorageSettings =
            localStorage.getItem("user_storage_settings") &&
            JSON.parse(localStorage.getItem("user_storage_settings"));

          if (
            userLocalStorageSettings &&
            Object.keys(userLocalStorageSettings).length > 0
          ) {
            const numberOfPics = userLocalStorageSettings["pic_requests"];

            userLocalStorageSettings["pic_requests"] += 5;

            localStorage.setItem(
              "user_storage_settings",
              JSON.stringify(userLocalStorageSettings)
            );

            fetchProfileAllProfilePics(currentProfile.uid, numberOfPics + 5);
          }
          objObservedArr = [];
        }
      });
    },
    {
      threshold: 0.3,
    }
  );

  const lazyLoadObjects = () => {
    if (profileAllPhotosRef.current !== null) {
      const imgDivs = profileAllPhotosRef.current.querySelectorAll(
        ".profile__photoImgDiv"
      );

      imgDivs.forEach((obj) => {
        objectObserver.observe(obj);
      });
    }
  };

  useEffect(() => {
    let isCancelled = false;

    if (!isCancelled) {
      lazyLoadObjects();
    }

    return () => {
      isCancelled = true;
    };
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
                <div ref={profileAllPhotosRef} id="profile__allPhotosDiv">
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
                    No picture found yet!
                  </Typography>
                </Stack>
              )}

              {userProfilePics.length > 0 && loadMorePics && (
                <Stack direction="row" justifyContent="center">
                  <RefreshIcon
                    className="profile__allPicsSpinner"
                    style={{ color: "var(--slate-500)", marginBottom: "1rem" }}
                  />
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
