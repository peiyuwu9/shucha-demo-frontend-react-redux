import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { clearError } from "../redux/ui/uiActions";
import { signup } from "../redux/user/userActions";

import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

const Signup = (props) => {
  const {
    clearError,
    history,
    signup,
    ui: { loading, error },
  } = props;

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUserData = {
      userName,
      email,
      password,
      confirmPassword,
    };
    signup(newUserData, history);
  };

  useEffect(() => {
    clearError();
  }, []);

  return (
    <div className="form-panel">
      <Typography variant="h5" className="form-title">
        Thanks for join us!
      </Typography>
      <form className="form" noValidate onSubmit={handleSubmit}>
        <TextField
          autoComplete="off"
          className="text-field"
          error={error.userName ? true : false}
          fullWidth
          helperText={error.userName}
          id="userName"
          label="Your Name"
          name="userName"
          type="text"
          value={userName}
          onChange={handleUserNameChange}
        />
        <TextField
          autoComplete="off"
          className="text-field"
          error={error.email ? true : false}
          fullWidth
          helperText={error.email}
          id="email"
          label="Email"
          name="email"
          type="email"
          value={email}
          onChange={handleEmailChange}
        />
        <TextField
          autoComplete="off"
          className="text-field"
          error={error.password ? true : false}
          fullWidth
          helperText={error.password}
          id="password"
          label="Password"
          name="password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <TextField
          autoComplete="off"
          className="text-field"
          error={error.confirmPassword ? true : false}
          fullWidth
          helperText={error.confirmPassword}
          id="confirmPassword"
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
        />
        {error.error && (
          <Typography variant="body2" color="error">
            {error.error}
          </Typography>
        )}
        <Button
          className="form-button"
          disable={loading ? 1 : 0}
          type="submit"
          variant="outlined"
        >
          {loading ? (
            <CircularProgress size={"1.5rem"} className="progress" />
          ) : (
            "Signup"
          )}
        </Button>
        <br />
        <Typography variant="caption">
          Already been one of us? Login <Link to="/login">here</Link>!
        </Typography>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  ui: state.ui,
});

const mapDispatchToProps = {
  clearError,
  signup,
};

Signup.propTypes = {
  clearError: PropTypes.func.isRequired,
  signup: PropTypes.func.isRequired,
  ui: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
