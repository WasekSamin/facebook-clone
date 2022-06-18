import React from "react";
import {Routes, Route} from "react-router-dom";
import CssBaseline from '@mui/material/CssBaseline';
import Login from "./pages/authentication/Login";
import Register from "./pages/authentication/Register";
import Home from "./pages/home/Home";
import Chat from "./pages/chat/Chat";

function App() {
  return (
    <div className="App">
      <CssBaseline />
      <Routes>
        <Route path = "/" element={<Home />} />
        <Route path="/login/" element={<Login />} />
        <Route path="/register/" element={<Register />} />
        <Route path="/chat/" element={<Chat />} />
      </Routes>
    </div>
  );
}

export default App;
