import { Avatar, Button, IconButton, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion/dist/framer-motion";
import { Editor } from "@tinymce/tinymce-react";
import "../../css/post/CreatePost.css";
import profileImg from "../../dummy/images/portImg.png";
import CloseIcon from "@mui/icons-material/Close";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import CachedIcon from "@mui/icons-material/Cached";

const CreatePost = () => {
  const createPostDummyRef = useRef(null);
  const createPostRef = useRef(null);
  const createPostOverlayRef = useRef(null);
  const [openCreatePostModal, setOpenCreatePostModal] = useState(false);

  const createPost = () => {
    if (createPostRef.current) {
      console.log(createPostRef.current.getContent());
    }
  };

  const showCreatePostModal = () => {
    setOpenCreatePostModal(true);
    if (createPostOverlayRef.current !== null) {
      createPostOverlayRef.current.classList.add("show__createPostOverlay");
    }
  };

  const closeCreatePostModal = () => {
    setOpenCreatePostModal(false);
    if (createPostOverlayRef.current !== null) {
      createPostOverlayRef.current.classList.remove("show__createPostOverlay");
    }
  };

  return (
    <div>
      <div ref={createPostOverlayRef} id="create__postOverlay"></div>
      <div className="create__postDiv">
        <Avatar alt="Wasek Samin" src={profileImg} />
        <input
          onFocus={showCreatePostModal}
          ref={createPostDummyRef}
          value=""
          onChange={() => {}}
          type="text"
          placeholder="What's on your mind Wasek?"
        />
        <Button
          onClick={showCreatePostModal}
          style={{ borderRadius: "9999px" }}
          variant="contained"
          color="secondary"
        >
          Post
        </Button>
      </div>

      {/* Create post modal */}
      <AnimatePresence initial={false} exitBeforeEnter={true}>
        {openCreatePostModal && (
          <motion.div
            initial={{
              scale: 0,
              opacity: 0,
            }}
            animate={{
              scale: 1,
              opacity: 1,
            }}
            exit={{
              scale: 0,
              opacity: 0,
            }}
            className="createPostModalMainDiv"
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "6px 10px",
              }}
            >
              <Typography
                variant="h5"
                style={{
                  color: "var(--slate-600)",
                  fontWeight: "500",
                  textTransform: "capitalize",
                }}
              >
                Type your post
              </Typography>
              <IconButton color="error" onClick={closeCreatePostModal}>
                <CloseIcon />
              </IconButton>
            </div>
            <>
              <div>
                {/* The file and help tab is hidden */}
                <Editor
                  apiKey="12wtah8ou8d8uwx92bt6bgykch4fhwt452z9lwzsrljm6bz6"
                  onInit={(evt, editor) => (createPostRef.current = editor)}
                  init={{
                    height: "70vh",
                    menubar: true,
                    plugins: [
                      "advlist",
                      "autolink",
                      "lists",
                      "link",
                      "image",
                      "charmap",
                      "preview",
                      "anchor",
                      "searchreplace",
                      "visualblocks",
                      "code",
                      "fullscreen",
                      "insertdatetime",
                      "media",
                      "table",
                      "code",
                      "help",
                      "wordcount",
                    ],
                    toolbar:
                      "undo redo | blocks | " +
                      "bold italic forecolor | alignleft aligncenter " +
                      "alignright alignjustify | bullist numlist outdent indent | " +
                      "removeformat | help",
                    content_style:
                      "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                  }}
                />
              </div>
              <Button
                style={{
                  width: "100%",
                  paddingTop: "10px",
                  paddingBottom: "10px",
                }}
                variant="contained"
                color="secondary"
                onClick={createPost}
              >
                Post <RocketLaunchIcon style={{ marginLeft: "0.2rem" }} />
                {/* <CachedIcon id="create__postSpinner" /> */}
              </Button>
            </>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CreatePost;
