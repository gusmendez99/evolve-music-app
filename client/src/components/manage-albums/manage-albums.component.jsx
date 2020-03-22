import React, {Component} from 'react';
import { Link} from 'react-router-dom';
import { connect } from 'react-redux';

import AlbumListItem from '../album-list-item/album-list-item.component';

class ManageAlbums extends Component {
  constructor(){
    super()
    this.state = {
      albums: [],
    };
  };

  componentDidMount(){
    fetch('http://localhost:3000/albums')
    .then(response => response.json())
    .then(data => {
      this.setState({albums: data})
    });
  }

  updateState = () => {
    fetch('http://localhost:3000/albums')
    .then(response => response.json())
    .then(data => {
      this.setState({albums: data})
    });
  }

  render(){
    const { authUser } = this.props;

    return (
      <div>
        <div className="pa1 ph5-l tc">
          <h1 className="f3 fw6">Manage Albums</h1>
        </div>
        <div className="pa3 ph5-l">
          <div className="overflow-y-scroll vh-50">
            <table className="f6 w-100" cellSpacing="0">
              <thead>
                <tr>
                  <th className="fw6 bb b--black-20 tc pb3 pr3 bg-white">Name</th>
                  <th className="fw6 bb b--black-20 tc pb3 pr3 bg-white">Artist</th>
                  <th className="fw6 bb b--black-20 tc pb3 pr3 bg-white">Acciones</th>
                </tr>
              </thead>
              <tbody className="lh-copy">
                {
                  this.state.albums.map((singleAlbum)=>{
                    return (
                      <AlbumListItem
                      key={singleAlbum.albumid}
                      album={singleAlbum}
                      currentUser={authUser}
                      updateState={this.updateState}
                      />
                    );
                })
                }
              </tbody>
            </table>
          </div>
        </div>
        <div className="tc pa2">
        <Link className="f5 link dim ph4 pv3 m2 dib white bg-green" to={`/${authUser.rolename}/managealbums/new`}>Add Album</Link>
        </div>
      </div>    
    );
  }
}
const mapStateToProps = ({ user }) => {
  const { authUser } = user;
  return { authUser };
};

export default connect(mapStateToProps)(ManageAlbums);


