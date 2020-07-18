import React from "react";
import PropTypes from "prop-types";

import Notification from "../components/Notification";
import NotificationSkeleton from "../components/NotificationSkeleton";

import { connect } from "react-redux";

const Notifications = (props) => {
  const {
    user: { notifications },
  } = props;

  const notificationList = notifications.map((note) => (
    <Notification note={note} key={note.notificationId} />
  ));

  return (
    <>
      {notifications && notifications.length > 0 ? (
        <>{notificationList}</>
      ) : (
        <NotificationSkeleton />
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = {};

Notifications.propTypes = {
  user: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
