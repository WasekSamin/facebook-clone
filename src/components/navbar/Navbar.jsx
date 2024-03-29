import { Button, Divider, IconButton, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React, { useState, useRef, useEffect } from "react";
import { colorTheme } from "../colorTheme/ColorTheme";
import SearchIcon from "@mui/icons-material/Search";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import "../../css/navbar/Navbar.css";
import { Link } from "react-router-dom";
import profileImg from "../../dummy/images/portImg.png";
import ClearIcon from "@mui/icons-material/Clear";
import { motion, AnimatePresence } from "framer-motion/dist/framer-motion";
import MenuIcon from "@mui/icons-material/Menu";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import Badge from "@mui/material/Badge";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import CloseIcon from "@mui/icons-material/Close";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';


const Navbar = () => {
  const clearNavbarSearchFieldBtnRef = useRef(null);
  const [navbarSearchFieldText, setNavbarSearchFieldText] = useState("");
  const mobileSidebarRef = useRef(null);
  const overlayRef = useRef(null);
  const mobileSearchInputRef = useRef(null);
  const [mobileSearchPeopleModal, setMobileSearchPeopleModal] = useState(false);

  const closeMobileSidebar = (event) => {
    if (
      mobileSidebarRef.current !== null &&
      !mobileSidebarRef.current.contains(event.target)
    ) {
      mobileSidebarRef.current.classList.remove("show__mobileSidebar");
      overlayRef.current.classList.remove("show__overlay");
    }
  };

  const showMobileSidebar = () => {
    if (mobileSidebarRef.current !== null) {
      mobileSidebarRef.current.classList.add("show__mobileSidebar");
      overlayRef.current.classList.add("show__overlay");
    }
  };

  useEffect(() => {
    document.addEventListener("click", closeMobileSidebar, true);

    return () => {
      document.removeEventListener("click", closeMobileSidebar, true);
    };
  }, []);

  const showMobileSearchModal = () => {
    setMobileSearchPeopleModal(true);
  }

  // Focus on the mobile search people modal input field
  useEffect(() => {
    if (mobileSearchPeopleModal && mobileSearchInputRef.current !== null) {
      mobileSearchInputRef.current.focus();
    }
  }, [mobileSearchPeopleModal])

  return (
    <div style={{ backgroundColor: "#fff" }} className="navbar__mainDiv">
      <div ref={overlayRef} id="overlay"></div>
      <Container maxWidth="lg">
        <div id="navbar">
          <Stack className="navbar__logoDiv" direction="row" alignItems="center" spacing={3}>
            <IconButton
              onClick={showMobileSidebar}
              color="secondary"
              id="navbar__hamburger"
            >
              <MenuIcon />
            </IconButton>
            <Link to="/" style={{ textDecoration: "none" }}>
              <Typography
                variant="h5"
                style={{
                  fontWeight: 600,
                  fontStyle: "italic",
                  color: `${colorTheme.palette.primary.main}`,
                }}
              >
                Social App
              </Typography>
            </Link>
          </Stack>

          <div className="navbar__rightDiv">
            <div className="mobile__searchDiv">
              <IconButton onClick={showMobileSearchModal}>
                <SearchIcon style={{ color: "var(--slate-500)" }} />
              </IconButton>

              <AnimatePresence initial={false} exitBeforeEnter={true}>
                {mobileSearchPeopleModal && (
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
                    id="mobile__searchModal"
                  >
                    <div
                      className="mobile__searchModalFirstDiv"
                      style={{
                        backgroundColor: `${colorTheme.palette.primary.main}`,
                      }}
                    >
                      <Typography variant="h5" style={{ fontWeight: 500 }}>
                        Search People
                      </Typography>
                      <IconButton onClick={() => setMobileSearchPeopleModal(false)}>
                        <CloseIcon style={{ color: "white" }} />
                      </IconButton>
                    </div>
                    <div className="mobile__searchModalLastDiv">
                      <div>
                        <SearchIcon style={{ color: "var(--slate-500)" }} />
                        <input
                          ref={mobileSearchInputRef}
                          onChange={(e) =>
                            setNavbarSearchFieldText(e.target.value)
                          }
                          value={navbarSearchFieldText}
                          id="mobile__navbarSearch"
                          type="text"
                          placeholder="Search people..."
                        />
                        <AnimatePresence intial={false} exitBeforeEnter={true}>
                          {navbarSearchFieldText.length > 0 && (
                            <motion.div
                              initial={{
                                x: "150%",
                                opacity: 0,
                              }}
                              animate={{
                                x: 0,
                                opacity: 1,
                              }}
                              exit={{
                                x: "150%",
                                opacity: 0,
                              }}
                              className="div"
                              style={{ display: "flex" }}
                            >
                              <ClearIcon
                                onClick={() => setNavbarSearchFieldText("")}
                                ref={clearNavbarSearchFieldBtnRef}
                                style={{ color: "var(--slate-500)" }}
                                className="clear__navbarSearchField"
                              />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      <div className="mobile__navbarSearchPeopleList">
                        <Link to="#">
                          <Button color="secondary">
                            <Avatar alt="Wasek Samin" src={profileImg} />
                            <Typography
                              variant="p"
                              className="mobile__navbarSearchPeopleUsernameText"
                              style={{
                                fontWeight: "600",
                                color: "black",
                                opacity: 0.8,
                              }}
                            >
                              Wasek Samin
                            </Typography>
                          </Button>
                        </Link>
                        <Link to="#">
                          <Button color="secondary">
                            <Avatar alt="Wasek Samin" src={profileImg} />
                            <Typography
                              variant="p"
                              className="mobile__navbarSearchPeopleUsernameText"
                              style={{
                                fontWeight: "600",
                                color: "black",
                                opacity: 0.8,
                              }}
                            >
                              Wasek Samin
                            </Typography>
                          </Button>
                        </Link>
                        <Link to="#">
                          <Button color="secondary">
                            <Avatar alt="Wasek Samin" src={profileImg} />
                            <Typography
                              variant="p"
                              className="mobile__navbarSearchPeopleUsernameText"
                              style={{
                                fontWeight: "600",
                                color: "black",
                                opacity: 0.8,
                              }}
                            >
                              Wasek Samin
                            </Typography>
                          </Button>
                        </Link>
                        <Link to="#">
                          <Button color="secondary">
                            <Avatar alt="Wasek Samin" src={profileImg} />
                            <Typography
                              variant="p"
                              className="mobile__navbarSearchPeopleUsernameText"
                              style={{
                                fontWeight: "600",
                                color: "black",
                                opacity: 0.8,
                              }}
                            >
                              Wasek Samin
                            </Typography>
                          </Button>
                        </Link>
                        <Link to="#">
                          <Button color="secondary">
                            <Avatar alt="Wasek Samin" src={profileImg} />
                            <Typography
                              variant="p"
                              className="mobile__navbarSearchPeopleUsernameText"
                              style={{
                                fontWeight: "600",
                                color: "black",
                                opacity: 0.8,
                              }}
                            >
                              Wasek Samin
                            </Typography>
                          </Button>
                        </Link>
                        <Link to="#">
                          <Button color="secondary">
                            <Avatar alt="Wasek Samin" src={profileImg} />
                            <Typography
                              variant="p"
                              className="mobile__navbarSearchPeopleUsernameText"
                              style={{
                                fontWeight: "600",
                                color: "black",
                                opacity: 0.8,
                              }}
                            >
                              Wasek Samin
                            </Typography>
                          </Button>
                        </Link>
                        <Link to="#">
                          <Button color="secondary">
                            <Avatar alt="Wasek Samin" src={profileImg} />
                            <Typography
                              variant="p"
                              className="mobile__navbarSearchPeopleUsernameText"
                              style={{
                                fontWeight: "600",
                                color: "black",
                                opacity: 0.8,
                              }}
                            >
                              Wasek Samin
                            </Typography>
                          </Button>
                        </Link>
                        <Link to="#">
                          <Button color="secondary">
                            <Avatar alt="Wasek Samin" src={profileImg} />
                            <Typography
                              variant="p"
                              className="mobile__navbarSearchPeopleUsernameText"
                              style={{
                                fontWeight: "600",
                                color: "black",
                                opacity: 0.8,
                              }}
                            >
                              Wasek Samin
                            </Typography>
                          </Button>
                        </Link>
                        <Link to="#">
                          <Button color="secondary">
                            <Avatar alt="Wasek Samin" src={profileImg} />
                            <Typography
                              variant="p"
                              className="mobile__navbarSearchPeopleUsernameText"
                              style={{
                                fontWeight: "600",
                                color: "black",
                                opacity: 0.8,
                              }}
                            >
                              Wasek Samin
                            </Typography>
                          </Button>
                        </Link>
                        <Link to="#">
                          <Button color="secondary">
                            <Avatar alt="Wasek Samin" src={profileImg} />
                            <Typography
                              variant="p"
                              className="mobile__navbarSearchPeopleUsernameText"
                              style={{
                                fontWeight: "600",
                                color: "black",
                                opacity: 0.8,
                              }}
                            >
                              Wasek Samin
                            </Typography>
                          </Button>
                        </Link>
                        <Link to="#">
                          <Button color="secondary">
                            <Avatar alt="Wasek Samin" src={profileImg} />
                            <Typography
                              variant="p"
                              className="mobile__navbarSearchPeopleUsernameText"
                              style={{
                                fontWeight: "600",
                                color: "black",
                                opacity: 0.8,
                              }}
                            >
                              Wasek Samin
                            </Typography>
                          </Button>
                        </Link>
                        <Link to="#">
                          <Button color="secondary">
                            <Avatar alt="Wasek Samin" src={profileImg} />
                            <Typography
                              variant="p"
                              className="mobile__navbarSearchPeopleUsernameText"
                              style={{
                                fontWeight: "600",
                                color: "black",
                                opacity: 0.8,
                              }}
                            >
                              Wasek Samin
                            </Typography>
                          </Button>
                        </Link>
                        <Link to="#">
                          <Button color="secondary">
                            <Avatar alt="Wasek Samin" src={profileImg} />
                            <Typography
                              variant="p"
                              className="mobile__navbarSearchPeopleUsernameText"
                              style={{
                                fontWeight: "600",
                                color: "black",
                                opacity: 0.8,
                              }}
                            >
                              Wasek Samin
                            </Typography>
                          </Button>
                        </Link>
                        <Link to="#">
                          <Button color="secondary">
                            <Avatar alt="Wasek Samin" src={profileImg} />
                            <Typography
                              variant="p"
                              className="mobile__navbarSearchPeopleUsernameText"
                              style={{
                                fontWeight: "600",
                                color: "black",
                                opacity: 0.8,
                              }}
                            >
                              Wasek Samin
                            </Typography>
                          </Button>
                        </Link>
                        <Link to="#">
                          <Button color="secondary">
                            <Avatar alt="Wasek Samin" src={profileImg} />
                            <Typography
                              variant="p"
                              className="mobile__navbarSearchPeopleUsernameText"
                              style={{
                                fontWeight: "600",
                                color: "black",
                                opacity: 0.8,
                              }}
                            >
                              Last person
                            </Typography>
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className="navbar__searchDiv">
              <SearchIcon />
              <input
                onChange={(e) => setNavbarSearchFieldText(e.target.value)}
                value={navbarSearchFieldText}
                type="text"
                placeholder="Search for people..."
              />
              <AnimatePresence intial={false} exitBeforeEnter={true}>
                {navbarSearchFieldText.length > 0 && (
                  <motion.div
                    initial={{
                      x: "150%",
                      opacity: 0,
                    }}
                    animate={{
                      x: 0,
                      opacity: 1,
                    }}
                    exit={{
                      x: "150%",
                      opacity: 0,
                    }}
                    className="div"
                    style={{ display: "flex" }}
                  >
                    <ClearIcon
                      onClick={() => setNavbarSearchFieldText("")}
                      ref={clearNavbarSearchFieldBtnRef}
                      className="clear__navbarSearchField"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Stack
              ref={mobileSidebarRef}
              id="navbar__rightContent"
              direction="row"
              spacing={3}
            >
              <div>
                <Divider id="navbar__mobileDivider" />
                <Button
                  variant="contained"
                  color="secondary"
                  style={{ borderRadius: "9999px", width: "100%" }}
                >
                  Create
                </Button>
              </div>
              <Stack id="navbar__mobileSidebar" direction="column" spacing={3}>
                <Link to="/profile/" id="navbar__profileAvatar">
                  <Stack direction="column" spacing={3}>
                    <Avatar alt="Wasek Samin" src={profileImg} />
                    <Typography id="navbar__profileUsername" variant="p">
                      Wasek Samin
                    </Typography>
                  </Stack>
                </Link>
                <Stack
                  id="navbar__mobileExtraLinks"
                  direction="column"
                  spacing={3}
                >
                  <Divider style={{ marginBottom: "1rem" }} />
                  <Link to="/chat/">
                    <Button
                      color="secondary"
                      style={{ width: "100%", justifyContent: "flex-start" }}
                    >
                      <Stack direction="row" spacing={3}>
                        <Badge
                          style={{ marginRight: "1rem" }}
                          color="secondary"
                          badgeContent={10}
                          max={9}
                        >
                          <ChatBubbleOutlineIcon />
                        </Badge>
                        Messages
                      </Stack>
                    </Button>
                  </Link>
                  <Link to="/notifications/">
                    <Button
                      color="secondary"
                      style={{ width: "100%", justifyContent: "flex-start" }}
                    >
                      <Stack direction="row" spacing={3}>
                        <Badge
                          style={{ marginRight: "1rem" }}
                          color="secondary"
                          badgeContent={10}
                          max={9}
                        >
                          <NotificationsNoneIcon />
                        </Badge>
                        Notifications
                      </Stack>
                    </Button>
                  </Link>
                  <Link to="/friend-requests/">
                    <Button
                      color="secondary"
                      style={{ width: "100%", justifyContent: "flex-start" }}
                    >
                      <Stack direction="row" spacing={3}>
                        <Badge
                          style={{ marginRight: "1rem" }}
                          color="secondary"
                          badgeContent={10}
                          max={9}
                        >
                          <PeopleOutlineIcon />
                        </Badge>
                        Friend Requests
                      </Stack>
                    </Button>
                  </Link>
                  <Button id="mobile__navbarLogoutBtn" color="error" style={{ justifyContent: "flex-start", textTransform: "capitalize" }}>
                    <ExitToAppIcon style={{ marginRight: "1rem" }} /> Logout
                  </Button>
                </Stack>
              </Stack>
              <IconButton id="navbar__logoutBtn" color="error">
                <ExitToAppIcon />
              </IconButton>
            </Stack>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
