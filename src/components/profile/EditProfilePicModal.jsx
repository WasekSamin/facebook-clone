import { Button, IconButton, Stack, Typography } from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import "../../css/profile/EditProfilePicModal.css";
import CloseIcon from "@mui/icons-material/Close";
import FileUploadIcon from "@mui/icons-material/FileUpload";

const EditProfilePicModal = ({
  showEditProfilePicModal,
  setShowEditProfilePicModal,
}) => {
  const [imageFile, setImageFile] = useState(null);
  const editProfilePicModalRef = useRef(null);
  const uploadProfilePicLabelRef = useRef(null);
  const uploadProfilePicInputRef = useRef(null);
  const imageFilePreviewRef = useRef(null);

  const closeEditProfilePicModal = () => {
    setImageFile(null);
    setShowEditProfilePicModal(false);
  };

  const clickOutsideOfEditProfilePicModal = (event) => {
    if (
      editProfilePicModalRef.current !== null &&
      !editProfilePicModalRef.current.contains(event.target)
    ) {
      closeEditProfilePicModal();
    }
  };

  // Profile pic upload
  function uploadProfilePicFile(file) {
    const fileType = file.type;
    const acceptedExtensions = ["image/jpeg", "image/jpg", "image/png"];

    if (acceptedExtensions.includes(fileType)) {
      const fileReader = new FileReader();

      fileReader.onload = () => {
        const fileURL = fileReader.result;

        // Preview image
        if (imageFilePreviewRef.current !== null)
          imageFilePreviewRef.current.src = fileURL;
        uploadProfilePicLabelRef.current.innerText = "Done uploading";
      };
      fileReader.readAsDataURL(file);
    } else {
      alert("File format not supported! Please provide image only.");
      uploadProfilePicLabelRef.current.innerText = "Drag & Drop";
      setImageFile(null);
    }
  }

  useEffect(() => {
    document.addEventListener("click", clickOutsideOfEditProfilePicModal, true);

    if (
      uploadProfilePicLabelRef.current !== null &&
      uploadProfilePicInputRef.current !== null
    ) {
      uploadProfilePicLabelRef.current.addEventListener("dragover", (e) => {
        e.preventDefault();

        uploadProfilePicLabelRef.current.innerText = "Release to upload file";
      });

      uploadProfilePicLabelRef.current.addEventListener("dragleave", (e) => {
        e.preventDefault();

        uploadProfilePicLabelRef.current.innerText = "Drag & Drop Image";
      });

      uploadProfilePicLabelRef.current.addEventListener("drop", (e) => {
        e.preventDefault();

        setImageFile(e.dataTransfer.files[0]);
        uploadProfilePicFile(e.dataTransfer.files[0]);
      });

      uploadProfilePicInputRef.current.addEventListener("change", (e) => {
        setImageFile(e.target.files[0]);
        uploadProfilePicFile(e.target.files[0]);
      });
    }

    return () => {
      document.removeEventListener(
        "click",
        clickOutsideOfEditProfilePicModal,
        true
      );
    };
  }, []);

  const deleteUploadedProfilePic = () => {
    setImageFile(null);
    if (
      uploadProfilePicInputRef.current !== null &&
      uploadProfilePicLabelRef.current !== null
    ) {
      uploadProfilePicInputRef.current.src = "";
      uploadProfilePicLabelRef.current.innerText = "Drag & Drop Image";
    }
  };

  return (
    <div id="edit__profilePicModal" ref={editProfilePicModalRef}>
      <Stack direction="column" spacing={1}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={1}
        >
          <Typography variant="h6" style={{ fontWeight: "600" }}>
            Upload Profile Pic
          </Typography>
          <IconButton onClick={closeEditProfilePicModal} color="error">
            <CloseOutlinedIcon />
          </IconButton>
        </Stack>

        <label
          ref={uploadProfilePicLabelRef}
          htmlFor="upload__profilePic"
          id="profile__picUploadLabel"
        >
          Drag & Drop Image
        </label>
        <input
          ref={uploadProfilePicInputRef}
          type="file"
          accept="image/*"
          id="upload__profilePic"
          style={{ display: "none" }}
        />

        {imageFile !== null && (
          <div id="edit__profilePicPreviewMainDiv">
            <img
              className="edit__modalProfilePicPreview"
              ref={imageFilePreviewRef}
              alt=""
            />
            <IconButton
              onClick={deleteUploadedProfilePic}
              id="close__profilePicPreviewDiv"
            >
              <CloseIcon />
            </IconButton>
          </div>
        )}

        {imageFile !== null && (
          <Button variant="contained" color="secondary">
            <FileUploadIcon style={{ marginRight: "0.12rem" }} /> Upload
          </Button>
        )}
      </Stack>
    </div>
  );
};

export default EditProfilePicModal;
