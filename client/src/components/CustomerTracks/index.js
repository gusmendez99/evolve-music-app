import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid'
import { connect } from "react-redux";

import * as selectors from "../../redux/root-reducer";
import * as actions from '../../redux/playback/playback.actions';

import CustomerTrackListItem from '../CustomerTrackListItem'
import Pagination from '../Pagination';

import ReactWebMediaPlayer from 'react-web-media-player';

class CustomerTracks extends Component {
  constructor() {
    super()
    this.state = {
      isSearching: false,
      searchList: [],
      tracks: [],
      searchField: '',
      currentTracks: [],
      currentPage: null,
      totalPages: null,
      songQueue: null
    };
  };

  componentDidMount() {
    axios.get(`http://localhost:3000/users/${this.props.authUser.userid}/purchased-tracks`)
      .then(response => {
        this.setState({ tracks: response.data })
      })
      .catch(error => console.log(error));


  }

  onPageChanged = data => {
    const { tracks } = this.state;
    const { currentPage, totalPages, pageLimit } = data;

    const offset = (currentPage - 1) * pageLimit;
    const currentTracks = tracks.slice(offset, offset + pageLimit);

    this.setState({ currentPage, currentTracks, totalPages });
  }

  handleSearchFieldChange = async event => {
    const { value } = event.target;
    const { userid } = this.props.authUser;
    console.log(value)


    if (value && value !== "") {
      this.setState({ searchField: value, isSearching: true })
      axios({
        method: "post",
        url: `http://localhost:3000/search/my-tracks`,
        data: { query: value, idUser: userid }
      }).then(res => {
        console.log(res.data)
        this.setState({ searchList: res.data });

      });
    } else {
      this.setState({ searchField: value, isSearching: false })
    }
  }

  onTrackPlayed = songData => {
    const { onSongPlayed, authUser } = this.props;

    console.log("Trying to play...")
    onSongPlayed(authUser.userid, songData.id)
    this.setState({ songQueue: songData })
  }


  render() {
    const { searchField, tracks, currentTracks, currentPage, totalPages,
      isSearching, searchList, songQueue } = this.state;

    const totalTracks = tracks.length;
    if (totalTracks === 0) return (<h1 className="tc">No tracks yet...</h1>);

    return (
      <Fragment className="h-100">
        <div className="fl w-80 bg-washed-blue">
          <div className="pa1 ph5-l tc">
            <h1 className="f3 fw6">Search Tracks</h1>
            {currentPage && !searchField && (
              <h6>
                Page { currentPage} / { totalPages}
              </h6>
            )}
          </div>
          {/* Search function needs Axios to make a query... */
            <div className="pa3 ph5-l w-50 center">
              <label className="f6 b db mb2 blue ">Search</label>
              <input id="search" name="search" placeholder="Search by track or artist..." className="input-reset ba b--black-20 pa2 mb2 db w-100"
                type="text" aria-describedby="name-desc" onChange={this.handleSearchFieldChange} />
            </div>}
          <div className="pa3 ph5-l">

            <main className="mw6 center">
              {
                isSearching ? (
                  searchList.map(singleTrack => (
                    <CustomerTrackListItem
                      key={uuidv4()}
                      track={singleTrack}
                      onTrackPlayed={this.onTrackPlayed}
                    />
                  ))
                ) : (
                    currentTracks.map(singleTrack => (
                      <CustomerTrackListItem
                        key={uuidv4()}
                        track={singleTrack}
                        onTrackPlayed={this.onTrackPlayed}
                      />
                    ))
                  )
              }
            </main>


          </div>
          <div className="f3 fw6 pa4 tc">
            {
              !searchField &&
              <Pagination totalRecords={totalTracks} pageLimit={10} pageNeighbours={1} onPageChanged={this.onPageChanged} />
            }
          </div>          
        </div>
        <div className="fl w-20 tc ">
          <div className="tc">
            {
              songQueue == null ? (
                <div style={{ width: "300px"}}>
                  <img
                    className="mv2"
                    src="https://download.seaicons.com/icons/blackvariant/button-ui-system-folders-alt/512/Music-icon.png"
                    alt="track"
                    width="100px"
                    height="100px"
                  />
                  <h1 className="f6 f5-ns fw6 lh-title black mv2">No tracks</h1>
                  <h2 className="f6 fw4 mt0 mb0 black-60 fw6 mv2">playing now</h2>
                </div>
              ): (
                <div style={{ width: "300px"}} className="center">
                  <ReactWebMediaPlayer
                    className="mv2 mh2"
                    width={300} height={300}
                    title={songQueue.title}
                    audio={songQueue.audio}
                    thumbnail={songQueue.thumbnail}
                    autoplay={false}
                    allowFullFrame={false}
                  />
                  <h1 className="f6 f5-ns fw6 lh-title black mv2">{songQueue.title}</h1>
                  <h2 className="f6 fw4 mt0 mb0 black-60 fw6 mv2">{songQueue.artist}</h2>
                </div>
              )
            }
          </div>
          
        </div>
      </Fragment> 
    );
  }
}

const mapStateToProps = (state) => ({
  authUser: selectors.getAuthUser(state)
});

const mapDispatchToProps = dispatch => ({
  onSongPlayed (idUser, idTrack) {
    dispatch(actions.startAddingPlaybackRecord(idUser, idTrack))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(CustomerTracks);