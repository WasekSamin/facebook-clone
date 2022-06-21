import { Avatar, Divider, IconButton, Stack, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import "../../css/post/PostCommentModal.css";
import dummy1 from "../../dummy/images/img1.jpg";
import { Link } from "react-router-dom";
import SendIcon from "@mui/icons-material/Send";

const PostCommentModal = ({
  showPostCommentModal,
  setShowPostCommentModal,
}) => {
  console.log(showPostCommentModal);
  const [postCommentText, setPostCommentText] = useState("");

  const postCommentModalRef = useRef(null);

  const closePostCommentModal = (event) => {
    if (
      postCommentModalRef.current !== null &&
      !postCommentModalRef.current.contains(event.target)
    ) {
      setShowPostCommentModal(null);
    }
  };

  useEffect(() => {
    document.addEventListener("click", closePostCommentModal, true);

    return () => {
      document.removeEventListener("click", closePostCommentModal, true);
    };
  }, []);

  return (
    <div>
      <div id="post__commentModalDiv" ref={postCommentModalRef}>
        <Stack style={{ height: "100%" }} direction="column" spacing={1}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6">
              Total Comments{" "}
              <span style={{ color: "var(--slate-500)" }}>(1.2k)</span>
            </Typography>
            <IconButton
              onClick={() => setShowPostCommentModal(null)}
              color="error"
            >
              <CloseIcon />
            </IconButton>
          </Stack>
          <Divider style={{ marginBottom: "0.7rem" }} />
          <Stack
            style={{ height: "calc(100% - 5rem)" }}
            direction="column"
            justifyContent="space-between"
          >
            <Stack direction="column" spacing={2} id="post__commentDivContent">
              <Stack direction="row" spacing={1}>
                <Link to="#">
                  <Avatar alt="Wasek Samin" src={dummy1} />
                </Link>
                <Stack direction="column" spacing={0.3}>
                  <Link to="#" style={{ color: "black" }}>
                    <Typography
                      variant="p"
                      style={{ fontSize: "1rem", fontWeight: "600" }}
                      className="post__commentUsernameText"
                    >
                      Wasek Samin
                    </Typography>
                  </Link>
                  <Typography variant="p" style={{ color: "var(--slate-600)" }}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Atque, ad dicta deserunt accusamus sapiente similique
                    aspernatur libero accusantium unde vel.
                  </Typography>
                </Stack>
              </Stack>

              <Stack direction="row" spacing={1}>
                <Link to="#">
                  <Avatar alt="Wasek Samin" src={dummy1} />
                </Link>
                <Stack direction="column" spacing={0.3}>
                  <Link to="#" style={{ color: "black" }}>
                    <Typography
                      variant="p"
                      style={{ fontSize: "1rem", fontWeight: "600" }}
                      className="post__commentUsernameText"
                    >
                      Wasek Samin
                    </Typography>
                  </Link>
                  <Typography variant="p" style={{ color: "var(--slate-600)" }}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Atque, ad dicta deserunt accusamus sapiente similique
                    aspernatur libero accusantium unde vel.
                  </Typography>
                </Stack>
              </Stack>
              <Stack direction="row" spacing={1}>
                <Link to="#">
                  <Avatar alt="Wasek Samin" src={dummy1} />
                </Link>
                <Stack direction="column" spacing={0.3}>
                  <Link to="#" style={{ color: "black" }}>
                    <Typography
                      variant="p"
                      style={{ fontSize: "1rem", fontWeight: "600" }}
                      className="post__commentUsernameText"
                    >
                      Wasek Samin
                    </Typography>
                  </Link>
                  <Typography variant="p" style={{ color: "var(--slate-600)" }}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Atque, ad dicta deserunt accusamus sapiente similique
                    aspernatur libero accusantium unde vel.
                  </Typography>
                </Stack>
              </Stack>
              <Stack direction="row" spacing={1}>
                <Link to="#">
                  <Avatar alt="Wasek Samin" src={dummy1} />
                </Link>
                <Stack direction="column" spacing={0.3}>
                  <Link to="#" style={{ color: "black" }}>
                    <Typography
                      variant="p"
                      style={{ fontSize: "1rem", fontWeight: "600" }}
                      className="post__commentUsernameText"
                    >
                      Wasek Samin
                    </Typography>
                  </Link>
                  <Typography variant="p" style={{ color: "var(--slate-600)" }}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Atque, ad dicta deserunt accusamus sapiente similique
                    aspernatur libero accusantium unde vel.
                  </Typography>
                </Stack>
              </Stack>
              <Stack direction="row" spacing={1}>
                <Link to="#">
                  <Avatar alt="Wasek Samin" src={dummy1} />
                </Link>
                <Stack direction="column" spacing={0.3}>
                  <Link to="#" style={{ color: "black" }}>
                    <Typography
                      variant="p"
                      style={{ fontSize: "1rem", fontWeight: "600" }}
                      className="post__commentUsernameText"
                    >
                      Wasek Samin
                    </Typography>
                  </Link>
                  <Typography variant="p" style={{ color: "var(--slate-600)" }}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Atque, ad dicta deserunt accusamus sapiente similique
                    aspernatur libero accusantium unde vel.
                  </Typography>
                </Stack>
              </Stack>
              <Stack direction="row" spacing={1}>
                <Link to="#">
                  <Avatar alt="Wasek Samin" src={dummy1} />
                </Link>
                <Stack direction="column" spacing={0.3}>
                  <Link to="#" style={{ color: "black" }}>
                    <Typography
                      variant="p"
                      style={{ fontSize: "1rem", fontWeight: "600" }}
                      className="post__commentUsernameText"
                    >
                      Wasek Samin
                    </Typography>
                  </Link>
                  <Typography variant="p" style={{ color: "var(--slate-600)" }}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Atque, ad dicta deserunt accusamus sapiente similique
                    aspernatur libero accusantium unde vel.
                  </Typography>
                </Stack>
              </Stack>
              <Stack direction="row" spacing={1}>
                <Link to="#">
                  <Avatar alt="Wasek Samin" src={dummy1} />
                </Link>
                <Stack direction="column" spacing={0.3}>
                  <Link to="#" style={{ color: "black" }}>
                    <Typography
                      variant="p"
                      style={{ fontSize: "1rem", fontWeight: "600" }}
                      className="post__commentUsernameText"
                    >
                      Wasek Samin
                    </Typography>
                  </Link>
                  <Typography variant="p" style={{ color: "var(--slate-600)" }}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Atque, ad dicta deserunt accusamus sapiente similique
                    aspernatur libero accusantium unde vel.
                  </Typography>
                </Stack>
              </Stack>
              <Stack direction="row" spacing={1}>
                <Link to="#">
                  <Avatar alt="Wasek Samin" src={dummy1} />
                </Link>
                <Stack direction="column" spacing={0.3}>
                  <Link to="#" style={{ color: "black" }}>
                    <Typography
                      variant="p"
                      style={{ fontSize: "1rem", fontWeight: "600" }}
                      className="post__commentUsernameText"
                    >
                      Wasek Samin
                    </Typography>
                  </Link>
                  <Typography variant="p" style={{ color: "var(--slate-600)" }}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Atque, ad dicta deserunt accusamus sapiente similique
                    aspernatur libero accusantium unde vel.
                  </Typography>
                </Stack>
              </Stack>
              <Stack direction="row" spacing={1}>
                <Link to="#">
                  <Avatar alt="Wasek Samin" src={dummy1} />
                </Link>
                <Stack direction="column" spacing={0.3}>
                  <Link to="#" style={{ color: "black" }}>
                    <Typography
                      variant="p"
                      style={{ fontSize: "1rem", fontWeight: "600" }}
                      className="post__commentUsernameText"
                    >
                      Wasek Samin
                    </Typography>
                  </Link>
                  <Typography variant="p" style={{ color: "var(--slate-600)" }}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Atque, ad dicta deserunt accusamus sapiente similique
                    aspernatur libero accusantium unde vel.
                  </Typography>
                </Stack>
              </Stack>
              <Stack direction="row" spacing={1}>
                <Link to="#">
                  <Avatar alt="Wasek Samin" src={dummy1} />
                </Link>
                <Stack direction="column" spacing={0.3}>
                  <Link to="#" style={{ color: "black" }}>
                    <Typography
                      variant="p"
                      style={{ fontSize: "1rem", fontWeight: "600" }}
                      className="post__commentUsernameText"
                    >
                      Wasek Samin
                    </Typography>
                  </Link>
                  <Typography variant="p" style={{ color: "var(--slate-600)" }}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Atque, ad dicta deserunt accusamus sapiente similique
                    aspernatur libero accusantium unde vel.
                  </Typography>
                </Stack>
              </Stack>
              <Stack direction="row" spacing={1}>
                <Link to="#">
                  <Avatar alt="Wasek Samin" src={dummy1} />
                </Link>
                <Stack direction="column" spacing={0.3}>
                  <Link to="#" style={{ color: "black" }}>
                    <Typography
                      variant="p"
                      style={{ fontSize: "1rem", fontWeight: "600" }}
                      className="post__commentUsernameText"
                    >
                      Wasek Samin
                    </Typography>
                  </Link>
                  <Typography variant="p" style={{ color: "var(--slate-600)" }}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Atque, ad dicta deserunt accusamus sapiente similique
                    aspernatur libero accusantium unde vel.
                  </Typography>
                </Stack>
              </Stack>
              <Stack direction="row" spacing={1}>
                <Link to="#">
                  <Avatar alt="Wasek Samin" src={dummy1} />
                </Link>
                <Stack direction="column" spacing={0.3}>
                  <Link to="#" style={{ color: "black" }}>
                    <Typography
                      variant="p"
                      style={{ fontSize: "1rem", fontWeight: "600" }}
                      className="post__commentUsernameText"
                    >
                      Last One
                    </Typography>
                  </Link>
                  <Typography variant="p" style={{ color: "var(--slate-600)" }}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Atque, ad dicta deserunt accusamus sapiente similique
                    aspernatur libero accusantium unde vel.
                  </Typography>
                </Stack>
              </Stack>
            </Stack>

            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              id="post__commentModalCreateCommentDiv"
              spacing={1}
            >
              <textarea
                value={postCommentText}
                onChange={(e) => setPostCommentText(e.target.value)}
                type="text"
                placeholder="Post your comment..."
                rows={1}
              ></textarea>
              <IconButton
                disabled={postCommentText.length > 0 ? false : true}
                color="secondary"
              >
                <SendIcon />
              </IconButton>
            </Stack>
          </Stack>
        </Stack>
      </div>
    </div>
  );
};

export default PostCommentModal;
