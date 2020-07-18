import React, { useState } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { deletePost } from "../redux/data/dataActions";

import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";

const AddingBox = (props) => {
  const { deletePost, postId } = props;

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    deletePost(postId);
    setOpen(false);
  };

  return (
    <>
      <Button
        color="secondary"
        fullWidth={true}
        startIcon={<DeleteIcon />}
        variant="contained"
        onClick={handleOpen}
      >
        DELETE
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Are you sure if you want to delete this item?</DialogTitle>
        <DialogActions>
          <Button onClick={handleDelete} color="secondary">
            Delete
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  deletePost,
};

AddingBox.propTypes = {
  deletePost: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddingBox);
