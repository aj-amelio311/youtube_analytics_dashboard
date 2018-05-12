import React, {Component} from 'react';
import axios from 'axios';

class PreviousDay extends Component {
  constructor(props) {
    super(props)
      this.state = {
        previous: []
      }
  }

  numberWithCommas(x){
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  componentDidMount() {
    axios.get("http://ec2-18-188-66-24.us-east-2.compute.amazonaws.com:9000/previous_day").then((result) => {
      this.setState({previous: result.data})
    })
  }

  render() {
    return(
      <div className="col-md-5 all-time-table section col-md-offset-1 section-padding">
        <h4 className="header-text">Previous Day</h4>
        <table>
          <thead>
          <tr className="top-row">
            <th>Views</th>
            <th>Subscribers</th>
            <th>Likes</th>
            <th>Dislikes</th>
          </tr>
          </thead>
          <tbody>
            <tr className="row">
              <td key="a" className="data-cell">{this.numberWithCommas(parseInt(this.state.previous.views))}</td>
              <td key="b" className="data-cell">{this.numberWithCommas(parseInt(this.state.previous.subscribers))}</td>
              <td key="c" className="data-cell">{this.state.previous.likes}</td>
              <td key="d" className="data-cell">{this.state.previous.dislikes}</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }

}

export default PreviousDay;
