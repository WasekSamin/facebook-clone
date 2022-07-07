import React, { useState, useEffect } from "react";
import dummyImg from "../../dummy/static_images/default_profile.png";
import "../../css/profile/ProfileTop.css";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import { Button, Stack, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { motion, AnimatePresence } from "framer-motion/dist/framer-motion";
import EditProfileModal from "../../components/profile/EditProfileModal";
import EditProfilePicModal from "../../components/profile/EditProfilePicModal";
import ProfileImageViewModal from "../../components/profile/ProfileImageViewModal";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import {
  AccountStore,
  APIStore,
  ProfileStore,
  SocketStore,
  TokenStore,
} from "../../components/store/Store";
import PersonRemoveAlt1OutlinedIcon from "@mui/icons-material/PersonRemoveAlt1Outlined";
import GroupRemoveOutlinedIcon from "@mui/icons-material/GroupRemoveOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const ProfileTop = () => {
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [showEditProfilePicModal, setShowEditProfilePicModal] = useState(false);
  const [profileViewedImg, setProfileViewedImg] = useState(null);
  const MYAPI = APIStore((state) => state.MYAPI);
  const currentProfile = ProfileStore((state) => state.currentProfile);
  const canCurrentProfileEditable = ProfileStore(
    (state) => state.canCurrentProfileEditable
  );
  const checkProfileFriendOptionWithUser = ProfileStore(
    (state) => state.checkProfileFriendOptionWithUser
  );
  const loadingFriendOption = ProfileStore(
    (state) => state.loadingFriendOption
  );
  const loggedInUserInfo = AccountStore((state) => state.loggedInUserInfo);
  const token = TokenStore((state) => state.token);
  const [isLoading, setIsLoading] = useState(false);
  const socket = SocketStore((state) => state.socket);
  const updateCheckProfileFriendOptionWithUser = ProfileStore(
    (state) => state.updateCheckProfileFriendOptionWithUser
  );

  const editProfileDetailsModal = () => {
    return (
      <>
        {showEditProfileModal && <div id="editProfileModalOverlay"></div>}
        <AnimatePresence initial={false} exitBeforeEnter={true}>
          {showEditProfileModal && (
            <motion.div
              id="edit__profileModalMotionDiv"
              initial={{
                y: "120%",
                opacity: 0,
              }}
              animate={{
                y: 0,
                opacity: 1,
              }}
              exit={{
                y: "120%",
                opacity: 0,
              }}
            >
              <EditProfileModal
                showEditProfileModal={showEditProfileModal}
                setShowEditProfileModal={setShowEditProfileModal}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  };

  const editProfilePicModal = () => {
    return (
      <>
        {showEditProfilePicModal && (
          <div id="edit__profilePicModalOverlay"></div>
        )}

        <AnimatePresence initial={false} exitBeforeEnter={true}>
          {showEditProfilePicModal && (
            <motion.div
              id="edit__profilePicModalMotionDiv"
              initial={{
                y: "120%",
                opacity: 0,
              }}
              animate={{
                y: 0,
                opacity: 1,
              }}
              exit={{
                y: "120%",
                opacity: 0,
              }}
            >
              <EditProfilePicModal
                showEditProfilePicModal={showEditProfilePicModal}
                setShowEditProfilePicModal={setShowEditProfilePicModal}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  };

  const profileImageViewModal = () => {
    return (
      <>
        {/* Profile image viewed modal starts */}
        {profileViewedImg !== null && (
          <div id="profile__viewImgModalOverlay"></div>
        )}

        <AnimatePresence initial={false} exitBeforeEnter={true}>
          {profileViewedImg !== null && (
            <motion.div
              id="profile__viewImageModalMainDiv"
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
              <ProfileImageViewModal
                profileViewedImg={profileViewedImg}
                setProfileViewedImg={setProfileViewedImg}
              />
            </motion.div>
          )}
        </AnimatePresence>
        {/* Profile image viewed modal ends */}
      </>
    );
  };

  // Sender or receiver gets unfriend
  const removeFriend = async () => {
    setIsLoading(true);

    if (currentProfile !== null && loggedInUserInfo !== null) {
      let formData = new FormData();

      formData.append("currentProfile", currentProfile.uid);
      formData.append("loggedInUser", loggedInUserInfo.uid);
      formData.append("removeFriend", true);

      await axios
        .post(`${MYAPI}/friend/friend-request-list/`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `token ${token}`,
          },
        })
        .then((res) => {
          if (res.data.error && res.data.friend_obj_not_found) {
            alert("Could find the user on your friend list!");
            setIsLoading(false);
          } else if (res.data.error) {
            setIsLoading(false);
            alert("Failed to remove the user from your friend list!");
          } else if (!res.data.error && res.data.remove_friend_success) {
            updateCheckProfileFriendOptionWithUser({
              friend: false,
              sendFriendRequest: false,
              receiveFriendRequest: false,
            });

            if (currentProfile !== null && loggedInUserInfo !== null) {
              socket.emit("remove-user-from-friend-list", {
                actionUser: loggedInUserInfo,
                removedFriend: currentProfile,
                receiverToken: res.data.receiver_token,
                userToken: token,
              });
            }
          }
        })
        .catch((err) => console.error(err));

      setIsLoading(false);
    } else {
      alert("Failed to remove the user from your friend list!");
      setIsLoading(false);
    }
  };

  // Sender delete the friend request
  const deleteSentRequest = async () => {
    setIsLoading(true);

    if (currentProfile !== null && loggedInUserInfo !== null) {
      let formData = new FormData();

      formData.append("currentProfile", currentProfile.uid);
      formData.append("loggedInUser", loggedInUserInfo.uid);
      formData.append("deleteSentRequest", true);

      await axios
        .post(`${MYAPI}/friend/friend-request-list/`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `token ${token}`,
          },
        })
        .then((res) => {
          if (res.data.error && res.data.friend_request_not_exist) {
            setIsLoading(false);
            alert("Invalid user request!");
          } else if (
            res.data.error &&
            res.data.user_not_in_friend_request_list
          ) {
            setIsLoading(false);
            alert("Invalid user request!");
          } else if (res.data.error && res.data.notification_obj_not_found) {
            setIsLoading(false);
            alert("Something went wrong!");
            window.location.reload();
          } else if (res.data.error) {
            setIsLoading(false);
            alert("Failed to delete the friend request!");
          } else if (!res.data.error && res.data.delete_sent_request_success) {
            updateCheckProfileFriendOptionWithUser({
              friend: false,
              sendFriendRequest: false,
              receiveFriendRequest: false,
            });

            if (currentProfile !== null && loggedInUserInfo !== null) {
              socket.emit("sender-delete-friend-request", {
                friendRequestSender: loggedInUserInfo,
                friendRequestReceiver: currentProfile,
                receiverToken: res.data.receiver_token,
              });
            }
          }
        })
        .catch((err) => console.error(err));
      setIsLoading(false);
    } else {
      alert("Failed to delete the friend request!");
      setIsLoading(false);
    }
  };

  // Receiver accepting the friend request
  const acceptFriendRequest = async () => {
    setIsLoading(true);

    if (currentProfile !== null && loggedInUserInfo !== null) {
      let formData = new FormData();

      formData.append("currentProfile", currentProfile.uid);
      formData.append("loggedInUser", loggedInUserInfo.uid);
      formData.append("acceptFriendRequest", true);

      await axios
        .post(`${MYAPI}/friend/friend-request-list/`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `token ${token}`,
          },
        })
        .then((res) => {
          if (res.data.error && res.data.friend_request_not_exist) {
            setIsLoading(false);
            alert("Invalid user request!");
          } else if (res.data.error && res.data.notification_obj_not_found) {
            setIsLoading(false);
            alert("Something went wrong!");
            window.location.reload();
          } else if (res.data.error) {
            setIsLoading(false);
            alert("Failed to accept the friend request!");
          } else if (
            !res.data.error &&
            res.data.receiver_accept_friend_request
          ) {
            updateCheckProfileFriendOptionWithUser({
              friend: true,
              sendFriendRequest: false,
              receiveFriendRequest: false,
            });

            if (currentProfile !== null && loggedInUserInfo !== null) {
              socket.emit("receiver-accept-friend-request", {
                friendRequestSender: currentProfile,
                friendRequestReceiver: loggedInUserInfo,
                receiverToken: res.data.receiver_token,
                userToken: token,
              });
            }
          }
        })
        .catch((err) => console.error(err));

      setIsLoading(false);
    } else {
      alert("Failed to accept the friend request!");
      setIsLoading(false);
    }
  };

  // Receiver delete the friend request
  const deleteReceiveRequest = async () => {
    setIsLoading(true);

    if (currentProfile !== null && loggedInUserInfo !== null) {
      let formData = new FormData();

      formData.append("currentProfile", currentProfile.uid);
      formData.append("loggedInUser", loggedInUserInfo.uid);
      formData.append("deleteReceiveRequest", true);

      await axios
        .post(`${MYAPI}/friend/friend-request-list/`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `token ${token}`,
          },
        })
        .then((res) => {
          if (res.data.error && res.data.friend_request_not_exist) {
            setIsLoading(false);
            alert("Invalid user request!");
          } else if (
            res.data.error &&
            res.data.user_not_in_friend_request_list
          ) {
            setIsLoading(false);
            alert("Invalid user request!");
          } else if (res.data.error && res.data.notification_obj_not_found) {
            setIsLoading(false);
            alert("Something went wrong!");
            window.location.reload();
          } else if (res.data.error) {
            setIsLoading(false);
            alert("Failed to delete the friend request!");
          } else if (
            !res.data.error &&
            res.data.delete_receive_request_success
          ) {
            updateCheckProfileFriendOptionWithUser({
              friend: false,
              sendFriendRequest: false,
              receiveFriendRequest: false,
            });

            if (currentProfile !== null && loggedInUserInfo !== null) {
              socket.emit("receiver-delete-friend-request", {
                friendRequestSender: currentProfile,
                friendRequestReceiver: loggedInUserInfo,
                receiverToken: res.data.receiver_token,
                userToken: token,
              });
            }
          }
        })
        .catch((err) => console.error(err));

      setIsLoading(false);
    } else {
      alert("Failed to delete the friend request!");
      setIsLoading(false);
    }
  };

  // Sender sending friend request
  const addFriend = async () => {
    setIsLoading(true);

    if (currentProfile !== null && loggedInUserInfo !== null) {
      let formData = new FormData();

      formData.append("currentProfile", currentProfile.uid);
      formData.append("loggedInUser", loggedInUserInfo.uid);
      formData.append("addFriend", true);

      await axios
        .post(`${MYAPI}/friend/friend-request-list/`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `token ${token}`,
          },
        })
        .then((res) => {
          if (res.data.error) {
            alert("Failed to send friend request! Something went wrong...");
            setIsLoading(false);
          } else if (!res.data.error && res.data.friend_request_sent_success) {
            updateCheckProfileFriendOptionWithUser({
              friend: false,
              sendFriendRequest: true,
              receiveFriendRequest: false,
            });
            socket.emit("send-friend-request", {
              friendRequestSender: res.data.friend_request_sender,
              friendRequestReceiver: res.data.friend_request_receiver,
              receiverToken: res.data.receiver_token,
            });
          }
        })
        .catch((err) => console.error(err));

      setIsLoading(false);
    } else {
      alert("Failed to send friend request! Something went wrong...");
      setIsLoading(false);
    }
  };

  // Redirecting to current profile chatbox
  const messageFriend = async () => {
    setIsLoading(true);
    if (loggedInUserInfo !== null && currentProfile !== null) {
      await axios
        .get(
          `${MYAPI}/chat/fetch-chat-object/${loggedInUserInfo.uid}/${currentProfile.uid}/`
        )
        .then((res) => {
          if (res.data.error && res.data.user_not_found) {
            toast.error("Invalid user request!");
            setIsLoading(false);
          } else if (res.data.error) {
            alert("Something went wrong! Please try again...");
            setIsLoading(false);
          } else if (!res.data.error && res.data.chat_found) {
            window.open(`/chat/${res.data.chat_uid}`, "_blank");
          }
        })
        .catch((err) => console.error(err));

      setIsLoading(false);
    } else {
      alert("Something went wrong!");
      window.location.reload();
    }
  };

  return (
    <div>
      <Toaster position="bottom-right" reverseOrder={false} />

      {/* Edit profile details modal */}
      {editProfileDetailsModal()}

      {/* Edit profile pic modal */}
      {editProfilePicModal()}

      {/* Profile image viewed modal */}
      {profileImageViewModal()}

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        style={{ flexWrap: "wrap", gap: "1rem" }}
        id="profile__topMainDiv"
      >
        <Stack
          id="profile__topContentDiv"
          direction="row"
          alignItems="center"
          spacing={2}
        >
          <div id="profile__userImgMainDiv">
            <div
              onClick={() =>
                setProfileViewedImg(currentProfile.current_profile_pic)
              }
              id="profile__userMainImg"
            >
              <img
                src={
                  currentProfile !== null &&
                  currentProfile.current_profile_pic !== null
                    ? `${MYAPI}${currentProfile.current_profile_pic}`
                    : dummyImg
                }
                alt=""
              />
            </div>
            {canCurrentProfileEditable && (
              <Button
                id="profile__userImgChangeBtn"
                variant="contained"
                color="secondary"
                onClick={() => setShowEditProfilePicModal(true)}
              >
                <CameraAltOutlinedIcon />
              </Button>
            )}
          </div>

          <div>
            {currentProfile !== null && (
              <Stack
                className="profile__topContentDetails"
                direction="column"
                spacing={0.2}
              >
                <Typography variant="h6" style={{ fontWeight: "bold" }}>
                  {currentProfile.username}
                </Typography>
                <Typography
                  variant="p"
                  style={{
                    color: "var(--slate-600)",
                    fontSize: "1rem",
                    fontWeight: "500",
                  }}
                >
                  400 Friends
                </Typography>
                {currentProfile.working_status !== null && (
                  <>
                    <Typography
                      variant="p"
                      style={{
                        marginTop: "0.3rem",
                        color: "var(--slate-600)",
                        fontSize: "1rem",
                        textTransform: "capitalize",
                      }}
                    >
                      {currentProfile.working_status === "Both"
                        ? "Currently working & Studying"
                        : currentProfile.working_status === "Studying"
                        ? "Currently a student"
                        : currentProfile.working_status === "Working"
                        ? `Currently working as ${currentProfile.job_position}`
                        : "Currently unemployed"}
                    </Typography>
                    {(currentProfile.working_status === "Both" ||
                      currentProfile.working_status === "Studying") && (
                      <Typography
                        variant="p"
                        style={{
                          marginTop: "0.3rem",
                          color: "var(--slate-600)",
                          fontSize: "1rem",
                          textTransform: "capitalize",
                        }}
                      >
                        Studying at {currentProfile.studying_at}
                      </Typography>
                    )}
                    {(currentProfile.working_status === "Both" ||
                      currentProfile.working_status === "Working") && (
                      <Typography
                        variant="p"
                        style={{
                          marginTop: "0.3rem",
                          color: "var(--slate-600)",
                          fontSize: "1rem",
                          textTransform: "capitalize",
                        }}
                      >
                        Working at {currentProfile.working_at}{" "}
                        {currentProfile.working_status === "Both" &&
                          `as ${currentProfile.job_position}`}
                      </Typography>
                    )}
                  </>
                )}
              </Stack>
            )}
          </div>
        </Stack>

        {!loadingFriendOption ? (
          canCurrentProfileEditable ? (
            <Button
              className="profile__topEditUserInfoBtn"
              variant="contained"
              color="success"
              onClick={() => setShowEditProfileModal(true)}
            >
              <ModeEditOutlineOutlinedIcon style={{ marginRight: "0.12rem" }} />
              Edit Profile
            </Button>
          ) : checkProfileFriendOptionWithUser.friend ? (
            <Stack direction="column" spacing={1}>
              <LoadingButton
                loadingPosition="end"
                loading={isLoading}
                variant="contained"
                color="error"
                onClick={() => removeFriend()}
              >
                <GroupRemoveOutlinedIcon style={{ marginRight: "0.12rem" }} />
                UnFriend
              </LoadingButton>

              <LoadingButton
                loadingPosition="end"
                loading={isLoading}
                variant="contained"
                color="secondary"
                onClick={() => messageFriend()}
              >
                <ChatBubbleOutlineOutlinedIcon
                  style={{ marginRight: "0.12rem" }}
                />
                Message
              </LoadingButton>
            </Stack>
          ) : checkProfileFriendOptionWithUser.sendFriendRequest ? (
            <LoadingButton
              loadingPosition="end"
              loading={isLoading}
              variant="contained"
              color="error"
              onClick={() => deleteSentRequest()}
            >
              <PersonRemoveAlt1OutlinedIcon
                style={{ marginRight: "0.12rem" }}
              />
              Delete Request
            </LoadingButton>
          ) : checkProfileFriendOptionWithUser.receiveFriendRequest ? (
            <Stack direction="column" spacing={1}>
              <LoadingButton
                loadingPosition="end"
                loading={isLoading}
                variant="contained"
                color="secondary"
                onClick={() => acceptFriendRequest()}
              >
                <PersonAddIcon style={{ marginRight: "0.12rem" }} />
                Accept Request
              </LoadingButton>

              <LoadingButton
                loadingPosition="end"
                loading={isLoading}
                variant="contained"
                color="error"
                onClick={() => deleteReceiveRequest()}
              >
                <PersonRemoveAlt1OutlinedIcon
                  style={{ marginRight: "0.12rem" }}
                />
                Remove
              </LoadingButton>
            </Stack>
          ) : (
            <LoadingButton
              loadingPosition="end"
              loading={isLoading}
              variant="contained"
              color="secondary"
              onClick={() => addFriend()}
            >
              <PersonAddIcon style={{ marginRight: "0.12rem" }} />
              Add Friend
            </LoadingButton>
          )
        ) : null}
      </Stack>
    </div>
  );
};

export default ProfileTop;
