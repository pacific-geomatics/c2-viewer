/**
 * Mapbox Map
 */
import React from 'react';
import classNames from 'classnames';
import mapboxgl from 'mapbox-gl';
import { accessToken } from './accessToken';
import { mapStyles } from './mapStyles';

const styles = {
  map: {
    'position' : 'absolute',
    'bottom': 0,
    'top': 0,
    'width': '100%',
    'zIndex': 0
  }
}

class Map extends React.Component {
  componentDidMount() {
    mapboxgl.accessToken = accessToken;
    var map = new mapboxgl.Map({
      container: 'map',
      style: mapStyles.demoMilitary,
      center: [43.128, 36.32],
      zoom: 15,
      attributionControl: false
    });
    map.keyboard.disable()
    map.on('click', this.handleClick.bind(this))
    map.on('move', this.handleMove.bind(this))
    this.setState({ map: map })
  }

  handleMove(e) {
    console.log(this.state.map.getCenter())
    console.log(this.state.map.getBearing())
  }

  handleClick(e) {
    this.state.map.featuresAt(e.point, { radius: 5, includeGeometry: true }, function (err, features) {
      console.log(features);
    });
  }

  render() {
    return (
      <div id="map" style={ styles.map }></div>
    )
  }
}

export default Map;
