import React, {Component} from "react";
import axios from "axios";
import Table from "./Table";

class LikeRatio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Like/Dislike Ratio",
      data: [],
      rawWidth: 0,
      likeWidth: 0,
      ratio: ""
    }
  }

  componentDidMount() {
    axios.get("http://ec2-18-188-66-24.us-east-2.compute.amazonaws.com:9000/like_ratio").then((resp) => {
      this.setState({data: resp.data})
      this.setState({rawWidth: parseInt(resp.data.rawRatio) * 1.5});
      this.setState({likeWidth: (resp.data.rawRatio * 1.5).toString() + "px"});
      this.setState({ratio: resp.data.ratio})
    })
  }

  render() {

    const back = {
      "backgroundColor": "red",
      "width": "150px",
      "height": "10px",
      "borderRadius": "5px"
    }

    const front = {
      "backgroundColor": "green",
      "width": this.state.likeWidth,
      "height": "10px",
      "borderRadius": "5px"
    }

    return(
      <div className="panel">
        <h6 className="table-title">{this.state.title}</h6>
        <h6 className="like-percent">{this.state.ratio}</h6>
        <div className="like-bar" style={back}>
          <div style={front}></div>
        </div>
      </div>
    )
  }
}

export default LikeRatio;
