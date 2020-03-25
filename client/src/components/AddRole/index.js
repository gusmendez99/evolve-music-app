import React, {Fragment} from 'react'
import Select from 'react-select';
import CustomLink from '../CustomLink';
import makeAnimated from 'react-select/animated';
import { connect } from 'react-redux'
import axios from 'axios';

class AddRole extends React.Component {

  constructor() {
    super()
    this.state = {
      role: {},
      name: '',
      permissions: [],
      allPermissions: [],
      id: null
    };
  };
  
  componentDidMount() {
    axios.get('http://localhost:3000/roles')
      .then(response => this.setState({ roles: response.data }))
      .catch(error=>console.log(error));

    axios.get('http://localhost:3000/permissions')
      .then(response => {
        const permissionOptions = response.data.map(permission => {
          return { value: permission.permissionid, label: permission.name };
        });
        this.setState({ allPermissions: permissionOptions })
      });
	}
  handleSubmit = async event => {
    const { name } = this.state;
    const role = await axios.post(`http://localhost:3000/roles`, { name });
    this.state.permissions.map(async value => {
      return (
        await axios.post(`http://localhost:3000/roles/${role.data.roleid}/permissions`, { permissionid: value.value})
          .then(response => console.log(response.status))
      )
    })
  };
  handleFieldChange = event => {
    const { value } = event.target
    const copy = value;
    this.setState({name:copy})

  }
  handleFieldSelect = selectedOptions => {
		if(selectedOptions) {
      const copy = selectedOptions
    	this.setState({ permissions: copy });
    } 
  }
  render() {
    const { allPermissions } = this.state;
    return (
      <Fragment>
        <section className="mw5 mw7-ns center bg-light-gray pa3 ph5-ns tc">
          <div className="tc dib">
            <label className="f6 b db mb2">Create New Role</label>
            <form className="pa4 black-80">
              <div className="measure">
                <label className="f6 b db mb2">Role Name</label>
                <input id="name" className="input-reset ba b--black-20 pa2 mb2 db w-100" type="text" aria-describedby="name-desc" placeholder="Insert a name" onChange={this.handleFieldChange} />
              </div>
              <label className="f6 b db mb2">Permissions</label>
              <Select
                className="mt-4 col-md-6 col-offset-4"
                components={makeAnimated()}
                isMulti
                options={allPermissions}
                onChange={this.handleFieldSelect}
              />
            </form>

            <CustomLink
							to={`/`}
							className="b ph3 pv2 input-reset ba b--green green bg-transparent grow pointer f6 dib"
							onClick={this.handleSubmit}>Create</CustomLink>

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


const mapStateToProps = ({ user }) => {
  const { authUser } = user;
  return { authUser };
};

export default connect(mapStateToProps)(AddRole);
