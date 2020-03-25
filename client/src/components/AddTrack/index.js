import React, { Component } from "react";
import CustomLink from "../CustomLink";
import { connect } from "react-redux";
import Select from 'react-select';
import axios from 'axios';

const SELECT_ALBUM_OPTION = "SELECT_ALBUM_OPTION";
const SELECT_GENRE_OPTION = "SELECT_GENRE_OPTION";
const SELECT_MEDIATYPE_OPTION = "SELECT_MEDIATYPE_OPTION";

class AddTrack extends Component {
  constructor() {
    super();
    this.state = {
      track: {},
      selectedAlbum: null,
      albums: [],
      selectedGenre: null,
      genres: [],
      selectedMediaType: null,
      mediaTypes: []
    };
  }

  componentDidMount() {
    axios({
      method: "get",
      url: "http://localhost:3000/albums"
    })
    .then(response => {
      const albumOptions = response.data.map(album => {
        return { value: album.albumid, label: album.title };
      });
      this.setState({ albums: albumOptions });
    });

    axios({
      method: "get",
      url: "http://localhost:3000/genres"
    })
    .then(response => {
      const genreOptions = response.data.map(genre => {
        return { value: genre.genreid, label: genre.name };
      });
      this.setState({ genres: genreOptions });
    });

    axios({
      method: "get",
      url: "http://localhost:3000/mediatypes"
    })
    .then(response => {
      const mediaTypeOptions = response.data.map(mediatype => {
        return { value: mediatype.mediatypeid, label: mediatype.name };
      });
      this.setState({ mediaTypes: mediaTypeOptions });
    });
  }

  handleFieldChange = event => {
    const { name, value } = event.target;
    const copy = { ...this.state.track, [name]: value };
    this.setState({ track: copy });
  };

  handleSelectChange = (selectedOption, type) => {
    let copy = { ...this.state.track };
    switch (type) {
      case SELECT_ALBUM_OPTION:
        copy.albumid = selectedOption.value;
        this.setState({ selectedAlbum: selectedOption }, () =>
          console.log(`Album selected:`, selectedOption)
        );
        break;
      case SELECT_GENRE_OPTION:
        copy.genreid = selectedOption.value;
        this.setState({ selectedGenre: selectedOption }, () =>
          console.log(`Genre selected:`, selectedOption)
        );
        break;
      case SELECT_MEDIATYPE_OPTION:
        copy.mediatypeid = selectedOption.value;
        this.setState({ selectedMediaType: selectedOption }, () =>
          console.log(`MediaType selected:`, selectedOption)
        );
        break;
      default:
        return;
    }
    this.setState({ track: copy });
  };

  handleAlbumSelectChange = selectedOption => {
    if (selectedOption)
      this.handleSelectChange(selectedOption, SELECT_ALBUM_OPTION);
  };

  handleGenreSelectChange = selectedOption => {
    if (selectedOption)
      this.handleSelectChange(selectedOption, SELECT_GENRE_OPTION);
  };

  handleMediaTypeSelectChange = selectedOption => {
    if (selectedOption)
      this.handleSelectChange(selectedOption, SELECT_MEDIATYPE_OPTION);
  };

  handleSubmit = () => {
    axios({
      method: "post",
      url: `http://localhost:3000/tracks`,
      data: {...this.state.track, 'userid': this.props.authUser.userid}
    })
    .then(response => console.log(response.status))
    .catch(error => console.log(error)); 
  };

  render() {
    const { authUser } = this.props;
    const { selectedAlbum, albums, selectedGenre, genres, selectedMediaType, mediaTypes  } = this.state;
    return (
      <main className="pa4 black-80">
        <div className="measure center">
          <fieldset id="add_user" className="ba b--transparent ph0 mh0">
            <div className="flex justify-center items-center">
              <legend className="f4 fw6 ph0 mh0">Agregar Track</legend>
            </div>
            <div className="mt3">
              <label className="db fw6 lh-copy f6">Name</label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="text"
                name="name"
                onChange={this.handleFieldChange}
              ></input>
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6">Composer</label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="text"
                name="composer"
                onChange={this.handleFieldChange}
              ></input>
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6">Milliseconds</label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="number"
                name="milliseconds"
                onChange={this.handleFieldChange}
              ></input>
            </div>
            <div className="mt3">
              <label className="db fw6 lh-copy f6">Bytes</label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="number"
                name="bytes"
                onChange={this.handleFieldChange}
              ></input>
            </div>
            <div className="mt3">
              <label className="db fw6 lh-copy f6">Unit Price</label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="text"
                name="unitprice"
                onChange={this.handleFieldChange}
              ></input>
            </div>
            
            <div className="mv3">
              <label className="db fw6 lh-copy f6">Album</label>
              <Select
                className="db f9 bg-white black pa2 pv1 w-100"
                options={albums}
                value={selectedAlbum}
                isClearable
                onChange={this.handleAlbumSelectChange}
              />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6">Genre</label>
              <Select
                className="db f9 bg-white black pa2 pv1 w-100"
                options={genres}
                value={selectedGenre}
                isClearable
                onChange={this.handleGenreSelectChange}
              />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6">Media Type</label>
              <Select
                className="db f9 bg-white black pa2 pv1 w-100"
                options={mediaTypes}
                value={selectedMediaType}
                isClearable
                onChange={this.handleMediaTypeSelectChange}
              />
            </div>
          </fieldset>
          <div className="tc">
            <CustomLink
              to={`/${authUser.rolename}/managetracks`}
              className="b ph3 pv2 input-reset ba b--green green bg-transparent grow pointer f6 dib"
              onClick={this.handleSubmit}
            >
              Add Track
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

export default connect(mapStateToProps)(AddTrack);
