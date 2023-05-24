import React, { useState } from 'react';
import { Button, TextField, Grid, Container, Typography } from '@mui/material';
import AuthDetails from '../../models/user/AuthDetails';
import { registerRequest } from '../../services/authentication/AuthenticationService';
import { login, register } from '../../redux/reducers/AuthReducer';
import { useDispatch, useSelector } from 'react-redux';

const AuthenticationComponent: React.FC = () => {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.token?.accessToken);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [username, setUsername] = useState('');
    const [isLogin, setIsLogin] = useState(true);
  
    const handleEmailChange = (event) => {
      setEmail(event.target.value);
    };

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };
  
    const handlePasswordChange = (event) => {
      setPassword(event.target.value);
    };
  
    const handlePasswordConfirmChange = (event) => {
        setPasswordConfirm(event.target.value);
    };

    const validateData = () => {
        let valid = true;
        if (isLogin) {
            valid = !!email && !!password;
        } else {
            valid = !!email && !!password && (password === passwordConfirm) && !!username;
        }

        return valid;
    }
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      if (!validateData()) {
        return;
      }
      let userData: AuthDetails = {
        email,
        password,
        username
      }

      if (isLogin) {
        dispatch(login(userData));
      } else {
        dispatch(register(userData))
      }
    };
  
    return (
        <Container maxWidth="sm" style={{ height: '100%', display: "flex", alignItems: "center" }}>
        <Grid
          container
          spacing={2}
          direction="column"
          justify="center"
          alignItems="center"
          padding={"20px"}
          border={'1px solid #ccc'}
          borderRadius={'8px'}
        >
          <Grid item>
            <Typography variant="h4" component="h1" gutterBottom>
                Deck {token ? token : "no token"}
            </Typography>
          </Grid>
          <Grid item style={{paddingLeft: 0}}>
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
              {
                !isLogin && <TextField
                    label="Username"
                    type="username"
                    value={username}
                    onChange={handleUsernameChange}
                    fullWidth
                    margin="normal"
                    required
                />
              }
              <TextField
                label="Password"
                type="password"
                value={password}
                onChange={handlePasswordChange}
                fullWidth
                margin="normal"
                required
              />
              {
                !isLogin && <TextField
                    label="Password Confirm"
                    type="password"
                    value={passwordConfirm}
                    onChange={handlePasswordConfirmChange}
                    fullWidth
                    margin="normal"
                    required
                />
              }
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Button variant="contained" color="primary" type="submit">
                    Sign In
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button variant="text" color="secondary" onClick={() => setIsLogin(!isLogin)}>
                    { !isLogin ? "Already have an account?" : "Don't have an account?"}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Container>
    );

}

export default AuthenticationComponent;