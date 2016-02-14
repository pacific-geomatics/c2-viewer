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
    map.on('contextmenu', this.handleContextMenu.bind(this))
    map.on('moveend', this.handleMoveEnd.bind(this))
    map.on('zoom', this.handleZoom.bind(this))
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
    //console.dir(e)
  }

  handleMoveEnd(e) {
    //console.log(e)
  }
  handleResize(e) {
    // console.log(e)
  }
  handleContextMenu(e) {
    this.handleClick(e)
    this.setState({
      contextMenuLeft: e.point.x
     ,contextMenuTop: e.point.y
     ,contextMenuDisplay: ''
    })
  }
  handleFocus(e) {
    this.setState({ contextMenuDisplay: 'none' })
  }
  handleMouseUp(e) {
    //console.log('mouseup')
  }
  handleMouseDown(e) {
    //console.log('mousedown')
  }
  handleClick(e) {
    this.setState({
      lat: e.lngLat.lat
     ,lng: e.lngLat.lng
     ,crosshairLeft: e.point.x
     ,crosshairTop: e.point.y
     ,timeStamp: Date.now()
     ,contextMenuDisplay: 'none'
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
      <div onFocus={ this.handleFocus.bind(this) }>
        <Search />
        <Logo />
        <RightClickOptions left={ this.state.contextMenuLeft } top={ this.state.contextMenuTop } display={ this.state.contextMenuDisplay } />
        <Crosshair left={ this.state.crosshairLeft } top={ this.state.crosshairTop } />
        <Coordinates lat={ this.state.lat } lng={ this.state.lng } zoom={ this.state.zoom } />
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
}
App.defaultProps = {
  lat: 36.32
 ,lng: 43.128
 ,zoom: 15
 ,mapStyle: mapStyles.hybrid
}
ReactDOM.render(
  <App />,
  document.getElementById('app')
);
