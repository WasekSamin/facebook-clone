import { Button, Stack } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const ProfilePages = ({currentProfilePage}) => {
  return (
    <div style={{ margin: "2rem 0" }}>
        <Stack style={{ padding: "1rem 0.5rem", backgroundColor: "white", borderRadius: "10px" }} direction="row" alignItems="center" justifyContent="center">
            <Stack direction="row" alignItems="center" spacing={1} style={{ flexWrap: "wrap" }}>
                <Link to="/profile/" style={{ color: "black" }}>
                    <Button variant={currentProfilePage === "profile_post" ? "contained" : ""} color="secondary">Post</Button>
                </Link>
                <Link to="/profile/about/" style={{ color: "black" }}>
                    <Button color="secondary" variant={currentProfilePage === "profile_about" ? "contained" : ""}>About</Button>
                </Link>
                <Link to="/profile/photos/" style={{ color: "black" }}>
                    <Button color="secondary" variant={currentProfilePage === "profile_photos" ? "contained" : ""}>Photos</Button>
                </Link>
                <Link to="/friend-list/" style={{ color: "black" }}>
                    <Button color="secondary" variant={currentProfilePage === "profile_friends" ? "contained" : ""}>Friends</Button>
                </Link>
            </Stack>
        </Stack>
    </div>
  )
}

export default ProfilePages