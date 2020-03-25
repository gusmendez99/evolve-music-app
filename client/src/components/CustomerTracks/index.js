import React, {Component} from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import Pagination from '../Pagination';


class CustomerTracks extends Component {
  constructor(){
    super()
    this.state = {
      isSearching: false,
      searchList: [],
      tracks: [],
      searchField: '',
      currentTracks: [], 
      currentPage: null, 
      totalPages: null
    };
  };

  componentDidMount(){
    axios.get('http://localhost:3000/tracks/active')
    .then(response => {
      this.setState({tracks: response.data})
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
    console.log(value)
    

    if(value && value !== ""){
      this.setState({ searchField: value, isSearching: true })
      axios({
        method: "post",
        url: `http://localhost:3000/search/tracks/active`,
        data: { query: value }
      }).then(res => {
        //console.log(res.data)
        this.setState({ searchList: res.data });
  
      } );
    } else {
      this.setState({ searchField: value, isSearching: false })
    }
  }

  updateState = () => {
    axios.get('http://localhost:3000/tracks/active')
    .then(response => {
      this.setState({tracks: response.data})
    });
  }

  render(){
    const { authUser } = this.props;
    const { searchField, tracks, currentTracks, currentPage, totalPages,
      isSearching, searchList} = this.state;

    const totalTracks = tracks.length;
    if (totalTracks === 0) return (<h1 className="tc">No tracks yet...</h1>);

    return (
      <div>
        <div className="pa1 ph5-l tc">
          <h1 className="f3 fw6">Search Tracks</h1>
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

        <main className="mw6 center">
          <article
            className="dt w-100 bb b--black-05 pb2 mt2"
            href="#0"
          >
          <div className="dtc w2 w3-ns v-mid">
          <img
            src="http://mrmrs.github.io/photos/p/2.jpg"
            className="ba b--black-10 db br-100 w2 w3-ns h2 h3-ns"
          />
          </div>
          <div className="dtc v-mid pl3">
          <h1 className="f6 f5-ns fw6 lh-title black mv0">
          Young Gatchell 
          </h1>
          <h2 className="f6 fw4 mt0 mb0 black-60">
          @yg
          </h2>
          </div>
          <div className="dtc v-mid">
          <form className="w-100 tr">
          <button
            className="f6 button-reset bg-white ba b--black-10 dim pointer pv1 black-60"
            type="submit"
          >
          + Follow
          </button>
          </form>
          </div>
          </article>
          <article
          className="dt w-100 bb b--black-05 pb2 mt2"
          href="#0"
        >
        <div className="dtc w2 w3-ns v-mid">
        <img
          src="http://mrmrs.github.io/photos/p/2.jpg"
          className="ba b--black-10 db br-100 w2 w3-ns h2 h3-ns"
        />
        </div>
        <div className="dtc v-mid pl3">
        <h1 className="f6 f5-ns fw6 lh-title black mv0">
        Young Gatchell 
        </h1>
        <h2 className="f6 fw4 mt0 mb0 black-60">
        @yg
        </h2>
        </div>
        <div className="dtc v-mid">
        <form className="w-100 tr">
        <button
          className="f6 button-reset bg-white ba b--black-10 dim pointer pv1 black-60"
          type="submit"
        >
        + Follow
        </button>
        </form>
        </div>
        </article>
        </main>

        { /*
          isSearching ? (
            searchList.map(singleTrack => (
              <TrackListItem
                    key={singleTrack.trackid}
                    track={singleTrack}
                    mediaTypes={mediaTypes}
                    albums={albums}
                    genres={genres}
                    currentUser={authUser}
                    updateState={this.updateState}
                  />
            ) )
           ) : (
            currentTracks.map(singleTrack => (
              <TrackListItem
                    key={singleTrack.trackid}
                    track={singleTrack}
                    mediaTypes={mediaTypes}
                    albums={albums}
                    genres={genres}
                    currentUser={authUser}
                    updateState={this.updateState}
                  />
              ) )
            )*/
           }
        </div>
        <div className="f3 fw6 pa4 tc">
          {
            !searchField &&
            <Pagination totalRecords={totalTracks} pageLimit={15} pageNeighbours={1} onPageChanged={this.onPageChanged} />
          }
        </div>
      </div>    
    );
  }
}
const mapStateToProps = ({ user }) => {
  const { authUser } = user;
  return { authUser };
};

export default connect(mapStateToProps)(CustomerTracks);


