import mapboxgl from 'mapbox-gl'
import React, { Component, propTypes } from 'react'
import { Button, Grid, Row, Col } from 'react-bootstrap'
import { observer } from 'mobx-react'
import { store } from '../store'

@observer
export default class MapBasemap extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    map.setStyle(this.props.style)
    store.mapStyle = this.props.id
  }

  componentDidMount() {
    mapboxgl.accessToken = store.token

    const map = new mapboxgl.Map({
      container: this.id,
      style: this.props.style,
      center: [store.lng, store.lat],
      bearing: store.bearing,
      pitch: store.pitch,
      zoom: parseFloat(store.zoom) + store.mapMiniZoomOffset,
      attributionControl: false
    })
  }

  render() {
    let styles = {
      map: {
        width: 150,
        height: 150,
        margin: 30,
      },
      container: {
        position: 'relative'
      },
      button: {
        position: 'absolute',
        left: 220,
        top: 50
      }
    }
    return (
      <div style={ styles.container }>
        <div
          style={ styles.map }
          className={ 'basemap' }
          ref={ (id) => this.id = id }>
        </div>
        <Button
          onClick={ this.handleClick }
          bsSize={ 'large' }
          style={ styles.button }>
          { this.props.name }
        </Button>
      </div>
    )
  }
}
