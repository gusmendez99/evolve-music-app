import React,{Component} from 'react';
import CustomLink from '../CustomLink';
import { connect } from 'react-redux';
import axios from 'axios';

class AddUser extends Component {
	constructor(){
		super()
		this.state = {
			user: {},
			roles: []
		};
	};
	componentDidMount(){
		axios.get('http://localhost:3000/roles')
			.then(response => {
				this.setState({roles: response.data})
				const copy = {...this.state.user, 'roleid': this.state.roles[0].roleid}
				this.setState({user: copy})
			});
	}
	handleFieldChange =(event) => {
		const {name, value} = event.target;
		const copy = {...this.state.user, [name]: value}
		this.setState({user: copy});
	}
	handleSelectChange = (event) => {
		const {name, value} = event.target;
		const roleid = this.state.roles.filter(x => x.name === value)[0].roleid
		const copy = {...this.state.user, [name]: roleid}
		this.setState({user: copy});
	}
	handleSubmit =() =>{
		axios({
			method: 'post',
			url: `http://localhost:3000/users`,
			data: this.state.user})
		.then(response => console.log(response.status))   
	}
	
	render(){
		const { authUser } = this.props;
		return (
			<main className="pa4 black-80">
					<div className="measure center">
							<fieldset id="add_user" className="ba b--transparent ph0 mh0">
							<div className="flex justify-center items-center">
								<legend className="f4 fw6 ph0 mh0">Agregar Usuario</legend>
							</div>
							<div className="mt3">
									<label className="db fw6 lh-copy f6" >Username</label>
									<input 
									className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
									type="text" 
									name="username"
									onChange={this.handleFieldChange}></input>
							</div>
							<div className="mv3">
									<label className="db fw6 lh-copy f6" >Password</label>
									<input 
									className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
									type="password" 
									name="password"
									onChange={this.handleFieldChange}></input>
							</div>
							<div className="mv3">
									<label className="db fw6 lh-copy f6" >First Name</label>
									<input 
									className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
									type="text" 
									name="firstname"
									onChange={this.handleFieldChange}></input>
							</div>
							<div className="mt3">
									<label className="db fw6 lh-copy f6" >Last Name</label>
									<input 
									className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
									type="text" 
									name="lastname"
									onChange={this.handleFieldChange}></input>
							</div>
							<div className="mt3">
									<label className="db fw6 lh-copy f6" >City</label>
									<input 
									className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
									type="text" 
									name="city"
									onChange={this.handleFieldChange}></input>
							</div>
							<div className="mt3">
									<label className="db fw6 lh-copy f6" >State</label>
									<input 
									className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
									type="text" 
									name="state"
									onChange={this.handleFieldChange}></input>
							</div>
							<div className="mt3">
									<label className="db fw6 lh-copy f6" >Country</label>
									<input 
									className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
									type="text" 
									name="country"
									onChange={this.handleFieldChange}></input>
							</div>
							<div className="mt3">
									<label className="db fw6 lh-copy f6" >Postal Code</label>
									<input 
									className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
									type="text" 
									name="postalcode"
									onChange={this.handleFieldChange}></input>
							</div>
							<div className="mt3">
									<label className="db fw6 lh-copy f6" >Phone Number</label>
									<input 
									className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
									type="text" 
									name="phone"
									onChange={this.handleFieldChange}></input>
							</div>
							<div className="mt3">
									<label className="db fw6 lh-copy f6" >Email</label>
									<input 
									className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
									type="text" 
									name="email"
									onChange={this.handleFieldChange}></input>
							</div>
							<div className="mv3">
								<select className="db f6 bg-white black pr4 pv1 w-100" name="roleid" onChange={this.handleSelectChange}>
									{
									this.state.roles.map((role, i) => {
											return (
												<option 
												key={i}
												value={role.name}>{role.name}</option>
											);})
									}
								</select>
							</div>
							</fieldset>
							<div className="tc">
							<CustomLink
							to={`/${authUser.rolename}/manageusers`}
							className="b ph3 pv2 input-reset ba b--green green bg-transparent grow pointer f6 dib"
							onClick={this.handleSubmit}>Add User</CustomLink>
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

export default connect(mapStateToProps)(AddUser);

