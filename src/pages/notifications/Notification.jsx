import {
  Avatar,
  Button,
  Container,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import Navbar from "../../components/navbar/Navbar";
import "../../css/notifications/Notification.css";
import profileImg from "../../dummy/images/portImg.png";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { colorTheme } from "../../components/colorTheme/ColorTheme";
import { Link } from "react-router-dom";


const Notification = () => {
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

            <Stack direction="column" spacing={0.7}>
              <Link className="notification__link" to="#" style={{ color: "black", width: "100%" }}>
                <Stack
                  direction="row"
                  spacing={1}
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Avatar alt="Wasek Samin" src={profileImg} />

                    <Stack direction="column" spacing={0.2}>
                      <Typography
                        variant="p"
                        style={{ color: "var(--slate-600)" }}
                      >
                        <span style={{ fontWeight: "600" }}>Wasek Samin</span>{" "}
                        commented on your post.
                      </Typography>

                      <Typography
                        variant="p"
                        style={{
                          color: "var(--slate-500)",
                          fontSize: "0.83rem",
                        }}
                      >
                        Datetime
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

              <Link className="notification__link" to="#" style={{ color: "black", width: "100%" }}>
                <Stack
                  direction="row"
                  spacing={1}
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Avatar alt="Wasek Samin" src={profileImg} />

                    <Stack direction="column" spacing={0.2}>
                      <Typography
                        variant="p"
                        style={{ color: "var(--slate-600)" }}
                      >
                        <span style={{ fontWeight: "600" }}>Wasek Samin</span>{" "}
                        commented on your post.
                      </Typography>

                      <Typography
                        variant="p"
                        style={{
                          color: "var(--slate-500)",
                          fontSize: "0.83rem",
                        }}
                      >
                        Datetime
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
              <Link className="notification__link" to="#" style={{ color: "black", width: "100%" }}>
                <Stack
                  direction="row"
                  spacing={1}
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Avatar alt="Wasek Samin" src={profileImg} />

                    <Stack direction="column" spacing={0.2}>
                      <Typography
                        variant="p"
                        style={{ color: "var(--slate-600)" }}
                      >
                        <span style={{ fontWeight: "600" }}>Wasek Samin</span>{" "}
                        commented on your post.
                      </Typography>

                      <Typography
                        variant="p"
                        style={{
                          color: "var(--slate-500)",
                          fontSize: "0.83rem",
                        }}
                      >
                        Datetime
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
              <Link className="notification__link" to="#" style={{ color: "black", width: "100%" }}>
                <Stack
                  direction="row"
                  spacing={1}
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Avatar alt="Wasek Samin" src={profileImg} />

                    <Stack direction="column" spacing={0.2}>
                      <Typography
                        variant="p"
                        style={{ color: "var(--slate-600)" }}
                      >
                        <span style={{ fontWeight: "600" }}>Wasek Samin</span>{" "}
                        commented on your post.
                      </Typography>

                      <Typography
                        variant="p"
                        style={{
                          color: "var(--slate-500)",
                          fontSize: "0.83rem",
                        }}
                      >
                        Datetime
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
              <Link className="notification__link" to="#" style={{ color: "black", width: "100%" }}>
                <Stack
                  direction="row"
                  spacing={1}
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Avatar alt="Wasek Samin" src={profileImg} />

                    <Stack direction="column" spacing={0.2}>
                      <Typography
                        variant="p"
                        style={{ color: "var(--slate-600)" }}
                      >
                        <span style={{ fontWeight: "600" }}>Wasek Samin</span>{" "}
                        commented on your post.
                      </Typography>

                      <Typography
                        variant="p"
                        style={{
                          color: "var(--slate-500)",
                          fontSize: "0.83rem",
                        }}
                      >
                        Datetime
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
              <Link className="notification__link" to="#" style={{ color: "black", width: "100%" }}>
                <Stack
                  direction="row"
                  spacing={1}
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Avatar alt="Wasek Samin" src={profileImg} />

                    <Stack direction="column" spacing={0.2}>
                      <Typography
                        variant="p"
                        style={{ color: "var(--slate-600)" }}
                      >
                        <span style={{ fontWeight: "600" }}>Wasek Samin</span>{" "}
                        commented on your post.
                      </Typography>

                      <Typography
                        variant="p"
                        style={{
                          color: "var(--slate-500)",
                          fontSize: "0.83rem",
                        }}
                      >
                        Datetime
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
              <Link className="notification__link" to="#" style={{ color: "black", width: "100%" }}>
                <Stack
                  direction="row"
                  spacing={1}
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Avatar alt="Wasek Samin" src={profileImg} />

                    <Stack direction="column" spacing={0.2}>
                      <Typography
                        variant="p"
                        style={{ color: "var(--slate-600)" }}
                      >
                        <span style={{ fontWeight: "600" }}>Wasek Samin</span>{" "}
                        commented on your post.
                      </Typography>

                      <Typography
                        variant="p"
                        style={{
                          color: "var(--slate-500)",
                          fontSize: "0.83rem",
                        }}
                      >
                        Datetime
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
              <Link className="notification__link" to="#" style={{ color: "black", width: "100%" }}>
                <Stack
                  direction="row"
                  spacing={1}
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Avatar alt="Wasek Samin" src={profileImg} />

                    <Stack direction="column" spacing={0.2}>
                      <Typography
                        variant="p"
                        style={{ color: "var(--slate-600)" }}
                      >
                        <span style={{ fontWeight: "600" }}>Wasek Samin</span>{" "}
                        commented on your post.
                      </Typography>

                      <Typography
                        variant="p"
                        style={{
                          color: "var(--slate-500)",
                          fontSize: "0.83rem",
                        }}
                      >
                        Datetime
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
              <Link className="notification__link" to="#" style={{ color: "black", width: "100%" }}>
                <Stack
                  direction="row"
                  spacing={1}
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Avatar alt="Wasek Samin" src={profileImg} />

                    <Stack direction="column" spacing={0.2}>
                      <Typography
                        variant="p"
                        style={{ color: "var(--slate-600)" }}
                      >
                        <span style={{ fontWeight: "600" }}>Wasek Samin</span>{" "}
                        commented on your post.
                      </Typography>

                      <Typography
                        variant="p"
                        style={{
                          color: "var(--slate-500)",
                          fontSize: "0.83rem",
                        }}
                      >
                        Datetime
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
              <Link className="notification__link" to="#" style={{ color: "black", width: "100%" }}>
                <Stack
                  direction="row"
                  spacing={1}
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Avatar alt="Wasek Samin" src={profileImg} />

                    <Stack direction="column" spacing={0.2}>
                      <Typography
                        variant="p"
                        style={{ color: "var(--slate-600)" }}
                      >
                        <span style={{ fontWeight: "600" }}>Wasek Samin</span>{" "}
                        commented on your post.
                      </Typography>

                      <Typography
                        variant="p"
                        style={{
                          color: "var(--slate-500)",
                          fontSize: "0.83rem",
                        }}
                      >
                        Datetime
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
              <Link className="notification__link" to="#" style={{ color: "black", width: "100%" }}>
                <Stack
                  direction="row"
                  spacing={1}
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Avatar alt="Wasek Samin" src={profileImg} />

                    <Stack direction="column" spacing={0.2}>
                      <Typography
                        variant="p"
                        style={{ color: "var(--slate-600)" }}
                      >
                        <span style={{ fontWeight: "600" }}>Wasek Samin</span>{" "}
                        commented on your post.
                      </Typography>

                      <Typography
                        variant="p"
                        style={{
                          color: "var(--slate-500)",
                          fontSize: "0.83rem",
                        }}
                      >
                        Datetime
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
              <Link className="notification__link" to="#" style={{ color: "black", width: "100%" }}>
                <Stack
                  direction="row"
                  spacing={1}
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Avatar alt="Wasek Samin" src={profileImg} />

                    <Stack direction="column" spacing={0.2}>
                      <Typography
                        variant="p"
                        style={{ color: "var(--slate-600)" }}
                      >
                        <span style={{ fontWeight: "600" }}>Wasek Samin</span>{" "}
                        commented on your post.
                      </Typography>

                      <Typography
                        variant="p"
                        style={{
                          color: "var(--slate-500)",
                          fontSize: "0.83rem",
                        }}
                      >
                        Datetime
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
              <Link className="notification__link" to="#" style={{ color: "black", width: "100%" }}>
                <Stack
                  direction="row"
                  spacing={1}
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Avatar alt="Wasek Samin" src={profileImg} />

                    <Stack direction="column" spacing={0.2}>
                      <Typography
                        variant="p"
                        style={{ color: "var(--slate-600)" }}
                      >
                        <span style={{ fontWeight: "600" }}>Wasek Samin</span>{" "}
                        commented on your post.
                      </Typography>

                      <Typography
                        variant="p"
                        style={{
                          color: "var(--slate-500)",
                          fontSize: "0.83rem",
                        }}
                      >
                        Datetime
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
              <Link className="notification__link" to="#" style={{ color: "black", width: "100%" }}>
                <Stack
                  direction="row"
                  spacing={1}
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Avatar alt="Wasek Samin" src={profileImg} />

                    <Stack direction="column" spacing={0.2}>
                      <Typography
                        variant="p"
                        style={{ color: "var(--slate-600)" }}
                      >
                        <span style={{ fontWeight: "600" }}>Wasek Samin</span>{" "}
                        commented on your post.
                      </Typography>

                      <Typography
                        variant="p"
                        style={{
                          color: "var(--slate-500)",
                          fontSize: "0.83rem",
                        }}
                      >
                        Datetime
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
              <Link className="notification__link" to="#" style={{ color: "black", width: "100%" }}>
                <Stack
                  direction="row"
                  spacing={1}
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Avatar alt="Wasek Samin" src={profileImg} />

                    <Stack direction="column" spacing={0.2}>
                      <Typography
                        variant="p"
                        style={{ color: "var(--slate-600)" }}
                      >
                        <span style={{ fontWeight: "600" }}>Wasek Samin</span>{" "}
                        commented on your post.
                      </Typography>

                      <Typography
                        variant="p"
                        style={{
                          color: "var(--slate-500)",
                          fontSize: "0.83rem",
                        }}
                      >
                        Datetime
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
              <Link className="notification__link" to="#" style={{ color: "black", width: "100%" }}>
                <Stack
                  direction="row"
                  spacing={1}
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Avatar alt="Wasek Samin" src={profileImg} />

                    <Stack direction="column" spacing={0.2}>
                      <Typography
                        variant="p"
                        style={{ color: "var(--slate-600)" }}
                      >
                        <span style={{ fontWeight: "600" }}>Wasek Samin</span>{" "}
                        commented on your post.
                      </Typography>

                      <Typography
                        variant="p"
                        style={{
                          color: "var(--slate-500)",
                          fontSize: "0.83rem",
                        }}
                      >
                        Datetime
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
              <Link className="notification__link" to="#" style={{ color: "black", width: "100%" }}>
                <Stack
                  direction="row"
                  spacing={1}
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Avatar alt="Wasek Samin" src={profileImg} />

                    <Stack direction="column" spacing={0.2}>
                      <Typography
                        variant="p"
                        style={{ color: "var(--slate-600)" }}
                      >
                        <span style={{ fontWeight: "600" }}>Wasek Samin</span>{" "}
                        commented on your post.
                      </Typography>

                      <Typography
                        variant="p"
                        style={{
                          color: "var(--slate-500)",
                          fontSize: "0.83rem",
                        }}
                      >
                        Datetime
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
              <Link className="notification__link" to="#" style={{ color: "black", width: "100%" }}>
                <Stack
                  direction="row"
                  spacing={1}
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Avatar alt="Wasek Samin" src={profileImg} />

                    <Stack direction="column" spacing={0.2}>
                      <Typography
                        variant="p"
                        style={{ color: "var(--slate-600)" }}
                      >
                        <span style={{ fontWeight: "600" }}>Wasek Samin</span>{" "}
                        commented on your post.
                      </Typography>

                      <Typography
                        variant="p"
                        style={{
                          color: "var(--slate-500)",
                          fontSize: "0.83rem",
                        }}
                      >
                        Datetime
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
              <Link className="notification__link" to="#" style={{ color: "black", width: "100%" }}>
                <Stack
                  direction="row"
                  spacing={1}
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Avatar alt="Wasek Samin" src={profileImg} />

                    <Stack direction="column" spacing={0.2}>
                      <Typography
                        variant="p"
                        style={{ color: "var(--slate-600)" }}
                      >
                        <span style={{ fontWeight: "600" }}>Wasek Samin</span>{" "}
                        commented on your post.
                      </Typography>

                      <Typography
                        variant="p"
                        style={{
                          color: "var(--slate-500)",
                          fontSize: "0.83rem",
                        }}
                      >
                        Datetime
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
              <Link className="notification__link" to="#" style={{ color: "black", width: "100%" }}>
                <Stack
                  direction="row"
                  spacing={1}
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Avatar alt="Wasek Samin" src={profileImg} />

                    <Stack direction="column" spacing={0.2}>
                      <Typography
                        variant="p"
                        style={{ color: "var(--slate-600)" }}
                      >
                        <span style={{ fontWeight: "600" }}>Wasek Samin</span>{" "}
                        commented on your post.
                      </Typography>

                      <Typography
                        variant="p"
                        style={{
                          color: "var(--slate-500)",
                          fontSize: "0.83rem",
                        }}
                      >
                        Datetime
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
            </Stack>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Notification;
