import 'isomorphic-fetch'
import { Promise } from 'es6-promise'
import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import { observer } from 'mobx-react'
import { store } from '../store'
import {
  Map,
  MapMini,
  MapRight,
  MapMiniControls,
  Logo,
  ZoomIn,
  Search,
  ZoomOut,
  TiltView,
  Settings,
  Crosshair,
  NorthArrow,
  MyPosition,
  Attribution,
  NoClickZone,
  URLHandler,
  RightClickOptions } from '../components'

@observer
export default class App extends Component {
  constructor(props) {
    super(props)

    // Store all URL Queries into MobX Store
    Object.keys(props.location.query).map((key) => {
      store[key] = props.location.query[key]
    })

    // Store all URL Params into MobX Store
    Object.keys(props.params).map((key) => {
      store[key] = props.params[key]
    })
    console.log(store.zoom)
  }

  render() {
    const styles = {
      'container': {
        backgroundColor: store.grey
      },
      'main': {
        height: store.height,
        padding: 0,
        margin: 0,
        overflow: 'hidden'
      }
    }
    return (
      <Grid fluid={ true } style={ styles.container }>
        <Row>
          <Col style={ styles.main }>
            <URLHandler />
            <Map>
              { /*
              <NorthArrow />
              <TiltView />
              <MyPosition />
              <ZoomOut />
              <ZoomIn />
              <Settings />
              <Attribution />
              <RightClickOptions />
              <Crosshair />
              <Logo />
              */ }
            </Map>
            <MapMini />
            <MapRight>

            </MapRight>
            { /*
              <CompareSwiper />
              */ }
          </Col>
        </Row>
      </Grid>
    )
  }
}
