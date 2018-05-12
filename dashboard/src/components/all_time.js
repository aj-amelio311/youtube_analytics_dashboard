import React, {Component} from 'react';
import axios from "axios";


class AllTime extends Component {
constructor(props) {
super(props);
  this.state = {
    items: []
  }
}

numberWithCommas(x){
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

componentDidMount() {
  axios.get("http://ec2-18-188-66-24.us-east-2.compute.amazonaws.com:9000/all_time").then((result) => {
    this.setState({ items: result.data })
  })
}

  render() {
    return (
      <div className="col-md-5 all-time-table section col-md-offset-1">
        <h4 className="header-text">All-Time</h4>
        <table>
          <thead>
          <tr className="top-row">
            <th><h6>Views</h6></th>
            <th><h6>Subscribers</h6></th>
            <th><h6>Likes</h6></th>
            <th><h6>Dislikes</h6></th>
          </tr>
          </thead>
          <tbody>
            <tr className="row">
              {this.state.items.map((item) => {
                var convertToInt = parseInt(item.views);
                return <td key={item._id} className="data-cell">{this.numberWithCommas(convertToInt)}</td>
              })}
              {this.state.items.map((item) => {
                var convertToInt = parseInt(item.subscribers);
                return <td key={item._id} className="data-cell">{this.numberWithCommas(convertToInt)}</td>
              })}
              {this.state.items.map((item) => {
                var convertToInt = parseInt(item.likes);
                return <td key={item._id} className="data-cell">{this.numberWithCommas(convertToInt)}</td>
              })}
              {this.state.items.map((item) => {
                var convertToInt = parseInt(item.dislikes);
                return <td key={item._id} className="data-cell">{this.numberWithCommas(convertToInt)}</td>
              })}
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

export default AllTime;
