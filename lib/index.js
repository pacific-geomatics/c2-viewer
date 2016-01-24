import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import Timer from './react/timer.js'

// Mapbox Tokens
const token = 'pk.eyJ1IjoicGFjZ2VvIiwiYSI6ImE2ZmE3YTQyNmRjNTVmYTAxMWE2YWZlNGFjZjMzZWVhIn0.wRU0txw3VIEOVtyc8PCYdQ';

ReactDOM.render(
  <Timer />,
  document.getElementById('main')
);
