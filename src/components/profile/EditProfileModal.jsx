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
} from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import "../../css/profile/EditProfileModal.css";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import { colorTheme } from "../colorTheme/ColorTheme";
import {
  AccountStore,
  APIStore,
  ProfileStore,
  SocketStore,
  TokenStore,
} from "../store/Store";
import LoadingButton from "@mui/lab/LoadingButton";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const EditProfileModal = ({
  showEditProfileModal,
  setShowEditProfileModal,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [address, setAddress] = useState("");
  const [studyingAt, setStudyingAt] = useState("");
  const [workingAt, setWorkingAt] = useState("");
  const [jobPosition, setJobPosition] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [workStatus, setWorkStatus] = useState(null);
  const [gender, setGender] = useState(null);
  const [relationStatus, setRelationStatus] = useState(null);
  const editProfileModalRef = useRef(null);
  const currentProfile = ProfileStore((state) => state.currentProfile);
  const [errorMsgPos, setErrorMsgPos] = useState(-1);
  const MYAPI = APIStore((state) => state.MYAPI);
  const token = TokenStore((state) => state.token);
  const updateCurrentProfile = ProfileStore(
    (state) => state.updateCurrentProfile
  );
  const updateLoggedInUserInfo = AccountStore(
    (state) => state.updateLoggedInUserInfo
  );
  const socket = SocketStore((state) => state.socket);
  const canCurrentProfileEditable = ProfileStore(state => state.canCurrentProfileEditable);

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

    if (currentProfile !== null) {
      setUsername(currentProfile.username);
      currentProfile.address !== null && setAddress(currentProfile.address);
      currentProfile.working_status !== null &&
        setWorkStatus(currentProfile.working_status);
      currentProfile.studying_at !== null &&
        setStudyingAt(currentProfile.studying_at);
      currentProfile.working_at !== null &&
        setWorkingAt(currentProfile.working_at);
      currentProfile.job_position !== null &&
        setJobPosition(currentProfile.job_position);
      currentProfile.phone_no !== null && setPhoneNo(currentProfile.phone_no);
      currentProfile.gender !== null && setGender(currentProfile.gender);
      currentProfile.relation_status &&
        setRelationStatus(currentProfile.relation_status);
    }

    return () => {
      document.removeEventListener("click", closeEditProfileModal, true);
    };
  }, []);

  const showErrorMsg = (pos) => {
    setErrorMsgPos(pos);
    setIsLoading(false);
  };

  const editProfileModalFormSubmit = (e) => {
    e.preventDefault();

    setIsLoading(false);
    setErrorMsgPos(-1);

    if (!username || username.trim() === "") {
      showErrorMsg(1);
      return;
    } else if (workStatus !== null) {
      if (workStatus === "Working") {
        if (jobPosition.trim() === "") {
          showErrorMsg(3);
          return;
        } else if (workingAt.trim() === "") {
          showErrorMsg(4);
          return;
        }
      } else if (workStatus === "Studying") {
        if (studyingAt.trim() === "") {
          showErrorMsg(2);
          return;
        }
      } else if (workStatus === "Both") {
        if (studyingAt.trim() === "") {
          showErrorMsg(2);
          return;
        } else if (jobPosition.trim() === "") {
          showErrorMsg(3);
          return;
        } else if (workingAt.trim() === "") {
          showErrorMsg(4);
          return;
        }
      }
    }

    if (currentProfile !== null) {
      editProfile({
        currentProfileUid: currentProfile.uid,
        username: username.trim(),
        address: address !== null ? address.trim() : address,
        studyingAt: studyingAt !== null ? studyingAt.trim() : studyingAt,
        jobPosition: jobPosition !== null ? jobPosition.trim() : jobPosition,
        workingAt: workingAt !== null ? workingAt.trim() : workingAt,
        workStatus: workStatus,
        phoneNo: phoneNo !== null ? phoneNo.trim() : phoneNo,
        gender: gender,
        relationStatus: relationStatus,
      });
    } else {
      alert("Something went wrong!");
      setIsLoading(false);
    }
  };

  async function editProfile(info) {
    let formData = new FormData();

    formData.append("profileUid", info.currentProfileUid);
    formData.append("username", info.username);
    formData.append("address", info.address);
    formData.append("workStatus", info.workStatus);
    formData.append("studyingAt", info.studyingAt);
    formData.append("workingAt", info.workingAt);
    formData.append("jobPosition", info.jobPosition);
    formData.append("phoneNo", info.phoneNo);
    formData.append("gender", info.gender);
    formData.append("relationStatus", info.relationStatus);
    formData.append("editProfileData", true);

    await axios
      .put(
        `${MYAPI}/authentication/account-detail/${info.currentProfileUid}/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `token ${token}`,
          },
        }
      )
      .then((res) => {
        if (res.data.error && res.data.invalid_format) {
          toast.error("Phone Number should be in number format!");
          showErrorMsg(-1);
        } else if (res.data.erorr) {
          alert("Failed to updated profile! Something went wrong...");
          showErrorMsg(-1);
        } else if (!res.data.error && res.data.account_updated) {
          getProfileObj(res.data.account_obj_uid);
        }
      })
      .catch((err) => console.error(err));
  }

  async function getProfileObj(accountObjUid) {
    await axios
      .get(`${MYAPI}/authentication/account-detail/${accountObjUid}/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `token ${token}`,
        },
      })
      .then((res) => {
        updateCurrentProfile(res.data);
        updateLoggedInUserInfo(res.data);
        socket.emit("update-account-data", res.data);
        toast.success("Profile Updated successfully!");
        setIsLoading(false);
      })
      .catch((err) => console.error(err));
  }

  return (
    <>
      <Toaster position="bottom-right" reverseOrder={false} />
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
              <Stack direction="column" spacing={0.5}>
                <TextField
                  value={username}
                  onChange={(e) => canCurrentProfileEditable && setUsername(e.target.value)}
                  id="username"
                  label="Username..."
                  variant="outlined"
                />
                {errorMsgPos === 1 && (
                  <Typography
                    variant="p"
                    style={{ color: `${colorTheme.palette.secondary.main}` }}
                  >
                    Username field is required!
                  </Typography>
                )}
              </Stack>
              <TextField
                value={address}
                onChange={(e) => canCurrentProfileEditable && setAddress(e.target.value)}
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
                  defaultValue={workStatus !== null ? workStatus : "Studying"}
                  name="radio-buttons-group"
                  value={workStatus}
                  onChange={(e) => canCurrentProfileEditable && setWorkStatus(e.target.value)}
                >
                  <FormControlLabel
                    value="Studying"
                    control={<Radio />}
                    label="Studying"
                  />
                  <FormControlLabel
                    value="Working"
                    control={<Radio />}
                    label="Working"
                  />
                  <FormControlLabel
                    value="Both"
                    control={<Radio />}
                    label="Both"
                  />
                  <FormControlLabel
                    value="None"
                    control={<Radio />}
                    label="None"
                  />
                </RadioGroup>
              </FormControl>

              {(workStatus === "Studying" || workStatus === "Both") && (
                <Stack direction="column" spacing={0.5}>
                  <TextField
                    value={studyingAt}
                    onChange={(e) => canCurrentProfileEditable && setStudyingAt(e.target.value)}
                    id="studying_place"
                    label="Studying At..."
                    variant="outlined"
                  />
                  {errorMsgPos === 2 && (
                    <Typography
                      style={{ color: `${colorTheme.palette.secondary.main}` }}
                    >
                      Studying At field is required!
                    </Typography>
                  )}
                </Stack>
              )}
              {(workStatus === "Working" || workStatus === "Both") && (
                <>
                  <Stack direction="column" spacing={0.5}>
                    <TextField
                      value={jobPosition}
                      onChange={(e) => canCurrentProfileEditable && setJobPosition(e.target.value)}
                      id="working__position"
                      label="Job/Working Position..."
                      variant="outlined"
                    />
                    {errorMsgPos === 3 && (
                      <Typography
                        style={{
                          color: `${colorTheme.palette.secondary.main}`,
                        }}
                      >
                        Job Position field is required!
                      </Typography>
                    )}
                  </Stack>

                  <Stack direction="column" spacing={0.5}>
                    <TextField
                      value={workingAt}
                      onChange={(e) => canCurrentProfileEditable && setWorkingAt(e.target.value)}
                      id="working__place"
                      label="Working At..."
                      variant="outlined"
                    />
                    {errorMsgPos === 4 && (
                      <Typography
                        style={{
                          color: `${colorTheme.palette.secondary.main}`,
                        }}
                      >
                        Working At field is required!
                      </Typography>
                    )}
                  </Stack>
                </>
              )}

              <TextField
                value={phoneNo}
                onChange={(e) => canCurrentProfileEditable && setPhoneNo(e.target.value)}
                id="profile__phnNo"
                label="Phone No..."
                variant="outlined"
              />

              <FormControl>
                <FormLabel id="profile__gender">Gender</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="profile__gender"
                  defaultValue={gender !== null ? gender : "Male"}
                  name="radio-buttons-group"
                  value={gender}
                  onChange={(e) => canCurrentProfileEditable && setGender(e.target.value)}
                >
                  <FormControlLabel
                    value="Male"
                    control={<Radio />}
                    label="Male"
                  />
                  <FormControlLabel
                    value="Female"
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="Other"
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
                  defaultValue={
                    relationStatus !== null ? relationStatus : "Single"
                  }
                  name="radio-buttons-group"
                  value={relationStatus}
                  onChange={(e) => canCurrentProfileEditable && setRelationStatus(e.target.value)}
                >
                  <FormControlLabel
                    value="Single"
                    control={<Radio />}
                    label="Single"
                  />
                  <FormControlLabel
                    value="Married"
                    control={<Radio />}
                    label="Married"
                  />
                </RadioGroup>
              </FormControl>

              <LoadingButton
                loading={isLoading}
                loadingPosition="end"
                type="submit"
                variant="contained"
                color="secondary"
              >
                Update Profile
              </LoadingButton>

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
    </>
  );
};

export default EditProfileModal;