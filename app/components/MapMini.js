/**
 * Right Click Options
 */
import React from 'react'
import mapboxgl from 'mapbox-gl'
import MobileDetect from 'mobile-detect'
import MapMiniControls from './MapMiniControls'
import { mapStyles } from '../utils/mapStyles'

const md = new MobileDetect(window.navigator.userAgent)

class MapMini extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      windowHeight: window.innerHeight,
      windowWidth: window.innerWidth,
      active: true
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleResize = this.handleResize.bind(this)
  }

  componentDidMount() {
    // Create MapboxGL Map
    mapboxgl.accessToken = accessToken

    const mapMini = new mapboxgl.Map({
      container: this.mapMini,
      style: mapStyles[this.props.basemap],
      center: [ this.props.lng, this.props.lat ],
      zoom: this.props.zoom,
      attributionControl: false
    })

    // Disable
    mapMini.keyboard.disable()
    mapMini.boxZoom.disable()
    //mapMini.doubleClickZoom.disable()
    //mapMini.touchZoomRotate.disable()

    // Disable (Mobile)
    if (md.mobile()) {
      mapMini.dragRotate.disable()
    }

    // Define Globals
    window._mapMini = mapMini
    this._mapMini = mapMini
    this.mapMini = this.mapMini
    window.mapMini = this.mapMini
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.active) {
      console.log('MapMini Active!')
      window._map.on('move', this.handleMove.bind(this, window._mapMini))
      window.addEventListener('resize', this.handleResize.bind(this))
    }
  }

  handleResize(e) {
    this.setState({
      windowHeight: e.target.innerHeight,
      windowWidth: e.target.innerWidth
    })
  }

  handleMove(target, e) {
    let position = this.getPosition(e.target)
    position.zoom = 1
    target.flyTo(position)
  }

  getPosition(map, zoomOffset) {
    return {
      center: map.getCenter(),
      zoom: map.getZoom() + zoomOffset,
      bearing: map.getBearing(),
      pitch: map.getPitch()
    }
  }

  handleClick() {
    this.setState({ active: !this.state.active })
  }

  render() {
    let windowTotal = this.state.windowWidth + this.state.windowHeight

    const styles = {
      mapMini: {
        position : 'absolute',
        top: this.props.top,
        bottom: this.props.bottom,
        left: this.props.left,
        right: this.props.right,
        zIndex: this.props.zIndex,
        overflow: 'hidden',
        boxShadow: '5px 5px 15px rgba(100, 100, 100, 0.7)',
        borderRadius: '50%',
        width: (windowTotal > 1600) ? 200: 125,
        height: (windowTotal > 1600) ? 200: 125,
        display: this.state.active ? '' : 'none'
      }
    }
    return (
      <div>
        <MapMiniControls windowTotal={ windowTotal } handleClick={ this.handleClick }/>
        <div
          ref={ (ref) => this.mapMini = ref }
          style={ styles.mapMini }>
        </div>
      </div>
    )
  }
}

MapMini.propTypes = {
  zIndex: React.PropTypes.number,
  top: React.PropTypes.number,
  bottom: React.PropTypes.number,
  left: React.PropTypes.number,
  right: React.PropTypes.number,
  lat: React.PropTypes.number,
  lng: React.PropTypes.number,
  zoom: React.PropTypes.number,
  basemap: React.PropTypes.string
}

MapMini.defaultProps = {
  zIndex: 15,
  bottom: 55,
  left: 10,
  zoomOffset: -6,
  lat: 0.0,
  lng: 0.0,
  zoom: 0,
  basemap: 'streets'
}

export default MapMini;
