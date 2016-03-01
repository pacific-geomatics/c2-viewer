/**
 * C2 Viewer App
 * References:
 * https://facebook.github.io/react/docs/perf.html
 * https://github.com/hgoebl/mobile-detect.js
 * http://csstriggers.com/
 * https://github.com/joshwcomeau/react-flip-move/blob/master/docs/how-it-works.md
 * http://www.w3schools.com/cssref/css3_pr_perspective.asp
 */
import React from 'react'
import ReactDOM from 'react-dom'
import { accessToken } from './utils/accessToken'
import { mapStyles } from './utils/mapStyles'
import classicStyles from './utils/classicStyles'
import Logo from './components/Logo'
import Crosshair from './components/Crosshair'
import Search from './components/Search'
import NoClickZone from './components/NoClickZone'
import RightClickOptions from './components/RightClickOptions'
import NorthArrow from './components/NorthArrow'
import TiltView from './components/TiltView'
import CompareSwiper from './components/CompareSwiper'
import Attribution from './components/Attribution'
import MyPosition from './components/MyPosition'
import ZoomOut from './components/ZoomOut'
import ZoomIn from './components/ZoomIn'
import Settings from './components/Settings'
import MobileDetect from 'mobile-detect'

const keycodes = {
  16: 'shift'
}
const md = new MobileDetect(window.navigator.userAgent)
window.md = md

class App extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      lat: props.lat,
      lng: props.lng,
      mapStyle: props.mapStyle,
      mapStyleRight: props.mapStyleRight,
      mapStyleMini: props.mapStyleMini,
      zoom: props.zoom,
      left: props.left,
      active: false
    }
    this.windowWidth = window.innerWidth
    this.windowHeight = window.innerHeight
    this.windowTotal = window.innerWidth + window.innerHeight
    this.moveTimeStamp = Date.now()
  }

  componentDidMount() {
    mapboxgl.accessToken = accessToken

    var map = new mapboxgl.Map({
      container: this.map,
      style: this.state.mapStyle,
      center: [ this.state.lng, this.state.lat ],
      zoom: this.state.zoom,
      attributionControl: false
    })

    var mapRight = new mapboxgl.Map({
      container: this.mapRight,
      style: this.state.mapStyleRight,
      center: [ this.state.lng, this.state.lat ],
      zoom: this.state.zoom,
      attributionControl: false
    })

    var mapMini = new mapboxgl.Map({
      container: this.mapMini,
      style: this.state.mapStyleMini,
      center: [ this.state.lng, this.state.lat ],
      zoom: this.state.zoom + this.props.mapMiniOffset,
      attributionControl: false
    })

    // Define Globals
    window._map = map
    window._mapRight = mapRight
    window._mapMini = mapMini
    window._mapboxgl = mapboxgl
    window.map = this.map
    window.mapRight = this.mapRight
    window.mapMini = this.mapMini
    this._map = map
    this._mapRight = mapRight
    this._mapMini = mapMini
    this._mapboxgl = mapboxgl

    // Disable
    const mapboxglMaps = [map, mapRight]
    mapboxglMaps.map((mapItem) => {
      mapItem.dragRotate.disable()
      mapItem.keyboard.disable()
      //mapItem.doubleClickZoom.disable()
      //mapItem.touchZoomRotate.disable()
    })

    // Syncing Map
    map.on('move', this.syncMaps.bind(this, map, mapRight, 0))
    map.on('move', this.syncMaps.bind(this, map, mapMini, this.props.mapMiniOffset))
    mapRight.on('move', this.syncMaps.bind(this, mapRight, map, 0))
    mapRight.on('move', this.syncMaps.bind(this, mapRight, mapMini, this.props.mapMiniOffset))

    this.setState({ active: true })
    /**
     * Add Shift Zoom + Shift Select for box selection.
     **/
  }

  syncMaps(source, target, zoomOffset) {
    if (!this.move) {
      this.moveTimeStamp = Date.now()
      this.move = true
      target.jumpTo(this.getPosition(source, zoomOffset))
      this.move = false
    }
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
    const style = {
      map: {
        position : 'absolute',
        bottom: 0,
        top: 0,
        width: '100%',
        overflow: 'hidden',
        zIndex: 0,
        clip: `rect(0px, ${ this.windowWidth / 2 }px, 999em, 0px)`,
      },
      mapRight: {
        position : 'absolute',
        bottom: 0,
        top: 0,
        zIndex: 1,
        width: '100%',
        clip: `rect(0px, 999em, ${ this.windowHeight }px, ${ this.windowWidth / 2 }px)`,
        overflow: 'hidden'
      },
      mapMini: {
        position : 'absolute',
        bottom: 55,
        left: 10,
        zIndex: 2,
        overflow: 'hidden',
        boxShadow: '5px 5px 15px rgba(100, 100, 100, 0.7)',
        borderRadius: '50%',
        width: (this.windowTotal > 1600) ? 200: this.windowTotal / 8,
        height: (this.windowTotal > 1600) ? 200: this.windowTotal / 8,
      }
    }

    return (
      <div>
        { this.state.active && <NorthArrow /> }
        { this.state.active && <TiltView /> }
        { this.state.active && <MyPosition /> }
        { this.state.active && <ZoomOut /> }
        { this.state.active && <ZoomIn /> }
        { this.state.active && <Settings /> }
        { this.state.active && <Attribution /> }
        { this.state.active && <RightClickOptions /> }
        <Search />
        <Logo />
        <CompareSwiper />
        <Crosshair
          left={ this.state.x }
          top={ this.state.y }
          fontSize={ 15 }
          accuracy={ this.state.accuracy }
          />
        <div
          ref={ (ref) => this.mapRight = ref }
          style={ style.mapRight }>
        </div>
        <div
          ref={ (ref) => this.map = ref }
          style={ style.map }>
        </div>
        <div
          ref={ (ref) => this.mapMini = ref }
          style={ style.mapMini }>
        </div>
      </div>
    )
  }
}

App.propTypes = {
  lat: React.PropTypes.number,
  lng: React.PropTypes.number,
  zoom: React.PropTypes.number,
  holdTimeout: React.PropTypes.number,
  mapStyle: React.PropTypes.string,
  mapRightStyle: React.PropTypes.string,
  accuracy: React.PropTypes.string,
  mapMiniOffset: React.PropTypes.number
}

App.defaultProps = {
  lat: 36.31545,
  lng: 43.14998,
  zoom: 13,
  holdTimeout: 1000,
  mapMiniOffset: -4,
  mapStyle: mapStyles.hybrid,
  mapStyleMini: mapStyles.streets,
  mapStyleRight: classicStyles('mapbox.outdoors'),
  accuracy: 'center'
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)
