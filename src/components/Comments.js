import React from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import Typography from "@material-ui/core/Typography";

const Comments = (props) => {
  const { comments } = props;

  dayjs.extend(relativeTime);

  const listComments = comments.map((comment, index) => (
    <div key={index}>
      <Typography variant="body2">
        {comment.userName} posted {dayjs(comment.createdAt).fromNow()}
      </Typography>
      <Typography>{comment.body}</Typography>
    </div>
  ));

  return <>{listComments}</>;
};

Comments.propTypes = {
  comments: PropTypes.array.isRequired,
};

export default Comments;
