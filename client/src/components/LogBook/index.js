import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

import * as selectors from '../../redux/root-reducer'

import LogBookListItem from "../LogBookListItem";
import Pagination from '../Pagination';


class ManageArtists extends Component {
  constructor() {
    super();
    this.state = {
      isSearching: false,
      searchList: [],
      logs: [],
      searchField: '',
      currentLogs: [], 
      currentPage: null, 
      totalPages: null
    };
  }

  componentDidMount() {
    axios.get("http://localhost:3000/reports/logbook")
      .then(response => {
        this.setState({ logs: response.data });
      });
  }

  onPageChanged = data => {
    const { logs } = this.state;
    const { currentPage, totalPages, pageLimit } = data;

    const offset = (currentPage - 1) * pageLimit;
    const currentLogs = logs.slice(offset, offset + pageLimit);

    this.setState({ currentPage, currentLogs, totalPages });
  }


  handleSearchFieldChange = async event => {
    const { value } = event.target;
    console.log(value)
    

    if(value && value !== ""){
      this.setState({ searchField: value, isSearching: true })
      axios({
        method: "post",
        url: `http://localhost:3000/search/logs`,
        data: { query: value }
      }).then(res => {
        this.setState({ searchList: res.data });
  
      } );
    } else {
      this.setState({ searchField: value, isSearching: false })
    }
  }

  render() {
    const { authUser, permissions } = this.props;
    const { searchField, logs, currentLogs,
      currentPage, totalPages, isSearching, searchList } = this.state;

    if(!permissions.isAdmin) return (
      <div className="pa1 ph5-l tc">
          <h1 className="f3 fw6">You can't Read Logs...</h1>
        </div>
    )

    const totalLogs = logs.length;
    if (totalLogs === 0) return (<h1 className="tc">No Logs yet...</h1>);

    return (
      <div>
        <div className="pa1 ph5-l tc">
          <h1 className="f3 fw6">LogBook</h1>
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
                  <th className="fw6 bb b--black-20 tc pb3 pr3 bg-white">
                    Username
                  </th>
                  <th className="fw6 bb b--black-20 tc pb3 pr3 bg-white">
                    Item Id
                  </th>
                  <th className="fw6 bb b--black-20 tc pb3 pr3 bg-white">
                    Executed Action
                  </th>
                  <th className="fw6 bb b--black-20 tc pb3 pr3 bg-white">
                    Item Type
                  </th>
                  <th className="fw6 bb b--black-20 tc pb3 pr3 bg-white">
                    Log Date
                  </th>          
                </tr>
              </thead>
              

              <tbody className="lh-copy">
                
              { 
                isSearching ? (
                  searchList.map(singleLog => (
                    <LogBookListItem
                          key={singleLog.logbookid}
                          log={singleLog}
                          currentUser={authUser}
                        />
                  ) ) 
                ) : (
                currentLogs.map(singleLog => (
                  <LogBookListItem
                        key={singleLog.logbookid}
                        log={singleLog}
                        currentUser={authUser}
                      />
                ) ) 
                )
              }
              </tbody>
            </table>
          </div>
        </div>

        <div className="f3 fw6 pa4 tc">
          {
            !searchField &&
            <Pagination totalRecords={totalLogs} pageLimit={15} pageNeighbours={1} onPageChanged={this.onPageChanged} />
          }
          
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  authUser: selectors.getAuthUser(state),
  permissions: selectors.getAuthUserPermissions(state)
});

export default connect(mapStateToProps)(ManageArtists);
