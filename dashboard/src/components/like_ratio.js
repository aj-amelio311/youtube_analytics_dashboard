import React, {Component} from 'react';
import axios from 'axios';

class LikeRatio extends Component {
constructor(props) {
  super(props)
  this.state = {
    likeRatio: []
  }
}
componentDidMount() {
axios.get("http://ec2-18-188-66-24.us-east-2.compute.amazonaws.com:9000/like_ratio").then((result) => {
  this.setState({ likeRatio: result.data})
})
}

render() {

  const divStyle = {
    width: '70%'
  }

  const backStyle = {
    width: '150px',
    height: '10px',
    borderRadius: '5px'
  }

  const frontStyle = {
    width: (parseInt(this.state.likeRatio.rawRatio) * 1.5) + 'px',
    height: '10px',
    borderRadius: '5px'
  }
  return (
    <div className="col-md-2 section-too col-md-offset-1 section-padding">
      <h6 className="header-text">Like Ratio</h6>
      <h4 className="likePct">{this.state.likeRatio.ratio}</h4>
      <div id="back" style={backStyle}>
        <div id="front" style={frontStyle}>
        </div>
      </div>
    </div>
  )
}
}


export default LikeRatio
