import React, { Fragment } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import axios from "axios";

import * as actions from "../../redux/user/user.actions";

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      errorMessage: ""
    };
  }

  handleSubmit = async event => {
    event.preventDefault();
    const { onLoginSuccess } = this.props;
    const { username, password } = this.state;
    console.log(this.state);

    axios
      .post("http://localhost:3000/login", {
        username,
        password
      })
      .then(res => {
        console.log(res);
        if (res.data[0]) {

          const userAuth = res.data[0];

          axios
            .get(`http://localhost:3000/roles/${userAuth.roleid}/permissions`)
            .then(res => {
              if (res.data.length !== 0) {
                onLoginSuccess(userAuth, res.data);
                this.props.history.push("/");
              }
            })
            .catch(error => {
              console.log(error);
              this.setState({ errorMessage: error });
            });
        } else {
          this.setState({ errorMessage: "User doesn't exist, try again..." });
        }
      })
      .catch(error => {
        console.log(error);
        this.setState({ errorMessage: error });
      });
  };

  handleChange = event => {
    const { value, name } = event.target;

    this.setState({ [name]: value });
  };

  render() {
    return (
      <Fragment>
        <h2>Sign In</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="mt3">
            <label className="db fw6 lh-copy f6">Username</label>
            <input
              className="pa2 input-reset ba bg-transparent w-100"
              onChange={this.handleChange}
              name="username"
              value={this.state.username}
            />
          </div>
          <div className="mv3">
            <label className="db fw6 lh-copy f6">Password</label>
            <input
              className="b pa2 input-reset ba bg-transparent w-100"
              type="password"
              name="password"
              onChange={this.handleChange}
              value={this.state.password}
            />
          </div>
          <div>
            <button
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
              type="submit"
            >
              Sign In
            </button>
          </div>
        </form>
        <div>
          <h5 className="red">{this.state.errorMessage}</h5>
        </div>

        
      </Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  onLoginSuccess(authUser, permissions) {
    dispatch(actions.userSignInSuccess(authUser, permissions));
  }
});

export default withRouter(connect(undefined, mapDispatchToProps)(SignIn));
