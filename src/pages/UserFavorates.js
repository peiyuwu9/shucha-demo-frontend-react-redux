import React from "react";
import PropTypes from "prop-types";

import Post from "../components/Post";

import { connect } from "react-redux";

import Grid from "@material-ui/core/Grid";

const UserFavorates = (props) => {
  const {
    user: {
      userDetails: { isAdmin },
      likes,
    },
  } = props;

  const FavoratePosts = likes.map((post) => (
    <Grid item xs={6} sm={4} md={3} key={post.postId}>
      <Post post={post} isAdmin={isAdmin} />
    </Grid>
  ));

  return <Grid container>{FavoratePosts}</Grid>;
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = {};

UserFavorates.propTypes = {
  user: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserFavorates);
