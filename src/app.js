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


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      lat: props.lat
     ,lng: props.lng
     ,mapStyle: props.mapStyle
     ,zoom: props.zoom
     ,timeStamp: Date.now()
    }
  }
  componentDidMount() {
    mapboxgl.accessToken = accessToken;
    var map = new mapboxgl.Map({
      container: this.mapboxMap,
      style: this.state.mapStyle,
      center: [ this.state.lng, this.state.lat ],
      zoom: this.state.zoom,
      attributionControl: false
    });
    //map.keyboard.disable()
    // Event Listeners
    map.on('click', this.handleClick.bind(this))
    map.on('move', this.handleMove.bind(this))
    map.on('resize', this.handleResize.bind(this))
    map.on('mousedown', this.handleMouseDown.bind(this))
    map.on('mouseup', this.handleMouseUp.bind(this))
    map.on('moveend', this.handleMoveEnd.bind(this))
    map.on('zoom', this.handleZoom.bind(this))
    map.on('contextmenu', this.handleContextMenu.bind(this))
    this._map = map;
    this.setState({
      left: this.mapboxMap.clientWidth / 2 + this.mapboxMap.offsetLeft
     ,top: this.mapboxMap.clientHeight / 2 + this.mapboxMap.offsetTop
     ,width: this.mapboxMap.clientWidth
     ,height: this.mapboxMap.clientHeight
    })
    /**
     * Add Shift Zoom + Shift Select for box selection.
     **/
  }
  handleMove(e) {
    this.reset('move/app')
    let center = this._map.getCenter()
    let timeStampDelta = Date.now() - this.state.timeStamp
    if ( timeStampDelta > 1000 ) {
      this.setState({
        lat: center.lat
       ,lng: center.lng
       ,bearing: this._map.getBearing()
       ,bounds: this._map.getBounds()
       ,pitch: this._map.getPitch()
       ,zoom: this._map.getZoom()
       ,offsetTop: this.mapboxMap.offsetTop
       ,offsetLeft: this.mapboxMap.offsetLeft
       ,width: this.mapboxMap.clientWidth
       ,height: this.mapboxMap.clientHeight
       ,timeStamp: Date.now()
       ,crosshairTop: this.mapboxMap.clientHeight / 2 + this.mapboxMap.offsetTop
       ,crosshairLeft: this.mapboxMap.clientWidth / 2 + this.mapboxMap.offsetLeft
      })
    }
  }
  handleZoom(e) {
    this.reset('zoom/app')
  }
  handleMoveEnd(e) {
    //console.log(e)
  }
  handleResize(e) {
    this.reset('resize/app')
  }
  handleContextMenu(e) {
    this.reset('contextMenu/app')
    this.setState({
      contextMenuLat: e.lngLat.lat
     ,contextMenuLng: e.lngLat.lng
     ,contextMenuX: e.point.x
     ,contextMenuY: e.point.y
     ,timeStamp: Date.now()
     ,rightClick: true
    })
  }
  reset(e) {
    console.log(e)
    this.setState({
      rightClick: false
     ,rightMouseHold: false
     ,leftClick: false
     ,leftMouseHold: false
    })
  }
  handleFocus(e) {
    console.log('focus/app')
  }
  handleMouseUp(e) {
    this.setState({ mouseTimeStamp: Date.now() })
  }
  handleMouseDown(e) {
    this.setState({ mouseTimeStamp: Date.now() })
    setTimeout(() => {
      if (Date.now() - this.state.mouseTimeStamp > 1000) {
        this.setState({
          rightMouseHold: true
         ,leftMouseHold: true
        })
      }
    }, 1000)
  }
  handleClick(e) {
    this.reset('click/app')
    this.setState({
      clickLat: e.lngLat.lat
     ,clickLng: e.lngLat.lng
     ,clickX: e.point.x
     ,clickY: e.point.y
     ,timeStamp: Date.now()
     ,leftClick: true
    })
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
     ,'overflow': 'hidden'
    }
    return (
      <div>
        <Search onFocus={ this.handleFocus.bind(this) } />
        <Logo />
        <NorthArrow top={ 40 } right={ 20 } />
        <RightClickOptions
          left={ this.state.contextMenuX }
          top={ this.state.contextMenuY }
          action={ this.state.rightClick || this.state.leftMouseHold } />
        <Crosshair
          left={ this.state.clickX }
          top={ this.state.clickY } />
        <Coordinates
          onFocus={ this.handleFocus.bind(this) }
          lat={ this.state.clickLat || this.state.lat }
          lng={ this.state.clickLng || this.state.lng }
          zoom={ this.state.zoom } />
        <NoClickZone right={ 0 } top={ 0 } bottom={ 0 } width={ 20 } />
        <NoClickZone right={ 20 } left={ 0 } bottom={ 0 } height={ 20 } />
        <div
          ref={ (ref) => this.mapboxMap = ref }
          style={ style }>
        </div>
      </div>
    )
  }
}

App.propTypes = {
  lat: React.PropTypes.number
 ,lng: React.PropTypes.number
 ,zoom: React.PropTypes.number
 ,mapStyle: React.PropTypes.string
 ,rightClick: React.PropTypes.bool
 ,rightMouseHold: React.PropTypes.bool
 ,leftClick: React.PropTypes.bool
 ,leftMouseHold: React.PropTypes.bool
}
App.defaultProps = {
  lat: 36.32
 ,lng: 43.128
 ,zoom: 15
 ,mapStyle: mapStyles.hybrid
 ,rightClick: false
 ,rightMouseHold: false
 ,leftClick: false
 ,leftMouseHold: false
}
ReactDOM.render(
  <App />,
  document.getElementById('app')
);
