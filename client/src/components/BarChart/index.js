import React, {Component} from 'react';

import Chart from 'chart.js';
class BarChart extends React.Component {
    constructor(props) {
      super(props);
      this.chartRef = React.createRef();
    }
    componentDidMount() {
        this.myChart = new Chart(this.chartRef.current, {
            type: 'bar',
            data: {
              labels: ["Africa", "Asia", "Europe", "Latin America", "North America","Africa", "Asia", "Europe", "Latin America", "North America"],
              datasets: [
                {
                  label: "Population (millions)",
                  backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
                  data: [2478,5267,734,784,433,2478,5267,734,784,433]
                }
              ]
            },
            options: {
              legend: { display: false },
              title: {
                display: true,
                text: 'Predicted world population (millions) in 2050'
              }
            }
        });
      }
  
    render() {
      return (
        <canvas ref={this.chartRef} />
      );
    }
}

export default BarChart;