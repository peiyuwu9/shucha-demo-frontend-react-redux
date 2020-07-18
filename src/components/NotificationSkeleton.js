import React from "react";
import PropTypes from "prop-types";

import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = {
  paper: {
    height: 44,
    width: 330,
    backgroundColor: "rgba(0,0,0, 0.4)",
    marginBottom: 10,
    marginLeft: "auto",
    marginRight: "auto",
  },
};

const NotificationSkeleton = (props) => {
  const { classes } = props;

  const content = Array.from({ length: 5 }).map((item, index) => (
    <Paper className={classes.paper} />
  ));
  return <>{content}</>;
};

NotificationSkeleton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NotificationSkeleton);
