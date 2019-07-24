import React, {Component} from "react";
import Table from "./Table";
import axios from "axios";

class PreviousDay extends Component {

  constructor(props) {
    super(props)
    this.state = {
      title: "Previous Day",
      data: []
    }
  }

  componentDidMount() {
    axios.get("http://ec2-18-188-66-24.us-east-2.compute.amazonaws.com:9000/previous_day").then((resp) => {
      this.setState({data: resp.data})
    })
  }

  render() {
    return (
      <div className="panel">
        <h6 className="table-title">{this.state.title}</h6>
        <Table ytdata={this.state} />
      </div>
    )
  }
}

export default PreviousDay;
