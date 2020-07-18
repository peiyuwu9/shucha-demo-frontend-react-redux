import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { clearError } from "../redux/ui/uiActions";
import { uploadSinglePost } from "../redux/data/dataActions";

import AddCircleIcon from "@material-ui/icons/AddCircle";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = {};

const AddNewPost = (props) => {
  const {
    classes,
    clearError,
    uploadSinglePost,
    ui: { loading, error },
  } = props;

  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    clearError();
    setTitle("");
    setPrice("");
    setOpen(false);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = document.forms.namedItem("itemInfo");
    const formData = new FormData(form);
    uploadSinglePost(formData);
  };

  useEffect(() => {
    if (loading === false && Object.keys(error).length === 0) handleClose();
  }, [loading, error]);

  return (
    <Grid item xs={12} sm={4} md={3} className={classes.addItem}>
      <IconButton
        color="inherit"
        aria-label="add"
        className={classes.addIcon}
        onClick={handleOpen}
      >
        <AddCircleIcon fontSize="large" />
      </IconButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Add New Item</DialogTitle>
        <DialogContent>
          <form encType="multipart/form-data" name="itemInfo">
            <TextField
              autoComplete="off"
              className="text-field"
              error={error.title ? true : false}
              fullWidth
              helperText={error.title}
              id="title"
              label="Title"
              name="title"
              type="text"
              value={title}
              onChange={handleTitleChange}
            />
            <TextField
              autoComplete="off"
              className="text-field"
              error={error.price ? true : false}
              fullWidth
              helperText={error.price}
              id="price"
              label="Price"
              name="price"
              type="text"
              value={price}
              onChange={handlePriceChange}
            />
            <label>Image Upload</label>
            <br />
            <input id="image" name="image" type="file" />
            {error.error && (
              <Typography variant="body2" color="error">
                {error.error}
              </Typography>
            )}
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            className="form-button"
            disable={loading ? 1 : 0}
            type="submit"
            onClick={handleSubmit}
          >
            {loading ? <CircularProgress size={"1.5rem"} /> : "Submit"}
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  ui: state.ui,
});

const mapDispatchToProps = {
  clearError,
  uploadSinglePost,
};

AddNewPost.propTypes = {
  classes: PropTypes.object.isRequired,
  clearError: PropTypes.func.isRequired,
  uploadSinglePost: PropTypes.func.isRequired,
  ui: PropTypes.object.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(AddNewPost));
