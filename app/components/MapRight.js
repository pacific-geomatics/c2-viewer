import mapboxgl from 'mapbox-gl'
import React from 'react'
import { observer } from 'mobx-react'
import { store } from '../store'

@observer
export default class MapRight extends React.Component {

  constructor(props) {
    super(props)
    this.state = { active: false }
    this.handleMove = this.handleMove.bind(this)
    this.handleMoveStart = this.handleMoveStart.bind(this)
    this.handleMoveEnd = this.handleMoveEnd.bind(this)
  }

  componentDidMount() {
    mapboxgl.accessToken = store.token

    const mapRight = new mapboxgl.Map({
      container: store.mapRightId,
      style: store.styleTable[store.mapRightStyle],
      center: [store.lng, store.lat],
      bearing: store.bearing,
      pitch: store.pitch,
      zoom: store.zoom,
      attributionControl: false
    })
    window.mapRight = mapRight
    this.setState({ active: true })
    mapRight.on('movestart', this.handleMoveStart)
    mapRight.on('moveend', this.handleMoveEnd)
    mapRight.on('move', this.handleMove)
  }

  componentWillReact() {
    if (store.mapMove) {
      mapRight.jumpTo({
        center: store.center,
        zoom: store.zoom,
        bearing: store.bearing,
        pitch: store.pitch
      })
    }
  }

  handleMoveStart(e) {
    store.mapRightMove = true
  }

  handleMoveEnd(e) {
    store.mapRightMove = false
  }

  handleMove(e) {
    store.zoom = mapRight.getZoom().toPrecision(3)
    store.center = mapRight.getCenter()
    store.lat = store.center.lat.toPrecision(7)
    store.lng = store.center.lng.toPrecision(7)
    store.pitch = Math.floor(mapRight.getPitch())
    store.bearing = Math.floor(mapRight.getBearing())
  }

  render() {
    // MobX Observables
    store.lng
    store.lat
    store.bearing
    store.pitch
    store.zoom

    const style = {
      width: '100%',
      bottom: '0px',
      top: '0px',
      position: 'absolute',
      margin: 0,
      clip: `rect(0px, 999em, ${ store.height }px, ${ store.left }px)`
    }
    return (
      <div
        id={ store.mapRightId }
        style={ style }>
        { this.state.active && this.props.children }
      </div>
    )
  }
}
