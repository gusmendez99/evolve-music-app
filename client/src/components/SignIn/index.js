import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import axios from "axios";

import * as actions from "../../redux/auth/auth.actions";
import * as selectors from "../../redux/root-reducer";

const SignIn = ({
  history,
  onSubmit,
  isLoading,
  error = null,
  isAuthenticated,
}) => {
  const [username, changeUsername] = useState("");
  const [password, changePassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(username + ", pw: " + password);
    onSubmit({ username, password });
    //this.props.history.push("/")
  };

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/"); // here it is
    }
  }, [isAuthenticated]);

  return (
    <Fragment>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <div className="mt3">
          <label className="db fw6 lh-copy f6">Username</label>
          <input
            className="pa2 input-reset ba bg-transparent w-100"
            onChange={(e) => changeUsername(e.target.value)}
            name="username"
            value={username}
          />
        </div>
        <div className="mv3">
          <label className="db fw6 lh-copy f6">Password</label>
          <input
            className="b pa2 input-reset ba bg-transparent w-100"
            type="password"
            name="password"
            onChange={(e) => changePassword(e.target.value)}
            value={password}
          />
        </div>
        <div>
          {isLoading ? (
            <strong>{"Cargando..."}</strong>
          ) : (
            <button
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
              type="submit"
            >
              {"Sign In"}
            </button>
          )}
        </div>
      </form>
      <div>
        <h5 className="red">{error}</h5>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  isLoading: selectors.getIsAuthenticating(state),
  error: selectors.getAuthenticatingError(state),
  isAuthenticated: selectors.isAuthenticated(state),
});

const mapDispatchToProps = (dispatch) => ({
  onSubmit(authUser) {
    dispatch(actions.startSignIn(authUser));
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignIn));
