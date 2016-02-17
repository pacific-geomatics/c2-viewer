/**
 * C2 Viewer App
 */
import React from 'react'
import ReactDOM from 'react-dom'
import mapboxgl from 'mapbox-gl'
import Compare from 'mapbox-gl-compare'
import { accessToken } from './modules/accessToken'
import { mapStyles } from './modules/mapStyles'
import Coordinates from './components/Coordinates'
import Logo from './components/Logo'
import Crosshair from './components/Crosshair'
import Search from './components/Search'
import NoClickZone from './components/NoClickZone'
import RightClickOptions from './components/RightClickOptions'
import NorthArrow from './components/NorthArrow'
import CompareSwiper from './components/CompareSwiper'

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
      mapStyleSwipe: props.mapStyleSwipe,
      zoom: props.zoom,
      mapSwipeLeft: props.mapSwipeLeft
    }
  }

  componentDidMount() {
    mapboxgl.accessToken = accessToken

    const map = new mapboxgl.Map({
      container: this.map,
      style: this.state.mapStyle,
      center: [ this.state.lng, this.state.lat ],
      zoom: this.state.zoom,
      attributionControl: false
    })

    const mapSwipe = new mapboxgl.Map({
      container: this.mapSwipe,
      style: this.state.mapStyleSwipe,
      center: [ this.state.lng, this.state.lat ],
      zoom: this.state.zoom,
      attributionControl: false
    })

    // Define Globals
    window._map = map
    window._mapSwipe = mapSwipe
    window._mapboxgl = mapboxgl
    window.map = this.map
    window.mapSwipe = this.mapSwipe
    this._map = map
    this._mapSwipe = mapSwipe
    this._mapboxgl = mapboxgl

    // Disable
    //map.dragRotate.disable()
    //map.keyboard.disable()

    // Event Listeners
    map.on('click', this.handleClickLeft.bind(this))
    map.on('contextmenu', this.handleClickRight.bind(this))
    map.on('resize', this.handleResize.bind(this))
    map.on('mousedown', this.handleMouseDown.bind(this))
    map.on('mouseup', this.handleMouseUp.bind(this))
    map.on('movestart', this.handleMoveStart.bind(this))
    map.on('moveend', this.handleMoveEnd.bind(this))
    map.on('zoom', this.handleZoom.bind(this))
    mapSwipe.on('click', this.handleClickLeft.bind(this))
    mapSwipe.on('contextmenu', this.handleClickRight.bind(this))
    mapSwipe.on('resize', this.handleResize.bind(this))
    mapSwipe.on('mousedown', this.handleMouseDown.bind(this))
    mapSwipe.on('mouseup', this.handleMouseUp.bind(this))
    mapSwipe.on('movestart', this.handleMoveStart.bind(this))
    mapSwipe.on('moveend', this.handleMoveEnd.bind(this))
    mapSwipe.on('zoom', this.handleZoom.bind(this))

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

  handleResize(e) {
    //
  }

  handleMoveStart(e) {
    this.setState({ move: true })
  }

  handleMoveEnd(e) {
    this.setState({ move: false })
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
      clickRightY: e.point.y
    })
  }

  handleClickLeft(e) {
    console.log('click/app')

    this.setState({
      lat: e.lngLat.lat,
      lng: e.lngLat.lng,
      x: e.point.x,
      y: e.point.y
    })
    //this._map.featuresAt(e.point, { radius: 5, includeGeometry: true }, function (err, features) {
    //  console.log(features);
    //});
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
      mapSwipe: {
        position : 'absolute',
        bottom: 0,
        top: 0,
        zIndex: 1,
        width: '100%',
        clip: `rect(0px 999em 904px ${ this.state.mapSwipeLeft }px)`,
        overflow: 'hidden'
      }
    }

    return (
      <div
        onKeyDown={ this.handleKeyDown.bind(this) }
        onKeyUp={ this.handleKeyUp.bind(this) }
      >
        <Search />
        <Logo />
        <CompareSwiper
          before={ this.map }
          after={ this.mapSwipe }
          left={ this.state.mapSwipeLeft }
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
          onBlur={ this.handleBlur.bind(this) }
        />
        <Crosshair
          left={ this.state.x }
          top={ this.state.y }
          fontSize={ 15 }
        />
        <Coordinates
          lat={ this.state.lat }
          lng={ this.state.lng }
          zoom={ this.state.zoom }
          bottom={ 15 }
          right={ 15 }
        />
        <NoClickZone right={ 0 } top={ 0 } bottom={ 0 } width={ 10 } />
        <NoClickZone right={ 10 } left={ 0 } bottom={ 0 } height={ 10 } />
        <div
          ref={ (ref) => this.map = ref }
          style={ style.map }>
        </div>
        <div
          ref={ (ref) => this.mapSwipe = ref }
          style={ style.mapSwipe }>
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
  mapStyleSwipe: React.PropTypes.string
}

App.defaultProps = {
  lat: 36.32,
  lng: 43.128,
  zoom: 14,
  holdTimeout: 1000,
  mapStyle: mapStyles.hybrid,
  mapStyleSwipe: mapStyles.hybrid,
  mapSwipeLeft: window.innerWidth / 2
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)
