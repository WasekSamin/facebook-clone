import { Container, Grid } from "@mui/material";
import React, { useEffect, useState, useMemo } from "react";
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
  const updateCheckProfileFriendOptionWithUser = ProfileStore(
    (state) => state.updateCheckProfileFriendOptionWithUser
  );
  const updateLoadingFriendOption = ProfileStore(
    (state) => state.updateLoadingFriendOption
  );

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
    });
  }, []);

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

  const fetchCurrentProfileFriendOptionWithUser = async (
    userUid,
    profileUid
  ) => {
    updateLoadingFriendOption(true);

    await axios
      .get(
        `${MYAPI}/friend/fetch-current-profile-friend-option-with-user/${userUid}/${profileUid}/`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        if (!res.data.error && res.data.user_is_friend) {
          updateCheckProfileFriendOptionWithUser({
            friend: true,
            sendFriendRequest: false,
            receiveFriendRequest: false,
          });
        } else if (!res.data.error && res.data.user_is_in_friend_request) {
          updateCheckProfileFriendOptionWithUser({
            friend: false,
            sendFriendRequest: true,
            receiveFriendRequest: false,
          });
        } else if (
          !res.data.error &&
          res.data.current_profile_is_in_friend_request
        ) {
          updateCheckProfileFriendOptionWithUser({
            friend: false,
            sendFriendRequest: false,
            receiveFriendRequest: true,
          });
        } else if (!res.data.error && res.data.no_friend_option) {
          updateCheckProfileFriendOptionWithUser({
            friend: false,
            sendFriendRequest: false,
            receiveFriendRequest: false,
          });
        }
      })
      .catch((err) => console.error(err));

    updateLoadingFriendOption(false);
  };

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

    if (
      !canCurrentProfileEditable &&
      currentProfile !== null &&
      loggedInUserInfo !== null
    ) {
      if (!isCancelled) {
        fetchCurrentProfileFriendOptionWithUser(
          loggedInUserInfo.uid,
          currentProfile.uid
        );
      }
    }

    return () => {
      isCancelled = true;
    };
  }, [currentProfile, loggedInUserInfo, canCurrentProfileEditable]);

  useEffect(() => {
    let isCancelled = false;

    if (socket !== null) {
      socket.on("receive-account-update-data", (accountObj) => {
        if (
          !isCancelled &&
          currentProfile !== null &&
          currentProfile.uid === accountObj.uid
        ) {
          updateCurrentProfile(accountObj);
        }
      });

      socket.on("receive-friend-request", (friendRequestData) => {
        if (
          !isCancelled &&
          loggedInUserInfo !== null &&
          friendRequestData.friendRequestReceiver.uid === loggedInUserInfo.uid
        ) {
          fetchCurrentProfileFriendOptionWithUser(
            friendRequestData.friendRequestReceiver.uid,
            friendRequestData.friendRequestSender.uid
          );
        }
      });
    }

    return () => {
      isCancelled = true;
    };
  }, [socket]);

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
