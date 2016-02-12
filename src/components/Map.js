/**
 * Mapbox Map
 */
import React from 'react'
import mapboxgl from 'mapbox-gl'
import { accessToken } from '../modules/accessToken'
import { mapStyles } from '../modules/mapStyles'
import Coordinates from './Coordinates'

class Map extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      lat: props.lat
     ,lng: props.lng
     ,style: props.style
     ,zoom: props.zoom
    }
  }
  componentDidMount() {
    mapboxgl.accessToken = accessToken;
    var map = new mapboxgl.Map({
      container: this.mapboxMap,
      style: this.state.style,
      center: [ this.state.lat, this.state.lng ],
      zoom: this.state.zoom,
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
    let center = this._map.getCenter()
    this.setState({ lat: center.lat, lng: center.lng, center: center })
    this.setState({ bearing: this._map.getBearing() })
    this.setState({ bounds: this._map.getBounds() })
    this.setState({ pitch: this._map.getPitch() })
    this.setState({ zoom: this._map.getZoom() })
  }
  handleClick(e) {
    let center = e.lngLat
    this.setState({ lat: center.lat, lng: center.lng, center: center })
    //this._map.featuresAt(e.point, { radius: 5, includeGeometry: true }, function (err, features) {
    //  console.log(features);
    //});
  }
  render() {
    const style = {
      'position' : 'absolute'
     ,'bottom': 0
     ,'top': 0
     ,'width': '100%'
     ,'zIndex': 0
    }
    return (
      <div>
        <Coordinates lat={ this.state.lat } lng={ this.state.lng }/>
        <div
          ref={ (ref) => this.mapboxMap = ref }
          style={ style }>
        </div>
      </div>
    )
  }
}

Map.propTypes = {
  lat: React.PropTypes.number
 ,lng: React.PropTypes.number
 ,zoom: React.PropTypes.number
 ,style: React.PropTypes.string
}
Map.defaultProps = {
  lat: 43.128
 ,lng: 36.32
 ,zoom: 15
 ,style: mapStyles.hybrid
}
export default Map;
