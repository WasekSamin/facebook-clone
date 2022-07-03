import {
  Avatar,
  Button,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import dummyImg from "../../dummy/static_images/default_profile.png";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import "../../css/home/HomePosts.css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import { Link } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { colorTheme } from "../../components/colorTheme/ColorTheme";
import { motion, AnimatePresence } from "framer-motion/dist/framer-motion";
import EditIcon from "@mui/icons-material/Edit";
import PostCommentModal from "../../components/post/PostCommentModal";
import PostLikeModal from "../../components/post/PostLikeModal";
import { APIStore, PostStore } from "../../components/store/Store";
import parse from "html-react-parser";
import moment from "moment";

const HomePosts = () => {
  const [showPostHeaderRightOptions, setShowPostHeaderRightOptions] = useState(
    null
  );
  const postHeaderRightOptionsRef = useRef(null);
  const [showPostCommentModal, setShowPostCommentModal] = useState(null);
  const [showPostLikeModal, setShowPostLikeModal] = useState(null);
  const allPosts = PostStore((state) => state.allPosts);
  const MYAPI = APIStore((state) => state.MYAPI);

  const closePostHeaderRightOptions = (event) => {
    if (
      postHeaderRightOptionsRef.current !== null &&
      !postHeaderRightOptionsRef.current.contains(event.target)
    ) {
      setShowPostHeaderRightOptions(null);
    }
  };

  useEffect(() => {
    document.addEventListener("click", closePostHeaderRightOptions, true);

    return () => {
      document.removeEventListener("click", closePostHeaderRightOptions, true);
    };
  }, []);

  const postCommentModal = () => {
    return (
      <>
        {/* Post comment modal starts */}
        <AnimatePresence initial={false} exitBeforeEnter={true}>
          {showPostCommentModal !== null && (
            <motion.div
              id="show__postCommentModal"
              initial={{
                opacity: 0,
                y: "120%",
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: "120%",
              }}
            >
              <PostCommentModal
                showPostCommentModal={showPostCommentModal}
                setShowPostCommentModal={setShowPostCommentModal}
              />
            </motion.div>
          )}
        </AnimatePresence>
        {/* Post comment modal ends */}
      </>
    );
  };

  const postLikeModal = () => {
    return (
      <>
        {/* Post like modal starts */}
        <AnimatePresence initial={false} exitBeforeEnter={true}>
          {showPostLikeModal !== null && (
            <motion.div
              id="show__postLikeModal"
              initial={{
                opacity: 0,
                y: "120%",
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: "120%",
              }}
            >
              <PostLikeModal
                showPostLikeModal={showPostLikeModal}
                setShowPostLikeModal={setShowPostLikeModal}
              />
            </motion.div>
          )}
        </AnimatePresence>
        {/* Post like modal ends */}
      </>
    );
  };

  return (
    <div>
      {(showPostCommentModal !== null || showPostLikeModal !== null) && (
        <div id="post__commentModalOverlay"></div>
      )}

      {/* Post comment modal */}
      {postCommentModal()}
      {/* Post like modal */}
      {postLikeModal()}

      {allPosts.map((post) => (
        <div key={post.uid} className="post__div">
          <div className="post__headerContent">
            <Stack alignItems="center" direction="row" spacing={2}>
              <Link to={`/profile/${post.user.uid}/${post.user.username}`}>
                <Avatar
                  alt="Wasek Samin"
                  src={
                    post.user.current_profile_pic !== null
                      ? `${MYAPI}${post.user.current_profile_pic}`
                      : dummyImg
                  }
                />
              </Link>
              <Stack direction="column" spacing={0.2}>
                <Link to={`/profile/${post.user.uid}/${post.user.username}`}>
                  <Typography className="post__contentUsername" variant="h5">
                    {post.user.username}
                  </Typography>
                </Link>
                <Typography
                  variant="p"
                  style={{ fontSize: "0.83rem", color: "var(--slate-500)" }}
                >
                  {moment(post.created_at).format("lll")}
                </Typography>
              </Stack>
            </Stack>
            <div className="post__headerRightMoreOptionBtn">
              <IconButton
                onClick={() => setShowPostHeaderRightOptions(post.uid)}
              >
                <MoreHorizIcon />
              </IconButton>
              <AnimatePresence initial={false} exitBeforeEnter={true}>
                {showPostHeaderRightOptions === post.uid && (
                  <motion.div
                    initial={{
                      y: -20,
                      opacity: 0,
                    }}
                    animate={{
                      y: 0,
                      opacity: 1,
                    }}
                    exit={{
                      y: -20,
                      opacity: 0,
                    }}
                    className="post__headerRightMoreOptions"
                    ref={postHeaderRightOptionsRef}
                  >
                    <List>
                      <ListItem disablePadding>
                        <Link to="#" style={{ width: "100%" }}>
                          <ListItemButton
                            style={{
                              color: "var(--slate-500)",
                            }}
                          >
                            <ListItemIcon>
                              <EditIcon />
                            </ListItemIcon>
                            <ListItemText
                              style={{ marginLeft: "-30px" }}
                              primary="Edit Post"
                            />
                          </ListItemButton>
                        </Link>
                      </ListItem>
                      <ListItem disablePadding>
                        <ListItemButton
                          style={{
                            color: `${colorTheme.palette.secondary.main}`,
                          }}
                        >
                          <ListItemIcon
                            style={{
                              color: `${colorTheme.palette.secondary.main}`,
                            }}
                          >
                            <DeleteOutlineIcon />
                          </ListItemIcon>
                          <ListItemText
                            style={{ marginLeft: "-30px" }}
                            primary="Remove Post"
                          />
                        </ListItemButton>
                      </ListItem>
                    </List>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="post__content">{parse(post.content)}</div>

          <Stack
            id="post__options"
            direction="row"
            alignItems="center"
            spacing={1}
          >
            <Button>
              <FavoriteBorderIcon />
            </Button>
            <Button onClick={() => setShowPostCommentModal(post.uid)}>
              <MessageOutlinedIcon />
            </Button>
            <Button>
              <ShareOutlinedIcon />
            </Button>
          </Stack>

          <Divider style={{ marginTop: "0.5rem" }} />

          <Stack
            id="post__counter"
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography
              className="post__totalLikesCouter"
              variant="p"
              onClick={() => setShowPostLikeModal(post.uid)}
            >
              1.2k hearts
            </Typography>
            <Typography
              className="post__totalCommentsCouter"
              variant="p"
              onClick={() => setShowPostCommentModal(1)}
            >
              1.2k comments
            </Typography>
          </Stack>
        </div>
      ))}
    </div>
  );
};

export default HomePosts;
