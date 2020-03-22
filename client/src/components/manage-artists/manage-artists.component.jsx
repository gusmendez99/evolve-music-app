import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import ArtistListItem from "../artist-list-item/artist-list-item.component";

import './manage-artists.styles.css'

class ManageArtists extends Component {
  constructor() {
    super();
    this.state = {
      artists: [],
      searchField: ''
    };
  }

  componentDidMount() {
    fetch("http://localhost:3000/artists")
      .then(response => response.json())
      .then(data => {
        this.setState({ artists: data });
      });
  }

  updateState = index => {
    fetch("http://localhost:3000/artists")
      .then(response => response.json())
      .then(data => {
        this.setState({ artists: data });
      });
  };


  handleSearchFieldChange = event => {
    const { value } = event.target;
    this.setState({ searchField: value });
  };

  

  render() {
    const { authUser } = this.props;
    const { searchField } = this.state;

    return (
      <div>
        <div className="pa1 ph5-l tc">
          <h1 className="f3 fw6">Manage Artists</h1>
        </div>
        <div className="pa3 ph5-l ">
          <label className="f6 b db mb2 blue">Búsqueda</label>
          <input id="name" name="artist-name" onChange={this.handleSearchFieldChange} className="input-reset ba b--black-20 pa2 mb2 db w-100" type="text" aria-describedby="name-desc"/>
        </div>
        <div className="pa3 ph5-l">
          <div className="overflow-y-scroll vh-50">
          {
            this.state.artists.filter(
              artist => artist.name.toLowerCase().includes(searchField.toLowerCase())
            ).length === 0 &&
            <h4 className="f3 fw6">No artist found</h4>
          }
            <table className="f6 w-100" cellSpacing="0">
              <thead>
                <tr>
                  <th className="fw6 bb b--black-20 tc pb3 pr3 bg-white">
                    Name
                  </th>
                  <th className="fw6 bb b--black-20 tc pb3 pr3 bg-white">
                    Acciones
                  </th>
                </tr>
              </thead>
              

              <tbody className="lh-copy">
                

                {this.state.artists.filter(
                  artist => artist.name.toLowerCase().includes(this.state.searchField.toLowerCase())
                ).map((singleArtist, i) => {
                  return (
                    <ArtistListItem
                      key={singleArtist.artistid}
                      artist={singleArtist}
                      currentUser={authUser}
                      updateState={this.updateState}
                    />
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="tc pa2">
          

          <Link
            className="f5 link dim ph4 pv3 m2 dib white bg-green"
            to={`/${authUser.rolename}/manageartists/new`}
          >
            Add Artist
          </Link>
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ user }) => {
  const { authUser } = user;
  return { authUser };
};

export default connect(mapStateToProps)(ManageArtists);
