import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import CloseIcon from "@mui/icons-material/Close";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import CachedIcon from "@mui/icons-material/Cached";
import { IconButton, Typography, Button } from "@mui/material";
import "../../css/post/CreatePostModal.css";

const CreatePostModal = ({ openCreatePostModal, setOpenCreatePostModal }) => {
  const createPostRef = useRef(null);

  const createPost = () => {
    if (createPostRef.current) {
      console.log(createPostRef.current.getContent());
    }
  };

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
          {/* <CachedIcon id="create__postSpinner" /> */}
        </Button>
      </>
    </div>
  );
};

export default CreatePostModal;
