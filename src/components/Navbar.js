import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import Logo from "../images/logo.svg";
import MenuDrawer from "./MenuDrawer";

import { connect } from "react-redux";
import { logout } from "../redux/user/userActions";

import AppBar from "@material-ui/core/AppBar";
import Badge from "@material-ui/core/Badge";
import Button from "@material-ui/core/Button";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import IconButton from "@material-ui/core/IconButton";
import LoyaltyIcon from "@material-ui/icons/Loyalty";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = {
  root: {
    flexGrow: 1,
  },
  navbar: {
    position: "relative",
  },
  logoImage: {
    position: "absolute",
    height: 40,
    zIndex: 1,
  },
  menuButton: {
    marginRight: 10,
  },
  space: {
    flexGrow: 1,
  },
};

const Navbar = (props) => {
  const {
    classes,
    logout,
    user: {
      isLogin,
      userDetails: { userName, isAdmin },
      notifications,
    },
  } = props;

  const [open, setOpen] = useState(false);

  const countUnreadNotification = (notifications) => {
    let unreadCount = 0;
    if (notifications.length > 0) {
      for (let i = 0; i < notifications.length; i++) {
        if (notifications[i].read === false) unreadCount++;
        else return unreadCount;
      }
    } else return 0;
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div className={classes.root}>
      <AppBar color="transparent" className={classes.navbar}>
        <a href="/">
          <img src={Logo} alt="守茶" className={classes.logoImage} />
        </a>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={handleOpen}
          >
            <MenuIcon />
          </IconButton>
          <MenuDrawer
            logout={logout}
            isAdmin={isAdmin}
            isLogin={isLogin}
            open={open}
            setOpen={setOpen}
            userName={userName}
            unreadCount={isAdmin && countUnreadNotification(notifications)}
          />
          <div className={classes.space}></div>
          {isLogin ? (
            <>
              <p className="user-name-tag">
                HI, {isAdmin ? "ADMIN" : userName}
              </p>
              {isAdmin ? (
                <Tooltip title="Notification" placement="bottom">
                  <IconButton
                    className="user-button"
                    color="inherit"
                    component={Link}
                    to="/notifications"
                  >
                    <Badge
                      badgeContent={
                        isAdmin && countUnreadNotification(notifications)
                      }
                      invisible={
                        isAdmin && countUnreadNotification(notifications) === 0
                          ? true
                          : false
                      }
                      color="error"
                    >
                      <NotificationsIcon />
                    </Badge>
                  </IconButton>
                </Tooltip>
              ) : (
                <Tooltip title="Favorate Items" placement="bottom">
                  <IconButton
                    className="user-button"
                    color="inherit"
                    component={Link}
                    to="/user"
                  >
                    <LoyaltyIcon />
                  </IconButton>
                </Tooltip>
              )}
              <Tooltip title="Logout" placement="bottom">
                <IconButton
                  className="user-button"
                  color="inherit"
                  aria-label="logout"
                  component={Link}
                  to="/"
                  onClick={logout}
                >
                  <ExitToAppIcon />
                </IconButton>
              </Tooltip>
            </>
          ) : (
            <>
              <Button
                className="user-button"
                color="inherit"
                component={Link}
                to="/signup"
              >
                Signup
              </Button>
              <Button
                className="user-button"
                color="inherit"
                component={Link}
                to="/login"
              >
                Login
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = {
  logout,
};

Navbar.propTypes = {
  classes: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Navbar));
