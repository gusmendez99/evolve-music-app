import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";

import AlbumListItem from "../AlbumListItem";
import Pagination from "../Pagination";

class ManageAlbums extends Component {
  constructor() {
    super();
    this.state = {
      isSearching: false,
      searchList: [],
      albums: [],
      artists: [],
      searchField: "",
      currentAlbums: [],
      currentPage: null,
      totalPages: null
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:3000/albums")
      .then(response => this.setState({ albums: response.data }))
      .catch(error => console.log(error));

    axios
      .get("http://localhost:3000/artists")
      .then(response => {
        const artistOptions = response.data.map(artist => {
          return { value: artist.artistid, label: artist.name };
        });
        this.setState({ artists: artistOptions });
      })
      .catch(error => console.log(error));
  }

  onPageChanged = data => {
    const { albums } = this.state;
    const { currentPage, totalPages, pageLimit } = data;

    const offset = (currentPage - 1) * pageLimit;
    const currentAlbums = albums.slice(offset, offset + pageLimit);

    this.setState({ currentPage, currentAlbums, totalPages });
  };

  handleSearchFieldChange = async event => {
    const { value } = event.target;
    console.log(value)
    

    if(value && value !== ""){
      this.setState({ searchField: value, isSearching: true })
      axios({
        method: "post",
        url: `http://localhost:3000/search/albums`,
        data: { query: value }
      }).then(res => {
        this.setState({ searchList: res.data });
  
      } );
    } else {
      this.setState({ searchField: value, isSearching: false })
    }
  }

  updateState = () => {
    axios
      .get("http://localhost:3000/albums")
      .then(response => this.setState({ albums: response.data }))
      .catch(error => console.log(error));
  };

  render() {
    const { authUser, permissions } = this.props;
    const {
      searchField,
      albums,
      artists,
      currentAlbums,
      currentPage,
      totalPages,
      isSearching, searchList
    } = this.state;

    if (!permissions.canReadAlbum)
      return (
        <div className="pa1 ph5-l tc">
          <h1 className="f3 fw6">You cant Read Albums...</h1>
        </div>
      );

    const totalAlbums = albums.length;
    if (totalAlbums === 0) return <h1 className="tc">No albums yet...</h1>;

    return (
      <div>
        <div className="pa1 ph5-l tc">
          <h1 className="f3 fw6">Manage Albums</h1>
          {currentPage && !searchField && (
            <h6>
              Page {currentPage} / {totalPages}
            </h6>
          )}
        </div>
        {
          /* Search function needs Axios to make a query... */
          <div className="pa3 ph5-l ">
            <label className="f6 b db mb2 blue">Búsqueda</label>
            <input
              id="search"
              name="search"
              className="input-reset ba b--black-20 pa2 mb2 db w-100"
              type="text"
              aria-describedby="name-desc"
              onChange={this.handleSearchFieldChange}
            />
          </div>
        }
        <div className="pa3 ph5-l">
          <div className="overflow-y-scroll vh-50">
            <table className="f6 w-100" cellSpacing="0">
              <thead>
                <tr>
                  <th className="fw6 bb b--black-20 tc pb3 pr3 bg-white">
                    Name
                  </th>
                  <th className="fw6 bb b--black-20 tc pb3 pr3 bg-white">
                    Artist
                  </th>
                  {(permissions.canDeleteAlbum ||
                    permissions.canUpdateAlbum) && (
                    <th className="fw6 bb b--black-20 tc pb3 pr3 bg-white">
                      Acciones
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="lh-copy">
                {
                  isSearching ? (
                    searchList.map(singleAlbum => {
                      return (
                        <AlbumListItem
                          key={singleAlbum.albumid}
                          album={singleAlbum}
                          artists={artists}
                          currentUser={authUser}
                          updateState={this.updateState}
                        />
                      );
                    })
                  ) :
                  (
                    currentAlbums.map(singleAlbum => {
                    return (
                      <AlbumListItem
                        key={singleAlbum.albumid}
                        album={singleAlbum}
                        artists={artists}
                        currentUser={authUser}
                        updateState={this.updateState}
                      />
                    );
                  }))
                }
              </tbody>
            </table>
          </div>
        </div>
        <div className="f3 fw6 pa4 tc">
          {!searchField && (
            <Pagination
              totalRecords={totalAlbums}
              pageLimit={15}
              pageNeighbours={1}
              onPageChanged={this.onPageChanged}
            />
          )}
        </div>
        <div className="tc pa2">
          {permissions.canCreateAlbum && (
            <Link
              className="f5 link dim ph4 pv3 m2 dib white bg-green"
              to={`/${authUser.rolename}/managealbums/new`}
            >
              Add Album
            </Link>
          )}
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ user }) => {
  const { authUser, permissions } = user;
  return { authUser, permissions };
};

export default connect(mapStateToProps)(ManageAlbums);
