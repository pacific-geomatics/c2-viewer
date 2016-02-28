/**
 * Right Click Options
 */
import React from 'react'
import { NavItem, Nav } from 'react-bootstrap'
import converter from 'coordinator'
import copy from 'copy-to-clipboard'

const toUSNG = converter('latlong', 'usng')
const toLatLng = converter('usng', 'latlong')

class RightClickOptions extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      top: props.top,
      left: props.left,
      show: props.show
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.top && nextProps.left) {
      let offsetTop = window.innerHeight - (nextProps.top + this.RightClickOptions.offsetHeight + this.props.buffer)
      let offsetLeft = window.innerWidth - (nextProps.left + this.RightClickOptions.offsetWidth + this.props.buffer)

      if (offsetTop > 0) { offsetTop = 0 }
      if (offsetLeft > 0) { offsetLeft = 0 }

      let precision = this.getPrecision(nextProps)

      this.setState({
        show: nextProps.show,
        offsetTop: offsetTop,
        offsetLeft: offsetLeft,
        top: nextProps.top + offsetTop,
        left: nextProps.left + offsetLeft,
        mgrs: this.getMGRS(nextProps, precision),
        latlng: this.getLatLng(nextProps, precision)
      })
    }
  }

  getMGRS(nextProps, precision) {
    return toUSNG(nextProps.lat, nextProps.lng, precision)
  }

  getLatLng(nextProps, precision) {
    let lat = nextProps.lat.toFixed(precision)
    let lng = nextProps.lng.toFixed(precision)

    return `${lat}, ${lng}`
  }

  getPrecision(nextProps) {
    let precision = 3

    if ( nextProps.accuracy == 'center' ) { precision = 3 }
    else if ( nextProps.zoom > 14 ) { precision = 5 }
    else if ( nextProps.zoom > 10 ) { precision = 4 }

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
    const style = {
      position : 'absolute',
      top: this.state.top,
      left: this.state.left,
      backgroundColor: 'white',
      zIndex: 15,
      borderRadius: 5,
      width: 170,
      border: '2px solid #1d8893',
      boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.50)',
      display: (this.state.show) ? '' : 'none'
    }

    return (
      <div
        ref={ (ref) => this.RightClickOptions = ref }
        style={ style }
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
  lat: React.PropTypes.number,
  lng: React.PropTypes.number,
  type: React.PropTypes.string,
  zoom: React.PropTypes.number,
  accuracy: React.PropTypes.string,
  top: React.PropTypes.number,
  left: React.PropTypes.number,
  show: React.PropTypes.bool,
  buffer: React.PropTypes.number
}

RightClickOptions.defaultProps = {
  top: 0,
  left: 0,
  buffer: 5,
  height: 170,
  width: 170,
  show: false,
  accuracy: 'center'
}

export default RightClickOptions;
