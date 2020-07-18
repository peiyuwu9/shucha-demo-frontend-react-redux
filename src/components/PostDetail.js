import React from "react";
import PropTypes from "prop-types";

import Comments from "./Comments";
import CommentForm from "./CommentForm";
import DeletePost from "./DeletePost";
import LikePost from "./LikePost";
import PostDetailSkeleton from "./PostDetailSkeleton";

import { connect } from "react-redux";
import { clearError } from "../redux/ui/uiActions";
import { clearPost } from "../redux/data/dataActions";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Grid from "@material-ui/core/Grid";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import Typography from "@material-ui/core/Typography";

const PostDetail = (props) => {
  const {
    clearError,
    clearPost,
    data: {
      loadingSinglePost,
      post: {
        title,
        price,
        imageUrl,
        likeCount,
        commentCount,
        comments,
        postId,
      },
    },
    isAdmin,
    open,
    setOpen,
    user: { isLogin },
  } = props;

  const handleClose = () => {
    clearPost();
    clearError();
    setOpen(false);
  };

  return (
    <Dialog
      className="post-detail"
      open={open}
      onClose={handleClose}
      fullWidth={true}
      maxWidth={false}
    >
      {loadingSinglePost ? (
        <PostDetailSkeleton />
      ) : (
        <DialogContent>
          <Grid container>
            <Grid item xs={12} sm={4} md={3}>
              <div className="detail-post-card">
                <img
                  src={imageUrl}
                  alt={title}
                  className="detail-post-image"
                  title={title}
                />

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
              </div>
            </Grid>
            <Grid item xs={12} sm={8} md={9}>
              <Typography variant="body2">
                See below {commentCount} comments
              </Typography>
              <Comments comments={comments} />
              {isLogin && (
                <>
                  <Typography variant="body2">
                    Leave your comments here...
                  </Typography>
                  <CommentForm postId={postId} />
                </>
              )}
            </Grid>
          </Grid>
        </DialogContent>
      )}
    </Dialog>
  );
};

const mapStateToProps = (state) => ({
  data: state.data,
  user: state.user,
});

const mapDispatchToProps = {
  clearError,
  clearPost,
};

PostDetail.propTypes = {
  clearError: PropTypes.func.isRequired,
  clearPost: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  isAdmin: PropTypes.bool,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);
