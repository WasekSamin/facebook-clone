import {
  FormControlLabel,
  FormControl,
  FormLabel,
  IconButton,
  RadioGroup,
  Stack,
  TextField,
  Typography,
  Radio,
  Button,
} from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import "../../css/profile/EditProfileModal.css";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import { colorTheme } from "../colorTheme/ColorTheme";

const EditProfileModal = ({
  showEditProfileModal,
  setShowEditProfileModal,
}) => {
  const [workStatus, setWorkStatus] = useState(null);
  const [gender, setGender] = useState(null);
  const [relationStatus, setRelationStatus] = useState(null);
  const editProfileModalRef = useRef(null);

  const editProfileModalFormSubmit = (e) => {
    e.preventDefault();
  };

  const closeEditProfileModal = (event) => {
    if (
      editProfileModalRef.current !== null &&
      !editProfileModalRef.current.contains(event.target)
    ) {
      setShowEditProfileModal(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", closeEditProfileModal, true);

    return () => {
      document.removeEventListener("click", closeEditProfileModal, true);
    };
  }, []);

  return (
    <div id="edit__profileModalDiv" ref={editProfileModalRef}>
      <Stack direction="column" spacing={2}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={1}
        >
          <Typography variant="h6" style={{ fontWeight: "600" }}>
            Edit Profile
          </Typography>
          <IconButton
            color="error"
            onClick={() => setShowEditProfileModal(false)}
          >
            <CloseIcon />
          </IconButton>
        </Stack>

        <form
          id="edit__profileModalForm"
          onSubmit={editProfileModalFormSubmit}
          method="post"
        >
          <Stack direction="column" spacing={2}>
            <TextField id="username" label="Username..." variant="outlined" />
            <TextField
              id="address"
              label="Address..."
              variant="outlined"
              multiline={true}
              maxRows={4}
            />
            <FormControl>
              <FormLabel id="profile__workingStatus">
                Studying or Working?
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="profile__gender"
                defaultValue="studying"
                name="radio-buttons-group"
                value={workStatus}
                onChange={(e) => setWorkStatus(e.target.value)}
              >
                <FormControlLabel
                  value="studying"
                  control={<Radio />}
                  label="Studying"
                />
                <FormControlLabel
                  value="working"
                  control={<Radio />}
                  label="Working"
                />
                <FormControlLabel
                  value="both"
                  control={<Radio />}
                  label="Both"
                />
                <FormControlLabel
                  value="none"
                  control={<Radio />}
                  label="None"
                />
              </RadioGroup>
            </FormControl>

            {(workStatus === "studying" || workStatus === "both") && (
              <TextField
                id="studying_place"
                label="Studying At..."
                variant="outlined"
              />
            )}
            {(workStatus === "working" || workStatus === "both") && (
              <TextField
                id="working__place"
                label="Working At..."
                variant="outlined"
              />
            )}

            <TextField
              id="profile__phnNo"
              label="Phone No..."
              variant="outlined"
            />

            <FormControl>
              <FormLabel id="profile__gender">Gender</FormLabel>
              <RadioGroup
                row
                aria-labelledby="profile__gender"
                defaultValue="male"
                name="radio-buttons-group"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Other"
                />
              </RadioGroup>
            </FormControl>

            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">
                Relationship Status
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="single"
                name="radio-buttons-group"
                value={relationStatus}
                onChange={(e) => setRelationStatus(e.target.value)}
              >
                <FormControlLabel
                  value="single"
                  control={<Radio />}
                  label="Single"
                />
                <FormControlLabel
                  value="married"
                  control={<Radio />}
                  label="Married"
                />
              </RadioGroup>
            </FormControl>

            <Button type="submit" variant="contained" color="secondary">
              Update Profile
            </Button>

            <Typography variant="p" style={{ textAlign: "center" }}>
              Want to change your password?{" "}
              <Link
                style={{ color: colorTheme.palette.primary.main }}
                className="profile__aboutEditPasswordLink"
                to="/edit-password/"
              >
                Edit Password
              </Link>
              .
            </Typography>
          </Stack>
        </form>
      </Stack>
    </div>
  );
};

export default EditProfileModal;
