import {
  Button,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import Navbar from "../../components/navbar/Navbar";
import "../../css/friends/FriendRequests.css";
import FriendSidebar from "./FriendSidebar";
import dummyImg from "../../dummy/static_images/default_profile.png";
import { Link } from "react-router-dom";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import axios from "axios";
import { AccountStore, APIStore, SocketStore } from "../../components/store/Store";
import { colorTheme } from "../../components/colorTheme/ColorTheme";
import RefreshIcon from "@mui/icons-material/Refresh";

const FriendRequest = () => {
  const MYAPI = APIStore((state) => state.MYAPI);
  const loggedInUserInfo = AccountStore((state) => state.loggedInUserInfo);
  const [friendRequests, setFriendRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadMoreFriendRequests, setLoadMoreFriendRequests] = useState(false);
  const friendRequestsRef = useRef(null);
  const socket = SocketStore(state => state.socket);

  useEffect(() => {
    const userLocalStorageSettings =
      localStorage.getItem("user_storage_settings") &&
      JSON.parse(localStorage.getItem("user_storage_settings"));

    if (
      userLocalStorageSettings &&
      Object.keys(userLocalStorageSettings).length > 0
    ) {
      userLocalStorageSettings["friend_requests"] = 5;

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

  const fetchUserFriendRequests = async (userUid, numberOfRequests) => {
    axios
      .get(
        `${MYAPI}/friend/fetch-user-all-friends-requests/${userUid}/${numberOfRequests}/`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        if (res.data.error) {
          setIsLoading(false);
        } else if (!res.data.error && res.data.error_found_friend_request) {
          setFriendRequests([]);
          setIsLoading(false);
        } else if (!res.data.error && res.data.friend_request_found) {
          if (res.data.friend_requests.length > 0) {
            setLoadMoreFriendRequests(true);

            friendRequests.length === 0
              ? setFriendRequests(res.data.friend_requests)
              : setFriendRequests((prev) => [
                  ...prev,
                  ...res.data.friend_requests,
                ]);

            res.data.friend_requests.length < 5 &&
              setLoadMoreFriendRequests(false);
          } else {
            setLoadMoreFriendRequests(false);
          }
        }
      })
      .catch((err) => console.error(err));

    setIsLoading(false);
  };

  useEffect(() => {
    let isCancelled = false;
    setIsLoading(true);

    if (loggedInUserInfo !== null) {
      if (!isCancelled) {
        const userLocalStorageSettings =
          localStorage.getItem("user_storage_settings") &&
          JSON.parse(localStorage.getItem("user_storage_settings"));

        if (
          userLocalStorageSettings &&
          Object.keys(userLocalStorageSettings).length > 0
        ) {
          const numberOfFriendRequests =
            userLocalStorageSettings["friend_requests"];

          friendRequests.length === 0 &&
            fetchUserFriendRequests(
              loggedInUserInfo.uid,
              numberOfFriendRequests
            );
        }
      }
    }

    return () => {
      isCancelled = true;
    };
  }, [loggedInUserInfo]);

  const objObserver = new IntersectionObserver((entries, objObserver) => {
    let objObserverArr = [];

    entries.forEach(entry => {
      console.log(entry.isIntersecting);

      if (!entry.isIntersecting) return;
      objObserverArr.push(entry.isIntersecting);
      objObserver.unobserve(entry.target);

      if (objObserverArr.length >= 3 && loggedInUserInfo !== null) {
        const userLocalStorageSettings =
          localStorage.getItem("user_storage_settings") &&
          JSON.parse(localStorage.getItem("user_storage_settings"));

        if (userLocalStorageSettings && Object.keys(userLocalStorageSettings).length > 0) {
          const numberOfFriendRequests = userLocalStorageSettings["friend_requests"];

          userLocalStorageSettings["friend_requests"] += 5;
          localStorage.setItem("user_storage_settings", JSON.stringify(userLocalStorageSettings));

          fetchUserFriendRequests(loggedInUserInfo.uid, numberOfFriendRequests + 5);
        }

        objObserverArr = [];
      }
    })
  })

  const lazyLoadObjects = () => {
    if (friendRequestsRef.current !== null) {
      const friendRequestList = document.querySelectorAll(".friend__card");

      friendRequestList.forEach(friendRequest => {
        objObserver.observe(friendRequest);
      })
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
  }, [friendRequests]);

  useEffect(() => {
    let isCancelled = false;

    if (socket !== null) {
      
    }

    return () => {
      isCancelled = true;
    }
  }, [socket])

  return (
    <div>
      <Navbar />

      <div id="friend__requestsMainDiv">
        <Container maxWidth="lg">
          <Grid id="friend__gridContainer" container spacing={2}>
            <Grid item xs={3}>
              <FriendSidebar selectedPage="friendRequest" />
            </Grid>
            <Grid item xs={9}>
              <Typography
                variant="h5"
                style={{
                  fontWeight: "600",
                  marginTop: "1.3rem",
                  marginBottom: "0.5rem",
                }}
              >
                Friend Requests
              </Typography>
              <Divider style={{ marginBottom: "1rem" }} />

              {friendRequests.length > 0 ? (
                <Stack
                  id="friend__containerDiv"
                  direction="row"
                  ref={friendRequestsRef}
                  style={{ flexWrap: "wrap", gap: "1rem" }}
                >
                  {friendRequests.map((friendRequest) => (
                    <div key={friendRequest.uid} className="friend__card">
                      <Stack direction="column" spacing={1}>
                        <Link
                          to={`/profile/${friendRequest.uid}/${friendRequest.username}/`}
                          style={{ display: "flex", justifyContent: "center" }}
                        >
                          <img
                            className="friend__img"
                            src={
                              friendRequest.current_profile_pic !== null
                                ? `${MYAPI}${friendRequest.current_profile_pic}`
                                : dummyImg
                            }
                            alt=""
                          />
                        </Link>

                        <Stack
                          direction="column"
                          spacing={1}
                          style={{ padding: "0 1rem" }}
                        >
                          <Link
                            to={`/profile/${friendRequest.uid}/${friendRequest.username}/`}
                            style={{ color: "black", textAlign: "center" }}
                          >
                            <Typography
                              variant="p"
                              className="friend__username"
                              style={{
                                fontSize: "1rem",
                                fontWeight: "600",
                                color: "var(--slate-600)",
                              }}
                            >
                              {friendRequest.username}
                            </Typography>
                          </Link>

                          <Stack direction="column" spacing={1}>
                            <Button
                              variant="contained"
                              style={{ textTransform: "capitalize" }}
                              color="secondary"
                            >
                              <ThumbUpOffAltIcon />
                              Accept
                            </Button>
                            <Button
                              variant="contained"
                              style={{ textTransform: "capitalize" }}
                              color="error"
                            >
                              <DeleteOutlineIcon />
                              Remove
                            </Button>
                          </Stack>
                        </Stack>
                      </Stack>
                    </div>
                  ))}
                </Stack>
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
                    Your friend request list is empty!
                  </Typography>
                </Stack>
              )}

              {friendRequests.length > 0 && loadMoreFriendRequests && (
                <Stack direction="row" justifyContent="center">
                  <RefreshIcon
                    className="profile__allPicsSpinner"
                    style={{ color: "var(--slate-500)", marginBottom: "1rem" }}
                  />
                </Stack>
              )}
            </Grid>
          </Grid>
        </Container>
      </div>
    </div>
  );
};

export default FriendRequest;
