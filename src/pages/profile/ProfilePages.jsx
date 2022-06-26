import { Button, Stack } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { ProfileStore } from "../../components/store/Store";

const ProfilePages = ({ currentProfilePage }) => {
  const currentProfile = ProfileStore((state) => state.currentProfile);

  return (
    <div style={{ margin: "2rem 0" }}>
      <Stack
        style={{
          padding: "1rem 0.5rem",
          backgroundColor: "white",
          borderRadius: "10px",
        }}
        direction="row"
        alignItems="center"
        justifyContent="center"
      >
        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          style={{ flexWrap: "wrap" }}
        >
          {currentProfile !== null && (
            <>
              <Link to={`/profile/${currentProfile.uid}/${currentProfile.username}/`} style={{ color: "black" }}>
                <Button
                  variant={
                    currentProfilePage === "profile_post" ? "contained" : ""
                  }
                  color="secondary"
                >
                  Post
                </Button>
              </Link>
              <Link to={`/profile/about/${currentProfile.uid}/${currentProfile.username}/`} style={{ color: "black" }}>
                <Button
                  color="secondary"
                  variant={
                    currentProfilePage === "profile_about" ? "contained" : ""
                  }
                >
                  About
                </Button>
              </Link>
              <Link to={`/profile/photos/${currentProfile.uid}/${currentProfile.username}/`} style={{ color: "black" }}>
                <Button
                  color="secondary"
                  variant={
                    currentProfilePage === "profile_photos" ? "contained" : ""
                  }
                >
                  Photos
                </Button>
              </Link>
              <Link to="/friend-list/" style={{ color: "black" }}>
                <Button
                  color="secondary"
                  variant={
                    currentProfilePage === "profile_friends" ? "contained" : ""
                  }
                >
                  Friends
                </Button>
              </Link>
            </>
          )}
        </Stack>
      </Stack>
    </div>
  );
};

export default ProfilePages;
