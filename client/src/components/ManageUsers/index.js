import React from 'react';
import {
    BrowserRouter as Router, 
    Route, 
		Link,
		Switch,
    useRouteMatch} from 'react-router-dom';


const ManageUsers = ({currentUser}) =>{
    const {url, path} = useRouteMatch();
    console.log('User in management',currentUser)
    return (
        <div>
					<Link to={`${url}/newuser`}>Ir</Link>
					<Link to={`${url}/otheruser`}>Ir</Link>

					<Switch>
							<Route exact path={path}>
								<h1>Users nigga</h1>
							</Route>
							<Route path={`${path}/:type`}>
									<h1>LLEGUE</h1>
							</Route>
					</Switch>
        </div>        
    )
}
export default ManageUsers;

// class ManageUsers extends Component {
//   constructor(){
//     super();
//     this.state = {
//       currentUser: {},
//     };
//   };
// //   componentDidMount(){
// //     fetch('http://localhost:3000/users/1')
// //     .then(response => response.json())
// //     .then(data => {
// //       this.setState({currentUser: data[0]})
// //     });


// //   }
//   render(){
//     const {url, path} = useRouteMatch();
//     return (
//       <div>
//         <p>{this.props.currentUser.username}</p>
//         <Router>
//           <Link to={`/${this.state.currentUser.username}/manageusers`}>Ir</Link>
//           <Route exact path={`/${this.state.currentUser.username}/manageusers`}
//             render={(props) => <ManageUsers {...props} currentUser={this.state.currentUser}/>}
//             />
//         </Router>
//       </div>
//     );
//   }
// }

// export default ManageUsers;


