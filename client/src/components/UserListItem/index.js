import React, {Component, Fragment} from 'react';
import CustomLink from '../CustomLink';

class UserListItem extends Component {
    constructor(){
      super()
      this.state = {
				user: {},
				roleName: '',
				roles: []
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
			fetch('http://localhost:3000/roles')
			.then(response => response.json())
			.then(data => {
				this.setState({roles: data})
			});
		}

		handleUpdate = () => {
			fetch(`http://localhost:3000/users/${this.state.user.userid}`, {
				method : 'put',
				headers : {'Content-type': 'application/json'},
				body : JSON.stringify(this.state.user)
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
    render(){
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
								<td className="pv3 pr3 bb b--black-20">
									<select className="db f6 bg-white black pr4 pv1 w-100" name="roleid" onChange={this.handleSelectChange}>
										{
										this.state.roles.map((role, i) => {
											if (this.state.roleName === role.name ){
												return (
													<option 
													key={i}
													value={role.name}
													selected>{role.name}</option>
												);
											}	else {
												return (
													<option 
													key={i}
													value={role.name}
													>{role.name}</option>
												);
											}
										}) 
										}
									</select>
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