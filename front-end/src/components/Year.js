import React, {Component} from "react";
import axios from "axios";
import Table from "./Table";
import Graph from "./Graph";

class Year extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: "Per Year",
      data: [],
      year: "",
      years: [],
      views: [],
      xAxis: []
    }
    this.handleYear = this.handleYear.bind(this);
  }

  handleYear() {
    this.setState({year: event.target.value}, this.handleSubmit);
  }

  handleSubmit() {
    axios.get(`http://ec2-18-188-66-24.us-east-2.compute.amazonaws.com:9000/year/${this.state.year}`).then((resp) => {
      let data;
      const xAxis = [];
      const views = [];
      if (resp.data.length > 0) {
        const days = resp.data.length - 1;
        data = {
          "status": 1,
          "views": resp.data[resp.data.length - 1].views - resp.data[0].views,
          "subscribers": resp.data[resp.data.length - 1].subscribers - resp.data[0].subscribers,
          "likes": resp.data[resp.data.length - 1].likes - resp.data[0].likes,
          "dislikes": resp.data[resp.data.length - 1].dislikes - resp.data[0].dislikes,
          "views_day": ((resp.data[resp.data.length - 1].views - resp.data[0].views) / days).toFixed(2),
          "subs_day": ((resp.data[resp.data.length - 1].subscribers - resp.data[0].subscribers) / days).toFixed(2)
        }
        const rawData = resp.data;
        for (var i = 0; i < rawData.length; i++) {
          xAxis.push(rawData[i].date.toString().split(" ").splice(0, 2).join(" "))
          if (i >= 1) {
            views.push(rawData[i].views - rawData[i-1].views)
          } else if (i == 0) {
            views.push(rawData[1].views - rawData[0].views)
          }
        }
      } else {
        data = {
          "status": 0
        }
      }
      this.setState({data})
      this.setState({views})
      this.setState({xAxis})
    })
  }

  componentDidMount() {
    const year = new Date().getFullYear();
    const years = [];
    for (var i = 2018; i < year + 1; i++) {
      years.push(i)
    }
    this.setState({years})
  }

  render() {
    const status = this.state.data.status;
    const years = this.state.years.map((year, index) =>
      <option key={index} value={year}>{year}</option>
    )
    if (status === 1) {
      return (
        <div className="panel col-md-12">
          <h6 className="table-title">{this.state.title}</h6>
          <select className="year-select" onChange={this.handleYear}>
            <option>Select a Year</option>
            {years}
          </select>
          <Table ytdata={this.state} />
          <Graph views={this.state.views} xaxis={this.state.xAxis}/>
        </div>
      )
    } else if (status === 0) {
      return (
        <div className="panel col-md-12">
          <h6 className="table-title">{this.state.title}</h6>
          <select className="year-select" onChange={this.handleYear}>
            <option>Select a Year</option>
            {years}
          </select>
          <h6 className="not-found">No Results Found</h6>
        </div>
      )
    } else {
      return (
        <div className="panel col-md-12">
          <h6 className="table-title">{this.state.title}</h6>
          <select className="year-select" onChange={this.handleYear}>
            <option>Select a Year</option>
            {years}
          </select>
        </div>
      )
    }

  }

}

export default Year;
