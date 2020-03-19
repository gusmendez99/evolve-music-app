import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

//Pages
import HomePage from "./pages/home/home.component";
import SignInSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';

//Components
import Nav from "./components/Nav";
import ManageUsers from "./components/ManageUsers";
import AddUser from "./components/AddUser";

import "tachyons";

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: {}
    };
  }
  componentDidMount() {
    fetch("http://localhost:3000/users/1")
      .then(response => response.json())
      .then(data => {
        this.setState({ currentUser: data[0] });
      });
  }
  render() {
    return (
      <div className="wrapper">
        <Router>
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
            render={props => <AddUser {...props} />}
          />

          
        </Router>        
      </div>
    );
  }
}

export default App;
