import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";
import { Redirect, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

//Pages
import HomePage from "../pages/Home";
import SignInSignUpPage from "../pages/SignInAndSignUp";

//Components
import Nav from "../components/Nav";
import ManageUsers from "../components/ManageUsers";
import AddUser from "../components/AddUser";
import ManageRoles from "../components/ManageRoles";
import ManageArtists from '../components/ManageArtists'
import AddArtist from '../components/AddArtist'
import ManageAlbums from '../components/ManageAlbums'
import AddAlbum from '../components/AddAlbum'
import ManageTracks from '../components/ManageTracks'
import AddTrack from '../components/AddTrack'
import Statistics from "../components/Statistics";

const RestrictedRoute = ({ component: Component, authUser, ...props }) => (
  <Route
    {...props}
    render={props =>
      authUser ? <Component {...props} /> : <Redirect to="/" />
    }
  />
);

class RouterApp extends React.Component {

  render() {
    const { authUser, permissions } = this.props;
    return (
      <Fragment>
      <Nav authUser={authUser}/>
      <Switch>
        
        <Route exact path="/" component={HomePage} />
        <Route exact path="/login"  component={SignInSignUpPage} />
        {authUser && (
          <Fragment>
            <RestrictedRoute
              exact
              path={`/${authUser.rolename}/stats`}
              component={Statistics}
              authUser={authUser}
            />

            <RestrictedRoute
              exact
              path={`/${authUser.rolename}/manageartists`}
              component={ManageArtists}
              authUser={authUser}
            />
            <RestrictedRoute
              exact
              path={`/${authUser.rolename}/manageartists/new`}
              component={AddArtist}
              authUser={authUser}
            />

            <RestrictedRoute
              exact
              path={`/${authUser.rolename}/managealbums`}
              component={ManageAlbums}
              authUser={authUser}
            />
            <RestrictedRoute
              exact
              path={`/${authUser.rolename}/managealbums/new`}
              component={AddAlbum}
              authUser={authUser}
            />

            <RestrictedRoute
              exact
              path={`/${authUser.rolename}/managetracks`}
              component={ManageTracks}
              authUser={authUser}
            />
            <RestrictedRoute
              exact
              path={`/${authUser.rolename}/managetracks/new`}
              component={AddTrack}
              authUser={authUser}
            />

            <RestrictedRoute
              exact
              path={`/${authUser.rolename}/manageusers`}
              component={ManageUsers}
              authUser={authUser}
            />
            <RestrictedRoute
              exact
              path={`/${authUser.rolename}/manageusers/new`}
              component={AddUser}
              authUser={authUser}
            />

            <RestrictedRoute
              exact
              path={`/${authUser.rolename}/manageroles`}
              component={ManageRoles}
              authUser={authUser}
            />

          </Fragment>
        )}
        <Redirect to="/" />
      </Switch>
      </Fragment>
      
    );
  }
}

const mapStateToProps = ({ user }) => {
  const { authUser, permissions } = user;
  return { authUser, permissions };
};

export default withRouter(connect(mapStateToProps)(RouterApp));
