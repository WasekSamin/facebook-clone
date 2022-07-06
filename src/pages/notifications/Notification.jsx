import { Avatar, Container, Divider, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import "../../css/notifications/Notification.css";
import dummyImg from "../../dummy/static_images/default_profile.png";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { colorTheme } from "../../components/colorTheme/ColorTheme";
import { Link } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {
  AccountStore,
  APIStore,
  SocketStore,
  TokenStore,
} from "../../components/store/Store";
import axios from "axios";
import RefreshIcon from "@mui/icons-material/Refresh";
import moment from "moment";

const Notification = () => {
  const loggedInUserInfo = AccountStore((state) => state.loggedInUserInfo);
  const [isLoading, setIsLoading] = useState(false);
  const [loadMoreNotifications, setLoadMoreNotifications] = useState(false);
  const token = TokenStore((state) => state.token);
  const MYAPI = APIStore((state) => state.MYAPI);
  const [notifications, setNotifications] = useState([]);
  const [disabledButtonId, setDisabledButtonId] = useState(-1);
  const [
    numberOfNotificationRequests,
    setNumberOfNotificationRequests,
  ] = useState(30);
  const socket = SocketStore((state) => state.socket);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
    });
  }, []);

  const fetchUserAllNotifications = async (userUid, numberOfRequests) => {
    await axios
      .get(
        `${MYAPI}/notification/fetch-user-notifications/${userUid}/${numberOfRequests}/`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        if (res.data.error) {
          setIsLoading(false);
        } else if (!res.data.error && res.data.notification_found) {
          if (res.data.notifications.length > 0) {
            setLoadMoreNotifications(true);

            notifications.length === 0
              ? setNotifications(res.data.notifications)
              : setNotifications((prev) => [
                  ...prev,
                  ...res.data.notifications,
                ]);

            res.data.notifications.length < 30 &&
              setLoadMoreNotifications(false);
          } else {
            setLoadMoreNotifications(false);
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
      notifications.length === 0 &&
        fetchUserAllNotifications(
          loggedInUserInfo.uid,
          numberOfNotificationRequests
        );
    }

    return () => {
      isCancelled = true;
    };
  }, [loggedInUserInfo]);

  const loadMoreNotificationOnScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.scrollHeight
    )
      return;

    if (loggedInUserInfo !== null) {
      setNumberOfNotificationRequests(numberOfNotificationRequests + 30);
      fetchUserAllNotifications(
        loggedInUserInfo.uid,
        numberOfNotificationRequests + 30
      );
    }
  };

  useEffect(() => {
    let isCancelled = false;

    if (!isCancelled) {
      window.addEventListener("scroll", loadMoreNotificationOnScroll, true);
    }

    return () => {
      isCancelled = true;
      window.removeEventListener("scroll", loadMoreNotificationOnScroll, true);
    };
  }, [notifications]);

  const acceptFriendRequest = async (notificationUid) => {
    setDisabledButtonId(notificationUid);

    let formData = new FormData();
    formData.append("acceptFriendRequest", true);

    await axios
      .put(
        `${MYAPI}/notification/notification-detail/${notificationUid}/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `token ${token}`,
          },
        }
      )
      .then((res) => {
        if (res.data.error && res.data.friend_request_already_accepted) {
          alert("You have already accepted the friend request!");
          setDisabledButtonId(-1);
          window.location.reload();
        } else if (res.data.error && res.data.receiver_token_not_found) {
          alert("Something went wrong!");
          setDisabledButtonId(-1);
          window.location.reload();
        } else if (res.data.error) {
          alert("Failed to accept the friend request! Something went wrong...");
          setDisabledButtonId(-1);
        } else if (!res.data.error && res.data.friend_request_accepted) {
          setNotifications((notifications) =>
            notifications.map((notification) =>
              notification.uid === notificationUid
                ? {
                    ...notification,
                    is_friend_request_accepted: true,
                  }
                : notification
            )
          );

          if (loggedInUserInfo !== null) {
            socket.emit("send-friend-request-notification", {
              sender: loggedInUserInfo,
              receiver: res.data.notification_sender_uid,
              friendRequestAccepted: true,
              receiverToken: res.data.receiver_token,
              userToken: token,
            });
          }
        }
      })
      .catch((err) => console.error(err));

    setDisabledButtonId(-1);
  };

  const removeFriendRequest = async (notificationUid) => {
    setDisabledButtonId(notificationUid);

    await axios
      .delete(`${MYAPI}/notification/notification-detail/${notificationUid}/`, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `token ${token}`,
        },
      })
      .then((res) => {
        if (res.data.error && res.data.receiver_token_not_found) {
          alert("Something went wrong!");
          setDisabledButtonId(-1);
          window.location.reload();
        } else if (
          !res.data.error &&
          res.data.notification_friend_request_deleted
        ) {
          setNotifications((notifications) =>
            notifications.filter(
              (notification) => notification.uid !== notificationUid
            )
          );

          if (loggedInUserInfo !== null) {
            socket.emit("send-friend-request-notification", {
              sender: loggedInUserInfo,
              receiver: res.data.notification_sender_uid,
              friendRequestRemoved: true,
              receiverToken: res.data.receiver_token,
              userToken: token,
            });
          }
        }
      })
      .catch((err) => console.error(err));

    setDisabledButtonId(-1);
  };

  useEffect(() => {
    let isCancelled = false;

    if (socket !== null) {
      if (!isCancelled && loggedInUserInfo !== null) {
        socket.on("receive-friend-request", (friendRequestData) => {
          if (
            loggedInUserInfo.uid === friendRequestData.friendRequestReceiver.uid
          )
            setNumberOfNotificationRequests(30);
          fetchUserAllNotifications(
            friendRequestData.friendRequestReceiver.uid,
            30
          );
        });

        socket.on(
          "friend-request-deleted-from-receiver",
          (friendRequestData) => {
            if (
              loggedInUserInfo.uid ===
              friendRequestData.friendRequestReceiver.uid
            ) {
              setNumberOfNotificationRequests(30);
              fetchUserAllNotifications(
                friendRequestData.friendRequestReceiver.uid,
                30
              );
            }
          }
        );

        socket.on("friend-request-deleted-by-receiver", (friendRequestData) => {
          if (loggedInUserInfo.uid === friendRequestData.friendRequestReceiver.uid) {
            setNumberOfNotificationRequests(30);
            fetchUserAllNotifications(
              friendRequestData.friendRequestReceiver.uid,
              30
            );
          }
        });

        socket.on(
          "friend-request-accepted-by-receiver",
          (friendRequestData) => {
            if (loggedInUserInfo.uid === friendRequestData.friendRequestReceiver.uid) {
              setNumberOfNotificationRequests(30);
              fetchUserAllNotifications(
                friendRequestData.friendRequestReceiver.uid,
                30
              );
            }
          }
        );
      }
    }

    return () => {
      isCancelled = true;
    };
  }, [socket]);

  return (
    <div>
      <Navbar />

      <div id="notification__mainDiv">
        <Container maxWidth="lg">
          <div id="notification__div">
            <Typography
              variant="h6"
              style={{ fontWeight: "600", marginBottom: "0.5rem" }}
            >
              All Notifications
            </Typography>
            <Divider style={{ marginBottom: "1rem" }} />

            {notifications.length > 0 ? (
              <Stack direction="column" spacing={0.7}>
                {notifications.map((notification) =>
                  notification.notification_type === "comment" ||
                  notification.notification_type === "like" ? (
                    <Link
                      key={notification.uid}
                      className="notification__link"
                      to={`/profile/${notification.notified_sender.uid}/${notification.notified_sender.username}/`}
                      style={{ color: "black", width: "100%" }}
                    >
                      <Stack
                        direction="row"
                        spacing={1}
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Avatar
                            alt={notification.notified_sender.username}
                            src={
                              notification.notified_sender
                                .current_profile_pic !== null
                                ? `${MYAPI}${notification.notified_sender.current_profile_pic}`
                                : dummyImg
                            }
                          />

                          <Stack direction="column" spacing={0.2}>
                            <Typography
                              variant="p"
                              style={{ color: "var(--slate-600)" }}
                            >
                              <span style={{ fontWeight: "600" }}>
                                {notification.notified_sender.username}
                              </span>{" "}
                              {notification.notification_type === "comment"
                                ? "commented on your post"
                                : "liked your post"}
                              .
                            </Typography>

                            <Typography
                              variant="p"
                              style={{
                                color: "var(--slate-500)",
                                fontSize: "0.83rem",
                              }}
                            >
                              {moment(notification.created_at).format("lll")}
                            </Typography>
                          </Stack>
                        </Stack>

                        <FiberManualRecordIcon
                          style={{
                            color: colorTheme.palette.primary.main,
                            width: "1rem",
                            height: "1rem",
                          }}
                        />
                      </Stack>
                    </Link>
                  ) : (
                    <Stack
                      key={notification.uid}
                      className="notification__link"
                      direction="row"
                      spacing={1}
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Link
                          to={`/profile/${notification.notified_sender.uid}/${notification.notified_sender.username}/`}
                        >
                          <Avatar
                            alt={notification.notified_sender.username}
                            src={
                              notification.notified_sender
                                .current_profile_pic !== null
                                ? `${MYAPI}${notification.notified_sender.current_profile_pic}`
                                : dummyImg
                            }
                          />
                        </Link>

                        <Stack direction="column" spacing={0.7}>
                          <Link to={`/profile/${notification.notified_sender.uid}/${notification.notified_sender.username}/`}>
                            <Typography
                              variant="p"
                              style={{ color: "var(--slate-600)" }}
                            >
                              <span style={{ fontWeight: "600" }}>
                                {notification.notified_sender.username}
                              </span>{" "}
                              sent you a friend request.
                            </Typography>
                          </Link>
                          {!notification.is_friend_request_accepted ? (
                            <Stack
                              direction="row"
                              alignItems="center"
                              style={{ flexWrap: "wrap", gap: "0.5rem" }}
                            >
                              <LoadingButton
                                variant="contained"
                                color="secondary"
                                loadingPosition="end"
                                loading={
                                  disabledButtonId === notification.uid
                                    ? true
                                    : false
                                }
                                style={{ textTransform: "capitalize" }}
                                onClick={() =>
                                  acceptFriendRequest(notification.uid)
                                }
                              >
                                <ThumbUpOffAltIcon />
                                Accept
                              </LoadingButton>
                              <LoadingButton
                                variant="contained"
                                color="error"
                                loadingPosition="end"
                                loading={
                                  disabledButtonId === notification.uid
                                    ? true
                                    : false
                                }
                                style={{ textTransform: "capitalize" }}
                                onClick={() =>
                                  removeFriendRequest(notification.uid)
                                }
                              >
                                <DeleteOutlineIcon />
                                Remove
                              </LoadingButton>
                            </Stack>
                          ) : (
                            <Typography
                              variant="p"
                              style={{
                                color: "var(--slate-600)",
                                fontWeight: "600",
                              }}
                            >
                              You have accepted the friend request.
                            </Typography>
                          )}
                          <Typography
                            variant="p"
                            style={{
                              color: "var(--slate-500)",
                              fontSize: "0.83rem",
                            }}
                          >
                            {moment(notification.created_at).format("lll")}
                          </Typography>
                        </Stack>
                      </Stack>
                      <FiberManualRecordIcon
                        style={{
                          color: colorTheme.palette.primary.main,
                          width: "1rem",
                          height: "1rem",
                        }}
                      />
                    </Stack>
                  )
                )}
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
                  You have no notification yet!
                </Typography>
              </Stack>
            )}

            {notifications.length > 0 && loadMoreNotifications && (
              <Stack direction="row" justifyContent="center">
                <RefreshIcon
                  className="profile__allPicsSpinner"
                  style={{ color: "var(--slate-500)", marginBottom: "1rem" }}
                />
              </Stack>
            )}
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Notification;
