import React, { Fragment } from "react";
import CustomLink from "../CustomLink";
import { connect } from "react-redux";
import axios from "axios";

import * as selectors from "../../redux/root-reducer";

class AddRole extends React.Component {
  constructor() {
    super();
    this.state = {
      role: {},
      name: "",
      id: null,
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:3000/roles")
      .then((response) => this.setState({ roles: response.data }))
      .catch((error) => console.log(error));

  }
  handleSubmit = async (event) => {
    const { name } = this.state;
    axios.post(`http://localhost:3000/roles`, { name }).then(response => console.log(response));
  };

  handleFieldChange = (event) => {
    const { value } = event.target;
    const copy = value;
    this.setState({ name: copy });
  };
  
  render() {
    const { authUser } = this.props;
    return (
      <Fragment>
        <section className="mw5 mw7-ns center pa3 ph5-ns tc">
          <div className="tc dib">
            <h1 className="f6 b db mb2">Create New Role</h1>
            <form className="pa4 black-80">
              <div className="measure">
                <label className="f6 b db mb2">Role Name</label>
                <input
                  id="name"
                  className="input-reset ba b--black-20 pa2 mb2 db w-100"
                  type="text"
                  aria-describedby="name-desc"
                  placeholder="Insert a name"
                  onChange={this.handleFieldChange}
                />
              </div>
            </form>

            <CustomLink
              to={`/${authUser.rolename}/manageroles`}
              className="b ph3 pv2 input-reset ba b--green green bg-transparent grow pointer f6 dib"
              onClick={this.handleSubmit}
            >
              Create
            </CustomLink>

            {/* <button
              className="b ph3 pv2 input-reset ba b--green green bg-transparent grow pointer f6 dib ma2"
              onClick={this.handleSubmit}
            >
              Create
            </button> */}
          </div>
        </section>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  authUser: selectors.getAuthUser(state),
});

export default connect(mapStateToProps)(AddRole);
