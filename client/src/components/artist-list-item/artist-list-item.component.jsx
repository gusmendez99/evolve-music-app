import React, { Component, Fragment } from "react";
import CustomLink from "../CustomLink";

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
    const copy = { ...this.state.user, [name]: value };
    this.setState({ user: copy });
  };

  render() {
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
          <td className="pv3 pr3 bb b--black-20 flex justify-center items-center">
            <CustomLink
              to={`/${this.props.currentUser.rolename}/manageartists`}
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

export default ArtistListItem;
