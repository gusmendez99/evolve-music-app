import React, { Component, Fragment } from "react";
import CustomLink from "../CustomLink";
import Select from "react-select";
import { connect } from 'react-redux'
import axios from 'axios';
import pullAllWith from "lodash/pullAllWith";
import isEqual from "lodash/isEqual";

const SELECT_ALBUM_OPTION = "SELECT_ALBUM_OPTION"
const SELECT_GENRE_OPTION = "SELECT_GENRE_OPTION"
const SELECT_MEDIATYPE_OPTION = "SELECT_MEDIATYPE_OPTION"


class TrackListItem extends Component {
  constructor() {
    super();
    this.state = {
      track: {},
      selectedAlbum: null,
      albums: [],
      selectedGenre: null,
      genres: [],
      selectedMediaType: null,
      mediaTypes: [],
      isInactive:[]
    };
  }
  componentDidMount() {
    axios.get(`http://localhost:3000/tracks/${this.props.track.trackid}`)
      .then(response => response.data)
      .then(data => {
        this.setState({
          track: data[0],
          selectedAlbum: { value: data[0].albumid, label: data[0].albumtitle },
          selectedGenre: { value: data[0].genreid, label: data[0].genrename },
          selectedMediaType: {
            value: data[0].mediatypeid,
            label: data[0].mediatypename
          }
        });
      })
      .catch(error => console.log(error));

    axios.get("http://localhost:3000/albums")
      .then(response => {
        const albumOptions = response.data.map(album => {
          return { value: album.albumid, label: album.title };
        });
        this.setState({ albums: albumOptions });
      })
      .catch(error => console.log(error));

    axios.get("http://localhost:3000/genres")
      .then(response => {
        const genreOptions = response.data.map(genre => {
          return { value: genre.genreid, label: genre.name };
        });
        this.setState({ genres: genreOptions });
      })
      .catch(error => console.log(error));

    axios.get("http://localhost:3000/mediatypes")
      .then(response => {
        const mediaTypeOptions = response.data.map(mediatype => {
          return { value: mediatype.mediatypeid, label: mediatype.name };
        });
        this.setState({ mediaTypes: mediaTypeOptions });
      })
      .catch(error => console.log(error));

    axios.get("http://localhost:3000/inactivetrack")
    .then(response => {
      this.setState({isInactive: response.data})
    })
    .catch(error => console.log(error));
  }

  handleUpdate = () => {
    axios({
      method: "put",
      url: `http://localhost:3000/tracks/${this.state.track.trackid}`,
      data: this.state.track
    })
    .then(response => console.log(response.status))
    .catch(error => console.log(error));
  };

  // TODO on delete cascade porque hay una llave foránea en playlisttrack referenciando al id de la pista
  handleDelete = () => {
    axios.delete(`http://localhost:3000/tracks/${this.state.track.trackid}`)
    .then(response => {
      if (response.status === 200) {
        this.props.updateState();
      }
    })
    .catch(error => console.log(error));
  };

  handleFieldChange = event => {
    const { name, value } = event.target;
    const copy = { ...this.state.track, [name]: value };
    this.setState({ track: copy });
  };

  handleSelectChange = (selectedOption, type) => {
    let copy = { ...this.state.track };
    switch(type){
      case SELECT_ALBUM_OPTION:
        copy.albumid = selectedOption.value
        this.setState({ selectedAlbum: selectedOption }, () => console.log(`Album selected:`, selectedOption));
        break;
      case SELECT_GENRE_OPTION:
        copy.genreid = selectedOption.value
        this.setState({ selectedGenre: selectedOption }, () => console.log(`Genre selected:`, selectedOption));
        break;
      case SELECT_MEDIATYPE_OPTION:
        copy.mediatypeid = selectedOption.value
        this.setState({ selectedMediaType: selectedOption }, () => console.log(`MediaType selected:`, selectedOption));
        break;
      default:
        return;
    }
    this.setState({ track: copy });


  }

  handleAlbumSelectChange = selectedOption => {
    if (selectedOption) this.handleSelectChange(selectedOption, SELECT_ALBUM_OPTION)
  };

  handleGenreSelectChange = selectedOption => {
    if (selectedOption) this.handleSelectChange(selectedOption, SELECT_GENRE_OPTION)
  };

