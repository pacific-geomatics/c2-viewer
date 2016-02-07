/**
 * Mapbox Map
 */
import React from 'react';
import classNames from 'classnames';
import mapboxgl from 'mapbox-gl';
import { accessToken } from './accessToken';
import { mapStyles } from './mapStyles';
import converter from 'coordinator';

let toUSNG = converter('latlong', 'usng')
let toMGRS = converter('latlong', 'mgrs')
let toUTM = converter('latlong', 'utm')
let toLatLng = converter('usng', 'latlong')

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
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    mapboxgl.accessToken = accessToken;
    var map = new mapboxgl.Map({
      container: 'map',
      style: this.props.style,
      center: this.props.center,
      zoom: this.props.zoom,
      attributionControl: false
    });
    //map.keyboard.disable()
    map.on('click', this.handleClick.bind(this))
    map.on('move', this.handleMove.bind(this))
    this.setState({ map: map })
  }
  handleMove(e) {
    console.log(this.state.map.getCenter())
    console.log(this.state.map.getBearing())
    console.log(this.state.map.getBounds())
    console.log(this.state.map.getPitch())
    console.log(this.state.map.getZoom())
    const center = this.state.map.getCenter()
    console.log(toMGRS(center.lat, center.lng, 4))
    console.log(toUTM(center.lat, center.lng, 4))
    console.log(toUSNG(center.lat, center.lng, 4))
    console.log(toLatLng(toUSNG(center.lat, center.lng, 4)))
  }
  loadCommentsFromServer() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      success: (data) => {
        this.setState({data: data});
      }
    });
  }
  handleClick(e) {
    console.log(this.state.map.getCenter())
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
