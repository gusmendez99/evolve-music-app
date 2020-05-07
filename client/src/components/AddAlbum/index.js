import React, { Component } from "react";
import CustomLink from "../CustomLink";
import { connect } from "react-redux";
import axios from 'axios';
import Select from "react-select";

import * as selectors from '../../redux/root-reducer';

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
    axios.get("http://localhost:3000/artists")
    .then(response => {
      const artistOptions = response.data.map(artist => {
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
    axios({
      method: "post",
      url: `http://localhost:3000/albums`,
      data: { ...this.state.album, userid: this.props.authUser.userid }
    })
    .then(response => console.log(response.status))
    .catch(error=> console.log(error));
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

const mapStateToProps = (state) => ({
  authUser: selectors.getAuthUser(state)
});

export default connect(mapStateToProps)(AddAlbum);
