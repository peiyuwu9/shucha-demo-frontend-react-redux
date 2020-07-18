import React, { useState } from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import PostDetail from "./PostDetail";

import { connect } from "react-redux";
import { getSinglePost } from "../redux/data/dataActions";
import { markNotificationsRead } from "../redux/user/userActions";

import Badge from "@material-ui/core/Badge";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = {
  notification: {
    textAlign: "center",
    marginBottom: 10,
  },
  notificationPaper: {
    padding: 10,
  },
};

const Notification = (props) => {
  const {
    classes,
    getSinglePost,
    markNotificationsRead,
    note: { sender, read, type, title, postId, createdAt, notificationId },
    user: {
      userDetails: { isAdmin },
    },
  } = props;

  const [open, setOpen] = useState(false);

  dayjs.extend(relativeTime);

  const handleOpenAndRead = () => {
    getSinglePost(postId);
    markNotificationsRead(notificationId);
    setOpen(true);
  };

  return (
    <div className={classes.notification}>
      <Badge
        color="secondary"
        invisible={read ? true : false}
        variant="dot"
        onClick={handleOpenAndRead}
      >
        <Paper
          elevation={3}
          className={classes.notificationPaper}
          onClick={handleOpenAndRead}
        >
          <Typography>
            {sender} {type === "like" ? "liked" : "commented"} on {title}{" "}
            {dayjs(createdAt).fromNow()}
          </Typography>
        </Paper>
      </Badge>
      <PostDetail isAdmin={isAdmin} open={open} setOpen={setOpen} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = {
  getSinglePost,
  markNotificationsRead,
};

Notification.propTypes = {
  getSinglePost: PropTypes.func.isRequired,
  markNotificationsRead: PropTypes.func.isRequired,
  note: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Notification));
