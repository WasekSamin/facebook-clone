import {
  Button,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import dummyImg from "../../dummy/static_images/default_profile.png";
import { Link } from "react-router-dom";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import PersonRemoveOutlinedIcon from "@mui/icons-material/PersonRemoveOutlined";
import FriendSidebar from "./FriendSidebar";
import axios from "axios";
import {
  AccountStore,
  APIStore,
  TokenStore,
  SocketStore,
} from "../../components/store/Store";
import { colorTheme } from "../../components/colorTheme/ColorTheme";
import RefreshIcon from "@mui/icons-material/Refresh";

const FriendList = () => {
  // Fetching logged in user all friends
  const loggedInUserInfo = AccountStore((state) => state.loggedInUserInfo);
  const MYAPI = APIStore((state) => state.MYAPI);
  const [friends, setFriends] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadMoreFriends, setLoadMoreFriends] = useState(false);
  const socket = SocketStore((state) => state.socket);
  const [disabledButtonId, setDisabledButtonId] = useState(-1);
  const token = TokenStore((state) => state.token);
  const [numberOfFriendRequests, setNumberOfFriendRequests] = useState(30);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
    });
  }, []);

  const fetchUserFriends = async (userUid, numberOfRequests) => {
    await axios
      .get(
        `${MYAPI}/friend/fetch-user-all-friends/${userUid}/${numberOfRequests}/`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        if (res.data.error) {
          setFriends([]);
          setIsLoading(false);
        } else if (!res.data.error && res.data.error_finding_friend) {
          setFriends([]);
          setIsLoading(false);
        } else if (!res.data.error && res.data.friend_found) {
          if (res.data.friends.length > 0) {
            setLoadMoreFriends(true);

            friends.length === 0
              ? setFriends(res.data.friends)
              : setFriends((prev) => [...prev, ...res.data.friends]);

            res.data.friends.length < 30 && setLoadMoreFriends(false);
          } else {
            setLoadMoreFriends(false);
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
      friends.length === 0 &&
        fetchUserFriends(loggedInUserInfo.uid, numberOfFriendRequests);
    }

    return () => {
      isCancelled = true;
    };
  }, [loggedInUserInfo]);

  const loadMoreFriendsOnScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.scrollHeight
    )
      return;

    if (loggedInUserInfo !== null) {
      setNumberOfFriendRequests(numberOfFriendRequests + 30);
      fetchUserFriends(loggedInUserInfo.uid, numberOfFriendRequests + 30);
    }
  };

  useEffect(() => {
    let isCancelled = false;

    if (!isCancelled) {
      window.addEventListener("scroll", loadMoreFriendsOnScroll);
    }

    return () => {
      isCancelled = true;
      window.removeEventListener("scroll", loadMoreFriendsOnScroll);
    };
  }, [friends]);

  useEffect(() => {
    let isCancelled = false;

    if (socket !== null) {
      socket.on("friend-request-accepted-by-receiver", (friendRequestData) => {
        if (!isCancelled && loggedInUserInfo !== null) {
          setNumberOfFriendRequests(30);
          fetchUserFriends(loggedInUserInfo.uid, 30);
        }
      });

      socket.on("receive-friend-request-notification", notificationObj => {
        if (!isCancelled && loggedInUserInfo !== null) {
          setNumberOfFriendRequests(30);
          fetchUserFriends(loggedInUserInfo.uid, 30);
        }
      })

      socket.on("friend-removed-from-user-list", (friendData) => {
        if (!isCancelled && loggedInUserInfo !== null) {
          if (friendData.removedFriend.uid === loggedInUserInfo.uid) {
            setFriends((friends) =>
              friends.filter(
                (friend) => friend.uid !== friendData.actionUser.uid
              )
            );
          } else if (friendData.actionUser.uid === loggedInUserInfo.uid) {
            setFriends((friends) =>
              friends.filter(
                (friend) => friend.uid !== friendData.removedFriend.uid
              )
            );
          }
        }
      });
    }

    return () => {
      isCancelled = true;
    };
  }, [socket]);

  const removeFriend = async (friend) => {
    setDisabledButtonId(friend.uid);

    if (loggedInUserInfo !== null) {
      let formData = new FormData();

      formData.append("currentProfile", friend.uid);
      formData.append("loggedInUser", loggedInUserInfo.uid);
      formData.append("removeFriend", true);

      await axios
        .post(`${MYAPI}/friend/friend-request-list/`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `token ${token}`,
          },
        })
        .then((res) => {
          if (res.data.error && res.data.friend_obj_not_found) {
            alert("Could find the user on your friend list!");
            setDisabledButtonId(-1);
          } else if (res.data.error) {
            setDisabledButtonId(-1);
            alert("Failed to remove the user from your friend list!");
          } else if (!res.data.error && res.data.remove_friend_success) {
            setFriends((friends) =>
              friends.filter((fr) => fr.uid !== friend.uid)
            );

            if (loggedInUserInfo !== null) {
              socket.emit("remove-user-from-friend-list", {
                actionUser: loggedInUserInfo,
                removedFriend: friend,
                receiverToken: res.data.receiver_token,
                userToken: token,
              });
            }
          }
        })
        .catch((err) => console.error(err));

      setDisabledButtonId(-1);
    } else {
      alert("Failed to remove the user from your friend list!");
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
              <FriendSidebar selectedPage="friendList" />
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
                Your Friends
              </Typography>
              <Divider style={{ marginBottom: "1rem" }} />

              {friends.length > 0 ? (
                <Stack
                  id="friend__containerDiv"
                  direction="row"
                  style={{ flexWrap: "wrap", gap: "1rem" }}
                >
                  {friends.map((friend) => (
                    <div key={friend.uid} className="friend__card">
                      <Stack direction="column" spacing={1}>
                        <Link
                          to={`/profile/${friend.uid}/${friend.username}/`}
                          style={{ display: "flex", justifyContent: "center" }}
                        >
                          <img
                            className="friend__img"
                            src={
                              friend.current_profile_pic !== null
                                ? `${MYAPI}${friend.current_profile_pic}`
                                : dummyImg
                            }
                            alt={friend.username}
                          />
                        </Link>

                        <Stack
                          direction="column"
                          spacing={1}
                          style={{ padding: "0 1rem" }}
                        >
                          <Link
                            to={`/profile/${friend.uid}/${friend.username}/`}
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
                              {friend.username}
                            </Typography>
                          </Link>

                          <Stack direction="column" spacing={1}>
                            <Link
                              to={`/profile/${friend.uid}/${friend.username}/`}
                            >
                              <Button
                                variant="contained"
                                style={{
                                  textTransform: "capitalize",
                                  width: "100%",
                                }}
                                color="secondary"
                              >
                                <AccountCircleOutlinedIcon
                                  style={{ marginRight: "0.12rem" }}
                                />
                                Profile
                              </Button>
                            </Link>
                            <LoadingButton
                              loadingPosition="end"
                              loading={
                                disabledButtonId === friend.uid ? true : false
                              }
                              variant="contained"
                              style={{ textTransform: "capitalize" }}
                              color="error"
                              onClick={() => removeFriend(friend)}
                            >
                              <PersonRemoveOutlinedIcon
                                style={{ marginRight: "0.12rem" }}
                              />{" "}
                              Unfriend
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
                    No friend found yet!
                  </Typography>
                </Stack>
              )}

              {friends.length > 0 && loadMoreFriends && (
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

export default FriendList;
