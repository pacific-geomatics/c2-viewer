/**
 * Logo
 */
import React from 'react'
import { Button, ButtonGroup } from 'react-bootstrap'
import MobileDetect from 'mobile-detect'


class Attribution extends React.Component {

  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    const md = new MobileDetect(window.navigator.userAgent)
    const style = {
      position: 'absolute',
      bottom: 0,
      left: 0,
      zIndex: 15
    }
    return (
      <div style={ style }>
        <ButtonGroup>
          <Button
            bsSize='small'
            bsStyle='link'
            href='https://www.mapbox.com/about/maps/'
            target='_blank'
            >
            © Mapbox
          </Button>
          <Button
            bsSize='small'
            bsStyle='link'
            href='http://www.openstreetmap.org/about/'
            target='_blank'
            >
            © OpenStreetMap
          </Button>
          { !md.phone() &&
            <Button
              bsSize='small'
              bsStyle='link'
              href={ `https://www.mapbox.com/map-feedback/#mapbox.streets/${ this.props.lng }/${ this.props.lat }/${ this.props.zoom }` }
              target='_blank'
              >
              <b>Improve this map</b>
            </Button>
          }
        </ButtonGroup>
      </div>
    )
  }
}

Attribution.propTypes = {
  lat: React.PropTypes.number,
  lng: React.PropTypes.number,
  zoom: React.PropTypes.number
}

Attribution.defaultProps = {

}

export default Attribution
