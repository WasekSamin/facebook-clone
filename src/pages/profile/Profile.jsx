import { Container, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import ProfileTop from "./ProfileTop";
import "../../css/profile/Profile.css";
import ProfilePages from "./ProfilePages";
import ProfilePostLeftSidebar from "./ProfilePostLeftSidebar";
import ProfilePost from "./ProfilePost";
import { useParams } from "react-router-dom";
import {
  AccountStore,
  APIStore,
  ProfileStore,
  TokenStore,
  SocketStore,
} from "../../components/store/Store";
import axios from "axios";

const Profile = () => {
  const paramData = useParams();
  const updateCurrentProfile = ProfileStore(
    (state) => state.updateCurrentProfile
  );
  const currentProfile = ProfileStore((state) => state.currentProfile);
  const MYAPI = APIStore((state) => state.MYAPI);
  const token = TokenStore((state) => state.token);
  const loggedInUserInfo = AccountStore((state) => state.loggedInUserInfo);
  const canCurrentProfileEditable = ProfileStore(
    (state) => state.canCurrentProfileEditable
  );
  const updateCanCurrentProfileEditable = ProfileStore(
    (state) => state.updateCanCurrentProfileEditable
  );
  const socket = SocketStore((state) => state.socket);
  const addCurrentProfileAllPosts = ProfileStore(
    (state) => state.addCurrentProfileAllPosts
  );
  const [showNumberOfProfilePosts, setShowNumberOfProfilePosts] = useState(3);

  // Fetching profile posts -> 3 posts for now
  const fetchProfilePosts = (userUid) => {
    axios
      .get(
        `${MYAPI}/post/fetch-profile-user-posts/${userUid}/${showNumberOfProfilePosts}/`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        if (!res.data.error && res.data.posts_found) {
          addCurrentProfileAllPosts(res.data.posts);
        }
      })
      .catch((err) => console.error(err));
  };

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
        fetchProfilePosts(userUid);
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

  useEffect(() => {
    let isCancelled = false;

    if (
      currentProfile !== null &&
      loggedInUserInfo !== null &&
      currentProfile.uid === loggedInUserInfo.uid
    ) {
      if (!isCancelled) {
        updateCanCurrentProfileEditable(true);
      }
    } else {
      if (!isCancelled) {
        updateCanCurrentProfileEditable(false);
      }
    }

    return () => {
      isCancelled = true;
    };
  }, [currentProfile, loggedInUserInfo]);

  useEffect(() => {
    let isCancelled = false;

    if (socket !== null && currentProfile !== null) {
      socket.on("receive-account-update-data", (accountObj) => {
        if (!isCancelled && currentProfile.uid === accountObj.uid) {
          updateCurrentProfile(accountObj);
        }
      });
    }

    return () => {
      isCancelled = true;
    };
  }, [socket, currentProfile]);

  return (
    <div>
      <Navbar />

      <div id="profile__mainDiv">
        <Container maxWidth="lg">
          <ProfileTop />
          <ProfilePages currentProfilePage="profile_post" />

          <Grid id="profile__postGridDiv" container spacing={2}>
            <Grid item xs={5}>
              <ProfilePostLeftSidebar />
            </Grid>
            <Grid item xs={7}>
              <ProfilePost />
            </Grid>
          </Grid>
        </Container>
      </div>
    </div>
  );
};

export default Profile;
