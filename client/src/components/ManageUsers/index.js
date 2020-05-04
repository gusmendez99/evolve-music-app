import React, {Component} from 'react';
import { Link} from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import * as selectors from '../../redux/root-reducer'

import UserListItem from '../UserListItem';
import Pagination from '../Pagination';

class ManageUsers extends Component {
  constructor(){
    super()
    this.state = {
      isSearching: false,
      searchList: [],
      users: [],
      searchField: '',
      currentUsers: [], 
      currentPage: null, 
      totalPages: null
    };
  };

  componentDidMount(){
    axios
    .get('http://localhost:3000/users')
    .then(response => this.setState({users: response.data}))
    .catch(error => console.log(error));
  }

  onPageChanged = data => {
    const { users } = this.state;
    const { currentPage, totalPages, pageLimit } = data;

    const offset = (currentPage - 1) * pageLimit;
    const currentUsers = users.slice(offset, offset + pageLimit);

    this.setState({ currentPage, currentUsers, totalPages });
  }

  //Este se puede quitar pues el re-render se tiene que hacer de manera mas eficiente
  updateState = () => {
    axios.get('http://localhost:3000/users')
    .then(response => this.setState({users: response.data}))
    .catch(error => console.log(error));
  }

  handleSearchFieldChange = async event => {
    const { value } = event.target;
    console.log(value)
    

    if(value && value !== ""){
      this.setState({ searchField: value, isSearching: true })
      axios({
        method: "post",
        url: `http://localhost:3000/search/users`,
        data: { query: value }
      }).then(res => {
        this.setState({ searchList: res.data });
  
      } );
    } else {
      this.setState({ searchField: value, isSearching: false })
    }
  }

  render(){
    const { authUser } = this.props;
    const { searchField, users, currentUsers, 
      currentPage, totalPages, isSearching, searchList } = this.state;

    const totalUsers = users.length;
    if (totalUsers === 0) return (<h1 className="tc">No users yet...</h1>);

    return (
      <div>
        <div className="pa1 ph5-l tc">
          <h1 className="f3 fw6">Manage Users</h1>
          { currentPage && !searchField && (
            <h6>
              Page { currentPage } / { totalPages }
            </h6>
          ) }
        </div>
        {/* Search function needs Axios to make a query... */
          <div className="pa3 ph5-l ">
          <label className="f6 b db mb2 blue">Búsqueda</label>
          <input id="search" name="search"  className="input-reset ba b--black-20 pa2 mb2 db w-100" 
          type="text" aria-describedby="name-desc" onChange={this.handleSearchFieldChange}/>
        </div>}
        <div className="pa3 ph5-l">
          <div className="overflow-y-scroll vh-50">
            <table className="f6 w-100" cellSpacing="0">
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
                  isSearching ? (
                    searchList.map((singleUser, i)=>{
                      if(singleUser.userid != authUser.userid){
                        return (
                          <UserListItem
                          key={i}
                          user={singleUser}
                          currentUser={authUser}
                          updateState={this.updateState}
                          index={i}
                          />
                        );
                      }
                      
                  })
                  ) : (
                  currentUsers.map((singleUser, i)=>{
                    if(singleUser.userid != authUser.userid){
                      return (
                        <UserListItem
                        key={i}
                        user={singleUser}
                        currentUser={authUser}
                        updateState={this.updateState}
                        index={i}
                        />
                      );
                    }
                    
                }))
                }
              </tbody>
            </table>
          </div>
        </div>
        <div className="f3 fw6 pa4 tc">
          {
            !searchField &&
            <Pagination totalRecords={totalUsers} pageLimit={15} pageNeighbours={1} onPageChanged={this.onPageChanged} />
          }
        </div>
        <div className="tc pa2">
          <Link className="f5 link dim ph4 pv3 m2 dib white bg-green" to={`/${authUser.rolename}/manageusers/new`}>Add User</Link>
        </div>
      </div>    
    );
  }
}

const mapStateToProps = (state) => ({
  authUser: selectors.getAuthUser(state)
});

export default connect(mapStateToProps)(ManageUsers);


