import React, {Component} from "react";
import axios from "axios";
import {Line} from 'react-chartjs-2';

class Graph extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount(){

  }

  render() {
    const xAxis = this.props.xaxis
    const views = this.props.views;

    const data = {
       labels: xAxis,
       xAxisID: "2",
       datasets: [
           {
            label: "",
            fillColor: "rgb(255,250,250)",
            strokeColor: "rgb(255,250,250)",
            data: views
           }
       ]}
    return (
      <div>
        <Line
          data={data}
          width={50}
          height={20}
          options={{
            maintainAspectRatio: true,
            legend: {
                display: false
            },
            scales: {
                yAxes: [{
                  scaleLabel: {
                    display: true,
                    labelString: 'Views'
                  }
                }],
                xAxes: [{
                  scaleLabel: {
                    display: true,
                    labelString: 'Day'
                  }
                }]
              }
          }}
        />
      </div>
    )
  }

}

export default Graph;
