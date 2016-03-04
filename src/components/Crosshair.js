/**
 * Crosshair
 */
import React from 'react'
import { Glyphicon } from 'react-bootstrap'

class Crosshair extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2
    }
  }

  componentDidMount() {
    const mapboxglMaps = [window._map, window._mapRight]
    mapboxglMaps.map((mapItem) => {
      mapItem.on('click', this.handleClick.bind(this))
      mapItem.on('contextmenu', this.handleClick.bind(this))
    })
  }

  handleClick(e) {
    this.setState({
      x: e.point.x,
      y: e.point.y,
      lat: e.lngLat.lat,
      lng: e.lngLat.lng,
      zoom: window._map.getZoom(),
      accuracy: 'click'
    })
  }

  render() {
    let x = this.state.x - this.props.fontSize / 2
    let y = this.state.y - this.props.fontSize / 2

    const style = {
      position : 'absolute',
      transform: `translate(${ x }px,${ y }px)`,
      zIndex: 5,
      transition: 'all 0.3s',
      fontSize: this.props.fontSize,
      color: 'white',
      textShadow: ' 1px 1px 2px black, 0 0 25px black, 0 0 5px black',
      pointerEvents: 'none',
      opacity: (this.state.accuracy == 'click') ? 1 : 0
    }

    return <Glyphicon style={ style } glyph="screenshot" />
  }
}

Crosshair.propTypes = {
  fontSize: React.PropTypes.number,
  holdTimeout: React.PropTypes.number
}

Crosshair.defaultProps = {
  fontSize: 20,
  holdTimeout: 1000
}

export default Crosshair
