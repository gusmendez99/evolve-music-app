import React, {Component} from 'react';

import BarChart from '../BarChart';
class Statistics extends Component {
	constructor(){
		//labels=[],data = [], label=""
		super()
		this.state = {
			stats: [],
		};
	};
	render() {
		return (
			<>
				<div className="pa1 ph5-l tc">
					<h1 className="f3 fw6">{'This should change dynamycally'}</h1>
				</div>
				<div className="pa3 ph5-l h-50">
				<BarChart />
				</div>
			</>
		);
	}
}
export default Statistics;