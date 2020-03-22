import React, { Component } from "react";
import CustomLink from "../CustomLink";
import { connect } from "react-redux";

class AddArtist extends Component {
  constructor() {
    super();
    this.state = {
      artist: {},
      roles: []
    };
  }
  componentDidMount() {
    fetch("http://localhost:3000/roles")
      .then(response => response.json())
      .then(data => {
        this.setState({ roles: data });
        //set default roleid
        const copy = {
          ...this.state.artist,
          roleid: this.state.roles[0].roleid
        };
        this.setState({ artist: copy });
      });
  }
  handleFieldChange = event => {
    const { name, value } = event.target;
    const copy = { ...this.state.artist, [name]: value };
    this.setState({ artist: copy });
  };
  handleSelectChange = event => {
    const { name, value } = event.target;
    const roleid = this.state.roles.filter(x => x.name === value)[0].roleid;
    const copy = { ...this.state.artist, [name]: roleid };
    this.setState({ artist: copy });
  };
  handleSubmit = () => {
    // agregar rolid por defecto, va a ser el default value del select
    fetch(`http://localhost:3000/artists`, {
      method: "post",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(this.state.artist)
    }).then(response => console.log(response.status));
  };

  render() {
    const { authUser } = this.props;
    return (
      <main className="pa4 black-80">
        <div className="measure center">
          <fieldset id="add_user" className="ba b--transparent ph0 mh0">
            <div className="flex justify-center items-center">
              <legend className="f4 fw6 ph0 mh0">Agregar Artista</legend>
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
          </fieldset>
          <div className="tc">
            <CustomLink
              to={`/${authUser.rolename}/manageartists`}
              className="b ph3 pv2 input-reset ba b--green green bg-transparent grow pointer f6 dib"
              onClick={this.handleSubmit}
            >
              Add Artist
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

export default connect(mapStateToProps)(AddArtist);
