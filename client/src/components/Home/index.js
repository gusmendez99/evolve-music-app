import React, {Component} from 'react';

class Home extends Component{
	componentDidMount(){
		const response = async =() => { 
			await fetch('http://localhost:3000/users/1')
			.then(response => response.json())
			.then(data => data.username);
		}
	
	console.log(response);
	}
	render(){
		return (
			<h1>{response}</h1>
		)
	}
}
export default Home;