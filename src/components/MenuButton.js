import React from "react";

import { Link } from "react-router-dom";

import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const MenuButton = (props) => {
  const { className, to, handleClick, children } = props;
  return (
    <ListItem
      button
      className={className}
      component={Link}
      to={to}
      onClick={handleClick}
    >
      <ListItemText>{children}</ListItemText>
    </ListItem>
  );
};

export default MenuButton;
