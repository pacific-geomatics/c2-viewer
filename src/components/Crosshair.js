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
      y: window.innerHeight / 2,
      accuracy: this.props.accuracy
    }
    this.handleClick = this.handleClick.bind(this)
    //this.handleMoveStart = this.handleMoveStart.bind(this)
    //this.handleMoveEnd = this.handleMoveEnd.bind(this)
  }

  componentDidMount() {
    const mapboxglMaps = [window._map, window._mapRight]
    mapboxglMaps.map((mapItem) => {
      mapItem.on('click', this.handleClick)
      mapItem.on('contextmenu', this.handleClick)
      mapItem.on('movestart', this.handleMoveStart)
      mapItem.on('moveend', this.handleMoveEnd)
    })
  }

  handleMoveStart(e) {
    console.log('movestart')
    this.setState({
      accuracy: 'center'
    })
  }

  handleClick(e) {
    console.log('click')
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
  holdTimeout: 1000,
  accuracy: 'center'
}

export default Crosshair
