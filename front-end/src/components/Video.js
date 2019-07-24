import React, {Component} from "react";
import {useSpring, animated} from 'react-spring';

export default function Video() {
    //const props = useSpring({opacity: 1, from: {opacity: 0}})
    return (
      <div>
        <iframe className="video" src="https://www.youtube.com/embed/LscMxpMQ7Kc" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div>
    )
}
