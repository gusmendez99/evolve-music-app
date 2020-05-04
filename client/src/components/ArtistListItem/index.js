import React, { Component, Fragment } from "react";
import CustomLink from "../CustomLink";
import { connect } from 'react-redux';
import axios from "axios";

import * as selectors from '../../redux/root-reducer'

class ArtistListItem extends Component {
  constructor() {
    super();
    this.state = {
      artist: {}
    };
  }
  componentDidMount() {
    axios.get(`http://localhost:3000/artists/${this.props.artist.artistid}`)
      .then(response => {
        this.setState({ artist: response.data[0] });
      });
  }

  handleUpdate = () => {
    console.log(this.state.artist)
    axios({
      method: "put",
      url: `http://localhost:3000/artists/${this.state.artist.artistid}`,
      data: this.state.artist
    })
    .then(response => {
      console.log(response.status)
    });
  };

  handleDelete = () => {
    axios({
      method: "delete",
      url: `http://localhost:3000/artists/${this.state.artist.artistid}`
    }).then(response => {
      if (response.status === 200) {
        this.props.updateState();
      }
    });
  };
  handleFieldChange = event => {
    const { name, value } = event.target;
    const copy = { ...this.state.artist, [name]: value };
    this.setState({ artist: copy });
  };

  render() {
    const { permissions } = this.props;

    return (
      <Fragment>
        <tr>
          <td className="pv3 pr3 bb b--black-20">
            <input
              name="name"
              className="input-reset ba b--black-20 pa2 db w-100"
              type="text"
              placeholder={this.state.artist.name}
              aria-describedby="name"
              onChange={this.handleFieldChange}
            />
          </td>
          {(permissions.canDeleteArtist || permissions.canUpdateArtist) && <td className="pv3 pr3 bb b--black-20 flex justify-center items-center">
            {permissions.canDeleteArtist && <CustomLink
              to={`/${this.props.currentUser.rolename}/manageartists`}
              className="b ph3 pv2 input-reset ba b--red red bg-transparent grow pointer f6 dib"
              onClick={() => {
                this.handleDelete()            
              }}
            >
              Delete
            </CustomLink>}
            {permissions.canUpdateArtist && <button
              className="b ph3 pv2 input-reset ba b--blue blue bg-transparent grow pointer f6 dib ma2"
              onClick={() => {
                this.handleUpdate()
                
              }}
            >
              Update
            </button>}
          </td>}
        </tr>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  permissions: selectors.getAuthUserPermissions(state)
});

export default connect(mapStateToProps)(ArtistListItem);
