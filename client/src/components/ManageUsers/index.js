import React, {Component} from 'react';
import { 
		Link} from 'react-router-dom';

import AddUser from '../AddUser';
import UserListItem from '../UserListItem';
// const ManageUsers = ({currentUser}) =>{
//     const {url, path} = useRouteMatch();
//     console.log('User in management',currentUser)
//     return (
//         <div>
// 					<Link to={`${url}/newuser`}>Add</Link>
// 					<Link to={`${url}/otheruser`}>edit</Link>

// 					<Switch>
// 							<Route exact path={path}>
// 								<h1>Users nigga</h1>
// 							</Route>
// 							<Route path={`${path}/newuser`}>
// 									<h1>newuser</h1>
// 							</Route>
// 							<Route path={`${path}/edituser`}>
// 									<h1>newuser</h1>
// 							</Route>
// 					</Switch>
//         </div>        
//     )
// }
// export default ManageUsers;

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
    return (
      <div>
        <div className="tc pa2">
          <h1 className="f2 fw6">Manage Users</h1>
        </div>
        <div className="pa2">
          <div className="overflow-auto">
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
                      currentUser={this.props.currentUser}
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
        <Link to={`/${this.props.currentUser.username}/manageusers/new`}>Ir</Link>
      </div>    
    );
  }
}

export default ManageUsers;


