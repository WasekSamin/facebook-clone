import { Button, Container, Divider, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import Navbar from "../../components/navbar/Navbar";
import profileImg from "../../dummy/images/portImg.png";
import { Link } from "react-router-dom";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import PersonRemoveOutlinedIcon from '@mui/icons-material/PersonRemoveOutlined';
import FriendSidebar from "./FriendSidebar";

const FriendList = () => {
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

              <Stack id="friend__containerDiv" direction="row" style={{ flexWrap: "wrap", gap: "1rem" }}>
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
                      <Link to="#" style={{ color: "black", textAlign: "center" }}>
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
                        <Button variant="contained" style={{ textTransform: "capitalize" }} color="secondary">
                          <AccountCircleOutlinedIcon style={{ marginRight: "0.3rem" }} />
                          Profile
                        </Button>
                        <Button variant="contained" style={{ textTransform: "capitalize" }} color="error">
                          <PersonRemoveOutlinedIcon style={{ marginRight: "0.3rem" }} /> {" "}
                          Unfriend
                        </Button>
                      </Stack>
                    </Stack>
                  </Stack>
                </div>

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
                      <Link to="#" style={{ color: "black", textAlign: "center" }}>
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
                        <Button variant="contained" style={{ textTransform: "capitalize" }} color="secondary">
                          <AccountCircleOutlinedIcon style={{ marginRight: "0.3rem" }} />
                          Profile
                        </Button>
                        <Button variant="contained" style={{ textTransform: "capitalize" }} color="error">
                          <PersonRemoveOutlinedIcon style={{ marginRight: "0.3rem" }} /> {" "}
                          Unfriend
                        </Button>
                      </Stack>
                    </Stack>
                  </Stack>
                </div>
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
                      <Link to="#" style={{ color: "black", textAlign: "center" }}>
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
                        <Button variant="contained" style={{ textTransform: "capitalize" }} color="secondary">
                          <AccountCircleOutlinedIcon style={{ marginRight: "0.3rem" }} />
                          Profile
                        </Button>
                        <Button variant="contained" style={{ textTransform: "capitalize" }} color="error">
                          <PersonRemoveOutlinedIcon style={{ marginRight: "0.3rem" }} />
                          Unfriend
                        </Button>
                      </Stack>
                    </Stack>
                  </Stack>
                </div>
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
                      <Link to="#" style={{ color: "black", textAlign: "center" }}>
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
                        <Button variant="contained" style={{ textTransform: "capitalize" }} color="secondary">
                          <AccountCircleOutlinedIcon style={{ marginRight: "0.3rem" }} />
                          Profile
                        </Button>
                        <Button variant="contained" style={{ textTransform: "capitalize" }} color="error">
                          <PersonRemoveOutlinedIcon style={{ marginRight: "0.3rem" }} /> {" "}
                          Unfriend
                        </Button>
                      </Stack>
                    </Stack>
                  </Stack>
                </div>
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
                      <Link to="#" style={{ color: "black", textAlign: "center" }}>
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
                        <Button variant="contained" style={{ textTransform: "capitalize" }} color="secondary">
                          <AccountCircleOutlinedIcon style={{ marginRight: "0.3rem" }} />
                          Profile
                        </Button>
                        <Button variant="contained" style={{ textTransform: "capitalize" }} color="error">
                          <PersonRemoveOutlinedIcon style={{ marginRight: "0.3rem" }} /> {" "}
                          Unfriend
                        </Button>
                      </Stack>
                    </Stack>
                  </Stack>
                </div>
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
                      <Link to="#" style={{ color: "black", textAlign: "center" }}>
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
                        <Button variant="contained" style={{ textTransform: "capitalize" }} color="secondary">
                          <AccountCircleOutlinedIcon style={{ marginRight: "0.3rem" }} />
                          Profile
                        </Button>
                        <Button variant="contained" style={{ textTransform: "capitalize" }} color="error">
                          <PersonRemoveOutlinedIcon style={{ marginRight: "0.3rem" }} /> {" "}
                          Unfriend
                        </Button>
                      </Stack>
                    </Stack>
                  </Stack>
                </div>
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
                      <Link to="#" style={{ color: "black", textAlign: "center" }}>
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
                        <Button variant="contained" style={{ textTransform: "capitalize" }} color="secondary">
                          <AccountCircleOutlinedIcon style={{ marginRight: "0.3rem" }} />
                          Profile
                        </Button>
                        <Button variant="contained" style={{ textTransform: "capitalize" }} color="error">
                          <PersonRemoveOutlinedIcon style={{ marginRight: "0.3rem" }} /> {" "}
                          Unfriend
                        </Button>
                      </Stack>
                    </Stack>
                  </Stack>
                </div>
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
                      <Link to="#" style={{ color: "black", textAlign: "center" }}>
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
                        <Button variant="contained" style={{ textTransform: "capitalize" }} color="secondary">
                          <AccountCircleOutlinedIcon style={{ marginRight: "0.3rem" }} />
                          Profile
                        </Button>
                        <Button variant="contained" style={{ textTransform: "capitalize" }} color="error">
                          <PersonRemoveOutlinedIcon style={{ marginRight: "0.3rem" }} /> {" "}
                          Unfriend
                        </Button>
                      </Stack>
                    </Stack>
                  </Stack>
                </div>
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
                      <Link to="#" style={{ color: "black", textAlign: "center" }}>
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
                        <Button variant="contained" style={{ textTransform: "capitalize" }} color="secondary">
                          <AccountCircleOutlinedIcon style={{ marginRight: "0.3rem" }} />
                          View
                        </Button>
                        <Button variant="contained" style={{ textTransform: "capitalize" }} color="error">
                          <PersonRemoveOutlinedIcon style={{ marginRight: "0.3rem" }} /> {" "}
                          Unfriend
                        </Button>
                      </Stack>
                    </Stack>
                  </Stack>
                </div>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </div>
    </div>
  );
};

export default FriendList;
