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
import profileImg from "../../dummy/images/portImg.png";
import { Link } from "react-router-dom";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import PersonRemoveOutlinedIcon from "@mui/icons-material/PersonRemoveOutlined";
import FriendSidebar from "./FriendSidebar";
import axios from "axios";
import {
  AccountStore,
  APIStore,
  FriendStore,
} from "../../components/store/Store";
import { colorTheme } from "../../components/colorTheme/ColorTheme";
import RefreshIcon from "@mui/icons-material/Refresh";

const FriendList = () => {
  // Fetching logged in user all friends
  const loggedInUserInfo = AccountStore((state) => state.loggedInUserInfo);
  const addUserFriends = FriendStore((state) => state.addUserFriends);
  const MYAPI = APIStore((state) => state.MYAPI);
  const [friends, setFriends] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadMoreFriends, setLoadMoreFriends] = useState(false);
  const friendListRef = useRef(null);

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
          setIsLoading(false);
        } else if (!res.data.error && res.data.error_finding_friend) {
          setFriends([]);
          setIsLoading(false);
        } else if (!res.data.error && res.data.friend_found) {
          if (res.data.friends.length > 0) {
            setLoadMoreFriends(true);

            friends.length === 0
              ? setFriends(res.data.friends)
              : setFriends((prev) => [...prev, res.data.friends]);

            res.data.friends.length < 5 && setLoadMoreFriends(false);
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

          friends.length === 0 &&
            fetchUserFriends(loggedInUserInfo.uid, numberOfFriendRequests);
        }
      }
    }

    return () => {
      isCancelled = true;
    };
  }, [loggedInUserInfo]);

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
                  ref={friendListRef}
                  style={{ flexWrap: "wrap", gap: "1rem" }}
                >
                  <div className="friend__card">
                    <Stack direction="column" spacing={1}>
                      <Link
                        to="#"
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <img className="friend__img" src={profileImg} alt="" />
                      </Link>

                      <Stack
                        direction="column"
                        spacing={1}
                        style={{ padding: "0 1rem" }}
                      >
                        <Link
                          to="#"
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
                            Wasek Samin
                          </Typography>
                        </Link>

                        <Stack direction="column" spacing={1}>
                          <Link to="#">
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
                          <Button
                            variant="contained"
                            style={{ textTransform: "capitalize" }}
                            color="error"
                          >
                            <PersonRemoveOutlinedIcon
                              style={{ marginRight: "0.12rem" }}
                            />{" "}
                            Unfriend
                          </Button>
                        </Stack>
                      </Stack>
                    </Stack>
                  </div>
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
            </Grid>
          </Grid>
        </Container>
      </div>
    </div>
  );
};

export default FriendList;
