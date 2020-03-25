import React, { Component, Fragment } from "react";
import  Select  from "react-select";
import { connect } from 'react-redux';
import axios from 'axios';

import CustomLink from "../CustomLink";

class AlbumListItem extends Component {
  constructor() {
    super();
    this.state = {
      album: {},
			selectedArtist: null
    };
  }
  componentDidMount() {

    axios.get(`http://localhost:3000/albums/${this.props.album.albumid}`)
      .then(response => {
        this.setState({ album: response.data[0], selectedArtist: { value: response.data[0].artistid , label: response.data[0].artistname }});
      })
      .catch(error=>console.log(error));

    
  }

  handleUpdate = () => {
    axios({
      method: "put",
      url: `http://localhost:3000/albums/${this.state.album.albumid}`,
      data: this.state.album
    })
    .then(response => console.log(response.status))
    .catch(error=>console.log(error));
  };

  handleDelete = () => {
    axios({
      method: "delete",
      url: `http://localhost:3000/albums/${this.state.album.albumid}`
    })
    .then(response => {
      if (response.status === 200) {this.props.updateState();}
    })
    .catch(error=> console.log(error));
  };
  handleFieldChange = event => {
    const { name, value } = event.target;
    const copy = { ...this.state.album, [name]: value };
    this.setState({ album: copy });
  };

  handleSelectChange = selectedOption => {
		if(selectedOption) {
			const copy = { ...this.state.album, artistid: selectedOption.value };
    	this.setState({ album: copy });
		} 
		
		this.setState({ selectedArtist: selectedOption }, () => console.log(`Option selected:`, selectedOption));
		    
  };
  
  render() {
    const { permissions, artists } = this.props;
		const { album, selectedArtist } = this.state;

    return (
      <Fragment>
        <tr>
          <td className="pv3 pr3 bb b--black-20">
            <input
              name="title"
              className="input-reset ba b--black-20 pa2 db w-100"
              type="text"
              placeholder={album.title}
              aria-describedby="title"
              onChange={this.handleFieldChange}
            />
          </td>
          <td className="pv3 pr3 bb b--black-20">
            <Select
							className="db f9 bg-white black pa2 pv1 w-100"
              options={artists}
							value={selectedArtist}
              isClearable
              onChange={this.handleSelectChange}
            />
          </td>
          {(permissions.canDeleteAlbum || permissions.canUpdateAlbum) && <td className="pv3 pr3 bb b--black-20 flex justify-center items-center">
            {permissions.canDeleteAlbum && <CustomLink
              to={`/${this.props.currentUser.rolename}/managealbums`}
              className="b ph3 pv2 input-reset ba b--red red bg-transparent grow pointer f6 dib"
              onClick={this.handleDelete}
            >
              Delete
            </CustomLink>}
            {permissions.canUpdateAlbum && <button
              className="b ph3 pv2 input-reset ba b--blue blue bg-transparent grow pointer f6 dib ma2"
              onClick={this.handleUpdate}
            >
              Update
            </button>}
          </td>}
        </tr>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ user }) => {
  const { permissions } = user;
  return { permissions };
};

export default connect(mapStateToProps)(AlbumListItem);