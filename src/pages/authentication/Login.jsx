import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import "../../css/authentication/Login.css";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { colorTheme } from "../../components/colorTheme/ColorTheme";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import { Link, useNavigate } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { AccountStore, APIStore, TokenStore } from "../../components/store/Store";
import Cookies from "js-cookie";

const Login = () => {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
  const [errorMsgPosition, setErrorMsgPosition] = useState(0);
  const token = TokenStore((state) => state.token);
  const updateToken = TokenStore((state) => state.updateToken);
  const MYAPI = APIStore((state) => state.MYAPI);
  const [isLoading, setIsLoading] = useState(false);
  const isUserLoggedIn = AccountStore(state => state.isUserLoggedIn);

  useEffect(() => {
    if (isUserLoggedIn) {
      navigate("/");
    }
  }, [isUserLoggedIn]);

  function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  const showErrorMsg = (msg, errorPostion) => {
    setErrorMsg(msg);
    setErrorMsgPosition(errorPostion);
    setIsLoading(false);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    setErrorMsg(null);
    setErrorMsgPosition(0);
    setIsLoading(true);

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
    formData.append("register", false);

    await axios
      .post(`${MYAPI}/authentication/account-list/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.error && res.data.account_not_exist) {
          toast.error("Invalid account credential!");
        } else if (
          res.data.error ||
          (res.data.login_failed && res.data.invalid_token)
        ) {
          toast.error("Something went wrong!");
        } else if (!res.data.error && res.data.login_success) {
          updateToken(res.data.token);
          Cookies.set("SID", res.data.token);
          setIsLoading(false);
          window.location.href = "/";
        }
        setIsLoading(false);
      })
      .catch((err) => console.error(err));
  }

  return (
    <div>
      <Container maxWidth="lg">
        <Toaster position="bottom-right" reverseOrder={false} />
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
                      loading={isLoading}
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
                    <Link to="/forgot-password/">
                      <Button
                        color="secondary"
                        style={{
                          fontSize: "0.83rem",
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
                      style={{
                        backgroundColor: `${colorTheme.palette.blue}`,
                        textTransform: "capitalize",
                      }}
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
