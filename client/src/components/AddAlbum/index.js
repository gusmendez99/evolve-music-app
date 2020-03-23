import React, { Component } from "react";
import CustomLink from "../CustomLink";
import { connect } from "react-redux";

import Select from "react-select";

class AddAlbum extends Component {
  constructor() {
    super();
    this.state = {
      album: {},
      selectedArtist: null,
      artists: []
    };
  }
  componentDidMount() {
    fetch("http://localhost:3000/artists")
      .then(response => response.json())
      .then(data => {
        const artistOptions = data.map(artist => {
          return { value: artist.artistid, label: artist.name };
        });

        this.setState({ artists: artistOptions });
      });
  }
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

  handleSubmit = () => {
    // agregar rolid por defecto, va a ser el default value del select
    fetch(`http://localhost:3000/albums`, {
      method: "post",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(this.state.album)
    }).then(response => console.log(response.status));
  };

  render() {
    const { authUser } = this.props;
    const { artists, selectedArtist } = this.state;

    return (
      <main className="pa4 black-80">
        <div className="measure center">
          <fieldset id="add_user" className="ba b--transparent ph0 mh0">
            <div className="flex justify-center items-center">
              <legend className="f4 fw6 ph0 mh0">Agregar Album</legend>
            </div>
            <div className="mt3">
              <label className="db fw6 lh-copy f6">Title</label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="text"
                name="title"
                onChange={this.handleFieldChange}
              ></input>
            </div>

            <div className="mv3">
            <label className="db fw6 lh-copy f6">Artist</label>
              <Select
                className="db f6 bg-white black pr4 pv1 w-100"
                options={artists}
                value={selectedArtist}
                isClearable
                onChange={this.handleSelectChange}
              />
            </div>
          </fieldset>
          <div className="tc">
            <CustomLink
              to={`/${authUser.rolename}/managealbums`}
              className="b ph3 pv2 input-reset ba b--green green bg-transparent grow pointer f6 dib"
              onClick={this.handleSubmit}
            >
              Add Album
            </CustomLink>
          </div>
        </div>
      </main>
    );
  }
}

const mapStateToProps = ({ user }) => {
  const { authUser } = user;
  return { authUser };
};

export default connect(mapStateToProps)(AddAlbum);
