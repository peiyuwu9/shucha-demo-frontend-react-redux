import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const AuthRoute = ({ component: Component, isLogin, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isLogin === true ? <Redirect to="/" /> : <Component {...props} />
    }
  />
);

const mapStateToProps = (state) => ({
  isLogin: state.user.isLogin,
});

AuthRoute.propTypes = {
  user: PropTypes.object,
};

export default connect(mapStateToProps)(AuthRoute);
