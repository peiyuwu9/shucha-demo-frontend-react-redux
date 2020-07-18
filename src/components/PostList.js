import React, { useEffect } from "react";
import PropTypes from "prop-types";

import AddNewPost from "./AddNewPost";
import Post from "./Post";
import PostSkeleton from "./PostSkeleton";

import { connect } from "react-redux";
import { getAllPosts } from "../redux/data/dataActions";

import Grid from "@material-ui/core/Grid";

const PostList = (props) => {
  const {
    getAllPosts,
    data: { loadingAllPosts, posts },
    user: {
      loading,
      userDetails: { isAdmin },
    },
  } = props;

  const listPosts = posts.map((post) => (
    <Grid item xs={6} sm={4} md={3} key={post.postId}>
      <Post post={post} isAdmin={isAdmin} />
    </Grid>
  ));

  const isPostExist =
    loadingAllPosts || loading ? (
      <PostSkeleton />
    ) : isAdmin ? (
      <>
        <AddNewPost />
        {listPosts}
      </>
    ) : (
      <>{listPosts}</>
    );

  useEffect(() => {
    getAllPosts();
  }, []);

  return <Grid container>{isPostExist}</Grid>;
};

const mapStateToProps = (state) => ({
  data: state.data,
  user: state.user,
});

const mapDispatchToProps = {
  getAllPosts,
};

PostList.propTypes = {
  getAllPosts: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
