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
  }
  handleSelect(event, eventKey) {
    this.setState(eventKey, function() {
      this.getCoordinates()
    })
  }
  getCoordinates() {
    if (this.state.type == 'mgrs'){
      this.setState({ mgrs: toUSNG(this.props.lat, this.props.lng, this.state.precision) })
    } else {
      this.setState({ latlng: this.props.lat.toFixed(this.props.precision) + ', ' + this.props.lng.toFixed(this.props.precision) })
    }
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
        <OverlayTrigger placement="top" overlay={ tooltip }>
          <SplitButton onClick={ this.handleClick.bind(this) } bsSize='small' bsStyle="primary" title={ value } id='coordinates' dropup pullRight onSelect={ this.handleSelect.bind(this) }>
            <MenuItem eventKey={{ type: 'mgrs', precision: 5 }}>MGRS <small>(1m)</small></MenuItem>
            <MenuItem eventKey={{ type: 'mgrs', precision: 4 }}>MGRS <small>(10m)</small></MenuItem>
            <MenuItem eventKey={{ type: 'mgrs', precision: 3 }}>MGRS <small>(100m)</small></MenuItem>
            <MenuItem eventKey={{ type: 'latlng' }}>Lat & Lng</MenuItem>
          </SplitButton>
        </OverlayTrigger>
      </ButtonToolbar>
    )
  }
}

Coordinates.propTypes = {
  precision: React.PropTypes.number
 ,lat: React.PropTypes.number
 ,lng: React.PropTypes.number
 ,type: React.PropTypes.string
}
Coordinates.defaultProps = { precision: 5, type: 'mgrs' }

export default Coordinates;
