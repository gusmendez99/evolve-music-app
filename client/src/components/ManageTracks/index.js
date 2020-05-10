import React, { Fragment, useState, useEffect } from 'react';
import { Link} from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import * as selectors from '../../redux/root-reducer'
import * as albumActions from "../../redux/album/album.actions";
import * as genreActions from "../../redux/genre/genre.actions";
import * as mediaTypeActions from "../../redux/mediatype/mediatype.actions";
import * as trackActions from "../../redux/track/track.actions";

import TrackListItem from '../TrackListItem';
import Pagination from '../Pagination';

import './styles.css'

const ManageTracks = ({
  authUser,
  tracks,
  albums,
  genres,
  mediaTypes,
  permissions,
  isLoading,
  onLoad,
}) => {

  const [isSearching, changeIsSearching] = useState(false);
  const [isPaginating, changeIsPaginating] = useState(false);
  const [searchList, changeSearchList] = useState([]);
  const [searchField, changeSearchField] = useState("");
  const [currentTracks, changeCurrentTracks] = useState([]);
  const [currentPage, changeCurrentPage] = useState(0);
  const [totalPages, changeTotalPages] = useState(0);

  const convertAlbumsIntoOptions = data => {
    const options = data.map(album => {
      return { value: album.albumid, label: album.title };
    });
    return options
  } 

  const convertGenresIntoOptions = data => {
    const options = data.map(genre => {
      return { value: genre.genreid, label: genre.name };
    });
    return options
  } 

  const convertMediaTypesIntoOptions = data => {
    const options = data.map(mediatype => {
      return { value: mediatype.mediatypeid, label: mediatype.name };
    });
    return options
  } 

  const onPageChanged = (data) => {
    changeIsPaginating(true);
    const { currentPage, totalPages, pageLimit } = data;

    const offset = (currentPage - 1) * pageLimit;
    const currentTracksPaginated = tracks.slice(offset, offset + pageLimit);

    changeCurrentPage(currentPage);
    changeTotalPages(totalPages);
    changeCurrentTracks(currentTracksPaginated);
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
        url: `http://localhost:3000/search/tracks`,
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
      {!permissions.canReadTrack && (
        <div className="pa1 ph5-l tc">
          <h1 className="f3 fw6">{"You cant read tracks..."}</h1>
        </div>
      )}

      <Fragment>
        {permissions.canReadTrack && tracks.length === 0 && !isLoading && (
          <p>{"No tracks yet..."}</p>
        )}
        {permissions.canReadTrack && isLoading && <p>{"Cargando..."}</p>}
        {permissions.canReadTrack &&
          tracks.length > 0 &&
          albums.length > 0 &&
          genres.length > 0 &&
          mediaTypes.length > 0 &&
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
                  <table className="f6 my-table" cellSpacing="0">
                    <thead>
                      <tr>
                        <th className="fw6 bb b--black-20 tc pb3 pr3 bg-white w-20">Name of Track</th>
                        <th className="fw6 bb b--black-20 tc pb3 pr3 bg-white w-20" >Composer</th>
                        <th className="fw6 bb b--black-20 tc pb3 pr3 bg-white w-10">Milliseconds</th>
                        <th className="fw6 bb b--black-20 tc pb3 pr3 bg-white w-10">Bytes</th>
                        <th className="fw6 bb b--black-20 tc pb3 pr3 bg-white w-10">Unit Price</th>
                        <th className="fw6 bb b--black-20 tc pb3 pr3 bg-white w-10 select-field">Album</th>
                        <th className="fw6 bb b--black-20 tc pb3 pr3 bg-white w-10 select-field">Genre</th>
                        <th className="fw6 bb b--black-20 tc pb3 pr3 bg-white w-10 select-field">Media Type</th>
                        <th className="fw6 bb b--black-20 tc pb3 pr3 bg-white w-10 select-field">Is Inactivated</th>
                        
                        {(permissions.canDeleteTrack || permissions.canUpdateTrack) && <th className="fw6 bb b--black-20 tc pb3 pr3 bg-white w-10 select-field">Acciones</th>}
                      </tr>
                    </thead>
                    <tbody className="lh-copy">
                    { 
                      isSearching ? (
                        searchList.map(singleTrack => (
                          <TrackListItem
                                key={singleTrack.trackid}
                                track={singleTrack}
                                mediaTypes={convertMediaTypesIntoOptions(mediaTypes)}
                                albums={convertAlbumsIntoOptions(albums)}
                                genres={convertGenresIntoOptions(genres)}
                                currentUser={authUser}
                              />
                        ) )
                      ) : (
                        currentTracks.map(singleTrack => (
                          <TrackListItem
                                key={singleTrack.trackid}
                                track={singleTrack}
                                mediaTypes={convertMediaTypesIntoOptions(mediaTypes)}
                                albums={convertAlbumsIntoOptions(albums)}
                                genres={convertGenresIntoOptions(genres)}
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
                {!searchField && (
                  <Pagination
                    totalRecords={tracks.length}
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
        {permissions.canCreateTrack && (
          <Link
            className="f5 link dim ph4 pv3 m2 dib white bg-green"
            to={`/${authUser.rolename}/managetracks/new`}
          >
            Add Track
          </Link>
        )}
      </div>
    </Fragment>
  );

}

const mapStateToProps = (state) => ({
  authUser: selectors.getAuthUser(state),
  permissions: selectors.getAuthUserPermissions(state),
  isLoading:
    selectors.isFetchingAlbums(state) && selectors.isFetchingTracks(state) && selectors.isFetchingGenres(state) && selectors.isFetchingMediaTypes(state)  ,
  albums: selectors.getAlbums(state),
  tracks: selectors.getTracks(state),
  genres: selectors.getGenres(state),
  mediaTypes: selectors.getMediaTypes(state)
});

const mapDispatchToProps = (dispatch) => ({
  onLoad() {
    dispatch(albumActions.startFetchingAlbums());
    dispatch(genreActions.startFetchingGenres());
    dispatch(mediaTypeActions.startFetchingMediaTypes());
    dispatch(trackActions.startFetchingTracks());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageTracks);


