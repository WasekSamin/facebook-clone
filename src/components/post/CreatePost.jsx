import { Avatar, Button } from "@mui/material";
import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion/dist/framer-motion";
import "../../css/post/CreatePost.css";
import profileImg from "../../dummy/images/portImg.png";
import CreatePostModal from "./CreatePostModal";

const CreatePost = () => {
  const createPostDummyRef = useRef(null);
  const [openCreatePostModal, setOpenCreatePostModal] = useState(false);

  const createPostModal = () => {
    return (
      <>
        {openCreatePostModal && <div id="create__postOverlay"></div>}
        
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
              <CreatePostModal
                openCreatePostModal={openCreatePostModal}
                setOpenCreatePostModal={setOpenCreatePostModal}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  };

  return (
    <div>
      <div className="create__postDiv">
        <Avatar alt="Wasek Samin" src={profileImg} />
        <input
          onFocus={() => setOpenCreatePostModal(true)}
          ref={createPostDummyRef}
          value=""
          onChange={() => {}}
          type="text"
          placeholder="What's on your mind Wasek?"
        />
        <Button
          onClick={() => setOpenCreatePostModal(true)}
          style={{ borderRadius: "9999px" }}
          variant="contained"
          color="secondary"
        >
          Post
        </Button>
      </div>

      {createPostModal()}
    </div>
  );
};

export default CreatePost;
