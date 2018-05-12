import React, {Component} from 'react';
import axios from 'axios';
import {Line} from 'react-chartjs-2';

class Year extends Component {
  constructor(props) {
    super(props)
    this.state = {
      totals: [],
      year: "",
      error: "",
      data: {},
      dataSubs: {}
    }

  this.handleChangeYear = this.handleChangeYear.bind(this);
  }

handleChangeYear(event) {
    this.setState({year: event.target.value}, this.handleSubmit)
}

handleSubmit(event) {
  const xAxis = []
  const views = []
  const subs = []
    axios.get("http://ec2-18-188-66-24.us-east-2.compute.amazonaws.com:9000/year/" + this.state.year).then((result) => {
    if (result.data.length <= 1) {
      this.setState({totals: []})
    } else {
      this.setState({totals: [{
        "views": parseInt(result.data[result.data.length - 1].views) - parseInt(result.data[0].views),
        "subs": parseInt(result.data[result.data.length - 1].subscribers) - parseInt(result.data[0].subscribers),
        "likes": parseInt(result.data[result.data.length - 1].likes) - parseInt(result.data[0].likes),
        "dislikes": parseInt(result.data[result.data.length - 1].dislikes) - parseInt(result.data[0].dislikes),
        "comments": parseInt(result.data[result.data.length - 1].comments) - parseInt(result.data[0].comments),
        "length": parseInt(result.data.length)
      }
    ]})
    for (var i = 1; i < parseInt(result.data.length); i++) {
      xAxis.push(i)
      views.push(result.data[i].views - result.data[i-1].views)
      subs.push(result.data[i].subscribers - result.data[i-1].subscribers)
    }
    this.setState({
      data: {
         labels: xAxis,
         datasets: [
             {
              label: "",
              fillColor: "rgba(220,220,220,0.2)",
              strokeColor: "rgba(220,220,220,1)",
              data: views
             }
         ]}
    })
    this.setState({
      dataSubs: {
         labels: xAxis,
         datasets: [
             {
              label: "",
              fillColor: "rgba(220,220,220,0.2)",
              strokeColor: "rgba(220,220,220,1)",
              data: subs
             }
         ]}
    })
    }
}).catch((error) => {
  this.setState({error})
})
}

  numberWithCommas(x){
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  render() {
    const totals = this.state.totals.length;

    const yearData = totals ? (
      <div className="dd-data table-wrap">
        <table className="table table-striped">
          <thead align="center">
            <tr className="top-row">
              <th scope="col"><h6>Views</h6></th>
              <th scope="col"><h6>Subscribers</h6></th>
              <th scope="col"><h6>Likes</h6></th>
              <th scope="col"><h6>Dislikes</h6></th>
              <th scope="col"><h6>Comments</h6></th>
              <th scope="col"><h6>Views/Day</h6></th>
              <th scope="col"><h6>Subscribers/Day</h6></th>
            </tr>
          </thead>
          <tbody>
            <tr className="row">
              {this.state.totals.map((item) => {
                var convertToInt = parseInt(item.views);
                return <td key="a" className="data-cell">{this.numberWithCommas(convertToInt)}</td>
              })}
              {this.state.totals.map((item) => {
                var convertToInt = parseInt(item.subs);
                return <td key="b" className="data-cell">{this.numberWithCommas(convertToInt)}</td>
              })}
              {this.state.totals.map((item) => {
                var convertToInt = parseInt(item.likes);
                return <td key="c" className="data-cell">{this.numberWithCommas(convertToInt)}</td>
              })}
              {this.state.totals.map((item) => {
                var convertToInt = parseInt(item.dislikes);
                return <td key="d" className="data-cell">{this.numberWithCommas(convertToInt)}</td>
              })}
              {this.state.totals.map((item) => {
                var convertToInt = parseInt(item.comments);
                return <td key="e" className="data-cell">{this.numberWithCommas(convertToInt)}</td>
              })}
              {this.state.totals.map((item) => {
                var views = parseInt(item.views);
                var days = parseInt((item.length) - 1);
                return <td key="e" className="data-cell">{this.numberWithCommas(parseFloat(views/days).toFixed(2))}</td>
              })}
              {this.state.totals.map((item) => {
                var subs = parseInt(item.subs);
                var days = parseInt((item.length) - 1);
                return <td key="e" className="data-cell">{this.numberWithCommas(parseFloat(subs/days).toFixed(2))}</td>
              })}
            </tr>
          </tbody>
        </table>
        <h6>Views</h6>
        <div className="graph">
          <Line
            data={this.state.data}
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
                      labelString: 'Number of Views'
                    }
                  }],
                  xAxes: [{
                    ticks: {
                      display: false
                    },
                    scaleLabel: {
                      display: false,
                      labelString: 'Day'
                    }
                  }]
                }
            }}
          />
          <h6 className="sub-title">Subscribers</h6>
          <Line
            data={this.state.dataSubs}
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
                      labelString: 'NUmber of Subscribers'
                    }
                  }],
                  xAxes: [{
                    ticks: {
                      display: false
                    },
                    scaleLabel: {
                      display: false,
                      labelString: 'Day'
                    }
                  }]
                }
            }}
          />
        </div>
      </div>
    ) : (
      <div className="dd-data">
        <h6>No Data</h6>
      </div>
    );
      return (
          <div className="col-md-12 section-3">
            <h4 className="header-text">Per Year</h4>
            <div className="dropdown">
              <select id='year' onChange={this.handleChangeYear} value={this.state.year}>
                <option>Select a Year</option>
                <option value="2018">2018</option>
                <option value="2019">2019</option>
                <option value="2020">2020</option>
              </select>
            </div>
            {yearData}
          </div>
      )
  }
}

export default Year;
