import React, { useState } from "react";
import Container from "@mui/material/Container";
import "../../css/authentication/Login.css";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { colorTheme } from "../../components/colorTheme/ColorTheme";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import LoadingButton from '@mui/lab/LoadingButton';

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
  const [errorMsgPosition, setErrorMsgPosition] = useState(0);

  function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  const showErrorMsg = (msg, errorPostion) => {
    setErrorMsg(msg);
    setErrorMsgPosition(errorPostion);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    setErrorMsg(null);
    setErrorMsgPosition(0);

    if (!username || username.trim() === "") {
      showErrorMsg("Username field is required!", 1);
    } else if (!email || email.trim() === "") {
      showErrorMsg("Email field is required!", 2);
    } else if (!password || password.trim() === "") {
      showErrorMsg("Password field is required!", 3);
    } else if (!confPassword || confPassword.trim() === "") {
      showErrorMsg("Confirm password field is required!", 4);
    } else {
      const emailValidation = validateEmail(email.trim().normalize());

      if (emailValidation) {
        if (password.trim().length > 6) {
          if (password.trim() === confPassword.trim()) {
            createAccount({
              username: username.trim(),
              email: email.trim().normalize(),
              password: password.trim(),
            });
          } else {
            showErrorMsg("Two password fields did not match!", 4);
          }
        } else {
          showErrorMsg("Password is too short!", 3);
        }
      } else {
        showErrorMsg("Please type a valid email!", 1);
      }
    }
  };

  async function createAccount(info) {
    let formData = new FormData();
    formData.append("username", info.username);
    formData.append("email", info.email);
    formData.append("password", info.password);

    // await axios.post()
  }

  return (
    <div>
      <Container maxWidth="lg">
        <div className="login__grid">
          <Grid container spacing={2}>
            <Grid item xs={7}>
              <div className="login__gridLeft">
                <Typography
                  variant="h3"
                  style={{
                    color: `${colorTheme.palette.primary.main}`,
                    fontWeight: "600",
                    marginBottom: "10px",
                  }}
                >
                  Social App
                </Typography>
                <Typography variant="h5">
                  Create an account to connect with other people.
                </Typography>
              </div>
            </Grid>
            <Grid item xs={5}>
              <div id="login__formDiv">
                <form
                  onSubmit={handleLoginSubmit}
                  id="login__form"
                  className="register__form"
                >
                  <div>
                    <TextField
                      onChange={(e) => setUsername(e.target.value)}
                      autoFocus={true}
                      label="Username"
                      variant="outlined"
                    />
                    {errorMsg !== null && errorMsgPosition === 1 && (
                      <Typography
                        variant="p"
                        style={{
                          color: `${colorTheme.palette.secondary.main}`,
                          fontSize: "0.85rem",
                        }}
                      >
                        {errorMsg}
                      </Typography>
                    )}
                  </div>

                  <div>
                    <TextField
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      label="Email Address"
                      variant="outlined"
                    />
                    {errorMsg !== null && errorMsgPosition === 2 && (
                      <Typography
                        variant="p"
                        style={{
                          color: `${colorTheme.palette.secondary.main}`,
                          fontSize: "0.85rem",
                        }}
                      >
                        {errorMsg}
                      </Typography>
                    )}
                  </div>
                  <div>
                    <TextField
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      label="Password"
                      variant="outlined"
                    />
                    {errorMsg !== null && errorMsgPosition === 3 && (
                      <Typography
                        variant="p"
                        style={{
                          color: `${colorTheme.palette.secondary.main}`,
                          fontSize: "0.85rem",
                        }}
                      >
                        {errorMsg}
                      </Typography>
                    )}
                  </div>
                  <div>
                    <TextField
                      onChange={(e) => setConfPassword(e.target.value)}
                      type="password"
                      label="Confirm Password"
                      variant="outlined"
                    />
                    {errorMsg !== null && errorMsgPosition === 4 && (
                      <Typography
                        variant="p"
                        style={{
                          color: `${colorTheme.palette.secondary.main}`,
                          fontSize: "0.85rem",
                        }}
                      >
                        {errorMsg}
                      </Typography>
                    )}
                  </div>
                  <div>
                    <LoadingButton
                      type="submit"
                      id="sign__inBtn"
                      variant="contained"
                      color="secondary"
                      loading={false}
                      loadingPosition="end"
                    >
                      Sign Up
                    </LoadingButton>
                  </div>
                  <div className="login__forgotBtn">
                    <Typography
                      variant="p"
                      style={{
                        fontSize: "0.75rem",
                        marginTop: "0.5rem",
                        color: "rgb(100 116 139)",
                      }}
                    >
                      Already have an account!{" "}
                      <Link
                        to="/login/"
                        style={{ color: `${colorTheme.palette.primary.main}` }}
                      >
                        Sign in
                      </Link>{" "}
                      here.
                    </Typography>
                  </div>
                </form>
              </div>
            </Grid>
          </Grid>
        </div>
      </Container>
    </div>
  );
};

export default Register;
