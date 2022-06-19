import { Avatar, Button, Stack, Typography } from "@mui/material";
import React from "react";
import "../../css/home/HomeRightFriendRequests.css";
import profileImg from "../../dummy/images/portImg.png";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Link } from "react-router-dom";

const HomeRightFriendRequests = () => {
  return (
    <div style={{ height: "50vh", overflow: "hidden" }}>
      <div style={{ marginTop: "1.5rem", height: "100%", overflow: "hidden" }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography
            variant="p"
            style={{ fontSize: "1.1rem", color: "var(--slate-600)" }}
          >
            Friend Requests
          </Typography>
          <Link to="/friend-requests/" style={{ color: "black" }}>
            <Button color="secondary" style={{ textTransform: "capitalize" }}>
              See All
            </Button>
          </Link>
        </Stack>
        <div className="home__rightFriendRequests">
          <Stack id="home__rightAllFriendsDiv" direction="column" spacing={2}>
            <Stack direction="column" spacing={1.2}>
              <Stack direction="row" spacing={1} alignItems="center">
                <Link to="#">
                  <Avatar alt="Wasek Samin" src={profileImg} />
                </Link>
                <Stack direction="column" spacing={0.2}>
                  <Link to="#" style={{ color: "var(--black)" }}>
                    <Typography
                      variant="p"
                      style={{ fontSize: "1rem", fontWeight: "600" }}
                    >
                      Wasek Samin
                    </Typography>
                  </Link>
                  <Typography
                    variant="p"
                    style={{ fontSize: "0.83rem", color: "var(--slate-500)" }}
                  >
                    Datetime
                  </Typography>
                </Stack>
              </Stack>

              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={1}
              >
                <Button
                  style={{ flex: "1" }}
                  variant="contained"
                  color="secondary"
                >
                  <ThumbUpOffAltIcon /> Accept
                </Button>
                <Button style={{ flex: "1" }} variant="contained" color="error">
                  <DeleteOutlineIcon /> Remove
                </Button>
              </Stack>
            </Stack>

            <Stack direction="column" spacing={1.2}>
              <Stack direction="row" spacing={1} alignItems="center">
                <Link to="#">
                  <Avatar alt="Wasek Samin" src={profileImg} />
                </Link>
                <Stack direction="column" spacing={0.2}>
                  <Link to="#" style={{ color: "var(--black)" }}>
                    <Typography
                      variant="p"
                      style={{ fontSize: "1rem", fontWeight: "600" }}
                    >
                      Wasek Samin
                    </Typography>
                  </Link>
                  <Typography
                    variant="p"
                    style={{ fontSize: "0.83rem", color: "var(--slate-500)" }}
                  >
                    Datetime
                  </Typography>
                </Stack>
              </Stack>

              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={1}
              >
                <Button
                  style={{ flex: "1" }}
                  variant="contained"
                  color="secondary"
                >
                  <ThumbUpOffAltIcon /> Accept
                </Button>
                <Button style={{ flex: "1" }} variant="contained" color="error">
                  <DeleteOutlineIcon /> Remove
                </Button>
              </Stack>
            </Stack>
            <Stack direction="column" spacing={1.2}>
              <Stack direction="row" spacing={1} alignItems="center">
                <Link to="#">
                  <Avatar alt="Wasek Samin" src={profileImg} />
                </Link>
                <Stack direction="column" spacing={0.2}>
                  <Link to="#" style={{ color: "var(--black)" }}>
                    <Typography
                      variant="p"
                      style={{ fontSize: "1rem", fontWeight: "600" }}
                    >
                      Wasek Samin
                    </Typography>
                  </Link>
                  <Typography
                    variant="p"
                    style={{ fontSize: "0.83rem", color: "var(--slate-500)" }}
                  >
                    Datetime
                  </Typography>
                </Stack>
              </Stack>

              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={1}
              >
                <Button
                  style={{ flex: "1" }}
                  variant="contained"
                  color="secondary"
                >
                  <ThumbUpOffAltIcon /> Accept
                </Button>
                <Button style={{ flex: "1" }} variant="contained" color="error">
                  <DeleteOutlineIcon /> Remove
                </Button>
              </Stack>
            </Stack>
            <Stack direction="column" spacing={1.2}>
              <Stack direction="row" spacing={1} alignItems="center">
                <Link to="#">
                  <Avatar alt="Wasek Samin" src={profileImg} />
                </Link>
                <Stack direction="column" spacing={0.2}>
                  <Link to="#" style={{ color: "var(--black)" }}>
                    <Typography
                      variant="p"
                      style={{ fontSize: "1rem", fontWeight: "600" }}
                    >
                      Wasek Samin
                    </Typography>
                  </Link>
                  <Typography
                    variant="p"
                    style={{ fontSize: "0.83rem", color: "var(--slate-500)" }}
                  >
                    Datetime
                  </Typography>
                </Stack>
              </Stack>

              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={1}
              >
                <Button
                  style={{ flex: "1" }}
                  variant="contained"
                  color="secondary"
                >
                  <ThumbUpOffAltIcon /> Accept
                </Button>
                <Button style={{ flex: "1" }} variant="contained" color="error">
                  <DeleteOutlineIcon /> Remove
                </Button>
              </Stack>
            </Stack>
            <Stack direction="column" spacing={1.2}>
              <Stack direction="row" spacing={1} alignItems="center">
                <Link to="#">
                  <Avatar alt="Wasek Samin" src={profileImg} />
                </Link>
                <Stack direction="column" spacing={0.2}>
                  <Link to="#" style={{ color: "var(--black)" }}>
                    <Typography
                      variant="p"
                      style={{ fontSize: "1rem", fontWeight: "600" }}
                    >
                      Wasek Samin
                    </Typography>
                  </Link>
                  <Typography
                    variant="p"
                    style={{ fontSize: "0.83rem", color: "var(--slate-500)" }}
                  >
                    Datetime
                  </Typography>
                </Stack>
              </Stack>

              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={1}
              >
                <Button
                  style={{ flex: "1" }}
                  variant="contained"
                  color="secondary"
                >
                  <ThumbUpOffAltIcon /> Accept
                </Button>
                <Button style={{ flex: "1" }} variant="contained" color="error">
                  <DeleteOutlineIcon /> Remove
                </Button>
              </Stack>
            </Stack>
            <Stack direction="column" spacing={1.2}>
              <Stack direction="row" spacing={1} alignItems="center">
                <Link to="#">
                  <Avatar alt="Wasek Samin" src={profileImg} />
                </Link>
                <Stack direction="column" spacing={0.2}>
                  <Link to="#" style={{ color: "var(--black)" }}>
                    <Typography
                      variant="p"
                      style={{ fontSize: "1rem", fontWeight: "600" }}
                    >
                      Wasek Samin
                    </Typography>
                  </Link>
                  <Typography
                    variant="p"
                    style={{ fontSize: "0.83rem", color: "var(--slate-500)" }}
                  >
                    Datetime
                  </Typography>
                </Stack>
              </Stack>

              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={1}
              >
                <Button
                  style={{ flex: "1" }}
                  variant="contained"
                  color="secondary"
                >
                  <ThumbUpOffAltIcon /> Accept
                </Button>
                <Button style={{ flex: "1" }} variant="contained" color="error">
                  <DeleteOutlineIcon /> Remove
                </Button>
              </Stack>
            </Stack>
            <Stack direction="column" spacing={1.2}>
              <Stack direction="row" spacing={1} alignItems="center">
                <Link to="#">
                  <Avatar alt="Wasek Samin" src={profileImg} />
                </Link>
                <Stack direction="column" spacing={0.2}>
                  <Link to="#" style={{ color: "var(--black)" }}>
                    <Typography
                      variant="p"
                      style={{ fontSize: "1rem", fontWeight: "600" }}
                    >
                      Wasek Samin
                    </Typography>
                  </Link>
                  <Typography
                    variant="p"
                    style={{ fontSize: "0.83rem", color: "var(--slate-500)" }}
                  >
                    Datetime
                  </Typography>
                </Stack>
              </Stack>

              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={1}
              >
                <Button
                  style={{ flex: "1" }}
                  variant="contained"
                  color="secondary"
                >
                  <ThumbUpOffAltIcon /> Accept
                </Button>
                <Button style={{ flex: "1" }} variant="contained" color="error">
                  <DeleteOutlineIcon /> Remove
                </Button>
              </Stack>
            </Stack>
            <Stack direction="column" spacing={1.2}>
              <Stack direction="row" spacing={1} alignItems="center">
                <Link to="#">
                  <Avatar alt="Wasek Samin" src={profileImg} />
                </Link>
                <Stack direction="column" spacing={0.2}>
                  <Link to="#" style={{ color: "var(--black)" }}>
                    <Typography
                      variant="p"
                      style={{ fontSize: "1rem", fontWeight: "600" }}
                    >
                      Wasek Samin
                    </Typography>
                  </Link>
                  <Typography
                    variant="p"
                    style={{ fontSize: "0.83rem", color: "var(--slate-500)" }}
                  >
                    Datetime
                  </Typography>
                </Stack>
              </Stack>

              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={1}
              >
                <Button
                  style={{ flex: "1" }}
                  variant="contained"
                  color="secondary"
                >
                  <ThumbUpOffAltIcon /> Accept
                </Button>
                <Button style={{ flex: "1" }} variant="contained" color="error">
                  <DeleteOutlineIcon /> Remove
                </Button>
              </Stack>
            </Stack>
            <Stack direction="column" spacing={1.2}>
              <Stack direction="row" spacing={1} alignItems="center">
                <Link to="#">
                  <Avatar alt="Wasek Samin" src={profileImg} />
                </Link>
                <Stack direction="column" spacing={0.2}>
                  <Link to="#" style={{ color: "var(--black)" }}>
                    <Typography
                      variant="p"
                      style={{ fontSize: "1rem", fontWeight: "600" }}
                    >
                      Wasek Samin
                    </Typography>
                  </Link>
                  <Typography
                    variant="p"
                    style={{ fontSize: "0.83rem", color: "var(--slate-500)" }}
                  >
                    Datetime
                  </Typography>
                </Stack>
              </Stack>

              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={1}
              >
                <Button
                  style={{ flex: "1" }}
                  variant="contained"
                  color="secondary"
                >
                  <ThumbUpOffAltIcon /> Accept
                </Button>
                <Button style={{ flex: "1" }} variant="contained" color="error">
                  <DeleteOutlineIcon /> Remove
                </Button>
              </Stack>
            </Stack>
            <Stack direction="column" spacing={1.2}>
              <Stack direction="row" spacing={1} alignItems="center">
                <Link to="#">
                  <Avatar alt="Wasek Samin" src={profileImg} />
                </Link>
                <Stack direction="column" spacing={0.2}>
                  <Link to="#" style={{ color: "var(--black)" }}>
                    <Typography
                      variant="p"
                      style={{ fontSize: "1rem", fontWeight: "600" }}
                    >
                      Wasek Samin
                    </Typography>
                  </Link>
                  <Typography
                    variant="p"
                    style={{ fontSize: "0.83rem", color: "var(--slate-500)" }}
                  >
                    Datetime
                  </Typography>
                </Stack>
              </Stack>

              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={1}
              >
                <Button
                  style={{ flex: "1" }}
                  variant="contained"
                  color="secondary"
                >
                  <ThumbUpOffAltIcon /> Accept
                </Button>
                <Button style={{ flex: "1" }} variant="contained" color="error">
                  <DeleteOutlineIcon /> Remove
                </Button>
              </Stack>
            </Stack>
            <Stack direction="column" spacing={1.2}>
              <Stack direction="row" spacing={1} alignItems="center">
                <Link to="#">
                  <Avatar alt="Wasek Samin" src={profileImg} />
                </Link>
                <Stack direction="column" spacing={0.2}>
                  <Link to="#" style={{ color: "var(--black)" }}>
                    <Typography
                      variant="p"
                      style={{ fontSize: "1rem", fontWeight: "600" }}
                    >
                      Wasek Samin
                    </Typography>
                  </Link>
                  <Typography
                    variant="p"
                    style={{ fontSize: "0.83rem", color: "var(--slate-500)" }}
                  >
                    Datetime
                  </Typography>
                </Stack>
              </Stack>

              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={1}
              >
                <Button
                  style={{ flex: "1" }}
                  variant="contained"
                  color="secondary"
                >
                  <ThumbUpOffAltIcon /> Accept
                </Button>
                <Button style={{ flex: "1" }} variant="contained" color="error">
                  <DeleteOutlineIcon /> Remove
                </Button>
              </Stack>
            </Stack>
            <Stack direction="column" spacing={1.2}>
              <Stack direction="row" spacing={1} alignItems="center">
                <Link to="#">
                  <Avatar alt="Wasek Samin" src={profileImg} />
                </Link>
                <Stack direction="column" spacing={0.2}>
                  <Link to="#" style={{ color: "var(--black)" }}>
                    <Typography
                      variant="p"
                      style={{ fontSize: "1rem", fontWeight: "600" }}
                    >
                      Wasek Samin
                    </Typography>
                  </Link>
                  <Typography
                    variant="p"
                    style={{ fontSize: "0.83rem", color: "var(--slate-500)" }}
                  >
                    Datetime
                  </Typography>
                </Stack>
              </Stack>

              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={1}
              >
                <Button
                  style={{ flex: "1" }}
                  variant="contained"
                  color="secondary"
                >
                  <ThumbUpOffAltIcon /> Accept
                </Button>
                <Button style={{ flex: "1" }} variant="contained" color="error">
                  <DeleteOutlineIcon /> Remove
                </Button>
              </Stack>
            </Stack>
            <Stack direction="column" spacing={1.2}>
              <Stack direction="row" spacing={1} alignItems="center">
                <Link to="#">
                  <Avatar alt="Wasek Samin" src={profileImg} />
                </Link>
                <Stack direction="column" spacing={0.2}>
                  <Link to="#" style={{ color: "var(--black)" }}>
                    <Typography
                      variant="p"
                      style={{ fontSize: "1rem", fontWeight: "600" }}
                    >
                      Wasek Samin
                    </Typography>
                  </Link>
                  <Typography
                    variant="p"
                    style={{ fontSize: "0.83rem", color: "var(--slate-500)" }}
                  >
                    Datetime
                  </Typography>
                </Stack>
              </Stack>

              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={1}
              >
                <Button
                  style={{ flex: "1" }}
                  variant="contained"
                  color="secondary"
                >
                  <ThumbUpOffAltIcon /> Accept
                </Button>
                <Button style={{ flex: "1" }} variant="contained" color="error">
                  <DeleteOutlineIcon /> Remove
                </Button>
              </Stack>
            </Stack>
            <Stack direction="column" spacing={1.2}>
              <Stack direction="row" spacing={1} alignItems="center">
                <Link to="#">
                  <Avatar alt="Wasek Samin" src={profileImg} />
                </Link>
                <Stack direction="column" spacing={0.2}>
                  <Link to="#" style={{ color: "var(--black)" }}>
                    <Typography
                      variant="p"
                      style={{ fontSize: "1rem", fontWeight: "600" }}
                    >
                      Wasek Samin
                    </Typography>
                  </Link>
                  <Typography
                    variant="p"
                    style={{ fontSize: "0.83rem", color: "var(--slate-500)" }}
                  >
                    Datetime
                  </Typography>
                </Stack>
              </Stack>

              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={1}
              >
                <Button
                  style={{ flex: "1" }}
                  variant="contained"
                  color="secondary"
                >
                  <ThumbUpOffAltIcon /> Accept
                </Button>
                <Button style={{ flex: "1" }} variant="contained" color="error">
                  <DeleteOutlineIcon /> Remove
                </Button>
              </Stack>
            </Stack>
            <Stack direction="column" spacing={1.2}>
              <Stack direction="row" spacing={1} alignItems="center">
                <Link to="#">
                  <Avatar alt="Wasek Samin" src={profileImg} />
                </Link>
                <Stack direction="column" spacing={0.2}>
                  <Link to="#" style={{ color: "var(--black)" }}>
                    <Typography
                      variant="p"
                      style={{ fontSize: "1rem", fontWeight: "600" }}
                    >
                      Wasek Samin
                    </Typography>
                  </Link>
                  <Typography
                    variant="p"
                    style={{ fontSize: "0.83rem", color: "var(--slate-500)" }}
                  >
                    Datetime
                  </Typography>
                </Stack>
              </Stack>

              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={1}
              >
                <Button
                  style={{ flex: "1" }}
                  variant="contained"
                  color="secondary"
                >
                  <ThumbUpOffAltIcon /> Accept
                </Button>
                <Button style={{ flex: "1" }} variant="contained" color="error">
                  <DeleteOutlineIcon /> Remove
                </Button>
              </Stack>
            </Stack>
            <Stack direction="column" spacing={1.2}>
              <Stack direction="row" spacing={1} alignItems="center">
                <Link to="#">
                  <Avatar alt="Wasek Samin" src={profileImg} />
                </Link>
                <Stack direction="column" spacing={0.2}>
                  <Link to="#" style={{ color: "var(--black)" }}>
                    <Typography
                      variant="p"
                      style={{ fontSize: "1rem", fontWeight: "600" }}
                    >
                      Wasek Samin
                    </Typography>
                  </Link>
                  <Typography
                    variant="p"
                    style={{ fontSize: "0.83rem", color: "var(--slate-500)" }}
                  >
                    Datetime
                  </Typography>
                </Stack>
              </Stack>

              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={1}
              >
                <Button
                  style={{ flex: "1" }}
                  variant="contained"
                  color="secondary"
                >
                  <ThumbUpOffAltIcon /> Accept
                </Button>
                <Button style={{ flex: "1" }} variant="contained" color="error">
                  <DeleteOutlineIcon /> Remove
                </Button>
              </Stack>
            </Stack>
            <Stack direction="column" spacing={1.2}>
              <Stack direction="row" spacing={1} alignItems="center">
                <Link to="#">
                  <Avatar alt="Wasek Samin" src={profileImg} />
                </Link>
                <Stack direction="column" spacing={0.2}>
                  <Link to="#" style={{ color: "var(--black)" }}>
                    <Typography
                      variant="p"
                      style={{ fontSize: "1rem", fontWeight: "600" }}
                    >
                      Wasek Samin
                    </Typography>
                  </Link>
                  <Typography
                    variant="p"
                    style={{ fontSize: "0.83rem", color: "var(--slate-500)" }}
                  >
                    Datetime
                  </Typography>
                </Stack>
              </Stack>

              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={1}
              >
                <Button
                  style={{ flex: "1" }}
                  variant="contained"
                  color="secondary"
                >
                  <ThumbUpOffAltIcon /> Accept
                </Button>
                <Button style={{ flex: "1" }} variant="contained" color="error">
                  <DeleteOutlineIcon /> Remove
                </Button>
              </Stack>
            </Stack>
            <Stack direction="column" spacing={1.2}>
              <Stack direction="row" spacing={1} alignItems="center">
                <Link to="#">
                  <Avatar alt="Wasek Samin" src={profileImg} />
                </Link>
                <Stack direction="column" spacing={0.2}>
                  <Link to="#" style={{ color: "var(--black)" }}>
                    <Typography
                      variant="p"
                      style={{ fontSize: "1rem", fontWeight: "600" }}
                    >
                      Last One
                    </Typography>
                  </Link>
                  <Typography
                    variant="p"
                    style={{ fontSize: "0.83rem", color: "var(--slate-500)" }}
                  >
                    Datetime
                  </Typography>
                </Stack>
              </Stack>

              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={1}
              >
                <Button
                  style={{ flex: "1" }}
                  variant="contained"
                  color="secondary"
                >
                  <ThumbUpOffAltIcon /> Accept
                </Button>
                <Button style={{ flex: "1" }} variant="contained" color="error">
                  <DeleteOutlineIcon /> Remove
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </div>
      </div>
    </div>
  );
};

export default HomeRightFriendRequests;
