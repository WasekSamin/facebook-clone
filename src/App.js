import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Login from "./pages/authentication/Login";
import Register from "./pages/authentication/Register";
import Home from "./pages/home/Home";
import Chat from "./pages/chat/Chat";
import Notification from "./pages/notifications/Notification";
import FriendRequest from "./pages/friends/FriendRequest";
import FriendList from "./pages/friends/FriendList";
import Profile from "./pages/profile/Profile";
import ProfileAbout from "./pages/profile/ProfileAbout";
import ProfilePhotos from "./pages/profile/ProfilePhotos";
import EditPassword from "./pages/authentication/EditPassword";
import ChangePasswordText from "./pages/authentication/ChangePasswordText";
import ActiveAccount from "./pages/authentication/ActiveAccount";
import {
  AccountStore,
  APIStore,
  PostStore,
  SocketStore,
  TokenStore,
} from "./components/store/Store";
import axios from "axios";
import Cookies from "js-cookie";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";

function App() {
  let navigate = useNavigate();
  const MYAPI = APIStore((state) => state.MYAPI);
  const token = TokenStore((state) => state.token);
  const updateToken = TokenStore((state) => state.updateToken);
  const addAllAccounts = AccountStore((state) => state.addAllAccounts);
  const socket = SocketStore((state) => state.socket);
  const updateSocket = SocketStore((state) => state.updateSocket);
  const updateIsUserLoggedIn = AccountStore(
    (state) => state.updateIsUserLoggedIn
  );
  const updateLoggedInUserInfo = AccountStore(
    (state) => state.updateLoggedInUserInfo
  );
  const allPosts = PostStore((state) => state.allPosts);
  const accounts = AccountStore((state) => state.accounts);
  const addAllPosts = PostStore((state) => state.addAllPosts);
  const addNewPost = PostStore((state) => state.addNewPost);
  const updateAccountData = AccountStore(state => state.updateAccountData);
  const updatePostAccountData = PostStore(state => state.updatePostAccountData);

  // Connecting socket
  const socketConnection = (userToken) => {
    const newSocket = io("http://localhost:9000", {
      query: { userToken },
    });

    newSocket.on("connect", () => {
      const socketCookie = Cookies.get("SCON");

      if (!socketCookie) {
        Cookies.set("SCON", newSocket.id);
      } else {
        newSocket.id = socketCookie;
      }
      updateSocket(newSocket);
    });

    return () => newSocket.close();
  };

  const fetchAccountInfo = (userUid, userToken) => {
    axios
      .get(`${MYAPI}/authentication/account-detail/${userUid}/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `token ${userToken}`,
        },
      })
      .then((res) => {
        updateIsUserLoggedIn(true);
        updateLoggedInUserInfo(res.data);
      })
      .catch((err) => console.error(err));
  };

  // Fetching the logged in user info
  const fetchLoggedInUserInfo = (userToken) => {
    axios
      .get(`${MYAPI}/authentication/fetch-user-info/${userToken}/`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res.data.error) {
          alert("Something went wrong!");
        } else if (!res.data.error && res.data.user_found) {
          fetchAccountInfo(res.data.user_uid, userToken);
        }
      })
      .catch((err) => console.error(err));
  };

  const fetchUserToken = () => {
    const tokenCookie = Cookies.get("SID");

    if (tokenCookie) {
      axios
        .get(
          `${MYAPI}/authentication/check-for-token-validation/${tokenCookie}/`,
          {
            headers: {
              "Content-type": "application/json",
            },
          }
        )
        .then((res) => {
          if (res.data.error) {
            if (
              window.location.pathname !== "/login/" &&
              window.location.pathname !== "/register/"
            )
              navigate("/login/");
          } else if (!res.data.error && res.data.token_valid) {
            updateToken(tokenCookie);
            fetchLoggedInUserInfo(tokenCookie);
            socketConnection(tokenCookie);
          }
        })
        .catch((err) => console.error(err));
    } else {
      if (
        window.location.pathname !== "/login/" &&
        window.location.pathname !== "/register/"
      )
        navigate("/login/");
    }
  };

  const fetchAccounts = async () => {
    await axios
      .get(`${MYAPI}/authentication/account-list/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `token ${token}`,
        },
      })
      .then((res) => {
        addAllAccounts(res.data);
      })
      .catch((err) => console.error(err));
  };

  const fetchPosts = async () => {
    await axios
      .get(`${MYAPI}/post/post-list/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `token ${token}`,
        },
      })
      .then((res) => {
        addAllPosts(res.data);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchUserToken();
    fetchAccounts();
    fetchPosts();
  }, []);

  // Add new post
  useEffect(() => {
    let isCancelled = false;

    if (socket !== null) {
      socket.on("receive-post", (postObj) => {
        if (!isCancelled) {
          addNewPost(postObj);
        }
      });

      socket.on("receive-account-update-data", (accountObj) => {
        if (!isCancelled) {
          updateAccountData(accountObj);
          updatePostAccountData(accountObj);
        }
      });
    }

    return () => {
      isCancelled = true;
    };
  }, [socket]);

  console.log(accounts);

  return (
    <div className="App">
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login/" element={<Login />} />
        <Route path="/register/" element={<Register />} />
        <Route path="/chat/" element={<Chat />} />
        <Route path="/notifications/" element={<Notification />} />
        <Route path="/friend-requests/" element={<FriendRequest />} />
        <Route path="/friend-list/" element={<FriendList />} />
        <Route path="/profile/:uid/:username/" element={<Profile />} />
        <Route
          path="/profile/about/:uid/:username/"
          element={<ProfileAbout />}
        />
        <Route
          path="/profile/photos/:uid/:username/"
          element={<ProfilePhotos />}
        />
        <Route path="/edit-password/" element={<ChangePasswordText />} />
        <Route path="/active-account/" element={<ActiveAccount />} />
        <Route path="/edit-password/:token/" element={<EditPassword />} />
      </Routes>
    </div>
  );
}

export default App;
