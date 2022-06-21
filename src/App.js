import React from "react";
import {Routes, Route} from "react-router-dom";
import CssBaseline from '@mui/material/CssBaseline';
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

function App() {
  return (
    <div className="App">
      <CssBaseline />
      <Routes>
        <Route path = "/" element={<Home />} />
        <Route path="/login/" element={<Login />} />
        <Route path="/register/" element={<Register />} />
        <Route path="/chat/" element={<Chat />} />
        <Route path="/notifications/" element={<Notification />} />
        <Route path="/friend-requests/" element={<FriendRequest />} />
        <Route path="/friend-list/" element={<FriendList />} />
        <Route path="/profile/" element={<Profile />} />
        <Route path="/profile/about/" element={<ProfileAbout />} />
        <Route path="/profile/photos/" element={<ProfilePhotos />} />
        <Route path="/edit-password/" element={<ChangePasswordText />} />
        <Route path="/active-account/" element={<ActiveAccount />} />
        <Route path="/edit-password/:token/" element={<EditPassword />} />
      </Routes>
    </div>
  );
}

export default App;
