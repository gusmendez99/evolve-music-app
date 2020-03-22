import React, {Component, Fragment} from 'react';
import CustomLink from '../CustomLink';
import pullAllWith from 'lodash/pullAllWith';
import isEqual from 'lodash/isEqual';
import range from 'lodash/range';

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
			fetch(`http://localhost:3000/roles/${this.state.user.userid}`, {
				method : 'put',
				headers : {'Content-type': 'application/json'},
				body : JSON.stringify(this.state.permissions)
			})
			.then(response => console.log(response.status))   
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

				fetch(`http://localhost:3000/roles/${this.state.user.userid}/permissions/${value}`, {
					method : 'delete'
				})
				.then(response => console.log(response.status))   
	

			}
			else {
				const itemToPush = this.state.permissionsId.filter(item =>
					item['permissionid'] == value);
				const copy = [...this.state.permissions, itemToPush[0]];
				this.setState({permissions:copy});

				fetch(`http://localhost:3000/roles/${this.state.user.userid}/permissions`, {
					method : 'post',
					headers : {'Content-type': 'application/json'},
					body : JSON.stringify(itemToPush)
				})
				.then(response => console.log(response.status))   
	

			}


		}


    render(){
			console.log("aquí va el state", this.state.permissions)
        return (
					<Fragment>
            <tr className="tc">
                <td className="pv3 pr3 bb b--black-20">
										<input name="username" className="input-reset ba b--black-20 pa2 db w-100" 
												type="text" 
												value={this.state.roleName}
												disabled={true}
												aria-describedby="username"
												onChange = {this.handleFieldChange}/>
                </td>

								{
									
									range(14).map(
									(val, index) => (
										<td className="pv3 pr3 bb b--black-20" key={index}>
										<input className='mr2'
												key={index}
												value={val+1} 
												type="checkbox"
												checked={this.state.permissions.filter(item => 
													item['permissionid'] == (val+1)).length > 0}
												onChange={this.handleFieldChange}
												/>
									</td>
									)
									)
								}
								{/* <td className="pv3 pr3 bb b--black-20">
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
                </td>*/}
								<td className="pv3 pr3 bb b--black-20 flex justify-center items-center">
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