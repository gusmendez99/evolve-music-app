import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";

import * as selectors from "../../redux/root-reducer";
import * as artistActions from "../../redux/artist/artist.actions";

import ArtistListItem from "../ArtistListItem";
import Pagination from "../Pagination";

const ManageArtists = ({
  authUser,
  artists,
  permissions,
  isLoading,
  onLoad,
}) => {
  const [isSearching, changeIsSearching] = useState(false);
  const [isPaginating, changeIsPaginating] = useState(false);
  const [searchList, changeSearchList] = useState([]);
  const [searchField, changeSearchField] = useState("");
  const [currentArtists, changeCurrentArtists] = useState([]);
  const [currentPage, changeCurrentPage] = useState(0);
  const [totalPages, changeTotalPages] = useState(0);

  const onPageChanged = (data) => {
    changeIsPaginating(true);
    const { currentPage, totalPages, pageLimit } = data;

    const offset = (currentPage - 1) * pageLimit;
    const currentArtistsPaginated = artists.slice(offset, offset + pageLimit);

    changeCurrentPage(currentPage);
    changeTotalPages(totalPages);
    changeCurrentArtists(currentArtistsPaginated);
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
        url: `http://localhost:3000/search/artists`,
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
      {!permissions.canReadArtist && (
        <div className="pa1 ph5-l tc">
          <h1 className="f3 fw6">{"You cant read artists..."}</h1>
        </div>
      )}

      <Fragment>
        {permissions.canReadArtist && artists.length === 0 && !isLoading && (
          <p>{"No artists yet..."}</p>
        )}
        {permissions.canReadArtist && isLoading && <p>{"Cargando..."}</p>}
        {permissions.canReadArtist && artists.length > 0 && !isLoading && !isPaginating && (
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
                      {(permissions.canDeleteArtist ||
                        permissions.canUpdateArtist) && (
                        <th className="fw6 bb b--black-20 tc pb3 pr3 bg-white">
                          Acciones
                        </th>
                      )}
                    </tr>
                  </thead>

                  <tbody className="lh-copy">
                    {isSearching
                      ? searchList.map((singleArtist) => (
                          <ArtistListItem
                            key={singleArtist.artistid}
                            artist={singleArtist}
                            currentUser={authUser}
                          />
                        ))
                      : currentArtists.map((singleArtist) => (
                          <ArtistListItem
                            key={singleArtist.artistid}
                            artist={singleArtist}
                            currentUser={authUser}
                          />
                        ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="f3 fw6 pa4 tc">
              {!searchField && (
                <Pagination
                  totalRecords={artists.length}
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
        {permissions.canCreateArtist && (
          <Link
            className="f5 link dim ph4 pv3 m2 dib white bg-green"
            to={`/${authUser.rolename}/manageartists/new`}
          >
            Add Artist
          </Link>
        )}
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  authUser: selectors.getAuthUser(state),
  permissions: selectors.getAuthUserPermissions(state),
  isLoading: selectors.isFetchingArtists(state),
  artists: selectors.getArtists(state)
});

const mapDispatchToProps = (dispatch) => ({
  onLoad() {
    dispatch(artistActions.startFetchingArtists());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageArtists);
