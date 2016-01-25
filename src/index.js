import React from 'react';
import ReactDOM from 'react-dom';
import Timer from './components/timer.js'
import styles from './css/map.css';
import Radium from 'radium';

// http://stack.formidable.com/radium/

// Mapbox Tokens
const token = 'pk.eyJ1IjoicGFjZ2VvIiwiYSI6ImE2ZmE3YTQyNmRjNTVmYTAxMWE2YWZlNGFjZjMzZWVhIn0.wRU0txw3VIEOVtyc8PCYdQ';

var map = document.createElement('div')
map.id = 'map';

document.body.appendChild(map);

ReactDOM.render(
  <Timer />,
  map
);
