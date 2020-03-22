import React, { Component, Fragment } from "react";
import CustomLink from "../CustomLink";
import pullAllWith from "lodash/pullAllWith";
import isEqual from "lodash/isEqual";
import range from "lodash/range";

class RoleListItem extends Component {
  constructor() {
    super();
    this.state = {
      role: {},
      permissions: [],
      allPermissions: []
    };
  }
  componentDidMount() {
    fetch(`http://localhost:3000/roles/${this.props.role.roleid}`)
      .then(response => response.json())
      .then(data => {
        this.setState({ role: data[0] });
      });

    fetch(`http://localhost:3000/roles/${this.props.role.roleid}/permissions`)
      .then(response => response.json())
      .then(data => {
        this.setState({ permissions: data });
      });
    fetch("http://localhost:3000/permissions")
      .then(response => response.json())
      .then(data => {
        this.setState({ allPermissions: data });
      });
  }

  handleUpdate = () => {

    fetch(`http://localhost:3000/roles/${this.state.role.roleid}`, {
      method: "put",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(this.state.permissions)
    }).then(response => console.log(response.status));
  };

  handleFieldChange = event => {
    const { checked, value } = event.target;
    if (!checked) {
      console.log(this.state.permissions);
      const itemToPull = this.state.allPermissions.filter(
        item => item["permissionid"] == value
      );
      const copy = pullAllWith(this.state.permissions, itemToPull, isEqual);
      this.setState({ permissions: copy });
      console.log("Esto le mando ->".itemToPull);

      fetch(
        `http://localhost:3000/roles/${this.state.role.roleid}/permissions/${value}`,
        {
          method: "delete"
        }
      ).then(response => console.log(response.status));
    } else {
      const itemToPush = this.state.allPermissions.filter(
        item => item["permissionid"] == value
      );
      const copy = [...this.state.permissions, itemToPush[0]];
      this.setState({ permissions: copy });

      console.log(itemToPush[0]);

      fetch(
        `http://localhost:3000/roles/${this.state.role.roleid}/permissions`,
        {
          method: "post",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(itemToPush[0])
        }
      ).then(response => console.log(response.status));
    }
  };

  render() {
    //console.log("aquí va el state", this.state.permissions);
    return (
      <Fragment>
        <tr className="tc">
          <td className="pv3 pr3 bb b--black-20">
            <input
              name="name"
              className="input-reset ba b--black-20 pa2 db w-100"
              type="text"
              placeholder={this.state.role.name}
              aria-describedby="name"
              onChange={this.handleFieldChange}
            />
          </td>

          {range(this.state.allPermissions.length).map((val, index) => (
            <td className="pv3 pr3 bb b--black-20" key={index}>
              <input
                className="mr2"
                key={index}
                value={val + 1}
                type="checkbox"
                checked={
                  this.state.permissions.filter(
                    item => item["permissionid"] == val + 1
                  ).length > 0
                }
                onChange={this.handleFieldChange}
              />
            </td>
          ))}
          <td className="pv3 pr3 bb b--black-20 flex justify-center items-center">
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

export default RoleListItem;
