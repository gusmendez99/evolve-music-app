import React, {Component} from 'react';
import { Link} from 'react-router-dom';
import { connect } from 'react-redux';

import TrackListItem from '../TrackListItem';
import Pagination from '../Pagination';

import './styles.css'

class ManageTracks extends Component {
  constructor(){
    super()
    this.state = {
      tracks: [],
      mediatypes: [],
      genres: [],
      searchField: '',
      currentTracks: [], 
      currentPage: null, 
      totalPages: null
    };
  };

  componentDidMount(){
    fetch('http://localhost:3000/tracks')
    .then(response => response.json())
    .then(data => {
      this.setState({tracks: data})
    });

    fetch('http://localhost:3000/mediatypes')
    .then(response => response.json())
    .then(data => {
      this.setState({mediatypes: data})
    });

    fetch('http://localhost:3000/genres')
    .then(response => response.json())
    .then(data => {
      this.setState({genres: data})
    });
  }

  onPageChanged = data => {
    const { tracks } = this.state;
    const { currentPage, totalPages, pageLimit } = data;

    const offset = (currentPage - 1) * pageLimit;
    const currentTracks = tracks.slice(offset, offset + pageLimit);

    this.setState({ currentPage, currentTracks, totalPages });
  }

  updateState = () => {
    fetch('http://localhost:3000/tracks')
    .then(response => response.json())
    .then(data => {
      this.setState({tracks: data})
    });
  }

  render(){
    const { authUser, permissions } = this.props;
    const { searchField, tracks, mediatypes, genres, currentTracks, currentPage, totalPages } = this.state;

    if(!permissions.canReadTrack) return (
      <div className="pa1 ph5-l tc">
          <h1 className="f3 fw6">You cant Read Tracks...</h1>
        </div>
    )

    const totalTracks = tracks.length;
    if (totalTracks === 0) return (<h1 className="tc">No tracks yet...</h1>);

    return (
      <div>
        <div className="pa1 ph5-l tc">
          <h1 className="f3 fw6">Manage Tracks</h1>
          { currentPage && (
            <h6>
              Page { currentPage } / { totalPages }
            </h6>
          ) }
        </div>
        {/* Search function needs Axios to make a query... */
        <div className="pa3 ph5-l ">
          <label className="f6 b db mb2 blue">Búsqueda</label>
          <input id="name" name="track-name"  className="input-reset ba b--black-20 pa2 mb2 db w-100" type="text" aria-describedby="name-desc"/>
        </div>}
        <div className="pa3 ph5-l">
          <div className="overflow-y-scroll overflow-x-scroll vh-50 ">
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
                  
                  {(permissions.canDeleteTrack || permissions.canUpdateTrack) && <th className="fw6 bb b--black-20 tc pb3 pr3 bg-white w-10 select-field">Acciones</th>}
                </tr>
              </thead>
              <tbody className="lh-copy">
              { currentTracks.map(singleTrack => (
                <TrackListItem
                      key={singleTrack.trackid}
                      track={singleTrack}
                      currentUser={authUser}
                      updateState={this.updateState}
                    />
              ) ) }
              </tbody>
            </table>
          </div>
        </div>
        <div className="f3 fw6 pa4 tc">
          <Pagination totalRecords={totalTracks} pageLimit={15} pageNeighbours={1} onPageChanged={this.onPageChanged} />
        </div>
        <div className="tc pa2">
        {
          permissions.canCreateTrack &&
          <Link className="f5 link dim ph4 pv3 m2 dib white bg-green" to={`/${authUser.rolename}/managetracks/new`}>Add Track</Link>
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

export default connect(mapStateToProps)(ManageTracks);


