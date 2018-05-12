import React, {Component} from 'react';
import axios from 'axios';

class Comments extends Component {
constructor(props) {
  super(props)
  this.state = {
    comments: []
  }
}

componentDidMount() {
  axios.get("http://ec2-18-188-66-24.us-east-2.compute.amazonaws.com:9000/previous_day").then((result) => {
    this.setState({comments: result.data});
  })
}

render() {
  return (
    <div className="col-md-2 section-too section-padding col-md-offset-1">
      <h6 className="header-text">New Comments</h6>
      <h4 className="comments">{this.state.comments.comments}</h4>
    </div>
  )
}

}

export default Comments;
