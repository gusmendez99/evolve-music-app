import React, {Component} from 'react';
import axios from 'axios';

import StoreTrackListItem from '../StoreTrackListItem'
import Pagination from '../Pagination';

import { connect } from "react-redux";

import * as actions from '../../redux/cart/cart.actions';

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
    if (totalTracks === 0) return (<h1 className="tc">No tracks yet...</h1>);

    return (
      <div>
        <div className="pa1 ph5-l tc">
          <button
              className="f6 dim ph3 pv2 mb0 mr3 dib white bg-green h-100"
              onClick={checkout}
					>Probar Saga</button>
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
                    key={singleTrack.trackid}
                    track={singleTrack}
                  />
            ) )
           ) : (
            currentTracks.map(singleTrack => (
              <StoreTrackListItem
                    key={singleTrack.trackid}
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

const mapDispatchToProps = (dispatch) => ({
  checkout(){ 
    dispatch(actions.startCheckout({
      invoicedate: '2020/10/10',
      billingaddress: 'A',
      billingcity: 'B',
      billingstate: 'C',
      billingcountry: 'E',
      billingpostalcode: 'X',
      total: 0.99
    }))
  }
});

export default connect(null,mapDispatchToProps)(StoreTracks);


