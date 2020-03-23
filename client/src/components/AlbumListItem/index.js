import React, { Component, Fragment } from "react";
import  Select  from "react-select";

import CustomLink from "../CustomLink";


class AlbumListItem extends Component {
  constructor() {
    super();
    this.state = {
      album: {},
			selectedArtist: null,
      artists: []
    };
  }
  componentDidMount() {

    fetch(`http://localhost:3000/albums/${this.props.album.albumid}`)
      .then(response => response.json())
      .then(data => {
        this.setState({ album: data[0], selectedArtist: { value: data[0].artistid , label: data[0].artistname }});
      });

    fetch("http://localhost:3000/artists")
      .then(response => response.json())
      .then(data => {

				const artistOptions = data.map(artist => {
					return { value: artist.artistid, label: artist.name }
				})

        this.setState({ artists: artistOptions });
      });
  }

  handleUpdate = () => {
		console.log(this.state.album)
    fetch(`http://localhost:3000/albums/${this.state.album.albumid}`, {
      method: "put",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(this.state.album)
    }).then(response => console.log(response.status));
  };

  handleDelete = () => {
    fetch(`http://localhost:3000/users/${this.state.album.albumid}`, {
      method: "delete"
    }).then(response => {
      if (response.status === 200) {
        this.props.updateState();
      }
    });
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
		const { album, selectedArtist, artists } = this.state;

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
          <td className="pv3 pr3 bb b--black-20 flex justify-center items-center">
            <CustomLink
              to={`/${this.props.currentUser.rolename}/managealbums`}
              className="b ph3 pv2 input-reset ba b--red red bg-transparent grow pointer f6 dib"
              onClick={this.handleDelete}
            >
              Delete
            </CustomLink>
            <button
              className="b ph3 pv2 input-reset ba b--blue blue bg-transparent grow pointer f6 dib ma2"
              onClick={this.handleUpdate}
            >
              Update
            </button>
          </td>
        </tr>
      </Fragment>
    );
  }
}

export default AlbumListItem;
