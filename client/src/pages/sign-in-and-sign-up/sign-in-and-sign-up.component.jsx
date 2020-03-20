import React, { Fragment } from "react";

import SignIn from "../../components/sign-in/sign-in.component";
import SignUp from "../../components/sign-up/sign-up.component";

import "./sign-in-and-sign-up.styles.css";

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
