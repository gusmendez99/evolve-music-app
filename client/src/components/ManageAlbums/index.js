import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";

import * as selectors from "../../redux/root-reducer";
import * as albumActions from "../../redux/album/album.actions";
import * as artistActions from "../../redux/artist/artist.actions";

import AlbumListItem from "../AlbumListItem";
import Pagination from "../Pagination";

const ManageAlbums = ({
  authUser,
  artists,
  albums,
  permissions,
  isLoading,
  onLoad,
}) => {
  const [isSearching, changeIsSearching] = useState(false);
  const [isPaginating, changeIsPaginating] = useState(false);
  const [searchList, changeSearchList] = useState([]);
  const [searchField, changeSearchField] = useState("");
  const [currentAlbums, changeCurrentAlbums] = useState([]);
  const [currentPage, changeCurrentPage] = useState(0);
  const [totalPages, changeTotalPages] = useState(0);

  const convertArtistIntoOptions = (data) => {
    const options = data.map((artist) => {
      return { value: artist.artistid, label: artist.name };
    });
    return options;
  };

  const onPageChanged = (data) => {
    changeIsPaginating(true);
    const { currentPage, totalPages, pageLimit } = data;

    const offset = (currentPage - 1) * pageLimit;
    const currentAlbumsPaginated = albums.slice(offset, offset + pageLimit);

    changeCurrentPage(currentPage);
    changeTotalPages(totalPages);
    changeCurrentAlbums(currentAlbumsPaginated);
    changeIsPaginating(false);
  };

  const handleSearchFieldChange = async (event) => {
    const { value } = event.target;
    console.log(value);

    changeSearchField(value);

    if (value && value !== "") {
      changeIsSearching(true);

      axios({
        method: "post",
        url: `http://localhost:3000/search/albums`,
        data: { query: value },
      }).then((res) => {
        changeSearchList(res.data);
      });
    } else {
      changeIsSearching(false);
    }
  };
  //Update on changes, pending update...
  useEffect(onLoad, []);

  return (
    <Fragment>
      <div className="pa1 ph5-l tc">
        <h1 className="f3 fw6">Manage Users</h1>
        {currentPage && !searchField && (
          <h6>
            Page {currentPage} / {totalPages}
          </h6>
        )}
      </div>
      {!permissions.canReadAlbum && (
        <div className="pa1 ph5-l tc">
          <h1 className="f3 fw6">{"You cant read albums..."}</h1>
        </div>
      )}

      <Fragment>
        {permissions.canReadAlbum && albums.length === 0 && !isLoading && (
          <p>{"No albums yet..."}</p>
        )}
        {permissions.canReadAlbum && isLoading && <p>{"Cargando..."}</p>}
        {permissions.canReadAlbum &&
          albums.length > 0 &&
          artists.length > 0 &&
          !isLoading &&
          !isPaginating && (
            <Fragment>
              <div className="pa3 ph5-l ">
                <label className="f6 b db mb2 blue">Búsqueda</label>
                <input
                  id="search"
                  name="search"
                  className="input-reset ba b--black-20 pa2 mb2 db w-100"
                  type="text"
                  aria-describedby="name-desc"
                  onChange={handleSearchFieldChange}
                />
              </div>
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
                      {isSearching
                        ? searchList.map((singleAlbum) => {
                            return (
                              <AlbumListItem
                                key={singleAlbum.albumid}
                                album={singleAlbum}
                                artists={convertArtistIntoOptions(artists)}
                                currentUser={authUser}
                              />
                            );
                          })
                        : currentAlbums.map((singleAlbum) => {
                            return (
                              <AlbumListItem
                                key={singleAlbum.albumid}
                                album={singleAlbum}
                                artists={convertArtistIntoOptions(artists)}
                                currentUser={authUser}
                              />
                            );
                          })}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="f3 fw6 pa4 tc">
                {!searchField && (
                  <Pagination
                    totalRecords={albums.length}
                    pageLimit={15}
                    pageNeighbours={1}
                    onPageChanged={onPageChanged}
                  />
                )}
              </div>
            </Fragment>
          )}
      </Fragment>

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
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  authUser: selectors.getAuthUser(state),
  permissions: selectors.getAuthUserPermissions(state),
  isLoading:
    selectors.isFetchingAlbums(state) && selectors.isFetchingArtists(state),
  albums: selectors.getAlbums(state),
  artists: selectors.getArtists(state),
});

const mapDispatchToProps = (dispatch) => ({
  onLoad() {
    dispatch(albumActions.startFetchingAlbums());
    dispatch(artistActions.startFetchingArtists());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageAlbums);
