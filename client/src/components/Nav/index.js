import React from "react";
import { Link } from "react-router-dom";
import {connect} from 'react-redux';


import * as actions from "../../redux/user/user.actions";

const Nav = ({ authUser, onSignOut }) => {
  return (
    <nav className="db dt-l w-100 border-box pa3 ph5-l">
      <Link
        className="db dtc-l v-mid mid-gray link dim w-100 w-25-l tc tl-l mb2 mb0-l"
        to="/"
        title="Home"
      >
        <img
          src="http://tachyons.io/img/logo.jpg"
          className="dib w2 h2 br-100"
          alt="Evolve"
        />
      </Link>
      <div className="db dtc-l v-mid w-100 w-75-l tc tr-l">
        {authUser && (
          <Link
            className="link dim dark-gray f6 f5-l dib mr3 mr4-l"
            to={`/${authUser.rolename.toLowerCase()}/stats`}
            title="Stats"
          >
            Statistics
          </Link>
        )}
        {authUser && (
          <Link
            className="link dim dark-gray f6 f5-l dib mr3 mr4-l"
            to={`/${authUser.rolename.toLowerCase()}/manageusers`}
            title="Users"
          >
            Users
          </Link>
        )}
        {authUser && (
          <Link
            className="link dim dark-gray f6 f5-l dib mr3 mr4-l"
            to={`/${authUser.rolename.toLowerCase()}/manageroles`}
            title="Roles"
          >
            Roles
          </Link>
        )}
        {authUser && (
          <Link
            className="link dim red f6 f5-l dib mr3 mr4-l "
            onClick={() => onSignOut()}
          >
            Sign Out
          </Link>
        )}
        {
          !authUser &&
          <Link
            className="link dim blue f6 f5-l dib mr3 mr4-l b"
            to="/login"
            title="Login"
          >
            Login
          </Link>
        }
      </div>
    </nav>
  );
};

const mapStateToProps = ({ user }) => {
  const { authUser } = user;
  return { authUser };
};

const mapDispatchToProps = dispatch => ({
  onSignOut() {
    dispatch(actions.userSignOutSuccess());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
