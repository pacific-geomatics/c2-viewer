import 'isomorphic-fetch'
import { Promise } from 'es6-promise'
import React, { Component } from 'react'
import React from 'react'
import { observer } from 'mobx-react'
import { store } from '../store'
import {
  Map,
  Logo,
  ZoomIn,
  Search,
  MapMini,
  ZoomOut,
  MapRight,
  TiltView,
  Settings,
  Crosshair,
  NorthArrow,
  MyPosition,
  Attribution,
  NoClickZone,
  CompareSwiper,
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
    return (
      <div>
        <Map>
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
          <CompareSwiper />
        </Map>
        <MapRight />
        <MapMini />
      </div>
    )
  }
}
