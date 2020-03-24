import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";

import ArtistListItem from "../ArtistListItem";
import Pagination from '../Pagination';


class ManageArtists extends Component {
  constructor() {
    super();
    this.state = {
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


  updateState = index => {
    axios.get("http://localhost:3000/artists")
      .then(response => {
        this.setState({ artists: response.data });
      });
  };


  /*  onChange... 
  
    handleSearchFieldChange = event => {
    const { value } = event.target;
    this.setState({ searchField: value });
  }; */

  render() {
    const { authUser, permissions } = this.props;
    const { searchField, artists, currentArtists, currentPage, totalPages } = this.state;

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
          { currentPage && (
            <h6>
              Page { currentPage } / { totalPages }
            </h6>
          ) }
        </div>
        {/* Search function needs Axios to make a query... */
          <div className="pa3 ph5-l ">
          <label className="f6 b db mb2 blue">Búsqueda</label>
          <input id="name" name="artist-name"  className="input-reset ba b--black-20 pa2 mb2 db w-100" type="text" aria-describedby="name-desc"/>
        </div>}
        <div className="pa3 ph5-l">
          <div className="overflow-y-scroll vh-50">
          {/*
            this.state.artists.filter(
              artist => artist.name.toLowerCase().includes(searchField.toLowerCase())
            ).length === 0 &&
            <h4 className="f3 fw6">No artist found</h4>
            */}
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
                
              { currentArtists.map(singleArtist => (
                <ArtistListItem
                      key={singleArtist.artistid}
                      artist={singleArtist}
                      currentUser={authUser}
                      updateState={this.updateState}
                    />
              ) ) }
              </tbody>
            </table>
          </div>
        </div>

        <div className="f3 fw6 pa4 tc">
          <Pagination totalRecords={totalArtists} pageLimit={15} pageNeighbours={1} onPageChanged={this.onPageChanged} />
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
const mapStateToProps = ({ user }) => {
  const { authUser, permissions } = user;
  return { authUser, permissions };
};

export default connect(mapStateToProps)(ManageArtists);
