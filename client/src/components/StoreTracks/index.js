import React, {Component} from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import StoreTrackListItem from '../StoreTrackListItem'
import Pagination from '../Pagination';

import { connect } from "react-redux";

import * as selectors from "../../redux/root-reducer";
import * as actions from '../../redux/cart/cart.actions';
import Spinner from '../Spinner';


//TODO: EN LOS FETCHS HAY QUE CAMBIAR Y MOSTRAR NO SOLO LAS CANCIONES ACTIVAS
// SINO LAS CANCIONES ACTIVAS QUE NO HAYAN SIDO COMPRADAS YA POR EL CLIENTE

class StoreTracks extends Component {
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
    axios.get(`http://localhost:3000/users/${this.props.authUser.userid}/available-tracks`)
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
        url: `http://localhost:3000/search/available-tracks`,
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

    const { checkout } = this.props;

    const totalTracks = tracks.length;
    if (totalTracks === 0) return (<div className="tc"><Spinner/></div>);

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
              <StoreTrackListItem
                    key={uuidv4()}
                    track={singleTrack}
                  />
            ) )
           ) : (
            currentTracks.map(singleTrack => (
              <StoreTrackListItem
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

const mapStateToProps = state => ({
  authUser: selectors.getAuthUser(state)
})

export default connect(mapStateToProps,undefined)(StoreTracks);


