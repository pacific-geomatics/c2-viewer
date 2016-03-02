/**
 * Right Click Options
 */
import React from 'react'
import { NavItem, Nav, Modal } from 'react-bootstrap'
import converter from 'coordinator'
import copy from 'copy-to-clipboard'

const toUSNG = converter('latlong', 'usng')
const toLatLng = converter('usng', 'latlong')

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
  }

  componentDidMount() {
    /*
    const mapboxglMaps = [window._map, window._mapRight]
    mapboxglMaps.map((mapItem) => {
      mapItem.on('contextmenu', this.handleClickRight.bind(this))
      mapItem.on('dblclick', this.handleClickRight.bind(this))
      mapItem.on('mousedown', this.handleMouseDown.bind(this))
      mapItem.on('mouseup', this.handleMouseUp.bind(this))
      mapItem.on('move', this.handleMove.bind(this))
    })
    window.addEventListener("touchcancel", this.handleMouseUp.bind(this))
    window.addEventListener("touchend", this.handleMouseUp.bind(this))
    */
  }

  handleMove(e) {
    this.setState({
      timestamp: Date.now(),
      mapMove: true,
      show: false
    })
  }

  handleMouseUp() {
    this.setState({
      timestamp: Date.now(),
      mouseDown: false,
      mapMove: false
    })
  }

  handleMouseHold(e) {
    if (Date.now() - this.state.timestamp > this.props.holdTimeout - 20 && this.state.mouseDown) {
      this.handleClickRight(e)
    }
  }

  handleMouseDown(e) {
    setTimeout(() => { this.handleMouseHold(e) }, this.props.holdTimeout)
    this.setState({
      timestamp: Date.now(),
      mouseDown: true,
      show: false
    })
  }

  handleClickRight(e) {
    let zoom = window._map.getZoom()
    let lat = e.lngLat.lat
    let lng = e.lngLat.lng
    let precision = this.getPrecision(zoom)
    let mgrs = this.getMGRS(lat, lng, precision)
    let latlng = this.getLatLng(lat, lng, precision)

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

  getMGRS(lat, lng, precision) {
    return toUSNG(lat, lng, precision)
  }

  getLatLng(lat, lng, precision) {
    lat = lat.toFixed(precision)
    lng = lng.toFixed(precision)

    return `${lat}, ${lng}`
  }

  getPrecision(zoom) {
    let precision = 3

    if ( zoom > 14 ) { precision = 5 }
    else if ( zoom > 10 ) { precision = 4 }

    return precision
  }

  handleSelect(selectedKey) {
    this.setState({ show: false })

    if (selectedKey.match('mgrs|latlng')) {
      console.log(`Copied to Clipboard! ${ this.state[selectedKey]}`)
      copy(this.state[selectedKey])
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
        width: this.props.width,
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
          <NavItem eventKey={ 'whatsHere' }>What's here?</NavItem>
          <NavItem eventKey={ 'searchNearby' }>Search nearby</NavItem>
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
  zIndex: 15,
  buffer: 5,
  height: 170,
  width: 170,
  holdTimeout: 1000
}

export default RightClickOptions;
