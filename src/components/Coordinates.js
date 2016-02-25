/**
 * Coordinates
 */
import React from 'react'
import converter from 'coordinator'
import copy from 'copy-to-clipboard'
import {
  Tooltip,
  OverlayTrigger,
  ButtonToolbar,
  MenuItem,
  SplitButton } from 'react-bootstrap'

const toUSNG = converter('latlong', 'usng')
const toLatLng = converter('usng', 'latlong')

class Coordinates extends React.Component {

  constructor(props) {
    super(props)

    this.handleClick.bind(this)
    this.handleSelect.bind(this)

    this.state = {
      precision: props.precision,
      type: props.type,
      lat: props.lat,
      lng: props.lng,
      mgrs: toUSNG(props.lat, props.lng, props.precision),
      latlng: `${this.props.lat}, ${this.props.lng}`,
      message: this.props.message
    }
  }

  componentWillReceiveProps(nextProps) {
    let precision = this.getPrecision(nextProps)
    this.setState({
      latlng: this.getLatLng(nextProps, precision),
      mgrs: this.getMGRS(nextProps, precision),
      zoom: nextProps.zoom,
      lat: nextProps.lat,
      lng: nextProps.lng,
      precision: precision
    })
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

  handleClick() {
    console.log(`Copied to Clipboard! ${ this.state[this.state.type]}`)
    copy(this.state[this.state.type])
  }

  handleSelect(event, eventKey) {
    this.setState( eventKey )
  }

  render() {
    const style = {
      position : 'absolute',
      bottom: this.props.bottom,
      right: this.props.right,
      left: this.props.left,
      top: this.props.top,
      zIndex: 20,
      transition: 'all 0.7s'
    }
    const tooltip = (
      <Tooltip id='tooltip'><strong>Copied to Clipboard!</strong></Tooltip>
    )
    return (
      <ButtonToolbar style={ style }>
        <OverlayTrigger rootClose trigger="click" placement='left' overlay={ tooltip }>
          <SplitButton
            onClick={ this.handleClick.bind(this) }
            bsSize='small'
            bsStyle='primary'
            title={ this.state[this.state.type] }
            id='coordinates'
            dropup
            pullRight
            onSelect={ this.handleSelect.bind(this) }
          >
            <MenuItem eventKey={{ type: 'mgrs' }}>MGRS</MenuItem>
            <MenuItem eventKey={{ type: 'latlng' }}>Lat & Lng</MenuItem>
          </SplitButton>
        </OverlayTrigger>
      </ButtonToolbar>
    )
  }
}

Coordinates.propTypes = {
  lat: React.PropTypes.number,
  lng: React.PropTypes.number,
  type: React.PropTypes.string,
  zoom: React.PropTypes.number,
  message: React.PropTypes.string,
  top: React.PropTypes.number,
  bottom: React.PropTypes.number,
  left: React.PropTypes.number,
  right: React.PropTypes.number
}

Coordinates.defaultProps = {
  type: 'latlng',
  precision: 5,
  bottom: 30,
  right: 15,
  accuracy: 'center'
}

export default Coordinates
