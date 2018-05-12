import React, {Component} from 'react';


export default class Video extends Component {
  render() {
    return (
      <div className="col-md-6">
        <div className="embed-responsive embed-responsive-16by9">
          <iframe id="videoFrame" width="700" height="400" borderRadius="5px" src="https://www.youtube.com/embed/LscMxpMQ7Kc" frameBorder="20"  allowFullScreen></iframe>
        </div>
      </div>
    )
  }
}
