import React, {Component} from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid'
import { connect } from "react-redux";

import * as selectors from "../../redux/root-reducer";

import CustomerTrackListItem from '../CustomerTrackListItem'
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
    axios.get(`http://localhost:3000/users/${this.props.authUser.userid}/purchased-tracks`)
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
    const { userid } = this.props.authUser;
    console.log(value)
    

    if(value && value !== ""){
      this.setState({ searchField: value, isSearching: true })
      axios({
        method: "post",
        url: `http://localhost:3000/search/my-tracks`,
        data: { query: value, idUser: userid }
      }).then(res => {
        console.log(res.data)
        this.setState({ searchList: res.data });
  
      } );
    } else {
      this.setState({ searchField: value, isSearching: false })
    }
  }


  render(){
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
        <div className="pa3 ph5-l w-50 center">
          <label className="f6 b db mb2 blue ">Search</label>
          <input id="search" name="search" placeholder="Search by track or artist..." className="input-reset ba b--black-20 pa2 mb2 db w-100" 
          type="text" aria-describedby="name-desc" onChange={this.handleSearchFieldChange}/>
        </div>}
        <div className="pa3 ph5-l">

        <main className="mw6 center">
          {
          isSearching ? (
            searchList.map(singleTrack => (
              <CustomerTrackListItem
                    key={uuidv4()}
                    track={singleTrack}
                  />
            ) )
           ) : (
            currentTracks.map(singleTrack => (
              <CustomerTrackListItem
                    key={uuidv4()}
                    track={singleTrack}
                  />
              ) )
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
    );
  }
}

const mapStateToProps = (state) => ({
  authUser: selectors.getAuthUser(state)
});

export default connect(mapStateToProps)(CustomerTracks);