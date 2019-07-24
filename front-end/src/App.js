import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import Header from "./components/Header";
import About from "./components/pages/About";
import AllTime from "./components/AllTime";
import PreviousDay from "./components/PreviousDay";
import LikeRatio from "./components/LikeRatio";
import Video from "./components/Video";
import Month from "./components/Month";
import Year from "./components/Year"
import "./style.css";

class App extends Component {

  render() {
    return (
      <Router>
        <div>
          <Header />
          <Route exact path="/" render={props => (
            <React.Fragment>
              <div className="container">
                <div className="row">
                  <div className="col">
                    <Video />
                    <div className="about-button">
                      <Link to={`/about`} className="button">About this video</Link>
                    </div>
                  </div>
                  <div className="col">
                    <AllTime />
                    <LikeRatio />
                    <PreviousDay />
                  </div>
                </div>
                  <div>
                    <Month />
                  </div>
                  <div>
                    <Year />
                  </div>
              </div>
            </React.Fragment>
          )} />
          <Route path="/about" component={About} />
        </div>
      </Router>
    )
  }
}

export default App;
