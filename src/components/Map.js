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
    this._map = map;
    /**
     * Add Shift Zoom + Shift Select for box selection.
     **/
  }
  handleMove(e) {
    console.log(this._map.getCenter())
    console.log(this._map.getBearing())
    console.log(this._map.getBounds())
    console.log(this._map.getPitch())
    console.log(this._map.getZoom())
    const center = this._map.getCenter()
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
    console.log(this._map.getCenter())
    this._map.featuresAt(e.point, { radius: 5, includeGeometry: true }, function (err, features) {
      console.log(features);
    });
  }
  render() {
    const style = {
      'position' : 'absolute',
      'bottom': 0,
      'top': 0,
      'width': '100%',
      'zIndex': 0
    }
    return (
      <div id="map" style={ style }></div>
    )
  }
}

export default Map;
