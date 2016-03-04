/**
 * Right Click Options
 */
import React from 'react'
import mapboxgl from 'mapbox-gl'
import { mapStyles } from '../utils/mapStyles'
import { accessToken } from '../utils/accessToken'
import { getPosition } from '../utils/mapHandlers'
import MobileDetect from 'mobile-detect'

const md = new MobileDetect(window.navigator.userAgent)

class Map extends React.Component {

  constructor(props) {
    super(props)

    this.state = { active: this.props.active }
  }

  componentDidMount() {
    // Create MapboxGL Map
    mapboxgl.accessToken = accessToken

    const map = new mapboxgl.Map({
      container: this.map,
      style: mapStyles[this.props.basemap],
      center: [ this.props.lng, this.props.lat ],
      zoom: this.props.zoom + this.props.zoomOffset,
      attributionControl: false
    })

    // Disable
    map.keyboard.disable()
    map.boxZoom.disable()
    //map.doubleClickZoom.disable()
    //map.touchZoomRotate.disable()

    // Disable (Mobile)
    const md = new MobileDetect(window.navigator.userAgent)

    if (md.mobile()) {
      map.dragRotate.disable()
      map.doubleClickZoom.disable()
    }

    // Define Globals
    window._map = map
    this._map = map
    this.map = this.map
    window.map = this.map
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.active) {
      console.log('Map Active!')
    }
  }

  jumpTo(map, e) {
    map.flyTo(this.getPosition(e.target, this.props.zoomOffset))
  }

  getPosition(map, zoomOffset) {
    return {
      center: map.getCenter(),
      zoom: map.getZoom() + zoomOffset,
      bearing: map.getBearing(),
      pitch: map.getPitch()
    }
  }

  render() {
    const styles = {
      map: {
        position : 'absolute',
        top: this.props.top,
        bottom: this.props.bottom,
        left: this.props.left,
        right: this.props.right,
        zIndex: this.props.zIndex,
        width: '100%',
        overflow: 'hidden'
      }
    }
    return (
      <div
        ref={ (ref) => this.map = ref }
        style={ styles.map }>
      </div>
    )
  }
}

Map.propTypes = {
  zIndex: React.PropTypes.number,
  top: React.PropTypes.number,
  bottom: React.PropTypes.number,
  left: React.PropTypes.number,
  right: React.PropTypes.number,
  lat: React.PropTypes.number,
  lng: React.PropTypes.number,
  zoom: React.PropTypes.number,
  basemap: React.PropTypes.string,
  active: React.PropTypes.bool
}

Map.defaultProps = {
  zIndex: 1,
  bottom: 0,
  top: 0,
  zoomOffset: 0,
  lat: 0.0,
  lng: 0.0,
  zoom: 13,
  basemap: 'pacgeo',
  active: false
}

export default Map;
