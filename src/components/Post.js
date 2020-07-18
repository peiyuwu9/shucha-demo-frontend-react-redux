import React, { useState } from "react";
import PropTypes from "prop-types";

import DeletePost from "./DeletePost";
import LikePost from "./LikePost";
import PostDetail from "./PostDetail";

import { connect } from "react-redux";
import { getSinglePost } from "../redux/data/dataActions";

import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import Typography from "@material-ui/core/Typography";

const Post = (props) => {
  const {
    getSinglePost,
    isAdmin,
    post: { title, price, imageUrl, likeCount, postId },
  } = props;

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    getSinglePost(postId);
    setOpen(true);
  };

  return (
    <Card>
      <CardMedia image={imageUrl} title={title} onClick={handleOpen} />
      <CardContent>
        <Typography variant="body2">{title}</Typography>
        <Typography variant="body2">{`$${price}`}</Typography>
        {isAdmin ? (
          <DeletePost postId={postId} />
        ) : (
          <>
            <Typography variant="body2">
              {likeCount}
              <LikePost postId={postId} />
            </Typography>
            <Button
              fullWidth={true}
              startIcon={<ShoppingCartOutlinedIcon />}
              variant="outlined"
            >
              BUY TEA
            </Button>
          </>
        )}
        <PostDetail isAdmin={isAdmin} open={open} setOpen={setOpen} />
      </CardContent>
    </Card>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  getSinglePost,
};

Post.propTypes = {
  getSinglePost: PropTypes.func.isRequired,
  isAdmin: PropTypes.bool,
  post: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
