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
    }
  }
  handleClick() {
    copy(this.state[this.state.type])
  }
  componentWillReceiveProps() {
    this.getCoordinates()
    this.getPrecision()
  }
  handleSelect(event, eventKey) {
    this.setState( eventKey )
  }
  getPrecision() {
    let zoom = this.props.zoom
    let precision = 3
    console.log(zoom)
    if (zoom > 14) { precision = 5 }
    else if ( zoom > 11 ) { precision = 4 }
    this.setState({ precision: precision })
  }
  getCoordinates() {
    let mgrs = toUSNG(this.props.lat, this.props.lng, this.state.precision)
    let lat = this.props.lat.toFixed(this.state.precision)
    let lng = this.props.lng.toFixed(this.state.precision)
    console.log(mgrs)
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
      <Tooltip id='tooltip'><strong>Copy to Clipboard!</strong></Tooltip>
    );
    return (
      <ButtonToolbar style={ style }>
        <OverlayTrigger placement="left" overlay={ tooltip }>
          <SplitButton
            onClick={ this.handleClick.bind(this) }
            bsSize='small'
            bsStyle="primary"
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
}
Coordinates.defaultProps = {
  type: 'latlng'
 ,precision: 5
}
export default Coordinates;
