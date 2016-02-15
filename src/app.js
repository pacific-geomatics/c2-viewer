/**
 * C2 Viewer App
 */
import React from 'react'
import ReactDOM from 'react-dom'
import mapboxgl from 'mapbox-gl'
import { accessToken } from './modules/accessToken'
import { mapStyles } from './modules/mapStyles'
import Coordinates from './components/Coordinates'
import Logo from './components/Logo'
import Crosshair from './components/Crosshair'
import Search from './components/Search'
import NoClickZone from './components/NoClickZone'
import RightClickOptions from './components/RightClickOptions'
import NorthArrow from './components/NorthArrow'

const keycodes = {
  16: 'shift'
}

class App extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      lat: props.lat,
      lng: props.lng,
      mapStyle: props.mapStyle,
      zoom: props.zoom
    }
  }

  componentDidMount() {
    mapboxgl.accessToken = accessToken

    var map = new mapboxgl.Map({
      container: this.mapboxMap,
      style: this.state.mapStyle,
      center: [ this.state.lng, this.state.lat ],
      zoom: this.state.zoom,
      attributionControl: false
    })
    // Disable
    //map.dragRotate.disable()
    //map.keyboard.disable()

    // Event Listeners
    map.on('click', this.handleClickLeft.bind(this))
    map.on('contextmenu', this.handleClickRight.bind(this))
    map.on('move', this.handleMove.bind(this))
    map.on('resize', this.handleResize.bind(this))
    map.on('mousedown', this.handleMouseDown.bind(this))
    map.on('mouseup', this.handleMouseUp.bind(this))
    map.on('moveend', this.handleMoveEnd.bind(this))
    map.on('zoom', this.handleZoom.bind(this))
    this._map = map

    this.setState({
      left: this.mapboxMap.clientWidth / 2 + this.mapboxMap.offsetLeft,
      top: this.mapboxMap.clientHeight / 2 + this.mapboxMap.offsetTop,
      width: this.mapboxMap.clientWidth,
      height: this.mapboxMap.clientHeight,
      mouseUpTimeStamp: Date.now()
    })
    /**
     * Add Shift Zoom + Shift Select for box selection.
     **/
  }

  handleKeyUp(e) {
    if (e.keyCode == 16) {
      this.setState({ shift: false })
      this._map.dragRotate.disable()
    }
  }

  handleKeyDown(e) {
    if (e.keyCode == 16) {
      this.setState({ shift: true })
      this._map.dragRotate.enable()
    }
  }

  handleKeyPress(e) {
    //console.dir(e.keyCode)
  }

  handleMove(e) {
    this.setState({
      move: true,
      bearing: this._map.getBearing(),
      bounds: this._map.getBounds(),
      pitch: this._map.getPitch(),
      zoom: this._map.getZoom(),
      moveTimeStmap: Date.now()
    })
  }

  handleMoveEnd(e) {
    console.log('moveEnd/app')
    this.setState({
      move: false
    })
  }

  handleZoom(e) {
    this.reset('zoom/app')
  }

  handleResize(e) {
    this.reset('resize/app')
  }

  reset(e) {
    console.log(`reset/${e}`)

    this.setState({
      click: false,
      clickRight: false,
      clickLeft: false,
      mouseHold: false,
      mouseHoldRight: false,
      mouseHoldLeft: false,
      mouseUp: false,
      mouseUpLeft: false,
      mouseUpRight: false,
      mouseDown: false,
      mouseDownLeft: false,
      mouseDownRight: false
    })
  }

  handleFocus(e) {
    console.log('focus/app')
  }

  handleMouseUp(e) {
    console.log('mouseUp/app')
    this.setState({
      mouseUp: true,
      mouseUpX: e.point.x,
      mouseUpY: e.point.y,
      mouseUpTimeStamp: Date.now()
    })
  }

  handleMouseDown(e) {
    console.log('mouseDown/app')

    this.setState({
      mouseDown: true,
      mouseUp: false,
      mouseHold: false,
      clickRight: false,
      clickLeft: false,
      mouseDownLeft: true,
      mouseDownRight: true,
      mouseUpLeft: false,
      mouseUpRight: false,
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
        console.log('mouseHold/app')

        this.setState({
          mouseHold: true,
          mouseHoldLeft: true,
          mouseHoldRight: true,
          mouseHoldX: e.point.x,
          mouseHoldY: e.point.y,
          x: e.point.x,
          y: e.point.y,
          clickRightX: null,
          clickRightY: null,
          mouseHoldTimeStamp: Date.now()
        })
      }
    }
  }

  handleClickRight(e) {
    console.log('clickRight/app')

    this.setState({
      click: true,
      clickLeft: false,
      clickRight: true,
      lat: e.lngLat.lat,
      lng: e.lngLat.lng,
      clickRightLat: e.lngLat.lat,
      clickRightLng: e.lngLat.lng,
      x: e.point.x,
      y: e.point.y,
      mouseHoldX: null,
      mouseHoldY: null,
      clickRightX: e.point.x,
      clickRightY: e.point.y,
      clickRightTimeStamp: Date.now()
    })
  }

  handleClickLeft(e) {
    console.log('click/app')

    this.setState({
      click: true,
      clickLeft: true,
      clickRight: false,
      lat: e.lngLat.lat,
      lng: e.lngLat.lng,
      clickLeftLat: e.lngLat.lat,
      clickLeftLng: e.lngLat.lng,
      x: e.point.x,
      y: e.point.y,
      clickLeftX: e.point.x,
      clickLeftY: e.point.y,
      clickLeftTimeStamp: Date.now()
    })
    //this._map.featuresAt(e.point, { radius: 5, includeGeometry: true }, function (err, features) {
    //  console.log(features);
    //});
  }

  render() {
    const style = {
      'position' : 'absolute',
      'bottom': 0,
      'top': 0,
      'width': '100%',
      'zIndex': 0,
      'overflow': 'hidden'
    }

    return (
      <div
        onKeyDown={ this.handleKeyDown.bind(this) }
        onKeyUp={ this.handleKeyUp.bind(this) }
        onKeyPress={ this.handleKeyPress.bind(this) }
      >
        <Search onFocus={ this.handleFocus.bind(this) } />
        <Logo />
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
        />
        <Coordinates
          onFocus={ this.handleFocus.bind(this) }
          lat={ this.state.lat }
          lng={ this.state.lng }
          zoom={ this.state.zoom }
          bottom={ 15 }
          right={ 15 }
        />
        <NoClickZone right={ 0 } top={ 0 } bottom={ 0 } width={ 10 } />
        <NoClickZone right={ 10 } left={ 0 } bottom={ 0 } height={ 10 } />
        <div
          ref={ (ref) => this.mapboxMap = ref }
          style={ style }>
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
  mapStyle: React.PropTypes.string
}

App.defaultProps = {
  lat: 36.32,
  lng: 43.128,
  zoom: 15,
  holdTimeout: 1000,
  mapStyle: mapStyles.hybrid
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)
