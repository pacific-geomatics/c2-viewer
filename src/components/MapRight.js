/**
 * Right Click Options
 */
import React from 'react'
import mapboxgl from 'mapbox-gl'
import classicStyles from '../utils/classicStyles'
import { accessToken } from '../utils/accessToken'
import { getPosition } from '../utils/mapHandlers'
import MobileDetect from 'mobile-detect'

const md = new MobileDetect(window.navigator.userAgent)

class MapRight extends React.Component {

  constructor(props) {
    super(props)

    this.state = { }
  }

  componentDidMount() {
    // Create MapboxGL Map
    mapboxgl.accessToken = accessToken

    const mapRight = new mapboxgl.Map({
      container: this.mapRight,
      style: this.props.mapStyle,
      center: [ this.props.lng, this.props.lat ],
      zoom: this.props.zoom + this.props.zoomOffset,
      attributionControl: false
    })

    // Disable
    mapRight.keyboard.disable()
    mapRight.boxZoom.disable()
    //mapRight.doubleClickZoom.disable()
    //mapRight.touchZoomRotate.disable()

    // Disable (Mobile)
    if (md.mobile()) {
      mapRight.dragRotate.disable()
      mapRight.doubleClickZoom.disable()
    }

    // Define Globals
    window._mapRight = mapRight
    this._mapRight = mapRight
    this.mapRight = this.mapRight
    window.mapRight = this.mapRight
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.active) {
      window._map.on('move', this.handleMove.bind(this, window._mapRight))
      window._mapRight.on('move', this.handleMove.bind(this, window._map))
    }
  }

  handleMove(target, e) {
    if (!this.move) {
      this.move = true
      target.jumpTo(getPosition(e.target))
      this.move = false
    }
  }

  render() {
    const styles = {
      mapRight: {
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
        ref={ (ref) => this.mapRight = ref }
        style={ styles.mapRight }>
      </div>
    )
  }
}

MapRight.propTypes = {
  zIndex: React.PropTypes.number,
  top: React.PropTypes.number,
  bottom: React.PropTypes.number,
  left: React.PropTypes.number,
  right: React.PropTypes.number,
  lat: React.PropTypes.number,
  lng: React.PropTypes.number,
  zoom: React.PropTypes.number,
  mapStyle: React.PropTypes.any
}

MapRight.defaultProps = {
  zIndex: 2,
  bottom: 0,
  top: 0,
  zoomOffset: 0,
  lat: 0.0,
  lng: 0.0,
  zoom: 13,
  mapStyle: classicStyles('mapbox.outdoors'),
}

export default MapRight;
