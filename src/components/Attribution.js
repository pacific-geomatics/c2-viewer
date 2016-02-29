/**
 * Logo
 */
import React from 'react'
import { Button, ButtonGroup } from 'react-bootstrap'
import MobileDetect from 'mobile-detect'


class Attribution extends React.Component {

  constructor(props) {
    super(props)

    this.state = { windowWidth: window.innerWidth }
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize.bind(this))
  }

  handleResize(e) {
    this.setState({ windowWidth: window.innerWidth })
  }

  setPosition() {
    let center = window._map.getCenter()
    this.setState({
      lat: center.lat,
      lng: center.lng,
      zoom: window._map.getZoom()
    })
  }

  render() {
    const md = new MobileDetect(window.navigator.userAgent)
    const styles = {
      container: {
        position: 'absolute',
        bottom: this.props.bottom,
        right: this.props.right,
        left: this.props.left,
        top: this.props.top,
        zIndex: 15
      },
      improveMap: {
        display: (this.state.windowWidth > 450) ? '' : 'None'
      }
    }
    return (
      <div style={ styles.container }>
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
          <Button
            style={ styles.improveMap }
            bsSize='small'
            bsStyle='link'
            onClick={ this.setPosition.bind(this) }
            href={ `https://www.mapbox.com/map-feedback/#mapbox.streets/${ this.state.lng }/${ this.state.lat }/${ Math.floor(this.state.zoom) }` }
            target='_blank'
            >
            <b>Improve this map</b>
          </Button>
        </ButtonGroup>
      </div>
    )
  }
}

Attribution.propTypes = {
  left: React.PropTypes.number,
  right: React.PropTypes.number,
  bottom: React.PropTypes.number,
  top: React.PropTypes.number
}

Attribution.defaultProps = {
  bottom: 0,
  right: 3
}

export default Attribution
