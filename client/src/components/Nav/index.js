import React from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';

import * as actions from "../../redux/auth/auth.actions";
import * as selectors from '../../redux/root-reducer'

const Nav = ({ authUser, permissions, onSignOut }) => {
  return (
    <nav className="db dt-l w-100 border-box pa3 ph5-l">
      <Link
        className="db dtc-l v-mid mid-gray link dim w-100 w-25-l tc tl-l mb2 mb0-l"
        to="/"
        title="Home"
      >
        <img
          src="https://www.buythelogo.com/wp-content/uploads/2019/03/Letter-E-geometric-line-abstract-shape-logo-vector.jpg"
          className="dib w2 h2 br-100"
          alt="Evolve"
        />
      </Link>
      <div className="db dtc-l v-mid w-100 w-75-l tc tr-l">
        {authUser && permissions.canGenerateReport && (
          <Link
            className="link dim dark-gray f6 f5-l dib mr3 mr4-l"
            to={`/${authUser.rolename}/stats`}
            title="Stats"
          >
            Statistics
          </Link>
        )}

        {authUser && permissions.isAdmin && (
          <Link
            className="link dim dark-gray f6 f5-l dib mr3 mr4-l"
            to={`/${authUser.rolename}/logbook`}
            title="LogBook"
          >
            LogBook
          </Link>
        )}

        {authUser && permissions.canReadArtist && (
          <Link
            className="link dim dark-gray f6 f5-l dib mr3 mr4-l"
            to={`/${authUser.rolename}/manageartists`}
            title="Artists"
          >
            Artists
          </Link>
        )}

        {authUser && permissions.canReadAlbum && (
          <Link
            className="link dim dark-gray f6 f5-l dib mr3 mr4-l"
            to={`/${authUser.rolename}/managealbums`}
            title="Albums"
          >
            Albums
          </Link>
        )}

        {authUser && permissions.canReadTrack && (
          <Link
            className="link dim dark-gray f6 f5-l dib mr3 mr4-l"
            to={`/${authUser.rolename}/managetracks`}
            title="Tracks"
          >
            Tracks
          </Link>
        )}

        {authUser && permissions.isAdmin && (
          <Link
            className="link dim dark-gray f6 f5-l dib mr3 mr4-l"
            to={`/${authUser.rolename}/manageusers`}
            title="Users"
          >
            Users
          </Link>
        )}
        {authUser && permissions.isAdmin && (
          <Link
            className="link dim dark-gray f6 f5-l dib mr3 mr4-l"
            to={`/${authUser.rolename}/manageroles`}
            title="Roles"
          >
            Roles
          </Link>
        )}
        {authUser && permissions.isCustomer && (
          <Link
            className="link dim dark-gray f6 f5-l dib mr3 mr4-l"
            to={`/checkout`}
            title="CheckOut"
          >
            Check Out
          </Link>
        )}
        {authUser && permissions.isCustomer && (
          <Link
            className="link dim dark-gray f6 f5-l dib mr3 mr4-l"
            to={`/store`}
            title="Store"
          >
            Store
          </Link>
        )}
        {authUser && permissions.isCustomer && (
          <Link
            className="link dim dark-gray f6 f5-l dib mr3 mr4-l"
            to={`/my-tracks`}
            title="My Tracks"
          >
            My Tracks
          </Link>
        )}
        
        {authUser && (
          <span
            style={{ cursor: "pointer" }}
            className="link dim red f6 f5-l dib"
            onClick={() => onSignOut()}
          >
            Sign Out
          </span>
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

const mapStateToProps = (state) => ({
  authUser: selectors.getAuthUser(state),
  permissions: selectors.getAuthUserPermissions(state)
});

const mapDispatchToProps = dispatch => ({
  onSignOut() {
    dispatch(actions.completeSignOut());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
