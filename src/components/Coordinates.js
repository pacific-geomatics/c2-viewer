/**
 * Coordinates
 */
import React from 'react';
import { Tooltip, OverlayTrigger, Button, ButtonToolbar, MenuItem, SplitButton } from 'react-bootstrap'
import converter from 'coordinator'
import copy from 'copy-to-clipboard'

const toUSNG = converter('latlong', 'usng')
const toLatLng = converter('usng', 'latlong')

class Coordinates extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      precision: props.precision
     ,type: props.type
     ,lat: props.lat
     ,lng: props.lng
     ,mgrs: toUSNG(props.lat, props.lng, props.precision)
     ,latlng: this.props.lat + ', ' + this.props.lng
     ,message: this.props.message
    }
  }
  handleClick() {
    copy(this.state[this.state.type])
    // this.setState({ message: 'Copied!' })
  }
  componentWillReceiveProps() {
    this.getCoordinates()
    this.getPrecision()
  }
  handleSelect(event, eventKey) {
    this.setState( eventKey )
  }
  handleOnExit() {
    // this.setState({ message: this.props.message })
  }
  getPrecision() {
    let zoom = this.props.zoom
    let precision = 3
    if (zoom > 14) { precision = 5 }
    else if ( zoom > 10 ) { precision = 4 }
    this.setState({ precision: precision })
  }
  getCoordinates() {
    let mgrs = toUSNG(this.props.lat, this.props.lng, this.state.precision)
    let lat = this.props.lat.toFixed(this.state.precision)
    let lng = this.props.lng.toFixed(this.state.precision)
    this.setState({ latlng: `${lat}, ${lng}`, mgrs: mgrs })
  }
  render() {
    const style = {
      'position' : 'absolute'
     ,'bottom': 15
     ,'right': 15
     ,'zIndex': 10
     ,'transition': 'all 1s'
    }
    let value = this.state[this.state.type]
    const tooltip = (
      <Tooltip id='tooltip'><strong>{ this.state.message }</strong></Tooltip>
    );
    return (
      <ButtonToolbar style={ style }>
        <OverlayTrigger onExit={ this.handleOnExit.bind(this) } placement='left' overlay={ tooltip }>
          <SplitButton
            onClick={ this.handleClick.bind(this) }
            bsSize='small'
            bsStyle='primary'
            title={ value }
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
  lat: React.PropTypes.number
 ,lng: React.PropTypes.number
 ,type: React.PropTypes.string
 ,zoom: React.PropTypes.number
 ,message: React.PropTypes.string
}
Coordinates.defaultProps = {
  type: 'latlng'
 ,precision: 5
 ,message: 'Copy to Clipboard'
}
export default Coordinates;
