import React, { Fragment } from "react";

import SignIn from "../../components/SignIn";
import SignUp from "../../components/SignUp";

import "./styles.css";

class SignInSignUpPage extends React.Component {
  render() {
    console.log("Rendering Login Page");
    return (
      <Fragment>
        <div className="sign-in-sign-up-container">
          <div className="fl w-50">
            <SignIn />
          </div>

          <div className="fl w-50">
            <SignUp />
          </div>
        </div>
      </Fragment>
    );
  }
}

export default SignInSignUpPage;
