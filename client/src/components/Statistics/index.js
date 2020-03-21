import React, {Component} from 'react';
import axios from 'axios';
import Chart from 'chart.js';

class Statistics extends Component {
	constructor(){
		super()
		this.chartRef = React.createRef();
		this.state = {
			data: [],
			selectedStat: ''
		};
	};

	handleSelectChange = (event) => {
		const {value} = event.target;
		this.setState({selectedStat: value});
	
		axios
		.get(`http://localhost:3000/reports/${value}`)
		.then(response => {
			console.log(response);
			if (response.data) {
			this.setState({data: response.data})
			}
		})
		.catch(error => {
			console.log(error);
		});
	}
	componentDidUpdate(){
		if(this.state.selectedStat === 'genres'){
			this.myChart.data.labels = this.state.data.map(item => item.name);
			this.myChart.data.datasets[0].data = this.state.data.map(item => parseInt(item.songs));
			this.myChart.data.datasets[0].label='Number of songs';
			this.myChart.options.title.text='Most Common Genres ';
			this.myChart.options.scales.yAxes[0].scaleLabel.labelString='Number of Songs';
			this.myChart.options.scales.xAxes[0].scaleLabel.labelString='Genre';

		} else if (this.state.selectedStat === 'artists'){
				this.myChart.data.labels = this.state.data.map(item => item.name);
				this.myChart.data.datasets[0].data = this.state.data.map(item => parseInt(item.albums));
				this.myChart.data.datasets[0].label='Number of albums';
				this.myChart.options.title.text='Artist With More Individual Albums';
				this.myChart.options.scales.yAxes[0].scaleLabel.labelString='Number of Albums';
				this.myChart.options.scales.xAxes[0].scaleLabel.labelString='Artist';
		}
		else if(this.state.selectedStat === 'songs'){
			this.myChart.data.datasets[0].data = this.state.data.map(item => parseFloat(item.minutes));
			this.myChart.data.labels = this.state.data.map(item => `${item.track} from: ${item.artist}` );
			this.myChart.data.datasets[0].label='Song duration (minutes)';
			this.myChart.options.title.text='Longest Songs With Artist Info';
			this.myChart.options.scales.yAxes[0].scaleLabel.labelString='Song Duration (minutes)';
			this.myChart.options.scales.xAxes[0].scaleLabel.labelString='Song and Artist'
			
		} 
		else if (this.state.selectedStat === 'collabs'){
			this.myChart.data.labels = this.state.data.map(item => item.name);
			this.myChart.data.datasets[0].data = this.state.data.map(item => parseInt(item.count));
			this.myChart.data.datasets[0].label='Number of collaborations';
			this.myChart.options.title.text='More Collaborative Artists';
			this.myChart.options.scales.yAxes[0].scaleLabel.labelString='Number of Collaborations';
			this.myChart.options.scales.xAxes[0].scaleLabel.labelString='Artist';
		}
		else if (this.state.selectedStat === 'genres-duration'){
			this.myChart.data.labels = this.state.data.map(item => item.genre);
			this.myChart.data.datasets[0].data = this.state.data.map(item => parseInt(item.avg_minutes));
			this.myChart.data.datasets[0].label='Average song duration (minutes)';
			this.myChart.options.title.text='Average Song Duration Per Genre';
			this.myChart.options.scales.yAxes[0].scaleLabel.labelString='Average Song Duration (minutes)';
			this.myChart.options.scales.xAxes[0].scaleLabel.labelString='Genre';
		}
		this.myChart.update();
	}
	componentDidMount(){
		this.myChart = new Chart(this.chartRef.current, {
			type: 'bar',
			data: {
			  labels: null,
			  datasets: [
				{
				  label: null,
				  backgroundColor: ["#1985a1", "#3cba9f","#3e6680","#0496ff","#027bce", "#00487c","#141b41","#6f9ceb","#98b9f2"],
				  data: null
				}
			  ]
			},
			options: {
			  legend: { display: false },
			  title: {
					display: true,
					text: ''
				},
				scales: {
					yAxes: [{
						scaleLabel: {
							display: true,
							labelString: ''
						}
					}],
					xAxes: [{
						scaleLabel: {
							display: true,
							labelString: ''
						}
					}]
				}
			}
		});
	}
	render() {
		
		return (
			<>
				<div className="pa1 ph5-l tc">
					<h1 className="f3 fw6">Statistics</h1>
				</div>
				<div className="pa1 ph5-l tc flex flex-column items-center justify-center">
					<select className="db f6 bg-white black ph3 pv2 w-50" name="stat_select" onChange={this.handleSelectChange}>
						{this.state.selectedStat === '' ? <option value="placeholder">Select a Statistic to Show</option>: null}
						<option value="genres">Genres With More Songs</option>
						<option value="artists">Artists With More Individual Albums</option>
						<option value="songs">Longest Songs</option>
						<option value="USERS_WITH_MORE_REGISTERED_SONGS">Users With More Registered Songs</option>
						<option value="genres-duration">Average Song Duration Per Genre</option>
						<option value="collabs">More Collaborative Artists</option>
					</select>            
        		</div>
				<div className="pa3 ph5-l h-50">
					<canvas ref={this.chartRef} />
				</div>
			</>
		);
	}
}
export default Statistics;