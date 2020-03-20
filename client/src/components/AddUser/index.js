import React,{Component} from 'react';
import CustomLink from '../CustomLink';

class AddUser extends Component {
	constructor(){
		super()
		this.state = {
			user: {},
			roles: []
		};
	};
	componentDidMount(){
		fetch('http://localhost:3000/roles')
			.then(response => response.json())
			.then(data => {
				this.setState({roles: data})
				//set default roleid
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
		// agregar rolid por defecto, va a ser el default value del select
		fetch(`http://localhost:3000/users`, {
				method : 'post',
				headers : {'Content-type': 'application/json'},
				body : JSON.stringify({
					username: this.state.user.username,
					firstname: this.state.user.firstname,
					password: this.state.user.password,
					lastname: this.state.user.lastname,
					city: this.state.user.city,
					state: this.state.user.state,
					country: this.state.user.country,
					postalcode: this.state.user.postalcode,
					phone: this.state.user.phone,
					email: this.state.user.email,
					roleid: this.state.user.roleid
				})
			})
		.then(response => console.log(response.status))   
	}
	
	render(){
		return (
			<main className="pa4 black-80">
					<div className="measure center">
							<fieldset id="add_user" className="ba b--transparent ph0 mh0">
							<div className="flex justify-center items-center">
								<legend className="f4 fw6 ph0 mh0">Agregar Usuario</legend>
							</div>
							<div className="mt3">
									<label className="db fw6 lh-copy f6" for="username">Username</label>
									<input 
									className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
									type="text" 
									name="username"
									onChange={this.handleFieldChange}></input>
							</div>
							<div className="mv3">
									<label className="db fw6 lh-copy f6" for="password">Password</label>
									<input 
									className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
									type="password" 
									name="password"
									onChange={this.handleFieldChange}></input>
							</div>
							<div className="mv3">
									<label className="db fw6 lh-copy f6" for="firstname">First Name</label>
									<input 
									className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
									type="text" 
									name="firstname"
									onChange={this.handleFieldChange}></input>
							</div>
							<div className="mt3">
									<label className="db fw6 lh-copy f6" for="lastname">Last Name</label>
									<input 
									className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
									type="text" 
									name="lastname"
									onChange={this.handleFieldChange}></input>
							</div>
							<div className="mt3">
									<label className="db fw6 lh-copy f6" for="city">City</label>
									<input 
									className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
									type="text" 
									name="city"
									onChange={this.handleFieldChange}></input>
							</div>
							<div className="mt3">
									<label className="db fw6 lh-copy f6" for="state">State</label>
									<input 
									className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
									type="text" 
									name="state"
									onChange={this.handleFieldChange}></input>
							</div>
							<div className="mt3">
									<label className="db fw6 lh-copy f6" for="country">Country</label>
									<input 
									className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
									type="text" 
									name="country"
									onChange={this.handleFieldChange}></input>
							</div>
							<div className="mt3">
									<label className="db fw6 lh-copy f6" for="postalcode">Postal Code</label>
									<input 
									className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
									type="text" 
									name="postalcode"
									onChange={this.handleFieldChange}></input>
							</div>
							<div className="mt3">
									<label className="db fw6 lh-copy f6" for="tel">Phone Number</label>
									<input 
									className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
									type="text" 
									name="phone"
									onChange={this.handleFieldChange}></input>
							</div>
							<div className="mt3">
									<label className="db fw6 lh-copy f6" for="email">Email</label>
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
							to={`/${this.props.currentUser.username}/manageusers`}
							className="b ph3 pv2 input-reset ba b--green green bg-transparent grow pointer f6 dib"
							onClick={this.handleSubmit}>Add User</CustomLink>
							</div>
					</div>
			</main>
		);
	}
}

export default AddUser;