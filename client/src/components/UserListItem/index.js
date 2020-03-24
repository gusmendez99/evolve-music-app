import React, {Component, Fragment} from 'react';
import Select from 'react-select';
import axios from 'axios';
import CustomLink from '../CustomLink';
class UserListItem extends Component {

	constructor(){
		super()
		this.state = {
			user: {},
			currentRole: {},
			roles: []
		};
	};
	componentDidMount(){
		// get user for current ListItem
		axios
		.get(`http://localhost:3000/users/${this.props.user.userid}`)
		.then(response => this.setState({user: response.data[0]}))
		.catch(error => console.log(error));

		// get the role the user and assign to currentRole in format {value: , label} (for select purposes)
		axios
		.get(`http://localhost:3000/users/${this.props.user.userid}/role`)
		.then(response => {
			this.setState({currentRole: {value: response.data[0].roleid, label:response.data[0].name}})
		})
		.catch(error => console.log(error));
		
		
		axios.get('http://localhost:3000/roles')
		.then(response => {
			this.setState({roles: response.data})
		})
		.catch(error => console.log(error));
	}

	handleUpdate = () => {
		axios({
			method: 'put',
			url: `http://localhost:3000/users/${this.state.user.userid}`,
			data: this.state.user,
	 })
		.then(response => console.log(response.status)); 
	}

	handleDelete =() =>{
		axios.delete(`http://localhost:3000/users/${this.state.user.userid}`)
		.then(response => {if(response.status===200){
			this.props.updateState(this.state.user.username)
		}})
		.catch(error =>console.log(error));	
	}
	handleFieldChange =(event) => {
		const {name, value} = event.target;
		const copy = {...this.state.user, [name]: value}
		this.setState({user: copy});
	}

	handleSelectChange = (selectedOption) => {
		if(selectedOption) {
			const copy = {...this.state.user, 'roleid': selectedOption.value}
			this.setState({user: copy});
			this.setState({currentRole: selectedOption})
		} 			
	}
	render(){
		const {currentRole} =this.state;
		const myOptions = this.state.roles.map(role => ({value: role.roleid, label: role.name}))
		console.log(this.state);
			return (
				<Fragment>
					<tr>
							<td className="pv3 pr3 bb b--black-20">
								<input name="username" className="input-reset ba b--black-20 pa2 db w-100" 
										type="text" 
										placeholder={this.state.user.username}
										aria-describedby="username"
										onChange = {this.handleFieldChange}/>
							</td>
							<td className="pv3 pr3 bb b--black-20">
									<input name="firstname" className="input-reset ba b--black-20 pa2 db w-100" 
									type="text" 
									placeholder={this.state.user.firstname}
									aria-describedby="firstname"
									onChange = {this.handleFieldChange}/>
							</td>
							<td className="pv3 pr3 bb b--black-20">
									<input name="lastname" className="input-reset ba b--black-20 pa2 db w-100" 
									type="text" 
									placeholder={this.state.user.lastname}
									aria-describedby="lastname"
									onChange = {this.handleFieldChange}/>
							</td>
							<td className="pv3 pr3 bb b--black-20">
									<input name="email" className="input-reset ba b--black-20 pa2 db w-100" 
									type="text" 
									aria-describedby="email" 
									placeholder={this.state.user.email}
									onChange = {this.handleFieldChange}/>
							</td>
							<td className="pv3 pr3 bb b--black-20">
									<input name="phone" className="input-reset ba b--black-20 pa2 db w-100" 
									type="text" 
									aria-describedby="phone" 
									placeholder={this.state.user.phone}
									onChange = {this.handleFieldChange}/>
							</td>
							<td className="pv3 pr3 bb b--black-20">
									<input name="country" className="input-reset ba b--black-20 pa2 db w-100" 
									type="text" 
									aria-describedby="country" 
									placeholder={this.state.user.country}
									onChange = {this.handleFieldChange}/>
							</td>
							<td className="pv3 pr3 bb b--black-20 w-20">
								<Select className="db f6 bg-white black pv1 w-100" 
								onChange={this.handleSelectChange}
								value={currentRole}
								options={myOptions}/>
							</td>
							<td className="pv3 pr3 bb b--black-20 flex justify-center items-center">
								<CustomLink
								to={`/${this.props.currentUser.rolename}/manageusers`}
								className="b ph3 pv2 input-reset ba b--red red bg-transparent grow pointer f6 dib"
								onClick={this.handleDelete}>Delete</CustomLink>
								<button
								className="b ph3 pv2 input-reset ba b--blue blue bg-transparent grow pointer f6 dib ma2"
								onClick={this.handleUpdate}>Update</button>
							</td>
					</tr>
					</Fragment>
			);
	}
}

export default UserListItem;