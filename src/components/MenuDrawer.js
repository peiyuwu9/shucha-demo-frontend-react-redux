import React from "react";
import PropTypes from "prop-types";

import Logo from "../images/logo.svg";
import MenuButton from "./MenuButton";

import Badge from "@material-ui/core/Badge";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = {
  logoImage: {
    height: 40,
    margin: "0px auto",
  },
};

const MenuDrawer = (props) => {
  const {
    classes,
    isAdmin,
    isLogin,
    logout,
    open,
    setOpen,
    unreadCount,
    userName,
  } = props;

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    logout();
    setOpen(false);
  };

  return (
    <Drawer open={open} onClose={handleClose}>
      <List>
        {isLogin ? (
          <>
            <ListItem>
              <ListItemText>
                <a href="/">
                  <img src={Logo} alt="守茶" className={classes.logoImage} />
                </a>
              </ListItemText>
            </ListItem>
            <MenuButton handleClick={handleClose}>ABOUT US</MenuButton>
            <Divider />
            <ListItem>
              <ListItemText className="user-menu-name-tag">
                <p>HI, {isAdmin ? "ADMIN" : userName}</p>
              </ListItemText>
            </ListItem>
            {isAdmin ? (
              <MenuButton
                className="user-menu-button"
                to="/notifications"
                handleClick={handleClose}
              >
                <Badge
                  badgeContent={unreadCount}
                  invisible={unreadCount === 0 ? true : false}
                  color="error"
                >
                  NOTIFICATIONS
                </Badge>
              </MenuButton>
            ) : (
              <MenuButton
                className="user-menu-button"
                to="/user"
                handleClick={handleClose}
              >
                FAVORATES
              </MenuButton>
            )}
            <MenuButton
              className="user-menu-button"
              to="/"
              handleClick={handleLogout}
            >
              LOGOUT
            </MenuButton>
          </>
        ) : (
          <>
            <MenuButton handleClick={handleClose}>ABOUT US</MenuButton>
            <MenuButton
              className="user-menu-button"
              to="/signup"
              handleClick={handleClose}
            >
              SIGNUP
            </MenuButton>
            <MenuButton
              className="user-menu-button"
              to="/login"
              handleClick={handleClose}
            >
              LOGIN
            </MenuButton>
          </>
        )}
      </List>
    </Drawer>
  );
};

MenuDrawer.propTypes = {
  isAdmin: PropTypes.bool,
  isLogin: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  userName: PropTypes.string,
};

export default withStyles(styles)(MenuDrawer);
