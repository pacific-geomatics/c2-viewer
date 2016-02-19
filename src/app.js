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
import mapboxgl from 'mapbox-gl'
import Compare from 'mapbox-gl-compare'
import { accessToken } from './utils/accessToken'
import { mapStyles } from './utils/mapStyles'
import Coordinates from './components/Coordinates'
import Logo from './components/Logo'
import Crosshair from './components/Crosshair'
import Search from './components/Search'
import NoClickZone from './components/NoClickZone'
import RightClickOptions from './components/RightClickOptions'
import NorthArrow from './components/NorthArrow'
import CompareSwiper from './components/CompareSwiper'
import Attribution from './components/Attribution'

const keycodes = {
  16: 'shift'
}

function getPosition(map) {
  return {
    center: map.getCenter(),
    zoom: map.getZoom(),
    bearing: map.getBearing(),
    pitch: map.getPitch()
  }
}

class App extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      lat: props.lat,
      lng: props.lng,
      mapStyle: props.mapStyle,
      mapStyleRight: props.mapStyleRight,
      zoom: props.zoom,
      left: props.left
    }
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

    // Define Globals
    window._map = map
    window._mapRight = mapRight
    window._mapboxgl = mapboxgl
    window.map = this.map
    window.mapRight = this.mapRight
    this._map = map
    this._mapRight = mapRight
    this._mapboxgl = mapboxgl

    // Disable
    //map.dragRotate.disable()
    //map.keyboard.disable()

    // Event Listeners
    //map.on('click', this.handleClickLeft.bind(this))
    //map.on('contextmenu', this.handleClickRight.bind(this))
    //map.on('resize', this.handleResize.bind(this))
    //map.on('mousedown', this.handleMouseDown.bind(this))
    //map.on('mouseup', this.handleMouseUp.bind(this))
    //map.on('movestart', this.handleMoveStart.bind(this))
    //map.on('moveend', this.handleMoveEnd.bind(this))
    //map.on('zoom', this.handleZoom.bind(this))
    //mapRight.on('click', this.handleClickLeft.bind(this))
    //mapRight.on('contextmenu', this.handleClickRight.bind(this))
    //mapRight.on('resize', this.handleResize.bind(this))
    //mapRight.on('mousedown', this.handleMouseDown.bind(this))
    //mapRight.on('mouseup', this.handleMouseUp.bind(this))
    //mapRight.on('movestart', this.handleMoveStart.bind(this))
    //mapRight.on('moveend', this.handleMoveEnd.bind(this))
    //mapRight.on('zoom', this.handleZoom.bind(this))

    map.on('move', this.syncMaps.bind(this, _map, _mapRight))
    mapRight.on('move', this.syncMaps.bind(this, _mapRight, _map))

    this.setState({
      left: this.map.clientWidth / 2 + this.map.offsetLeft,
      top: this.map.clientHeight / 2 + this.map.offsetTop,
      width: this.map.clientWidth,
      height: this.map.clientHeight,
      mouseUpTimeStamp: Date.now()
    })
    /**
     * Add Shift Zoom + Shift Select for box selection.
     **/
  }

  syncMaps(source, target) {
    if (!this.move) {
      this.move = true
      target.jumpTo(getPosition(source))
      this.move = false
    }
  }

  handleKeyUp(e) {
    if (e.keyCode == 16) {
      this.setState({ shift: false })
      //this._map.dragRotate.disable()
    }
  }

  handleKeyDown(e) {
    if (e.keyCode == 16) {
      this.setState({ shift: true })
      //this._map.dragRotate.enable()
    }
  }

  handleResize(e) {
    //
  }

  handleMoveStart(e) {
    this.setState({ move: true })
  }

  handleMoveEnd(e) {
    this.setState({
      move: false,
      moveRight: false,
      moveLeft: false
    })
  }

  handleZoom(e) {
    this.setState({ zoom: this._map.getZoom()} )
  }

  handleMouseUp(e) {
    this.setState({
      mouseDown: false,
      mouseUpX: e.point.x,
      mouseUpY: e.point.y,
      mouseUpTimeStamp: Date.now()
    })
  }

  handleBlur(e) {
    this.setState({ show: false })
  }

  handleMouseDown(e) {
    this.setState({
      rightClick: false,
      mouseHold: false,
      mouseDown: true,
      mouseDownX: e.point.x,
      mouseDownY: e.point.y,
      mouseDownTimeStamp: Date.now()
    })
    setTimeout(() => { this.handleMouseHold(e) }, this.props.holdTimeout)
  }

  handleMouseHold(e) {
    // Must not be moving the map
    if (!this.state.move) {

      // Must have a delay of 1s to be considered a Map Hold
      if (this.state.mouseDown && Date.now() - this.state.mouseUpTimeStamp > this.props.holdTimeout) {

        this.setState({
          mouseHold: true,
          mouseHoldX: e.point.x,
          mouseHoldY: e.point.y,
          x: e.point.x,
          y: e.point.y,
          clickRightX: null,
          clickRightY: null
        })
      }
    }
  }

  handleClickRight(e) {
    console.log('clickRight/app')

    this.setState({
      clickRight: true,
      lat: e.lngLat.lat,
      lng: e.lngLat.lng,
      x: e.point.x,
      y: e.point.y,
      mouseHoldX: null,
      mouseHoldY: null,
      clickRightX: e.point.x,
      clickRightY: e.point.y,
      accuracy: 'click'
    })
  }

  handleClickLeft(e) {
    console.log('click/app')

    this.setState({
      clickRight: false,
      lat: e.lngLat.lat,
      lng: e.lngLat.lng,
      x: e.point.x,
      y: e.point.y,
      accuracy: 'click'
    })
    //this._map.featuresAt(e.point, { radius: 5, includeGeometry: true }, function (err, features) {
    //  console.log(features);
    //});
  }

  getChildContext() {
    return { left: this.state.left }
  }

  setLeft(item) {
    this.setState({ left: item })
  }

  componentWillReceiveProps() {
    console.log(this.props.children)
  }

  render() {
    const style = {
      map: {
        position : 'absolute',
        bottom: 0,
        top: 0,
        width: '100%',
        overflow: 'hidden',
        zIndex: 0
      },
      mapRight: {
        position : 'absolute',
        bottom: 0,
        top: 0,
        zIndex: 1,
        width: '100%',
        clip: `rect(0px 999em ${ window.innerHeight }px ${ this.state.left }px)`,
        overflow: 'hidden'
      }
    }

    return (
      <div
        onKeyDown={ this.handleKeyDown.bind(this) }
        onKeyUp={ this.handleKeyUp.bind(this) }
        >
        <Search />
        <Attribution
          lat={ this.state.lat }
          lng={ this.state.lng }
          zoom={ this.state.zoom }
          />
        <Logo />
        <CompareSwiper
          left={ this._map }
          right={ this._mapRight }
          setLeft={ this.setLeft.bind(this) }
          left={ this.state.left }
          />
        <NorthArrow
          bottom={ 60 }
          right={ 20 }
          bearing={ this.state.bearing }
          />
        <RightClickOptions
          left={ this.state.mouseHoldX || this.state.clickRightX }
          top={ this.state.mouseHoldY || this.state.clickRightY }
          show={ this.state.mouseHold || this.state.clickRight }
          />
        <Crosshair
          left={ this.state.x }
          top={ this.state.y }
          fontSize={ 15 }
          accuracy={ this.state.accuracy }
          />
        <Coordinates
          lat={ this.state.lat }
          lng={ this.state.lng }
          zoom={ this.state.zoom }
          bottom={ 15 }
          right={ 15 }
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
      </div>
    )
  }
}

App.childContextTypes = {
  left: React.PropTypes.any
}

App.propTypes = {
  lat: React.PropTypes.number,
  lng: React.PropTypes.number,
  zoom: React.PropTypes.number,
  holdTimeout: React.PropTypes.number,
  mapStyle: React.PropTypes.string,
  mapRightStyle: React.PropTypes.string,
  left: React.PropTypes.number
}

App.defaultProps = {
  lat: 36.32,
  lng: 43.128,
  zoom: 14,
  holdTimeout: 1000,
  mapStyle: mapStyles.streets,
  mapStyleRight: mapStyles.hybrid,
  left: window.innerWidth / 2
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)
