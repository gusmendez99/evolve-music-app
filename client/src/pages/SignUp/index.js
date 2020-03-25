import React, { Component } from "react";
import CustomLink from "../../components/CustomLink";
import axios from "axios";

const CUSTOMER_ROLE = 5;

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      user: { roleid: CUSTOMER_ROLE }
    };
  }

  handleFieldChange = event => {
    const { name, value } = event.target;
    const copy = { ...this.state.user, [name]: value };
    this.setState({ user: copy });
  };

  handleSubmit = () => {
    axios({
      method: "post",
      url: `http://localhost:3000/users`,
      data: this.state.user
    }).then(response => console.log(response.status));
  };

  render() {
    return (
      <main className="pa4 black-80">
        <div className="measure center">
          <fieldset id="add_user" className="ba b--transparent ph0 mh0">
            <div className="flex justify-center items-center">
              <legend className="f4 fw6 ph0 mh0">Sign Up</legend>
            </div>
            <div className="mt3">
              <label className="db fw6 lh-copy f6">Username</label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="text"
                name="username"
                onChange={this.handleFieldChange}
              ></input>
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6">Password</label>
              <input
                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="password"
                name="password"
                onChange={this.handleFieldChange}
              ></input>
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6">First Name</label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="text"
                name="firstname"
                onChange={this.handleFieldChange}
              ></input>
            </div>
            <div className="mt3">
              <label className="db fw6 lh-copy f6">Last Name</label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="text"
                name="lastname"
                onChange={this.handleFieldChange}
              ></input>
            </div>
            <div className="mt3">
              <label className="db fw6 lh-copy f6">City</label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="text"
                name="city"
                onChange={this.handleFieldChange}
              ></input>
            </div>
            <div className="mt3">
              <label className="db fw6 lh-copy f6">State</label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="text"
                name="state"
                onChange={this.handleFieldChange}
              ></input>
            </div>
            <div className="mt3">
              <label className="db fw6 lh-copy f6">Country</label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="text"
                name="country"
                onChange={this.handleFieldChange}
              ></input>
            </div>
            <div className="mt3">
              <label className="db fw6 lh-copy f6">Postal Code</label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="text"
                name="postalcode"
                onChange={this.handleFieldChange}
              ></input>
            </div>
            <div className="mt3">
              <label className="db fw6 lh-copy f6">Phone Number</label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="text"
                name="phone"
                onChange={this.handleFieldChange}
              ></input>
            </div>
            <div className="mt3">
              <label className="db fw6 lh-copy f6">Email</label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="text"
                name="email"
                onChange={this.handleFieldChange}
              ></input>
            </div>
          </fieldset>
          <div className="tc">
            <CustomLink
              to={`/login`}
              className="b ph3 pv2 input-reset ba b--green green bg-transparent grow pointer f6 dib"
              onClick={this.handleSubmit}
            >
              Create my account
            </CustomLink>
          </div>
        </div>
      </main>
    );
  }
}

export default SignUp;
