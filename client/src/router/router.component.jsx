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
    const { authUser } = this.props;
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
              path={`/${authUser.rolename.toLowerCase()}/manageusers`}
              component={ManageUsers}
              authUser={authUser}
            />
            <RestrictedRoute
              exact
              path={`/${authUser.rolename.toLowerCase()}/manageusers/new`}
              component={AddUser}
              authUser={authUser}
            />
          </Fragment>
        )}
      </Switch>
      </Fragment>
      
    );
  }
}

const mapStateToProps = ({ user }) => {
  const { authUser } = user;
  return { authUser };
};

export default withRouter(connect(mapStateToProps)(RouterApp));
