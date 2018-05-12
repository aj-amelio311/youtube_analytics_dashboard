import React, {Component} from 'react';
import axios from 'axios';
import {Line} from 'react-chartjs-2';

class Month extends Component {
  constructor(props) {
    super(props)
    this.state = {
      totals: [],
      month: "",
      year: "",
      error: "",
      data: {},
      dataSubs: {},
      count: []
    }

  this.handleChangeOne = this.handleChangeOne.bind(this);
  this.handleChangeTwo = this.handleChangeTwo.bind(this);
  }

handleChangeOne(event) {
  if (this.state.year !== "") {
    this.setState({month: event.target.value}, this.handleSubmit);
  } else {
    this.setState({month: event.target.value});
  }
}

handleChangeTwo(event) {
  if (this.state.month !== "") {
    this.setState({year: event.target.value}, this.handleSubmit);
  } else {
    this.setState({year: event.target.value})
  }
}

handleSubmit(event) {
  const xAxis = []
  const views = []
  const subs = []
  axios.get("http://ec2-18-188-66-24.us-east-2.compute.amazonaws.com:9000/month/" + this.state.month + "/" + this.state.year).then((result) => {
    console.log(result.data)
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
         xAxisID: "2",
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
         xAxisID: "2",
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

capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
  }
  numberWithCommas(x){
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  render() {

    const totals = this.state.totals.length;

    const monthData = totals ? (
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
                return <td scope="row" key="a" className="data-cell">{this.numberWithCommas(convertToInt)}</td>
              })}
              {this.state.totals.map((item) => {
                var convertToInt = parseInt(item.subs);
                return <td scope="row" key="b" className="data-cell">{this.numberWithCommas(convertToInt)}</td>
              })}
              {this.state.totals.map((item) => {
                var convertToInt = parseInt(item.likes);
                return <td scope="row" key="c" className="data-cell">{this.numberWithCommas(convertToInt)}</td>
              })}
              {this.state.totals.map((item) => {
                var convertToInt = parseInt(item.dislikes);
                return <td scope="row" key="d" className="data-cell">{this.numberWithCommas(convertToInt)}</td>
              })}
              {this.state.totals.map((item) => {
                var convertToInt = parseInt(item.comments);
                return <td scope="row" key="e" className="data-cell">{this.numberWithCommas(convertToInt)}</td>
              })}
              {this.state.totals.map((item) => {
                var views = parseInt(item.views);
                var days = parseInt((item.length) - 1);
                return <td scope="row" key="e" className="data-cell">{this.numberWithCommas(parseFloat(views/days).toFixed(2))}</td>
              })}
              {this.state.totals.map((item) => {
                var subs = parseInt(item.subs);
                var days = parseInt((item.length) - 1);
                return <td scope="row" key="e" className="data-cell">{this.numberWithCommas(parseFloat(subs/days).toFixed(2))}</td>
              })}
            </tr>
          </tbody>
        </table>
          <h4>{this.capitalizeFirstLetter(this.state.month)}</h4>
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
                      scaleLabel: {
                        display: true,
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
                        labelString: 'Number of Subscribers'
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
      </div>
    ) : (
      <div className="dd-data">
        <h6>No Data</h6>
      </div>
    );

      return (
          <div className="col-md-12 section-3">
          <h4 className="header-text">Per Month</h4>
            <div className="dropdown">
              <select className="dropdown" onChange={this.handleChangeOne} value={this.state.month}>
                <option>Select a Month</option>
                <option value="jan">January</option>
                <option value="feb">February</option>
                <option value="mar">March</option>
                <option value="apr">April</option>
                <option value="may">May</option>
                <option value="jun">June</option>
                <option value="jul">July</option>
                <option value="aug">August</option>
                <option value="sep">September</option>
                <option value="oct">October</option>
                <option value="nov">November</option>
                <option value="dec">December</option>
              </select>
              <select className="dropdown"  onChange={this.handleChangeTwo} value={this.state.year}>
                <option>Select a Year</option>
                <option value="2018">2018</option>
                <option value="2019">2019</option>
                <option value="2020">2020</option>
              </select>
            </div>
            {monthData}
          </div>
      )
  }
}

export default Month;
