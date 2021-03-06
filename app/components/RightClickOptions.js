/**
 * Right Click Options
 */
import React from 'react'
import { NavItem, Nav } from 'react-bootstrap'
import copy from 'copy-to-clipboard'
import MobileDetect from 'mobile-detect'
import { locations } from '../utils/locations'
import { getPrecision, getMGRS, getLatLng, getPrettyLatLng } from '../utils/mapHandlers'

const md = new MobileDetect(window.navigator.userAgent)

class RightClickOptions extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      top: 0,
      left: 0,
      show: false,
      mapMove: false,
      mouseDown: false
    }
    this.handleDoubleClick = this.handleDoubleClick.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    const mapboxglMaps = [window._map, window._mapRight]

    if (md.mobile()) {
      mapboxglMaps.map((mapItem) => {
        mapItem.on('dblclick', this.handleDoubleClick)
        mapItem.on('click', this.handleClick)
      })
    } else {
      mapboxglMaps.map((mapItem) => {
        mapItem.on('contextmenu', this.handleDoubleClick)
        mapItem.on('click', this.handleClick)
      })
    }
  }

  handleDoubleClick(e) {
    let zoom = window._map.getZoom()
    let lat = e.lngLat.lat
    let lng = e.lngLat.lng

    // Mapbox Issue with map.fitBounds()
    if (lng > 180) { lng = lng - 180 }
    else if (lng < -180) { lng = lng + 180 }

    let precision = getPrecision(zoom)
    let mgrs = getMGRS(lat, lng, precision)
    let latlng = getPrettyLatLng(lat, lng, precision)

    this.setState({
      timestamp: Date.now(),
      show: true,
      lat: lat,
      lng: lng,
      x: e.point.x,
      y: e.point.y,
      zoom: zoom,
      precision: precision,
      mgrs: mgrs,
      latlng: latlng
    })
  }

  handleClick(e) {
    this.setState({ show: false })
  }

  handleSelect(selectedKey) {
    this.setState({ show: false })

    if (selectedKey.match('mgrs|latlng')) {
      console.log(`Copied to Clipboard! ${ this.state[selectedKey] }`)
      copy(this.state[selectedKey])
    } else {
      console.log(locations[selectedKey])
      let options = { linear: false }
      window._map.flyTo(locations[selectedKey], options)
      window._mapMini.flyTo(locations[selectedKey], options)
      window._mapRight.flyTo(locations[selectedKey], options)
    }
  }

  render() {
    let offsetX = window.innerWidth - (this.state.x + this.props.width + this.props.buffer)
    let offsetY = window.innerHeight - (this.state.y + this.props.height + this.props.buffer)

    if (offsetY > 0) { offsetY = 0 }
    if (offsetX > 0) { offsetX = 0 }

    let x = this.state.x + offsetX
    let y = this.state.y + offsetY

    const styles = {
      container: {
        position : 'absolute',
        transform: `translate(${ x }px,${ y }px)`,
        backgroundColor: 'white',
        zIndex: this.props.zIndex,
        borderRadius: 5,
        minWidth: this.props.width,
        border: '2px solid #1d8893',
        boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.50)',
        display: (this.state.show) ? '' : 'none'
      }
    }
    return (
      <div
        ref={ (ref) => this.RightClickOptions = ref }
        style={ styles.container }
        >
        <Nav
          bsStyle="pills"
          stacked
          onSelect={ this.handleSelect.bind(this) }
          >
          <NavItem eventKey={ 'kalgoorlie' }>Go to Kalgoorlie</NavItem>
          <NavItem eventKey={ 'panama-yaviza' }>Go to Panama</NavItem>
          <NavItem eventKey={ 'mosul' }>Go to Mosul</NavItem>
          <NavItem eventKey={ 'mgrs' }>{ this.state.mgrs }</NavItem>
          <NavItem eventKey={ 'latlng' }>{ this.state.latlng }</NavItem>
        </Nav>
      </div>
    )
  }
}

RightClickOptions.propTypes = {
  zIndex: React.PropTypes.number,
  buffer: React.PropTypes.number,
  width: React.PropTypes.number,
  height: React.PropTypes.number,
  holdTimeout: React.PropTypes.number
}

RightClickOptions.defaultProps = {
  zIndex: 50,
  buffer: 5,
  height: 210,
  width: 170,
  holdTimeout: 1000
}

export default RightClickOptions;
