/*
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
*/

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './App.css';

import Header from './components/header';
import AllTime from './components/all_time';
import LikeRatio from './components/like_ratio';
import PreviousDay from './components/previous_day';
import Comments from './components/comments';
import Video from './components/video';
import Month from './components/month';
import Year from './components/year';

class App extends Component {
  render() {
    return (
      <div className="container">
        <Header />
        <div className="top-section">
          <Video />
          <AllTime />
          <LikeRatio />
          <Comments />
          <PreviousDay />
        </div>
        <Month />
        <Year />
      </div>
    );
  }
}

export default App;
