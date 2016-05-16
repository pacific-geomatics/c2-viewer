import 'isomorphic-fetch'
import { Promise } from 'es6-promise'
import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import { observer } from 'mobx-react'
import { store } from '../store'
import {
  Map,
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
  }

  render() {
    console.log(store.height)
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
          <Col xs={12} style={ styles.main }>
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
            { /*
              <CompareSwiper />
              <MapRight />
              <MapMini />
              */ }
          </Col>
        </Row>
      </Grid>
    )
  }
}
