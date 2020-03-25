import React, { Fragment } from "react";

import SignIn from "../../components/SignIn";
import { Link } from "react-router-dom";

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
            <article className="mw7 center ph3 ph5-ns tc br2 pv5 bg-washed-blue blue mb5">
              <h1 className="fw6 f3 f2-ns lh-title mt0 mb3">
                Not registered yet?
              </h1>
              <h3 className="fw2 f4 lh-copy mt0 mb3">
                Register to search for favorite tracks, artists and albums
              </h3>
              <div>

                <Link
                  className="f6 br-pill bg-blue no-underline washed-blue ba b--blue grow pv2 ph3 dib mr3"
                  to="/signup"
                  title="Sign Up"
                >
                  Sign Up
                </Link>
              </div>
            </article>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default SignInSignUpPage;
