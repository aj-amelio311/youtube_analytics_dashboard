import React, {Component} from "react";
import {Link} from "react-router-dom";

class About extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="col-md-12 about">
          <p className="about-text">"Potato Head Animation" is a stop-motion animation I made
          in 2008. It was made over the course of 3 months with a digital camera
          and Windows Movie Maker. The set was built with posterboard and construction
          paper.
          </p>

          <p className="about-text">After accumilating a relatively small amount of views
          over the first 4 years of being active on YouTube, "Potato Head Animation" began
          to achieve gradual success, and I began to take notice.
          </p>

          <p className="about-text">
          I began collecting analytics data for the video in April 2018. After a few months,
          YouTube modified their algorithm, drastically altering the data and decreasing the
          online visibilty of the video.
          </p>
          <Link to={`/`} className="button">Home</Link>
        </div>

      </React.Fragment>
    )
  }
}

export default About;
