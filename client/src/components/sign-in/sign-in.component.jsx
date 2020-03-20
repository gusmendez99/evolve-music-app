import React, { Fragment, useState } from "react";

const SignIn = () => {
  const [username, changeUsername] = useState("");
  const [password, changePassword] = useState("");

  return (
    <Fragment>
      <h2>Sign In</h2>
      <div className="mt3">
        <label className="db fw6 lh-copy f6">Email</label>
        <input
          className="pa2 input-reset ba bg-transparent w-100"
          name="email-address"
          id="email-address"
          onChange={e => changeUsername(e.target.value)}
        />
      </div>
      <div className="mv3">
        <label className="db fw6 lh-copy f6">Password</label>
        <input
          className="b pa2 input-reset ba bg-transparent w-100"
          type="password"
          name="password"
          id="password"
          onChange={e => changePassword(e.target.value)}
        />
      </div>
      <div>
        <button className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib">
          Sign In
        </button>
      </div>
    </Fragment>
  );
};

//export default connect(undefined, mapDispatchToProps)(SignIn);
export default SignIn;
