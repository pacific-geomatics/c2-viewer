import mapboxgl from 'mapbox-gl'
import React from 'react'
import { observer } from 'mobx-react'
import { store } from '../store'
import { MapMiniControls } from '../components'

@observer
export default class MapMini extends React.Component {

  constructor(props) {
    super(props)
    this.state = { active: false }
  }

  componentDidMount() {
    mapboxgl.accessToken = store.token

    const map = new mapboxgl.Map({
      container: store.mapMiniId,
      style: store.styleTable[store.mapMiniStyle].style,
      center: [store.lng, store.lat],
      bearing: store.bearing,
      pitch: store.pitch,
      zoom: parseFloat(store.zoom) + store.mapMiniZoomOffset,
      attributionControl: false
    })
    window.mapMini = map
    this.setState({ active: true })
  }

  componentWillReact() {
    if (store.mapRightMove || store.mapMove) {
      mapMini.flyTo({
        center: [store.lng, store.lat],
        zoom: parseFloat(store.zoom) + store.mapMiniZoomOffset,
        bearing: store.bearing,
        pitch: store.pitch
      })
    }
  }

  render() {
    // MobX Observables
    store.lng
    store.lat
    store.bearing
    store.pitch
    store.zoom

    const style = {
      bottom: 55,
      left: 10,
      position: 'absolute',
      overflow: 'hidden',
      boxShadow: '5px 5px 15px rgba(100, 100, 100, 0.7)',
      borderRadius: '50%',
      width: store.isXs ? 125: 200,
      height: store.isXs ? 125: 200,
      display: store.mapMiniActive ? '' : 'none',
      zIndex: 15
    }
    return (
      <div>
        <MapMiniControls />
        <div
          id={ store.mapMiniId }
          style={ style }>
        </div>
      </div>
    )
  }
}
