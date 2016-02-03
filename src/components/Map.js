/**
 * Mapbox Map
 */
import React, { Component } from 'react';
import classNames from 'classnames';
import map from '../app';

function handleClick(e) {
  console.log(e.nativeEvent.which); // type: left, value - 1
  console.log(e.nativeEvent.which); // type: right, value - 3
  console.log(e.type); // type: left, value - click
  console.log(e.type); // type: right, value - contextmenu
}

const Map = React.createClass({
  render() {
    return <div id="map" onKeyDown={ handleClick } onClick={ handleClick } onContextMenu={ handleClick }></div>;
  }
});

export default Map;
