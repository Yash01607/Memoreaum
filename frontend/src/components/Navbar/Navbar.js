import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core';

import decode from 'jwt-decode';

import useStyles from './NavbarStyles';

import Memoreaum from '../../Images/Memoreaum.png';
import { logoutAction } from '../../actions/authActions';

import userDetails from '../Auth/userDetails';

const Navbar = () => {
  const classes = useStyles();

  const user = userDetails;

  // const userInfoFromSTate = useSelector(
  //   (state) => state.googleAuthSuccessBackendSave?.authData
  // );

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const location = useLocation();

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) {
        dispatch(logoutAction());
      }
    }
  }, [user, dispatch, navigate, location]);

  const logouthandler = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      dispatch(logoutAction(navigate));
    }
  };

  return (
    <AppBar
      className={classes.appBar}
      position="static"
      color="inherit"
      // maxWidth="xl"
    >
      <div className={classes.brandContainer}>
        <Typography
          component={Link}
          to="/"
          className={classes.heading}
          variant="h2"
          align="center"
        >
          Memoreaum
        </Typography>
        <img className={classes.image} src={Memoreaum} alt="icon" height="60" />
      </div>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user.result.name}
              src={user.result.imageUrl}
            >
              {user.result.name.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {user.result.name}
            </Typography>
            <Button
              variant="contained"
              className={classes.logout}
              color="secondary"
              onClick={logouthandler}
            >
              logout
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
          >
            Sign-In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
