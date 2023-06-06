import React, { useState } from "react";
import { Button, TextField, Grid, Container, Typography } from "@mui/material";
import AuthDetails from "../../models/user/AuthDetails";
import { login, register } from "../../redux/reducers/AuthReducer";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const AuthenticationComponent: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [username, setUsername] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handlePasswordConfirmChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPasswordConfirm(event.target.value);
  };

  const validateData = () => {
    let valid = true;
    if (isLogin) {
      valid = !!email && !!password;
    } else {
      valid =
        !!email && !!password && password === passwordConfirm && !!username;
    }

    return valid;
  };

  const handleSubmit = async (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (!validateData()) {
      return;
    }
    let userData: AuthDetails = {
      email,
      password,
      username,
    };

    if (isLogin) {
      await dispatch(login(userData));
    } else {
      await dispatch(register(userData));
    }
    navigate("/discussions");
  };

  return (
    <Container
      maxWidth="sm"
      style={{ height: "100%", display: "flex", alignItems: "center" }}
    >
      <Grid
        container
        spacing={2}
        direction="column"
        alignItems="center"
        padding={"20px"}
        border={"1px solid #ccc"}
        borderRadius={"8px"}
      >
        <Grid item>
          <Typography variant="h4" component="h1" gutterBottom>
            Deck {isLogin ? "login" : "registration"}
          </Typography>
        </Grid>
        <Grid item style={{ paddingLeft: 0 }}>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              fullWidth
              margin="normal"
              required
            />
            {!isLogin && (
              <TextField
                label="Username"
                type="username"
                value={username}
                onChange={handleUsernameChange}
                fullWidth
                margin="normal"
                required
              />
            )}
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              fullWidth
              margin="normal"
              required
            />
            {!isLogin && (
              <TextField
                label="Password Confirm"
                type="password"
                value={passwordConfirm}
                onChange={handlePasswordConfirmChange}
                fullWidth
                margin="normal"
                required
              />
            )}
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Button variant="contained" color="primary" type="submit">
                  Sign In
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  variant="text"
                  color="secondary"
                  onClick={() => setIsLogin(!isLogin)}
                >
                  {!isLogin
                    ? "Already have an account?"
                    : "Don't have an account?"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AuthenticationComponent;
