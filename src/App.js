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
      </Routes>
    </div>
  );
}

export default App;
