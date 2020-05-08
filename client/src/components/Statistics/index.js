import React, { Component } from 'react';
import axios from 'axios';
import Chart from 'chart.js';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import exportCSVFile from '../../utils/csvexports.utils';

class Statistics extends Component {
	constructor() {
		super()
		this.chartRef = React.createRef();
		this.state = {
			data: [],
			selectedStat: '',
			initial_date: new Date(),
			final_date: new Date(),
			results_limit: 0,
			artist_name: ''
		};
	};


	handleResultsFieldChange = event => {
		const { value } = event.target;
		this.setState({ results_limit: value });
	}
	handleArtistNameFieldChange = event => {
		const { value } = event.target;
		this.setState({ artist_name: value });
	}
	handleFirstDatePickerChange = date => {
		this.setState({ initial_date: date })
	}
	handleSecondDatePickerChange = date => {
		this.setState({ final_date: date })
	}
	handleSubmit = () => {
		const selectedStat = this.state.selectedStat;
		let data = {};
		if (selectedStat === 'sales-per-week' || selectedStat === 'sales-per-genre') {
			data = { initial_date: this.state.initial_date.toISOString().split('T')[0], final_date: this.state.final_date.toISOString().split('T')[0] }
		} else if (selectedStat === 'profitable-artists') {
			data = { initial_date: this.state.initial_date.toISOString().split('T')[0], final_date: this.state.final_date.toISOString().split('T')[0], results_limit: parseInt(this.state.results_limit) }
		} else if (selectedStat === 'playback-record-by-artist') {
			data = { artist_name: this.state.artist_name }
		}
		axios({
			method: "post",
			url: `http://localhost:3000/reports/${selectedStat}`,
			data: data,
		})
			.then((response) => {
				this.setState({ data: response.data })
				if (this.state.selectedStat === 'sales-per-week') {
					this.myChart.data.labels = this.state.data.map(item => 'Año: ' + item.year.toString() + ' Semana: ' + item.week_of_year.toString());
					this.myChart.data.datasets[0].data = this.state.data.map(item => parseFloat(item.sales));
				}
				else if (this.state.selectedStat === 'profitable-artists') {
					this.myChart.data.labels = this.state.data.map(item => item.name);
					this.myChart.data.datasets[0].data = this.state.data.map(item => parseFloat(item.sales));
				}
				else if (this.state.selectedStat === 'sales-per-genre') {
					this.myChart.data.labels = this.state.data.map(item => item.genre);
					this.myChart.data.datasets[0].data = this.state.data.map(item => parseFloat(item.sales));
				}
				else if (this.state.selectedStat === 'playback-record-by-artist') {
					this.myChart.data.labels = this.state.data.map(item => item.name);
					this.myChart.data.datasets[0].data = this.state.data.map(item => parseFloat(item.playbacks));
				}
				this.myChart.update();
			})
			.catch((error) => console.log(error));

	}
	handleExportFile = () => {
		const fileName = 'Report';
		let headers = {};

		switch (this.state.selectedStat) {
			case 'sales-per-week':
				headers = {
					year: 'Year',
					week_of_year: "Week No.",
					sales: "Sales No."
				};
				break;

			case 'profitable-artists':
				headers = {
					name: 'Artist Name',
					sales: "Tracks sold"
				};
				break;
			case 'sales-per-genre':
				headers = {
					genre: 'Genre',
					sales: "Tracks sold"
				};
				break;
			case 'playback-record-by-artist':
				headers = {
					name: 'Artist Name',
					playbacks: "Times Played"
				};
				break;
			default:
				break;

		}
		exportCSVFile(headers, this.state.data, fileName);
	}

