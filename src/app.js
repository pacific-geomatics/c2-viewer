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

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      lat: props.lat
     ,lng: props.lng
     ,mapStyle: props.mapStyle
     ,zoom: props.zoom
    }
  }
  componentDidMount() {
    mapboxgl.accessToken = accessToken;
    var map = new mapboxgl.Map({
      container: this.mapboxMap,
      style: this.state.mapStyle,
      center: [ this.state.lat, this.state.lng ],
      zoom: this.state.zoom,
      attributionControl: false
    });
    //map.keyboard.disable()
    // Event Listeners
    map.on('click', this.handleClick.bind(this))
    map.on('move', this.handleMove.bind(this))
    map.on('resize', this.handleResize.bind(this))
    this._map = map;
    this.setState({
      left: this.mapboxMap.clientWidth / 2 + this.mapboxMap.offsetLeft
     ,top: this.mapboxMap.clientHeight / 2 + this.mapboxMap.offsetTop
    })
    /**
     * Add Shift Zoom + Shift Select for box selection.
     **/
  }
  handleMove(e) {
    let center = this._map.getCenter()
    this.setState({
      lat: center.lat
     ,lng: center.lng
     ,center: center
     ,bearing: this._map.getBearing()
     ,bounds: this._map.getBounds()
     ,pitch: this._map.getPitch()
     ,zoom: this._map.getZoom()
     ,offsetTop: this.mapboxMap.offsetTop
     ,offsetLeft: this.mapboxMap.offsetLeft
     ,clientWidth: this.mapboxMap.clientWidth
     ,clientHeight: this.mapboxMap.clientHeight
     ,left: this.mapboxMap.clientWidth / 2 + this.mapboxMap.offsetLeft
     ,top: this.mapboxMap.clientHeight / 2 + this.mapboxMap.offsetTop
    })
  }
  handleResize(e) {
    // console.log(e)
  }
  handleClick(e) {
    this.setState({
      lat: e.lngLat.lat
     ,lng: e.lngLat.lng
     ,left: e.point.x
     ,top: e.point.y
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
    }
    return (
      <div>
        <Search />
        <Logo />
        <Crosshair left={ this.state.left } top={ this.state.top }/>
        <Coordinates lat={ this.state.lat } lng={ this.state.lng } zoom={ this.state.zoom }/>
        <NoClickZone right={ 0 } top={ 0 } bottom={ 0 } width={ 20 } />
        <NoClickZone right={ 20 } left={ 0 } bottom={ 0 } height={ 20 } />
        <div
          onClick={ this.handleResize.bind(this) }
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
  lat: 43.128
 ,lng: 36.32
 ,zoom: 15
 ,mapStyle: mapStyles.hybrid
}
ReactDOM.render(
  <App />,
  document.getElementById('app')
);
