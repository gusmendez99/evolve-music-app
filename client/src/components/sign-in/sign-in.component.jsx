import React, { Fragment, useState } from 'react';

import { connect } from 'react-redux'; 

const SignIn = ({ onSubmit }) => {
  const [username, changeUsername] = useState("");
  const [password, changePassword] = useState("");

  return (
  <Fragment>
    <h2>Sign In</h2>
    <form >
      <div className="mt3">
        <label className="db fw6 lh-copy f6" for="email-address">Email</label>
        <input 
          className="pa2 input-reset ba bg-transparent w-100" 
          name="email-address"  
          id="email-address" 
          onChange={e => changeUsername(e.target.value)} />
      </div>
      <div className="mv3">
        <label className="db fw6 lh-copy f6" for="password">Password</label>
        <input 
          className="b pa2 input-reset ba bg-transparent w-100" 
          type="password" 
          name="password"  
          id="password"
          onChange={e => changePassword(e.target.value)} />
      </div>
      <div>
        <button className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib">Sign In</button>
      </div>
    </form>
  </Fragment>
)};

const mapDispatchToProps = (dispatch) => ({
  onSubmit(username, password) {
    //dispatch(actions.addBaby(firstName, lastName));
  }
})

//export default connect(undefined, mapDispatchToProps)(SignIn);
export default SignIn;