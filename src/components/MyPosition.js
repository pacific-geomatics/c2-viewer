/**
 * My Position
 */
import React from 'react'
import { Glyphicon } from 'react-bootstrap'
import turf from 'turf'

class MyPosition extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      hover: false,
      active: false
    }
  }

  componentDidMount() {
    let options = {
      enableHighAccuracy: false,
      timeout: 5000,
      maximumAge: 0
    }
    this.setState({ active: true })
  }

  geolocationSuccess(position) {
    let coords = position.coords
    this.setState({
      lat: coords.latitude,
      lng: coords.longitude,
      accuracy: coords.accuracy,
      heading: coords.heading
    })
  }

  geolocationError(error) {
    console.warn(`ERROR(${ error.code }): ${ error.message }`)
  }

  addAccuracy(polygon, map) {
    if (!map.getSource('accuracy')) {
      map.addSource('accuracy', {
        type: 'geojson',
        data: polygon
      })
    }

    if (!map.getLayer('accuracy')) {
      map.addLayer({
        id: 'accuracy',
        type: 'line',
        source: 'accuracy',
        layout: {},
        paint: {
          'line-color': '#1269c3',
          'line-opacity': 0.5,
          'line-width': 3
        }
      })
    }
  }

  handleClick() {
    // Get Current position
    navigator.geolocation.getCurrentPosition(this.geolocationSuccess)

    // Create Bounding Box Geometry based on Location + Accuracy
    let point = turf.point([this.state.lng, this.state.lat])
    let buffer = turf.buffer(point, this.state.accuracy, 'meters')
    let extent = turf.extent(buffer)

    // Set Map to Bounding Box
    window._map.fitBounds(extent)

    // Add Accuracy Polygon
    this.addAccuracy(buffer, window._map)
    this.addAccuracy(buffer, window._mapRight)
  }

  handleMouseOver() {
    this.setState({ hover: true })
  }

  handleMouseOut() {
    this.setState({ hover: false })
  }

  render() {
    const styles = {
      container: {
        position: 'absolute',
        top: this.props.top,
        bottom: this.props.bottom,
        right: this.props.right,
        left: this.props.left,
        zIndex: this.props.zIndex,
        backgroundColor: `rgb(25, 25, 25)`,
        cursor: `pointer`,
        borderRadius: '4px',
        width: this.props.width,
        height: this.props.height,
        textAlign: 'center',
        perspective: '50px'
      },
      glyph: {
        position: 'relative',
        top: this.props.height / 2 - (this.props.fontSize / 2),
        WebkitTransform: `rotateX(${ this.state.pitch }deg)`,
        fontSize: this.props.fontSize,
        textShadow: (this.state.hover) ? `0 0 7px white` : ``,
        color: (this.state.hover) ? `rgb(255, 255, 255)` : `rgb(190, 190, 190)`
      }
    }
    return (
      <div
        style={ styles.container }
        onClick={ this.handleClick.bind(this) }
        onMouseOver={ this.handleMouseOver.bind(this) }
        onMouseOut={ this.handleMouseOut.bind(this) }

        onTouchStart={ this.handleMouseOver.bind(this) }
        onTouchCancel={ this.handleMouseOut.bind(this) }
        onTouchEnd={ this.handleMouseOut.bind(this) }
        >
        <Glyphicon style={ styles.glyph } glyph='map-marker' />
      </div>
    )
  }
}

MyPosition.propTypes = {
  right: React.PropTypes.number,
  bottom: React.PropTypes.number,
  left: React.PropTypes.number,
  top: React.PropTypes.number,
  zIndex: React.PropTypes.number,
  width: React.PropTypes.number,
  height: React.PropTypes.number,
  fontSize: React.PropTypes.number
}

MyPosition.defaultProps = {
  zIndex: 15,
  bottom: 170,
  right: 22,
  width: 35,
  height: 35,
  fontSize: 18
}

export default MyPosition
