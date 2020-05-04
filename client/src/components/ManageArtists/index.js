import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";

import * as selectors from '../../redux/root-reducer'

import ArtistListItem from "../ArtistListItem";
import Pagination from '../Pagination';


class ManageArtists extends Component {
  constructor() {
    super();
    this.state = {
      isSearching: false,
      searchList: [],
      artists: [],
      searchField: '',
      currentArtists: [], 
      currentPage: null, 
      totalPages: null
    };
  }

  componentDidMount() {
    axios.get("http://localhost:3000/artists")
      .then(response => {
        this.setState({ artists: response.data });
      });
  }

  onPageChanged = data => {
    const { artists } = this.state;
    const { currentPage, totalPages, pageLimit } = data;

    const offset = (currentPage - 1) * pageLimit;
    const currentArtists = artists.slice(offset, offset + pageLimit);

    this.setState({ currentPage, currentArtists, totalPages });
  }


  updateState = () => {
    axios.get("http://localhost:3000/artists")
      .then(response => {
        this.setState({ artists: response.data });
      });
  };


  handleSearchFieldChange = async event => {
    const { value } = event.target;
    console.log(value)
    

    if(value && value !== ""){
      this.setState({ searchField: value, isSearching: true })
      axios({
        method: "post",
        url: `http://localhost:3000/search/artists`,
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
    const { searchField, artists, currentArtists, 
      currentPage, totalPages, isSearching, searchList } = this.state;

    if(!permissions.canReadArtist) return (
      <div className="pa1 ph5-l tc">
          <h1 className="f3 fw6">You cant Read Artists...</h1>
        </div>
    )

    const totalArtists = artists.length;
    if (totalArtists === 0) return (<h1 className="tc">No artists yet...</h1>);

    return (
      <div>
        <div className="pa1 ph5-l tc">
          <h1 className="f3 fw6">Manage Artists</h1>
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
                    Name
                  </th>
                  {(permissions.canDeleteArtist || permissions.canUpdateArtist) && <th className="fw6 bb b--black-20 tc pb3 pr3 bg-white">
                    Acciones
                  </th>}
                </tr>
              </thead>
              

              <tbody className="lh-copy">
                
              { 
                isSearching ? (
                  searchList.map(singleArtist => (
                    <ArtistListItem
                          key={singleArtist.artistid}
                          artist={singleArtist}
                          currentUser={authUser}
                          updateState={this.updateState}
                        />
                  ) ) 
                ) : (
                currentArtists.map(singleArtist => (
                  <ArtistListItem
                        key={singleArtist.artistid}
                        artist={singleArtist}
                        currentUser={authUser}
                        updateState={this.updateState}
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
            <Pagination totalRecords={totalArtists} pageLimit={15} pageNeighbours={1} onPageChanged={this.onPageChanged} />
          }
          
        </div>
        
        <div className="tc pa2">
          {
            permissions.canCreateArtist &&
            <Link
            className="f5 link dim ph4 pv3 m2 dib white bg-green"
            to={`/${authUser.rolename}/manageartists/new`}
          >
            Add Artist
          </Link>
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
