import React, {Component} from 'react';
import {useSpring, animated} from 'react-spring';
import "../style.css";

export default function Header() {
    const props = useSpring({opacity: 1, from: {opacity: 0}})
    return (
      <animated.div className="header" style={props}>
        <h3>YouTube Analytics</h3>
        <h6>Potato Head Animation</h6>
      </animated.div>
    )
}
