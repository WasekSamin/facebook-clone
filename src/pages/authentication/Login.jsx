import React, { useState } from "react";
import Container from "@mui/material/Container";
import "../../css/authentication/Login.css";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { colorTheme } from "../../components/colorTheme/ColorTheme";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import { Link } from "react-router-dom";
import LoadingButton from '@mui/lab/LoadingButton';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
    console.log("HEY");

    setErrorMsg(null);
    setErrorMsgPosition(0);

    if (!email || email.trim() === "") {
      showErrorMsg("Email field is required!", 1);
    } else if (!password || password.trim() === "") {
      showErrorMsg("Password field is required!", 2);
    } else {
      const emailValidation = validateEmail(email.trim().normalize());

      if (emailValidation) {
        makeLogin({
          email: email.trim().normalize(),
          password: password.trim(),
        });
      } else {
        showErrorMsg("Please type a valid email!", 1);
      }
    }
  };

  async function makeLogin(info) {
    let formData = new FormData();
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
                  Social App helps you connect and share with the people in your
                  life.
                </Typography>
              </div>
            </Grid>
            <Grid item xs={5}>
              <div id="login__formDiv">
                <form onSubmit={handleLoginSubmit} id="login__form">
                  <div>
                    <TextField
                      onChange={(e) => setEmail(e.target.value)}
                      autoFocus={true}
                      type="email"
                      label="Email Address"
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
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      label="Password"
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
                    <LoadingButton
                      loading={false}
                      loadingPosition="end"
                      type="submit"
                      id="sign__inBtn"
                      variant="contained"
                      color="secondary"
                    >
                      Sign In
                    </LoadingButton>
                  </div>
                  <div className="login__forgotBtn">
                    <Link
                      to="/forgot-password/"
                    >
                      <Button
                        color="secondary"
                        style={{
                          fontSize: "0.75rem",
                          textTransform: "capitalize",
                        }}
                      >
                        Forgot Password?
                      </Button>
                    </Link>
                  </div>
                </form>

                <Divider />

                <div id="navigate__reigsterBtn">
                  <Link to="/register/" style={{ textDecoration: "none" }}>
                    <Button
                      style={{ backgroundColor: `${colorTheme.palette.blue}` }}
                      variant="contained"
                    >
                      Create New Account
                    </Button>
                  </Link>
                </div>
              </div>
            </Grid>
          </Grid>
        </div>
      </Container>
    </div>
  );
};

export default Login;
