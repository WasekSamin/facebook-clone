import { Container, Divider, Grid, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import "../../css/friends/FriendRequests.css";
import FriendSidebar from "./FriendSidebar";
import dummyImg from "../../dummy/static_images/default_profile.png";
import { Link } from "react-router-dom";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import axios from "axios";
import {
  AccountStore,
  APIStore,
  SocketStore,
  TokenStore,
} from "../../components/store/Store";
import { colorTheme } from "../../components/colorTheme/ColorTheme";
import RefreshIcon from "@mui/icons-material/Refresh";
import LoadingButton from "@mui/lab/LoadingButton";

const FriendRequest = () => {
  const MYAPI = APIStore((state) => state.MYAPI);
  const loggedInUserInfo = AccountStore((state) => state.loggedInUserInfo);
  const [friendRequests, setFriendRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadMoreFriendRequests, setLoadMoreFriendRequests] = useState(false);
  const socket = SocketStore((state) => state.socket);
  const token = TokenStore((state) => state.token);
  const [disabledButtonId, setDisabledButtonId] = useState(-1);
  const [numberOfFriendRequests, setNumberOfFriendRequests] = useState(30);

  useEffect(() => {
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

            res.data.friend_requests.length < 30 &&
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

    if (!isCancelled && loggedInUserInfo !== null) {
      friendRequests.length === 0 &&
        fetchUserFriendRequests(loggedInUserInfo.uid, numberOfFriendRequests);
    }

    return () => {
      isCancelled = true;
    };
  }, [loggedInUserInfo]);

  const loadMoreFriendRequestsOnScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.scrollHeight
    )
      return;

    if (loggedInUserInfo !== null) {
      setNumberOfFriendRequests(numberOfFriendRequests + 30);
      fetchUserFriendRequests(
        loggedInUserInfo.uid,
        numberOfFriendRequests + 30
      );
    }
  };

  useEffect(() => {
    let isCancelled = false;

    if (!isCancelled) {
      window.addEventListener("scroll", loadMoreFriendRequestsOnScroll, true);
    }

    return () => {
      isCancelled = true;
      window.removeEventListener(
        "scroll",
        loadMoreFriendRequestsOnScroll,
        true
      );
    };
  }, [friendRequests]);

  useEffect(() => {
    let isCancelled = false;

    if (socket !== null) {
      socket.on("receive-friend-request", (friendRequestData) => {
        if (
          !isCancelled &&
          loggedInUserInfo !== null &&
          friendRequestData.friendRequestReceiver.uid === loggedInUserInfo.uid
        ) {
          setFriendRequests((prev) => [
            friendRequestData.friendRequestSender,
            ...prev,
          ]);
        }
      });

      socket.on("friend-request-deleted-from-receiver", (friendRequestData) => {
        if (
          !isCancelled &&
          loggedInUserInfo !== null &&
          loggedInUserInfo.uid === friendRequestData.friendRequestReceiver.uid
        ) {
          setFriendRequests((friendRequests) =>
            friendRequests.filter(
              (fr) => fr.uid !== friendRequestData.friendRequestSender.uid
            )
          );
        }
      });

      socket.on("friend-request-deleted-by-receiver", (friendRequestData) => {
        if (
          !isCancelled &&
          loggedInUserInfo !== null &&
          loggedInUserInfo.uid ===
            friendRequestData.friendRequestReceiver.uid &&
          token === friendRequestData.userToken
        ) {
          setFriendRequests((friendRequests) =>
            friendRequests.filter(
              (fr) => fr.uid !== friendRequestData.friendRequestSender.uid
            )
          );
        }
      });

      socket.on("friend-request-accepted-by-receiver", (friendRequestData) => {
        if (
          !isCancelled &&
          loggedInUserInfo !== null &&
          loggedInUserInfo.uid ===
            friendRequestData.friendRequestReceiver.uid &&
          token === friendRequestData.userToken
        ) {
          setFriendRequests((friendRequests) =>
            friendRequests.filter(
              (fr) => fr.uid !== friendRequestData.friendRequestSender.uid
            )
          );
        }
      });

      socket.on("receive-friend-request-notification", (notificationObj) => {
        if (!isCancelled && loggedInUserInfo !== null) {
          if (notificationObj.sender.uid === loggedInUserInfo.uid) {
            setFriendRequests((friendRequests) =>
              friendRequests.filter((fr) => fr.uid !== notificationObj.receiver)
            );
          }
        }
      });
    }

    return () => {
      isCancelled = true;
    };
  }, [socket]);

  const acceptFriendRequest = async (friendRequest) => {
    setDisabledButtonId(friendRequest.uid);

    if (loggedInUserInfo !== null) {
      let formData = new FormData();

      formData.append("currentProfile", friendRequest.uid);
      formData.append("loggedInUser", loggedInUserInfo.uid);
      formData.append("acceptFriendRequest", true);

      await axios
        .post(`${MYAPI}/friend/friend-request-list/`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `token ${token}`,
          },
        })
        .then((res) => {
          if (res.data.error && res.data.friend_request_not_exist) {
            setDisabledButtonId(-1);
            alert("Invalid user request!");
          } else if (res.data.error && res.data.notification_obj_not_found) {
            setDisabledButtonId(-1);
            alert("Something went wrong!");
            window.location.reload();
          } else if (res.data.error) {
            setDisabledButtonId(-1);
            alert("Failed to accept the friend request!");
          } else if (
            !res.data.error &&
            res.data.receiver_accept_friend_request
          ) {
            setFriendRequests((friendRequests) =>
              friendRequests.filter((fr) => fr.uid !== friendRequest.uid)
            );

            if (loggedInUserInfo !== null) {
              socket.emit("receiver-accept-friend-request", {
                friendRequestSender: friendRequest,
                friendRequestReceiver: loggedInUserInfo,
                receiverToken: res.data.receiver_token,
                userToken: token,
              });
            }
          }
        })
        .catch((err) => console.error(err));

      setDisabledButtonId(-1);
    } else {
      alert("Failed to accept the friend request!");
      setDisabledButtonId(-1);
    }
  };

  const deleteFriendRequest = async (friendRequest) => {
    setDisabledButtonId(friendRequest.uid);

    if (loggedInUserInfo !== null) {
      let formData = new FormData();

      formData.append("currentProfile", friendRequest.uid);
      formData.append("loggedInUser", loggedInUserInfo.uid);
      formData.append("deleteReceiveRequest", true);

      await axios
        .post(`${MYAPI}/friend/friend-request-list/`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `token ${token}`,
          },
        })
        .then((res) => {
          if (res.data.error && res.data.friend_request_not_exist) {
            setDisabledButtonId(-1);
            alert("Invalid user request!");
          } else if (
            res.data.error &&
            res.data.user_not_in_friend_request_list
          ) {
            setDisabledButtonId(-1);
            alert("Invalid user request!");
          } else if (res.data.error && res.data.notification_obj_not_found) {
            setDisabledButtonId(-1);
            alert("Something went wrong!");
            window.location.reload();
          } else if (res.data.error) {
            setDisabledButtonId(-1);
            alert("Failed to delete the friend request!");
          } else if (
            !res.data.error &&
            res.data.delete_receive_request_success
          ) {
            setFriendRequests((friendRequests) =>
              friendRequests.filter((fr) => fr.uid !== friendRequest.uid)
            );

            if (loggedInUserInfo !== null) {
              socket.emit("receiver-delete-friend-request", {
                friendRequestSender: friendRequest,
                friendRequestReceiver: loggedInUserInfo,
                receiverToken: res.data.receiver_token,
                userToken: token,
              });
            }
          }
        })
        .catch((err) => console.error(err));

      setDisabledButtonId(-1);
    } else {
      alert("Failed to delete the friend request!");
      setDisabledButtonId(-1);
    }
  };

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
                            <LoadingButton
                              loading={
                                disabledButtonId === friendRequest.uid
                                  ? true
                                  : false
                              }
                              loadingPosition="end"
                              variant="contained"
                              style={{ textTransform: "capitalize" }}
                              color="secondary"
                              onClick={() => acceptFriendRequest(friendRequest)}
                            >
                              <ThumbUpOffAltIcon />
                              Accept
                            </LoadingButton>
                            <LoadingButton
                              loading={
                                disabledButtonId === friendRequest.uid
                                  ? true
                                  : false
                              }
                              loadingPosition="end"
                              variant="contained"
                              style={{ textTransform: "capitalize" }}
                              color="error"
                              onClick={() => deleteFriendRequest(friendRequest)}
                            >
                              <DeleteOutlineIcon />
                              Remove
                            </LoadingButton>
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
