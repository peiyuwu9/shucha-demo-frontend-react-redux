import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { clearError } from "../redux/ui/uiActions";
import { login } from "../redux/user/userActions";

import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

const Login = (props) => {
  const {
    clearError,
    history,
    login,
    ui: { loading, error },
  } = props;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email,
      password,
    };
    login(userData, history);
  };

  useEffect(() => {
    clearError();
  }, []);

  return (
    <div className="form-panel">
      <Typography variant="h5" className="form-title">
        Welcome back!
      </Typography>
      <form className="form" noValidate onSubmit={handleSubmit}>
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
          {loading ? <CircularProgress size={"1.5rem"} /> : "Login"}
        </Button>
        <br />
        <Typography variant="caption">
          Signup <Link to="/signup">here</Link> to join us!
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
  login,
};

Login.propTypes = {
  clearError: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  ui: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
