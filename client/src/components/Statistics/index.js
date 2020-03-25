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
		if (this.state.selectedStat === 'most-common-artists'){
			this.myChart.data.labels = this.state.data.map(item => item.name);
			this.myChart.data.datasets[0].data = this.state.data.map(item => parseInt(item.albums));
			this.myChart.data.datasets[0].label='Number of albums';
			this.myChart.options.title.text='Artist With More Published Albums';
			this.myChart.options.scales.yAxes[0].scaleLabel.labelString='Number of Albums';
			this.myChart.options.scales.xAxes[0].scaleLabel.labelString='Artist';
		}
		else if(this.state.selectedStat === 'most-common-genres'){
			this.myChart.data.labels = this.state.data.map(item => item.name);
			this.myChart.data.datasets[0].data = this.state.data.map(item => parseInt(item.songs));
			this.myChart.data.datasets[0].label='Number of songs';
			this.myChart.options.title.text='Genres with More Songs';
			this.myChart.options.scales.yAxes[0].scaleLabel.labelString='Number of Songs';
			this.myChart.options.scales.xAxes[0].scaleLabel.labelString='Genre';
		}
		else if(this.state.selectedStat === 'playlist-with-duration'){
			this.myChart.data.labels = this.state.data.map(item => item.name);
			this.myChart.data.datasets[0].data = this.state.data.map(item => parseFloat(item.duration));
			this.myChart.data.datasets[0].label='Playlist Duration (minutes)';
			this.myChart.options.title.text='Total Duration Of Each Playlist';
			this.myChart.options.scales.yAxes[0].scaleLabel.labelString='Playlist Duration (minutes)';
			this.myChart.options.scales.xAxes[0].scaleLabel.labelString='Playlist';
		}
		else if(this.state.selectedStat === 'longest-songs'){
			this.myChart.data.datasets[0].data = this.state.data.map(item => parseFloat(item.minutes));
			this.myChart.data.labels = this.state.data.map(item => `${item.track} from: ${item.artist}` );
			this.myChart.data.datasets[0].label='Song duration (minutes)';
			this.myChart.options.title.text='Longest Songs With Artist Info';
			this.myChart.options.scales.yAxes[0].scaleLabel.labelString='Song Duration (minutes)';
			this.myChart.options.scales.xAxes[0].scaleLabel.labelString='Song and Artist'
		} 
		else if (this.state.selectedStat === 'most-track-register-user'){
			this.myChart.data.labels = this.state.data.map(item => item.name);
			this.myChart.data.datasets[0].data = this.state.data.map(item => parseInt(item.tracksregister));
			this.myChart.data.datasets[0].label='Number Of Songs';
			this.myChart.options.title.text='Users With More Registered Songs';
			this.myChart.options.scales.yAxes[0].scaleLabel.labelString='Songs Registered';
			this.myChart.options.scales.xAxes[0].scaleLabel.labelString='User Name';
		}
		else if (this.state.selectedStat === 'genre-duration-avg'){
			this.myChart.data.labels = this.state.data.map(item => item.genre);
			this.myChart.data.datasets[0].data = this.state.data.map(item => parseFloat(item.avg_minutes));
			this.myChart.data.datasets[0].label='Average song duration (minutes)';
			this.myChart.options.title.text='Average Song Duration Per Genre';
			this.myChart.options.scales.yAxes[0].scaleLabel.labelString='Average Song Duration (minutes)';
			this.myChart.options.scales.xAxes[0].scaleLabel.labelString='Genre';
		}
		else if (this.state.selectedStat === 'artist-in-playlist'){
			this.myChart.data.labels = this.state.data.map(item => item.name);
			this.myChart.data.datasets[0].data = this.state.data.map(item => parseFloat(item.artists));
			this.myChart.data.datasets[0].label='Artists per Playlist';
			this.myChart.options.title.text='Quantity of Artists per Playlist';
			this.myChart.options.scales.yAxes[0].scaleLabel.labelString='Number of Artists';
			this.myChart.options.scales.xAxes[0].scaleLabel.labelString='Playlist';
		}
		else if (this.state.selectedStat === 'most-genre-diversity-artist'){
			this.myChart.data.labels = this.state.data.map(item => item.name);
			this.myChart.data.datasets[0].data = this.state.data.map(item => parseFloat(item.genres));
			this.myChart.data.datasets[0].label='Genres Per Artist';
			this.myChart.options.title.text='Artist With More Diversity of Genres';
			this.myChart.options.scales.yAxes[0].scaleLabel.labelString='Number of Genres';
			this.myChart.options.scales.xAxes[0].scaleLabel.labelString='Artist';
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
				  backgroundColor:"#0496ff",
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
						<option value="most-common-artists">Artists with More Published Albums</option>
						<option value="most-common-genres">Genres With More Songs</option>
						<option value="playlist-with-duration">Total Duration Of each Playlist</option>
						<option value="longest-songs">Longest Songs</option>
						<option value="most-track-register-user">Users With More Registered Songs</option>
						<option value="genre-duration-avg">Average Song Duration Per Genre</option>
						<option value="artist-in-playlist">Quantity of Artists per Playlist</option>
						<option value="most-genre-diversity-artist">Artist With More Diversity of Genres</option>
						
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