  handleMediaTypeSelectChange = selectedOption => {
    if (selectedOption) this.handleSelectChange(selectedOption, SELECT_MEDIATYPE_OPTION)
  };

  handleCheck = event => {
    const { value, checked } = event.target;
    if(!checked){
      axios.delete(`http://localhost:3000/inactivetrack/${value}`)
      .then(response => console.log(response));
      const copy = pullAllWith(this.state.isInactive, [{"trackid":value}], isEqual);
      this.setState({isInactive:copy});
    }
    else {
      axios.post(`http://localhost:3000/inactivetrack/${value}`)
      .then(response => console.log(response));
      const copy = [...this.state.isInactive, {"trackid": value}]
      this.setState({isInactive:copy});
    }
  }

  render() {
    const { permissions } = this.props;

    const { track, selectedAlbum, albums, 
      selectedGenre, genres, selectedMediaType, mediaTypes  } = this.state;
    
    return (
      <Fragment>
        <tr>
          <td className="pv3 pr3 bb b--black-20">
            <input
              name="name"
              className="input-reset ba b--black-20 pa2 db w-100"
              type="text"
              placeholder={track.name}
              aria-describedby="name"
              onChange={this.handleFieldChange}
            />
          </td>
          <td className="pv3 pr3 bb b--black-20">
            <input
              name="composer"
              className="input-reset ba b--black-20 pa2 db w-100"
              type="text"
              placeholder={track.composer}
              aria-describedby="composer"
              onChange={this.handleFieldChange}
            />
          </td>
          <td className="pv3 pr3 bb b--black-20">
            <input
              name="milliseconds"
              className="input-reset ba b--black-20 pa2 db w-100"
              type="number"
              placeholder={track.milliseconds}
              aria-describedby="milliseconds"
              onChange={this.handleFieldChange}
            />
          </td>
          <td className="pv3 pr3 bb b--black-20">
            <input
              name="bytes"
              className="input-reset ba b--black-20 pa2 db w-100"
              type="number"
              placeholder={track.bytes}
              aria-describedby="bytes"
              onChange={this.handleFieldChange}
            />
          </td>
          <td className="pv3 pr3 bb b--black-20">
            <input
              name="unitprice"
              className="input-reset ba b--black-20 pa2 db w-100"
              type="text"
              placeholder={track.unitprice}
              aria-describedby="unitprice"
              onChange={this.handleFieldChange}
            />
          </td>
          <td className="pv3 pr3 bb b--black-20 w-10">
            <Select
              className="db f9 bg-white black pa2 pv1 w-100"
              options={albums}
              value={selectedAlbum}
              isClearable
              onChange={this.handleAlbumSelectChange}
            />
          </td>
          <td className="pv3 pr3 bb b--black-20 w-10">
            <Select
              className="db f9 bg-white black pa2 pv1 w-100"
              options={genres}
              value={selectedGenre}
              isClearable
              onChange={this.handleGenreSelectChange}
            />
          </td>
          <td className="pv3 pr3 bb b--black-20 w-10">
            <Select
              className="db f9 bg-white black pa2 pv1 w-100"
              options={mediaTypes}
              value={selectedMediaType}
              isClearable
              onChange={this.handleMediaTypeSelectChange}
            />
          </td>          
          <td className="pv3 pr3 bb b--black-20 w-10">
            <div className="tc">
              <input
                className="mr2"
                value={this.state.track.trackid}
                type="checkbox"
                checked={this.state.isInactive.filter(
                  item => item["trackid"] == this.state.track.trackid).length > 0}
                onChange={this.handleCheck}
              />
            </div>
            </td>
          
          {(permissions.canDeleteTrack || permissions.canUpdateTrack) && <td className="pv3 pr3 bb b--black-20 tc justify-center items-center">
            {permissions.canDeleteTrack && <CustomLink
              to={`/${this.props.currentUser.rolename}/managetracks`}
              className="b ph3 pv2 input-reset ba b--red red bg-transparent grow pointer f6 dib"
              onClick={this.handleDelete}
            >
              Delete
            </CustomLink>}
            {permissions.canUpdateTrack && <button
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

export default connect(mapStateToProps)(TrackListItem);
