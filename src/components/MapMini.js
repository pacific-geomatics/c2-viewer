/**
 * Right Click Options
 */
import React from 'react'
import mapboxgl from 'mapbox-gl'

class MapMini extends React.Component {

  constructor(props) {
    super(props)

    this.state = { }
  }

  componentDidMount() {
    // Create MapboxGL Map
    const mapMini = new mapboxgl.Map({
      container: this.mapMini,
      style: this.props.mapStyle,
      center: [ this.props.lng, this.props.lat ],
      zoom: this.props.zoom + this.props.zoomOffset,
      attributionControl: false
    })

    // Disable
    mapMini.dragRotate.disable()
    mapMini.keyboard.disable()
    mapMini.boxZoom.disable()

    // Sync Map
    window._map.on('move', this.jumpTo.bind(this, mapMini))
  }

  jumpTo(mapMini, e) {
    mapMini.flyTo(this.getPosition(e.target, this.props.zoomOffset))
  }

  getPosition(map, zoomOffset) {
    return {
      center: map.getCenter(),
      zoom: map.getZoom() + zoomOffset,
      bearing: map.getBearing(),
      pitch: map.getPitch()
    }
  }

  render() {
    // Define Window Sizes
    let windowWidth = window.innerWidth
    let windowHeight = window.innerHeight
    let windowTotal = window.innerWidth + window.innerHeight

    const styles = {
      map: {
        position : 'absolute',
        top: this.props.top,
        bottom: this.props.bottom,
        left: this.props.left,
        right: this.props.right,
        zIndex: this.props.zIndex,
        overflow: 'hidden',
        boxShadow: '5px 5px 15px rgba(100, 100, 100, 0.7)',
        borderRadius: '50%',
        width: (windowTotal > 1600) ? 200: windowTotal / 8,
        height: (windowTotal > 1600) ? 200: windowTotal / 8,
      }
    }
    return (
      <div
        ref={ (ref) => this.mapMini = ref }
        style={ styles.map }>
      </div>
    )
  }
}

MapMini.propTypes = {
  zIndex: React.PropTypes.number,
  top: React.PropTypes.number,
  bottom: React.PropTypes.number,
  left: React.PropTypes.number,
  right: React.PropTypes.number,
  lat: React.PropTypes.number,
  lng: React.PropTypes.number,
  zoom: React.PropTypes.number,
  mapStyle: React.PropTypes.string
}

MapMini.defaultProps = {
  zIndex: 15,
  bottom: 55,
  left: 10,
  zoomOffset: -4,
  lat: 0.0,
  lng: 0.0,
  zoom: 13,
  mapStyle: 'mapbox://styles/mapbox/streets-v8'
}

export default MapMini;
