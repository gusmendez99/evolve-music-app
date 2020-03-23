import React, { Component, Fragment } from "react";
import CustomLink from "../CustomLink";
import { connect } from 'react-redux'

class ArtistListItem extends Component {
  constructor() {
    super();
    this.state = {
      artist: {}
    };
  }
  componentDidMount() {
    fetch(`http://localhost:3000/artists/${this.props.artist.artistid}`)
      .then(response => response.json())
      .then(data => {
        this.setState({ artist: data[0] });
      });
  }

  handleUpdate = () => {
    console.log(this.state.artist)
    fetch(`http://localhost:3000/artists/${this.state.artist.artistid}`, {
      method: "put",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(this.state.artist)
    }).then(response => console.log(response.status));
  };

  handleDelete = () => {
    fetch(`http://localhost:3000/artists/${this.state.artist.artistid}`, {
      method: "delete"
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
              onClick={this.handleDelete}
            >
              Delete
            </CustomLink>}
            {permissions.canUpdateArtist && <button
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

export default connect(mapStateToProps)(ArtistListItem);
