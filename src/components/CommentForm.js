import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { clearError } from "../redux/ui/uiActions";
import { submitComment } from "../redux/data/dataActions";

import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import TextField from "@material-ui/core/TextField";

const CommentForm = (props) => {
  const {
    clearError,
    postId,
    submitComment,
    ui: { loading, error },
  } = props;

  const [body, setBody] = useState("");

  const handleBodyChange = (e) => {
    setBody(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitComment(postId, { body: body });
    setBody("");
  };

  useEffect(() => {
    clearError();
  }, []);

  return (
    <form className="form" noValidate onSubmit={handleSubmit}>
      <TextField
        autoComplete="off"
        className="text-field"
        error={error.error ? true : false}
        fullWidth
        helperText={error.error}
        id="body"
        label="Comment"
        name="body"
        type="text"
        value={body}
        onChange={handleBodyChange}
      />
      <Button
        className="form-button"
        disable={loading ? 1 : 0}
        type="submit"
        variant="outlined"
      >
        {loading ? <CircularProgress size={"1.5rem"} /> : "Submit"}
      </Button>
    </form>
  );
};

const mapStateToProps = (state) => ({
  ui: state.ui,
});

const mapDispatchToProps = {
  clearError,
  submitComment,
};

CommentForm.propTypes = {
  clearError: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired,
  submitComment: PropTypes.func.isRequired,
  ui: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm);
