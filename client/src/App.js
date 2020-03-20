
import React, {Component} from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import RouterApp from './router/router.component.jsx';

import "tachyons";

class App extends Component {
  render(){
    return (
        <Router>
<<<<<<< HEAD
          <Route path="" component={RouterApp} />
=======
          <Nav currentUser={this.state.currentUser} />
          <Route exact path="/" component={HomePage} />
          <Route exact path="/login" component={SignInSignUpPage} />
          {/* modificar las rutas cuando ya se tenga el front end de los demas usuarios, por el moment
          / sera la ruta predeterminada para el admin */}

          <Route
            exact
            path={`/${this.state.currentUser.username}/manageusers`}
            render={props => (
              <ManageUsers {...props} currentUser={this.state.currentUser} />
            )}
          />
          <Route
            exact
            path={`/${this.state.currentUser.username}/manageusers/new`}
            render={props => <AddUser {...props} currentUser={this.state.currentUser}/>}
          />
>>>>>>> d5c415b0d20dff5171231950689ce124558c38ed
        </Router>
    );
  }
}

export default App;