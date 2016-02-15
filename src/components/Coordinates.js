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
    //Get Precision
    let precision = 3
    if ( nextProps.zoom > 14 ) { precision = 5 }
    else if ( nextProps.zoom > 10 ) { precision = 4 }

    //Get Coordinates
    let mgrs = toUSNG(nextProps.lat, nextProps.lng, this.state.precision)
    let lat = nextProps.lat.toFixed(this.state.precision)
    let lng = nextProps.lng.toFixed(this.state.precision)

    this.setState({
      latlng: `${lat}, ${lng}`
     ,mgrs: mgrs
     ,zoom: nextProps.zoom
     ,lat: nextProps.lat
     ,lng: nextProps.lng
     ,precision: precision
    })
  }

  handleClick() {
    copy(this.state[this.state.type])
    // this.setState({ message: 'Copied!' })
  }

  handleSelect(event, eventKey) {
    this.setState( eventKey )
  }

  render() {
    const style = {
      position : 'absolute',
      bottom: 15,
      right: 15,
      zIndex: 10,
      transition: 'all 0.7s'
    }
    const tooltip = (
      <Tooltip id='tooltip'><strong>{ this.state.message }</strong></Tooltip>
    )
    return (
      <ButtonToolbar style={ style }>
        <OverlayTrigger placement='left' overlay={ tooltip }>
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
  message: React.PropTypes.string
}

Coordinates.defaultProps = {
  type: 'latlng',
  precision: 5,
  message: 'Copy to Clipboard'
}

export default Coordinates
