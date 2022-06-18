import { Avatar, Divider, IconButton, Stack, Typography } from "@mui/material";
import React, { useEffect, useRef } from "react";
import CloseIcon from "@mui/icons-material/Close";
import "../../css/post/PostLikeModal.css";
import profileImg from "../../dummy/images/portImg.png";
import { Link } from "react-router-dom";

const PostLikeModal = ({ showPostLikeModal, setShowPostLikeModal }) => {
  const postLikeModalRef = useRef(null);

  const closePostLikeModal = (event) => {
    if (
      postLikeModalRef.current !== null &&
      !postLikeModalRef.current.contains(event.target)
    ) {
      setShowPostLikeModal(null);
    }
  };

  useEffect(() => {
    document.addEventListener("click", closePostLikeModal, true);

    return () => {
      document.removeEventListener("click", closePostLikeModal, true);
    };
  }, []);

  return (
    <div>
      <div id="post__likeModalDiv" ref={postLikeModalRef}>
        <Stack style={{ height: "100%" }} direction="column" spacing={1}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6">
              Total Likes{" "}
              <span style={{ color: "var(--slate-500)" }}>(1.2k)</span>
            </Typography>
            <IconButton
              onClick={() => setShowPostLikeModal(null)}
              color="error"
            >
              <CloseIcon />
            </IconButton>
          </Stack>
          <Divider style={{ marginBottom: "0.7rem" }} />

          <Stack id="post__allLikesDiv" direction="column" spacing={0.5}>
            <Link to="#" style={{ color: "black" }}>
              <Stack direction="row" spacing={1}>
                <Avatar alt="Wasek Samin" src={profileImg} />
                <Stack direction="column" spacing={0.3}>
                  <Typography
                    variant="p"
                    style={{ fontSize: "1rem", fontWeight: "600" }}
                    className="post__likeUsernameText"
                  >
                    Wasek Samin
                  </Typography>
                  <Typography
                    variant="p"
                    style={{ fontSize: "0.83rem", color: "var(--slate-500)" }}
                  >
                    Datetime
                  </Typography>
                </Stack>
              </Stack>
            </Link>

            <Link to="#" style={{ color: "black" }}>
              <Stack direction="row" spacing={1}>
                <Avatar alt="Wasek Samin" src={profileImg} />
                <Stack direction="column" spacing={0.3}>
                  <Typography
                    variant="p"
                    style={{ fontSize: "1rem", fontWeight: "600" }}
                    className="post__likeUsernameText"
                  >
                    Wasek Samin
                  </Typography>
                  <Typography
                    variant="p"
                    style={{ fontSize: "0.83rem", color: "var(--slate-500)" }}
                  >
                    Datetime
                  </Typography>
                </Stack>
              </Stack>
            </Link>
            <Link to="#" style={{ color: "black" }}>
              <Stack direction="row" spacing={1}>
                <Avatar alt="Wasek Samin" src={profileImg} />
                <Stack direction="column" spacing={0.3}>
                  <Typography
                    variant="p"
                    style={{ fontSize: "1rem", fontWeight: "600" }}
                    className="post__likeUsernameText"
                  >
                    Wasek Samin
                  </Typography>
                  <Typography
                    variant="p"
                    style={{ fontSize: "0.83rem", color: "var(--slate-500)" }}
                  >
                    Datetime
                  </Typography>
                </Stack>
              </Stack>
            </Link>

            <Link to="#" style={{ color: "black" }}>
              <Stack direction="row" spacing={1}>
                <Avatar alt="Wasek Samin" src={profileImg} />
                <Stack direction="column" spacing={0.3}>
                  <Typography
                    variant="p"
                    style={{ fontSize: "1rem", fontWeight: "600" }}
                    className="post__likeUsernameText"
                  >
                    Wasek Samin
                  </Typography>
                  <Typography
                    variant="p"
                    style={{ fontSize: "0.83rem", color: "var(--slate-500)" }}
                  >
                    Datetime
                  </Typography>
                </Stack>
              </Stack>
            </Link>
            <Link to="#" style={{ color: "black" }}>
              <Stack direction="row" spacing={1}>
                <Avatar alt="Wasek Samin" src={profileImg} />
                <Stack direction="column" spacing={0.3}>
                  <Typography
                    variant="p"
                    style={{ fontSize: "1rem", fontWeight: "600" }}
                    className="post__likeUsernameText"
                  >
                    Wasek Samin
                  </Typography>
                  <Typography
                    variant="p"
                    style={{ fontSize: "0.83rem", color: "var(--slate-500)" }}
                  >
                    Datetime
                  </Typography>
                </Stack>
              </Stack>
            </Link>
            <Link to="#" style={{ color: "black" }}>
              <Stack direction="row" spacing={1}>
                <Avatar alt="Wasek Samin" src={profileImg} />
                <Stack direction="column" spacing={0.3}>
                  <Typography
                    variant="p"
                    style={{ fontSize: "1rem", fontWeight: "600" }}
                    className="post__likeUsernameText"
                  >
                    Wasek Samin
                  </Typography>
                  <Typography
                    variant="p"
                    style={{ fontSize: "0.83rem", color: "var(--slate-500)" }}
                  >
                    Datetime
                  </Typography>
                </Stack>
              </Stack>
            </Link>
            <Link to="#" style={{ color: "black" }}>
              <Stack direction="row" spacing={1}>
                <Avatar alt="Wasek Samin" src={profileImg} />
                <Stack direction="column" spacing={0.3}>
                  <Typography
                    variant="p"
                    style={{ fontSize: "1rem", fontWeight: "600" }}
                    className="post__likeUsernameText"
                  >
                    Wasek Samin
                  </Typography>
                  <Typography
                    variant="p"
                    style={{ fontSize: "0.83rem", color: "var(--slate-500)" }}
                  >
                    Datetime
                  </Typography>
                </Stack>
              </Stack>
            </Link>
            <Link to="#" style={{ color: "black" }}>
              <Stack direction="row" spacing={1}>
                <Avatar alt="Wasek Samin" src={profileImg} />
                <Stack direction="column" spacing={0.3}>
                  <Typography
                    variant="p"
                    style={{ fontSize: "1rem", fontWeight: "600" }}
                    className="post__likeUsernameText"
                  >
                    Wasek Samin
                  </Typography>
                  <Typography
                    variant="p"
                    style={{ fontSize: "0.83rem", color: "var(--slate-500)" }}
                  >
                    Datetime
                  </Typography>
                </Stack>
              </Stack>
            </Link>
            <Link to="#" style={{ color: "black" }}>
              <Stack direction="row" spacing={1}>
                <Avatar alt="Wasek Samin" src={profileImg} />
                <Stack direction="column" spacing={0.3}>
                  <Typography
                    variant="p"
                    style={{ fontSize: "1rem", fontWeight: "600" }}
                    className="post__likeUsernameText"
                  >
                    Wasek Samin
                  </Typography>
                  <Typography
                    variant="p"
                    style={{ fontSize: "0.83rem", color: "var(--slate-500)" }}
                  >
                    Datetime
                  </Typography>
                </Stack>
              </Stack>
            </Link>
            <Link to="#" style={{ color: "black" }}>
              <Stack direction="row" spacing={1}>
                <Avatar alt="Wasek Samin" src={profileImg} />
                <Stack direction="column" spacing={0.3}>
                  <Typography
                    variant="p"
                    style={{ fontSize: "1rem", fontWeight: "600" }}
                    className="post__likeUsernameText"
                  >
                    Wasek Samin
                  </Typography>
                  <Typography
                    variant="p"
                    style={{ fontSize: "0.83rem", color: "var(--slate-500)" }}
                  >
                    Datetime
                  </Typography>
                </Stack>
              </Stack>
            </Link>

            <Link to="#" style={{ color: "black" }}>
              <Stack direction="row" spacing={1}>
                <Avatar alt="Wasek Samin" src={profileImg} />
                <Stack direction="column" spacing={0.3}>
                  <Typography
                    variant="p"
                    style={{ fontSize: "1rem", fontWeight: "600" }}
                    className="post__likeUsernameText"
                  >
                    Wasek Samin
                  </Typography>
                  <Typography
                    variant="p"
                    style={{ fontSize: "0.83rem", color: "var(--slate-500)" }}
                  >
                    Datetime
                  </Typography>
                </Stack>
              </Stack>
            </Link>
            <Link to="#" style={{ color: "black" }}>
              <Stack direction="row" spacing={1}>
                <Avatar alt="Wasek Samin" src={profileImg} />
                <Stack direction="column" spacing={0.3}>
                  <Typography
                    variant="p"
                    style={{ fontSize: "1rem", fontWeight: "600" }}
                    className="post__likeUsernameText"
                  >
                    Wasek Samin
                  </Typography>
                  <Typography
                    variant="p"
                    style={{ fontSize: "0.83rem", color: "var(--slate-500)" }}
                  >
                    Datetime
                  </Typography>
                </Stack>
              </Stack>
            </Link>
            <Link to="#" style={{ color: "black" }}>
              <Stack direction="row" spacing={1}>
                <Avatar alt="Wasek Samin" src={profileImg} />
                <Stack direction="column" spacing={0.3}>
                  <Typography
                    variant="p"
                    style={{ fontSize: "1rem", fontWeight: "600" }}
                    className="post__likeUsernameText"
                  >
                    Wasek Samin
                  </Typography>
                  <Typography
                    variant="p"
                    style={{ fontSize: "0.83rem", color: "var(--slate-500)" }}
                  >
                    Datetime
                  </Typography>
                </Stack>
              </Stack>
            </Link>
            <Link to="#" style={{ color: "black" }}>
              <Stack direction="row" spacing={1}>
                <Avatar alt="Wasek Samin" src={profileImg} />
                <Stack direction="column" spacing={0.3}>
                  <Typography
                    variant="p"
                    style={{ fontSize: "1rem", fontWeight: "600" }}
                    className="post__likeUsernameText"
                  >
                    Wasek Samin
                  </Typography>
                  <Typography
                    variant="p"
                    style={{ fontSize: "0.83rem", color: "var(--slate-500)" }}
                  >
                    Datetime
                  </Typography>
                </Stack>
              </Stack>
            </Link>
            <Link to="#" style={{ color: "black" }}>
              <Stack direction="row" spacing={1}>
                <Avatar alt="Wasek Samin" src={profileImg} />
                <Stack direction="column" spacing={0.3}>
                  <Typography
                    variant="p"
                    style={{ fontSize: "1rem", fontWeight: "600" }}
                    className="post__likeUsernameText"
                  >
                    Wasek Samin
                  </Typography>
                  <Typography
                    variant="p"
                    style={{ fontSize: "0.83rem", color: "var(--slate-500)" }}
                  >
                    Datetime
                  </Typography>
                </Stack>
              </Stack>
            </Link>
            <Link to="#" style={{ color: "black" }}>
              <Stack direction="row" spacing={1}>
                <Avatar alt="Wasek Samin" src={profileImg} />
                <Stack direction="column" spacing={0.3}>
                  <Typography
                    variant="p"
                    style={{ fontSize: "1rem", fontWeight: "600" }}
                    className="post__likeUsernameText"
                  >
                    Wasek Samin
                  </Typography>
                  <Typography
                    variant="p"
                    style={{ fontSize: "0.83rem", color: "var(--slate-500)" }}
                  >
                    Datetime
                  </Typography>
                </Stack>
              </Stack>
            </Link>
            <Link to="#" style={{ color: "black" }}>
              <Stack direction="row" spacing={1}>
                <Avatar alt="Wasek Samin" src={profileImg} />
                <Stack direction="column" spacing={0.3}>
                  <Typography
                    variant="p"
                    style={{ fontSize: "1rem", fontWeight: "600" }}
                    className="post__likeUsernameText"
                  >
                    Wasek Samin
                  </Typography>
                  <Typography
                    variant="p"
                    style={{ fontSize: "0.83rem", color: "var(--slate-500)" }}
                  >
                    Datetime
                  </Typography>
                </Stack>
              </Stack>
            </Link>
            <Link to="#" style={{ color: "black" }}>
              <Stack direction="row" spacing={1}>
                <Avatar alt="Wasek Samin" src={profileImg} />
                <Stack direction="column" spacing={0.3}>
                  <Typography
                    variant="p"
                    style={{ fontSize: "1rem", fontWeight: "600" }}
                    className="post__likeUsernameText"
                  >
                    Wasek Samin
                  </Typography>
                  <Typography
                    variant="p"
                    style={{ fontSize: "0.83rem", color: "var(--slate-500)" }}
                  >
                    Datetime
                  </Typography>
                </Stack>
              </Stack>
            </Link>
            <Link to="#" style={{ color: "black" }}>
            <Stack direction="row" spacing={1}>
                <Avatar alt="Wasek Samin" src={profileImg} />
              <Stack direction="column" spacing={0.3}>
                  <Typography
                    variant="p"
                    style={{ fontSize: "1rem", fontWeight: "600" }}
                    className="post__likeUsernameText"
                  >
                    Last One
                  </Typography>
                <Typography
                  variant="p"
                  style={{ fontSize: "0.83rem", color: "var(--slate-500)" }}
                >
                  Datetime
                </Typography>
              </Stack>
            </Stack>
            </Link>
          </Stack>
        </Stack>
      </div>
    </div>
  );
};

export default PostLikeModal;
