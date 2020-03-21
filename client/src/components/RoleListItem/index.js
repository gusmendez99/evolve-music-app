import React, {Component, Fragment} from 'react';
import CustomLink from '../CustomLink';
import pullAllWith from 'lodash/pullAllWith';
import isEqual from 'lodash/isEqual';

class RoleListItem extends Component {
    constructor(){
      super()
      this.state = {
				user: {},
				roleName: '',
				permissions: [],
				permissionsId: []
      };
		};
		componentDidMount(){
			fetch(`http://localhost:3000/users/${this.props.user.userid}`)
			.then(response => response.json())
			.then(data => {
				this.setState({user: data[0]})
			});
			fetch(`http://localhost:3000/users/${this.props.user.userid}/role`)
			.then(response => response.json())
			.then(data => {
				this.setState({roleName: data[0].name})
			});
			fetch(`http://localhost:3000/roles/${this.props.user.roleid}/permissions`)
			.then(response => response.json())
			.then(data => {
				this.setState({permissions: data})
			});
			fetch('http://localhost:3000/permissions')
			.then(response => response.json())
			.then(data => {
				this.setState({permissionsId: data})
			});
		}

		handleUpdate = () => {
			fetch(`http://localhost:3000/users/${this.state.user.userid}`, {
				method : 'put',
				headers : {'Content-type': 'application/json'},
				body : JSON.stringify({
					username: this.state.user.username,
					password: this.state.user.password,
					firstname: this.state.user.firstname,
					lastname: this.state.user.lastname,
					city: this.state.user.city,
					state: this.state.user.state,
					country: this.state.user.country,
					postalcode: this.state.user.postalcode,
					phone: this.state.user.phone,
					email: this.state.user.email,
					roleid: this.state.user.roleid,
					id: this.state.user.userid
				})
			})
			.then(response => console.log(response.status))   
		}

		handleDelete =() =>{
			fetch(`http://localhost:3000/users/${this.state.user.userid}`, {
				method : 'delete'
			})
			.then(response => {if(response.status===200){
				this.props.updateState(this.state.user.username)
			}})
			
		}
		handleFieldChange =(event) => {
			const {checked, value} = event.target;		
			if(!checked){
				console.log(this.state.permissions);
				const itemToPull = this.state.permissionsId.filter((item) => 
					item['permissionid'] == value)		
				const copy = pullAllWith(this.state.permissions, itemToPull, isEqual)
				this.setState({permissions:copy});
				console.log(this.state.permissions);
			}
			else {
				const itemToPush = this.state.permissionsId.filter(item =>
					item['permissionid'] == value);
				const copy = [...this.state.permissions, itemToPush[0]];
				this.setState({permissions:copy});
			}

		}

		handleSelectChange = (event) => {
			const {name, value} = event.target;
			const roleid = this.state.roles.filter(x => x.name === value)[0].roleid
			const copy = {...this.state.user, [name]: roleid}
			this.setState({user: copy});
		}
    render(){
				console.log("aqui va el render XD",this.state.user.roleid,this.state);
        return (
					<Fragment>
            <tr class="tc">
                <td className="pv3 pr3 bb b--black-20">

										<input name="username" className="input-reset ba b--black-20 pa2 db w-100" 
												type="text" 
												value={this.state.roleName}
												disabled="true"
												aria-describedby="username"
												onChange = {this.handleFieldChange}/>
									
                </td>
								<td className="pv3 pr3 bb b--black-20">
									<input class='mr2'
											value={1} 
											name="username"  
											type="checkbox"
											defaultChecked={this.state.permissions.map(item => 
												item.permissionid === this.value).length > 0 ? 'true' : 'false'}
											onClick={this.handleFieldChange}
											/>
                </td>
								<td className="pv3 pr3 bb b--	black-20">
									<input class='mr2' 
											value={2}
											name="username"  
											type="checkbox"
											checked={this.state.permissions.map(item => 
												item.permissionid === this.value).length > 0 ? 'true' : 'false'}
											/>
                </td>
								<td className="pv3 pr3 bb b--black-20">
									<input class='mr2' 
											value={3}
											name="username"  
											type="checkbox"
											checked={this.state.permissions.map(item => 
												item.permissionid === this.value).length > 0 ? 'true' : 'false'}/>
                </td>
								<td className="pv3 pr3 bb b--black-20">
									<input class='mr2' 
											value={4}
											name="username"  
											type="checkbox"
											checked={this.state.permissions.map(item => 
												item.permissionid === this.value).length > 0 ? 'true' : 'false'}	/>
                </td>
								<td className="pv3 pr3 bb b--black-20">
									<input class='mr2' 
											value={5}
											name="username"  
											type="checkbox"
											checked={this.state.permissions.map(item => 
												item.permissionid === this.value).length > 0 ? 'true' : 'false'}/>
                </td>
								<td className="pv3 pr3 bb b--black-20">
									<input class='mr2' 
											value={6}
											name="username"  
											type="checkbox"
											checked={this.state.permissions.map(item => 
												item.permissionid === this.value).length > 0 ? 'true' : 'false'}/>
                </td>
								<td className="pv3 pr3 bb b--black-20">
									<input class='mr2' 	
											value={7}
											name="username"  
											type="checkbox"
											checked={this.state.permissions.map(item => 
												item.permissionid === this.value).length > 0 ? 'true' : 'false'}/>
                </td>
								<td className="pv3 pr3 bb b--black-20">
									<input class='mr2'
											value={8} 
											name="username"  
											type="checkbox"
											checked={this.state.permissions.map(item => 
												item.permissionid === this.value).length > 0 ? 'true' : 'false'}	/>
                </td>
								<td className="pv3 pr3 bb b--black-20">
									<input class='mr2' 
											value={9}
											name="username"  
											type="checkbox"
											checked={this.state.permissions.map(item => 
												item.permissionid === this.value).length > 0 ? 'true' : 'false'}	/>
                </td>
								<td className="pv3 pr3 bb b--black-20">
									<input class='mr2' 
											value={10}
											name="username"  
											type="checkbox"
											checked={this.state.permissions.map(item => 
												item.permissionid === this.value).length > 0 ? 'true' : 'false'}/>
                </td>
								<td className="pv3 pr3 bb b--black-20">
									<input class='mr2' 
											value={11}
											name="username"  
											type="checkbox"
											checked={this.state.permissions.map(item => 
												item.permissionid === this.value).length > 0 ? 'true' : 'false'}/>
                </td>
								<td className="pv3 pr3 bb b--black-20">
									<input class='mr2'
											value={12} 
											name="username"  
											type="checkbox"
											checked={this.state.permissions.map(item => 
												item.permissionid === this.value).length > 0 ? 'true' : 'false'}/>
                </td>
								<td className="pv3 pr3 bb b--black-20">
									<input class='mr2' 
											value={13}
											name="username"  
											type="checkbox"
											checked={this.state.permissions.map(item => 
												item.permissionid === this.value).length > 0 ? 'true' : 'false'}/>
											
                </td>
								<td className="pv3 pr3 bb b--black-20">
									<input class='mr2' 
											value={14}
											name="username"  
											type="checkbox"
											checked={this.state.permissions.map(item => 
												item.permissionid === this.value).length > 0 ? 'true' : 'false'}/>
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

export default RoleListItem;