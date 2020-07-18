import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { likePost, unlikePost } from "../redux/data/dataActions";

import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import Tooltip from "@material-ui/core/Tooltip";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = {
  favIcon: {
    "& :hover": {
      cursor: "pointer",
    },
  },
};

const LikePost = (props) => {
  const {
    classes,
    likePost,
    unlikePost,
    postId,
    user: { isLogin, likes },
  } = props;

  const isPostLiked = (postId) => {
    if (likes.length > 0) {
      for (let i = 0; i < likes.length; i++) {
        if (likes[i].postId === postId) return true;
      }
      return false;
    } else return false;
  };

  const handleLike = () => {
    likePost(postId);
  };

  const handleUnlike = () => {
    unlikePost(postId);
  };

  return !isLogin ? (
    <Link to="/login">
      <span className={classes.favIcon}>
        <Tooltip title="Like Me" placement="bottom">
          <FavoriteBorderIcon />
        </Tooltip>
      </span>
    </Link>
  ) : isPostLiked(postId) ? (
    <span className={classes.favIcon} onClick={handleUnlike}>
      <Tooltip title="Don't Unlike Me" placement="bottom">
        <FavoriteIcon />
      </Tooltip>
    </span>
  ) : (
    <span className={classes.favIcon} onClick={handleLike}>
      <Tooltip title="Like Me" placement="bottom">
        <FavoriteBorderIcon />
      </Tooltip>
    </span>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = {
  likePost,
  unlikePost,
};

LikePost.propTypes = {
  classes: PropTypes.object.isRequired,
  likePost: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired,
  unlikePost: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(LikePost));
