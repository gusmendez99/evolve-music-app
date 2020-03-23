import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";
import { Redirect, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

//Pages
import HomePage from "../pages/home/home.component";
import SignInSignUpPage from "../pages/sign-in-and-sign-up/sign-in-and-sign-up.component";

//Components
import Nav from "../components/Nav";
import ManageUsers from "../components/ManageUsers";
import AddUser from "../components/AddUser";
import ManageRoles from "../components/ManageRoles";
import ManageArtists from '../components/manage-artists/manage-artists.component'
import AddArtist from '../components/add-artist/add-artist.component'
import ManageAlbums from '../components/manage-albums/manage-albums.component'
import AddAlbum from '../components/add-album/add-album.component'
import ManageTracks from '../components/manage-tracks/manage-tracks.component'
import AddTrack from '../components/add-track/add-track.component'
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
