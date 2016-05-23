import mapboxgl from 'mapbox-gl'
import React from 'react'
import { observer } from 'mobx-react'
import { store } from '../store'

@observer
export default class Map extends React.Component {

  constructor(props) {
    super(props)
    this.state = { active: false }
    this.handleMove = this.handleMove.bind(this)
    this.handleMoveStart = this.handleMoveStart.bind(this)
    this.handleMoveEnd = this.handleMoveEnd.bind(this)
  }

  componentDidMount() {
    mapboxgl.accessToken = store.token

    const map = new mapboxgl.Map({
      container: store.mapId,
      style: store.styleTable[store.mapStyle].style,
      center: [store.lng, store.lat],
      bearing: store.bearing,
      pitch: store.pitch,
      zoom: store.zoom,
      attributionControl: false
    })
    window.map = map
    this.setState({ active: true })
    map.on('movestart', this.handleMoveStart)
    map.on('moveend', this.handleMoveEnd)
    map.on('move', this.handleMove)

    // Position (Click)
    store.positionLat = store.lat
    store.positionLng = store.lng
  }

  componentWillReact() {
    if (store.mapRightMove) {
      map.jumpTo({
        center: [store.lng, store.lat],
        zoom: store.zoom,
        bearing: store.bearing,
        pitch: store.pitch
      })
    }
  }

  handleMoveStart(e) {
    store.mapMove = true
  }

  handleMoveEnd(e) {
    store.mapMove = false
  }

  handleMove(e) {
    store.zoom = map.getZoom().toPrecision(3)
    store.center = map.getCenter()
    store.lat = store.center.lat.toPrecision(7)
    store.lng = store.center.lng.toPrecision(7)
    store.pitch = Math.floor(map.getPitch())
    store.bearing = Math.floor(map.getBearing())
  }

  render() {
    // MobX Observables
    store.lng
    store.lat
    store.pitch
    store.bearing
    store.zoom

    const style = {
      width: '100%',
      bottom: '0px',
      top: '0px',
      position: 'absolute',
      margin: 0
    }
    return (
      <div>
      { this.state.active && this.props.children }
        <div
          id={ store.mapId }
          style={ style }>
        </div>
      </div>
    )
  }
}
