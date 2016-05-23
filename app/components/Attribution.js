import React, { Component } from 'react'
import { Button, ButtonGroup } from 'react-bootstrap'
import { observer } from 'mobx-react'
import { store } from '../store'

@observer
export default class Attribution extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const styles = {
      container: {
        position: 'absolute',
        bottom: 0,
        right: 3,
        zIndex: 15
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
            bsSize='small'
            bsStyle='link'
            href={ `https://www.mapbox.com/map-feedback/#mapbox.streets/${ store.lng }/${ store.lat }/${ Math.floor(store.zoom) }` }
            target='_blank'
            >
            <b>Improve this map</b>
          </Button>
        </ButtonGroup>
      </div>
    )
  }
}
