import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  Avatar,
  Button,
  Container,
  Grid,
  Icon,
  Paper,
  Typography,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
import env from 'react-dotenv';

import Input from './Input';
import { googleLogin, jwtSignIn, jwtSignUp } from '../../actions/authActions';

import useStyles from './AuthStyles';

const formDataInitialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const Auth = () => {
  const [showPassword, setshowPassword] = useState(false);
  const [isSignUp, setisSignUp] = useState(false);
  const [formData, setformData] = useState(formDataInitialState);

  const classes = useStyles();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: env.REACT_PUBLIC_GOOGLE_CLIENT_ID,
        scope: 'email',
      });
    }

    gapi.load('client:auth2', start);
  }, []);

  const handleShowPassword = () =>
    setshowPassword((prevShowPasswordState) => !prevShowPasswordState);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignUp) {
      dispatch(jwtSignUp(formData, navigate));
    } else {
      dispatch(jwtSignIn(formData, navigate));
    }
  };

  const handleChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };

  const switchMode = () => {
    setisSignUp((prevSIgnUpSTate) => !prevSIgnUpSTate);
    setshowPassword(false);
  };

  const googleFailureHandler = (error) => {
    console.log(error);
    console.log('Google LOGIN Failure');
  };

  const googleSuccessHandler = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    dispatch(googleLogin(result, token));

    navigate('/');
    window.location.reload();
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignUp ? 'Sign-up' : 'SignIn'}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignUp && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus={true}
                  half
                  type={'text'}
                ></Input>
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                  type={'text'}
                ></Input>
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            ></Input>
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? 'text' : 'password'}
              handleShowPassword={handleShowPassword}
            ></Input>
            {isSignUp && (
              <Input
                name="confirmPassword"
                label="Confirm Password"
                handleChange={handleChange}
                type={'password'}
              ></Input>
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </Button>
          <GoogleLogin
            clientId={env.REACT_PUBLIC_GOOGLE_CLIENT_ID}
            onSuccess={googleSuccessHandler}
            onFailure={googleFailureHandler}
            cookiePolicy="single_host_origin"
            render={(renderProps) => (
              <Button
                className={classes.googleButton}
                color="primary"
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<Icon />}
                variant="contained"
              >
                Google SIgnIn
              </Button>
            )}
          />
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignUp
                  ? 'Already have an account? Sign In'
                  : 'Dont have an account? SIgn Up'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
