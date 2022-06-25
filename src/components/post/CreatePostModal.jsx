import React, { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import CloseIcon from "@mui/icons-material/Close";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import CachedIcon from "@mui/icons-material/Cached";
import { IconButton, Typography, Button } from "@mui/material";
import "../../css/post/CreatePostModal.css";
import {
  AccountStore,
  APIStore,
  PostStore,
  SocketStore,
  TokenStore,
} from "../store/Store";
import axios from "axios";

const CreatePostModal = ({ openCreatePostModal, setOpenCreatePostModal }) => {
  const createPostRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const loggedInUserInfo = AccountStore((state) => state.loggedInUserInfo);
  const MYAPI = APIStore((state) => state.MYAPI);
  const token = TokenStore((state) => state.token);
  const addNewPost = PostStore((state) => state.addNewPost);
  const socket = SocketStore((state) => state.socket);

  const createPost = () => {
    if (createPostRef.current !== null) {
      setIsLoading(true);

      if (createPostRef.current.getContent().trim() === "") {
        setIsLoading(false);
      } else {
        createUserPost({
          userUid: loggedInUserInfo.uid,
          content: createPostRef.current.getContent().trim(),
        });
      }
    }
  };

  async function createUserPost(data) {
    let formData = new FormData();

    formData.append("userUid", data.userUid);
    formData.append("content", data.content);

    await axios
      .post(`${MYAPI}/post/post-list/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `token ${token}`,
        },
      })
      .then((res) => {
        if (res.data.error) {
          alert("Failed to post, something went wrong!");
          setIsLoading(false);
        } else if (!res.data.error && res.data.post_created) {
          getCreatedPostObj(res.data.post_uid);
        }
      })
      .catch((err) => console.error(err));
  }

  async function getCreatedPostObj(postUid) {
    await axios
      .get(`${MYAPI}/post/post-detail/${postUid}/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `token ${token}`,
        },
      })
      .then((res) => {
        addNewPost(res.data);
        setIsLoading(false);
        setOpenCreatePostModal(false);
        socket.emit("post-created", res.data);
      })
      .catch((err) => console.error(err));
  }

  return (
    <div>
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
        <IconButton color="error" onClick={() => setOpenCreatePostModal(false)}>
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
          {isLoading && <CachedIcon id="create__postSpinner" />}
        </Button>
      </>
    </div>
  );
};

export default CreatePostModal;
