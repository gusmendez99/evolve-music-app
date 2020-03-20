import React, {Component} from 'react';
import { Link} from 'react-router-dom';
import { connect } from 'react-redux';

import UserListItem from '../UserListItem';

class ManageUsers extends Component {
  constructor(){
    super()
    this.state = {
      users: [],
    };
  };

  componentDidMount(){
    fetch('http://localhost:3000/users')
    .then(response => response.json())
    .then(data => {
      this.setState({users: data})
    });
  }

  updateState = (index) => {
    fetch('http://localhost:3000/users')
    .then(response => response.json())
    .then(data => {
      this.setState({users: data})
    });
  }

  render(){
    const { authUser } = this.props;

    return (
      <div>
        <div className="tc pa2">
          <h1 className="f3 fw6">Manage Users</h1>
        </div>
        <div className="pa2">
          <div className="overflow-y-scroll vh-50">
            <table className="f6 w-90 mw9 center" cellSpacing="0">
              <thead>
                <tr>
                  <th className="fw6 bb b--black-20 tc pb3 pr3 bg-white">Username</th>
                  <th className="fw6 bb b--black-20 tc pb3 pr3 bg-white">Name</th>
                  <th className="fw6 bb b--black-20 tc pb3 pr3 bg-white">Last Name</th>
                  <th className="fw6 bb b--black-20 tc pb3 pr3 bg-white">E-Mail</th>
                  <th className="fw6 bb b--black-20 tc pb3 pr3 bg-white">Phone</th>
                  <th className="fw6 bb b--black-20 tc pb3 pr3 bg-white">Country</th>
                  <th className="fw6 bb b--black-20 tc pb3 pr3 bg-white">Role</th>
                  <th className="fw6 bb b--black-20 tc pb3 pr3 bg-white">Acciones</th>
                </tr>
              </thead>
              <tbody className="lh-copy">
                {
                  this.state.users.map((singleUser, i)=>{
                    return (
                      <UserListItem
                      key={i}
                      user={singleUser}
                      currentUser={authUser}
                      updateState={this.updateState}
                      index={i}
                      />
                    );
                })
                }
              </tbody>
            </table>
          </div>
        </div>
        <div className="tc pa2">
        <Link className="f5 link dim ph4 pv3 m2 dib white bg-green" to={`/${authUser.rolename}/manageusers/new`}>Add User</Link>
        </div>
      </div>    
    );
  }
}
const mapStateToProps = ({ user }) => {
  const { authUser } = user;
  return { authUser };
};

export default connect(mapStateToProps)(ManageUsers);