	handleSelectChange = (event) => {
		const { value } = event.target;
		this.setState({ selectedStat: value });
		if (value !== 'sales-per-week' && value !== 'profitable-artists' && value !== 'sales-per-genre' && value !== 'playback-record-by-artist') {
			axios
			.get(`http://localhost:3000/reports/${value}`)
			.then(response => {
				if (response.data) {
					this.setState({ data: response.data })

				}
			})
			.catch(error => {
				console.log(error);
			});
		}
	}
	componentDidUpdate() {
		this.myChart.data.labels = [];
		this.myChart.data.datasets[0].data = [];
		if (this.state.selectedStat === 'most-common-artists') {
			this.myChart.data.labels = this.state.data.map(item => item.name);
			this.myChart.data.datasets[0].data = this.state.data.map(item => parseInt(item.albums));
			this.myChart.data.datasets[0].label = 'Number of albums';
			this.myChart.options.title.text = 'Artist With More Published Albums';
			this.myChart.options.scales.yAxes[0].scaleLabel.labelString = 'Number of Albums';
			this.myChart.options.scales.xAxes[0].scaleLabel.labelString = 'Artist';
		}
		else if (this.state.selectedStat === 'most-common-genres') {
			this.myChart.data.labels = this.state.data.map(item => item.name);
			this.myChart.data.datasets[0].data = this.state.data.map(item => parseInt(item.songs));
			this.myChart.data.datasets[0].label = 'Number of songs';
			this.myChart.options.title.text = 'Genres with More Songs';
			this.myChart.options.scales.yAxes[0].scaleLabel.labelString = 'Number of Songs';
			this.myChart.options.scales.xAxes[0].scaleLabel.labelString = 'Genre';
		}
		else if (this.state.selectedStat === 'playlist-with-duration') {
			this.myChart.data.labels = this.state.data.map(item => item.name);
			this.myChart.data.datasets[0].data = this.state.data.map(item => parseFloat(item.duration));
			this.myChart.data.datasets[0].label = 'Playlist Duration (minutes)';
			this.myChart.options.title.text = 'Total Duration Of Each Playlist';
			this.myChart.options.scales.yAxes[0].scaleLabel.labelString = 'Playlist Duration (minutes)';
			this.myChart.options.scales.xAxes[0].scaleLabel.labelString = 'Playlist';
		}
		else if (this.state.selectedStat === 'longest-songs') {
			this.myChart.data.datasets[0].data = this.state.data.map(item => parseFloat(item.minutes));
			this.myChart.data.labels = this.state.data.map(item => `${item.track} from: ${item.artist}`);
			this.myChart.data.datasets[0].label = 'Song duration (minutes)';
			this.myChart.options.title.text = 'Longest Songs With Artist Info';
			this.myChart.options.scales.yAxes[0].scaleLabel.labelString = 'Song Duration (minutes)';
			this.myChart.options.scales.xAxes[0].scaleLabel.labelString = 'Song and Artist'
		}
		else if (this.state.selectedStat === 'most-track-register-user') {
			this.myChart.data.labels = this.state.data.map(item => item.username);
			this.myChart.data.datasets[0].data = this.state.data.map(item => parseInt(item.tracksregister));
			this.myChart.data.datasets[0].label = 'Number Of Songs';
			this.myChart.options.title.text = 'Users With More Registered Songs';
			this.myChart.options.scales.yAxes[0].scaleLabel.labelString = 'Songs Registered';
			this.myChart.options.scales.xAxes[0].scaleLabel.labelString = 'User Name';
		}
		else if (this.state.selectedStat === 'genre-duration-avg') {
			this.myChart.data.labels = this.state.data.map(item => item.genre);
			this.myChart.data.datasets[0].data = this.state.data.map(item => parseFloat(item.avg_minutes));
			this.myChart.data.datasets[0].label = 'Average song duration (minutes)';
			this.myChart.options.title.text = 'Average Song Duration Per Genre';
			this.myChart.options.scales.yAxes[0].scaleLabel.labelString = 'Average Song Duration (minutes)';
			this.myChart.options.scales.xAxes[0].scaleLabel.labelString = 'Genre';
		}
		else if (this.state.selectedStat === 'artist-in-playlist') {
			this.myChart.data.labels = this.state.data.map(item => item.name);
			this.myChart.data.datasets[0].data = this.state.data.map(item => parseFloat(item.artists));
			this.myChart.data.datasets[0].label = 'Number of Artists';
			this.myChart.options.title.text = 'Quantity of Artists per Playlist';
			this.myChart.options.scales.yAxes[0].scaleLabel.labelString = 'Number of Artists';
			this.myChart.options.scales.xAxes[0].scaleLabel.labelString = 'Playlist';
		}
		else if (this.state.selectedStat === 'most-genre-diversity-artist') {
			this.myChart.data.labels = this.state.data.map(item => item.name);
			this.myChart.data.datasets[0].data = this.state.data.map(item => parseFloat(item.genres));
			this.myChart.data.datasets[0].label = 'Number of Genres';
			this.myChart.options.title.text = 'Artist With More Diversity of Genres';
			this.myChart.options.scales.yAxes[0].scaleLabel.labelString = 'Number of Genres';
			this.myChart.options.scales.xAxes[0].scaleLabel.labelString = 'Artist';
		}
		else if (this.state.selectedStat === 'sales-per-week') {
			this.myChart.data.datasets[0].label = 'Sales per Week';
			this.myChart.options.title.text = 'Sales per Week and by Year';
			this.myChart.options.scales.yAxes[0].scaleLabel.labelString = 'Sales per Week';
			this.myChart.options.scales.xAxes[0].scaleLabel.labelString = 'Year + Week';
		}
		else if (this.state.selectedStat === 'profitable-artists') {
			this.myChart.data.datasets[0].label = 'Number of Sales';
			this.myChart.options.title.text = 'Artists With More Tracks Sold';
			this.myChart.options.scales.yAxes[0].scaleLabel.labelString = 'Number of Sales';
			this.myChart.options.scales.xAxes[0].scaleLabel.labelString = 'Artist';
		}
		else if (this.state.selectedStat === 'sales-per-genre') {
			this.myChart.data.datasets[0].label = 'Number of Sales';
			this.myChart.options.title.text = 'Sales per Genre';
			this.myChart.options.scales.yAxes[0].scaleLabel.labelString = 'Number of Sales';
			this.myChart.options.scales.xAxes[0].scaleLabel.labelString = 'Genre';
		}
		else if (this.state.selectedStat === 'playback-record-by-artist') {
			this.myChart.data.datasets[0].label = 'Number of Playbacks';
			this.myChart.options.title.text = 'Playbacks per Artist';
			this.myChart.options.scales.yAxes[0].scaleLabel.labelString = 'Number of Playbacks';
			this.myChart.options.scales.xAxes[0].scaleLabel.labelString = 'Artist';
		}
		this.myChart.update();
	}
	componentDidMount() {
		this.myChart = new Chart(this.chartRef.current, {
			type: 'bar',
			data: {
				labels: null,
				datasets: [
					{
						label: null,
						backgroundColor: "#0496ff",
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
						{this.state.selectedStat === '' ? <option value="placeholder">Select a Statistic to Show</option> : null}
						<option value="most-common-artists">Artists with More Published Albums</option>
						<option value="most-common-genres">Genres With More Songs</option>
						<option value="playlist-with-duration">Total Duration Of each Playlist</option>
						<option value="longest-songs">Longest Songs</option>
						<option value="most-track-register-user">Users With More Registered Songs</option>
						<option value="genre-duration-avg">Average Song Duration Per Genre</option>
						<option value="artist-in-playlist">Quantity of Artists per Playlist</option>
						<option value="most-genre-diversity-artist">Artist With More Diversity of Genres</option>
						<option value="sales-per-week">Get Sales Per Week (Given start and end date)</option>
						<option value="profitable-artists">Get Most Profitable Artists (Given start and end date)</option>
						<option value="sales-per-genre">Get Sales Per Genre (Given start and end date)</option>
						<option value="playback-record-by-artist">Get Playback Record of an Artist</option>
					</select>
					{(this.state.selectedStat === 'sales-per-week' || this.state.selectedStat === 'profitable-artists' ||
						this.state.selectedStat === 'sales-per-genre' || this.state.selectedStat === 'playback-record-by-artist') ?
						<div className="ph3 pt4 pb2 flex flex-row items-center justify-center">
							{(this.state.selectedStat === 'sales-per-week' || this.state.selectedStat === 'sales-per-genre' || this.state.selectedStat === 'profitable-artists') ?
								<>
									<div className="pr3 flex flex-column justify-center items-start">
										<p className="mb1 mt0">Start Date </p>
										<DatePicker
											selected={this.state.initial_date}
											onChange={this.handleFirstDatePickerChange}
										/>
									</div>
									<div className="pr3 flex flex-column justify-center items-start">
										<p className="mb1 mt0">End Date </p>
										<DatePicker
											selected={this.state.final_date}
											onChange={this.handleSecondDatePickerChange}
										/>
									</div>
								</>
								: null
							}
							{(this.state.selectedStat === 'profitable-artists') ?
								<div className="pr3 flex flex-column justify-center items-start">
									<p className="mb1 mt0">Results Limit</p>
									<input
										className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
										placeholder="Number of results..."
										type="number"
										name="results_limit"
										onChange={this.handleResultsFieldChange}>
									</input>
								</div>
								: null}
							{(this.state.selectedStat === 'playback-record-by-artist') ?
								<div className="pr3 flex flex-column justify-center items-center">
									<p className="mb1 mt0">Artist Name</p>
									<input
										className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
										placeholder="Type an Artist Name..."
										type="text"
										name="results_limit"
										onChange={this.handleArtistNameFieldChange}>
									</input>
								</div>
								: null}
							<button
								className="f6 dim ph3 pv2 mb0 mr3 dib white bg-green h-100"
								onClick={this.handleSubmit}
							>Search</button>
							<button
								className="f6 dim ph3 pv2 mb0 mr3 dib white bg-blue h-100"
								onClick={this.handleExportFile}
							>export</button>
						</div>
						: null
					}
				</div>
				<div className="pa3 ph5-l h-50">
					<canvas ref={this.chartRef} />
				</div>
			</>
		);
	}
}
export default Statistics;