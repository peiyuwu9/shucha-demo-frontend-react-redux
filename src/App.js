import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import axios from "axios";
import jwtDecode from "jwt-decode";

// Components
import AuthRoute from "./util/AuthRoute";
import Navbar from "./components/Navbar";

// Pages
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import UserFavorates from "./pages/UserFavorates";
import Notifications from "./pages/Notifications";

// Redux
import { Provider } from "react-redux";
import store from "./redux/store";
import { LOGIN_USER } from "./redux/user/userTypes";
import { getUserData, logout } from "./redux/user/userActions";

import {
  ThemeProvider,
  unstable_createMuiStrictModeTheme,
} from "@material-ui/core/styles";

axios.defaults.baseURL =
  "https://us-central1-shucha-d15b8.cloudfunctions.net/api";

const FBIdToken = localStorage.FBIdToken;

if (FBIdToken) {
  const decodedToken = jwtDecode(FBIdToken);
  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.clear();
    store.dispatch(logout());
    window.location.href = "/login";
  } else {
    store.dispatch({ type: LOGIN_USER });
    axios.defaults.headers.common["Authorization"] = FBIdToken;
    store.dispatch(getUserData());
  }
}

const theme = unstable_createMuiStrictModeTheme();

function App() {
  return (
    <div className="App">
      <React.StrictMode>
        <ThemeProvider theme={theme}>
          <Provider store={store}>
            <Router>
              <Navbar />
              <div className="container">
                <Switch>
                  <Route exact path="/" component={Home} />
                  <AuthRoute exact path="/login" component={Login} />
                  <AuthRoute exact path="/signup" component={Signup} />
                  <Route exact path="/user" component={UserFavorates} />
                  <Route
                    exact
                    path="/notifications"
                    component={Notifications}
                  />
                </Switch>
              </div>
            </Router>
          </Provider>
        </ThemeProvider>
      </React.StrictMode>
    </div>
  );
}

export default App;
