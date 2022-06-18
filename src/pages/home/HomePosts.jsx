import {
  Avatar,
  Button,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import profileImg from "../../dummy/images/portImg.png";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import "../../css/home/HomePosts.css";
import dummy1 from "../../dummy/images/img1.jpg";
import video1 from "../../dummy/videos/video1.mp4";
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

const HomePosts = () => {
  const [showPostHeaderRightOptions, setShowPostHeaderRightOptions] = useState(
    null
  );
  const postHeaderRightOptionsRef = useRef(null);
  const [showPostCommentModal, setShowPostCommentModal] = useState(null);
  const [showPostLikeModal, setShowPostLikeModal] = useState(null);

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

  return (
    <div>
      {/* Post comment modal starts */}
      {(showPostCommentModal !== null || showPostLikeModal !== null) && (
        <div id="post__commentModalOverlay"></div>
      )}

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

      <div className="post__div">
        <div className="post__headerContent">
          <Stack alignItems="center" direction="row" spacing={2}>
            <Link to="#">
              <Avatar alt="Wasek Samin" src={profileImg} />
            </Link>
            <Stack direction="column" spacing={0.2}>
              <Link to="#">
                <Typography className="post__contentUsername" variant="h5">
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
          <div className="post__headerRightMoreOptionBtn">
            <IconButton onClick={() => setShowPostHeaderRightOptions(0)}>
              <MoreHorizIcon />
            </IconButton>
            <AnimatePresence initial={false} exitBeforeEnter={true}>
              {showPostHeaderRightOptions === 0 && (
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

        <div className="post__content">
          <img src={dummy1} alt="" />
          {/* <video autoPlay={true} controls>
            <source src={video1} />
            Your browser does not support the video tag.
          </video> */}
        </div>

        <Stack
          id="post__options"
          direction="row"
          alignItems="center"
          spacing={1}
        >
          <Button>
            <FavoriteBorderIcon />
          </Button>
          <Button onClick={() => setShowPostCommentModal(1)}>
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
          <Typography className="post__totalLikesCouter" variant="p" onClick={() => setShowPostLikeModal(1)}>1.2k hearts</Typography>
          <Typography className="post__totalCommentsCouter" variant="p" onClick={() => setShowPostCommentModal(1)}>
            1.2k comments
          </Typography>
        </Stack>
      </div>
    </div>
  );
};

export default HomePosts;
