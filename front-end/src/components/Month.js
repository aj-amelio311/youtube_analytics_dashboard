import React, {Component} from "react";
import axios from "axios";
import Table from "./Table";
import Graph from "./Graph";

class Month extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: "Per Month",
      data: ["null"],
      month: "",
      year: "",
      years: [],
      monthData: [],
      views: [],
      xAxis: []
    }
    this.handleMonth = this.handleMonth.bind(this);
    this.handleYear = this.handleYear.bind(this);
  }

  handleMonth() {
    if (this.state.year !== "") {
      this.setState({month: event.target.value}, this.handleSubmit);
    } else {
      this.setState({month: event.target.value});
    }
  }

  handleYear() {
    if (this.state.month !== "") {
      this.setState({year: event.target.value}, this.handleSubmit);
    } else {
      this.setState({year: event.target.value})
    }
  }

  handleSubmit() {
    axios.get(`http://ec2-18-188-66-24.us-east-2.compute.amazonaws.com:9000/month/${this.state.month}/${this.state.year}`).then((resp) => {
      let data;
      const xAxis = [];
      const views = [];
      if (resp.data.length > 0) {
        const days = resp.data.length - 1;
        data = {
          "status": 1,
          "Views": resp.data[resp.data.length - 1].views - resp.data[0].views,
          "Subscribers": resp.data[resp.data.length - 1].subscribers - resp.data[0].subscribers,
          "Likes": resp.data[resp.data.length - 1].likes - resp.data[0].likes,
          "Dislikes": resp.data[resp.data.length - 1].dislikes - resp.data[0].dislikes,
          "Views_Day": ((resp.data[resp.data.length - 1].views - resp.data[0].views) / days).toFixed(2),
          "Subs_Day": ((resp.data[resp.data.length - 1].subscribers - resp.data[0].subscribers) / days).toFixed(2)
        }

        const rawData = resp.data;
        for (var i = 0; i < rawData.length; i++) {
          if (i >= 1) {
            views.push(rawData[i].views - rawData[i-1].views)
          } else if (i == 0) {
            views.push(rawData[1].views - rawData[0].views)
          }
          xAxis.push(i + 1);
        }
      } else {
        data = {
          "status": 0
        }
      }
      this.setState({data})
      this.setState({monthData: resp.data})
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
          <div className="month-select">
            <select onChange={this.handleMonth}>
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
            <select onChange={this.handleYear}>
              <option>Select a Year</option>
              {years}
            </select>
          </div>
          <Table ytdata={this.state} />
          <Graph views={this.state.views} xaxis={this.state.xAxis}/>
        </div>
      )
    } else if (status === 0) {
      return (
        <div className="panel col-md-12">
          <h6 className="table-title">{this.state.title}</h6>
          <div className="month-select">
            <select onChange={this.handleMonth}>
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
            <select onChange={this.handleYear}>
              <option>Select a Year</option>
              {years}
            </select>
          </div>
          <h6 className="not-found">No Results Found</h6>
        </div>
      )
    } else {
      return (
        <div className="panel col-md-12">
          <h6 className="table-title">{this.state.title}</h6>
          <div className="month-select">
            <select onChange={this.handleMonth}>
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
            <select onChange={this.handleYear}>
              <option>Select a Year</option>
              {years}
            </select>
          </div>
        </div>
      )
    }
  }

}

export default Month;
