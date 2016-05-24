import 'isomorphic-fetch'
import { Promise } from 'es6-promise'
import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { store } from '../store'
import jwtDecode from 'jwt-decode'
import { Map, MapMini, MapRight, MapMiniControls, Logo, MGRS, Basemap, ZoomIn,
  Search, ZoomOut, TiltView, Settings, Crosshair, NorthArrow, Activate,
  MyPosition, Attribution, NoClickZone, URLHandler, RightClickOptions
} from '../components'

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

    // Store decoded JWT into Styles
    if (store.access_token) {
      let decoded = jwtDecode(store.access_token)
      console.log(decoded)
      if (decoded) store.styleTable.push(decoded)
    }
  }

  render() {
    const styles = {
      container: {
        padding: 0,
        margin: 0,
        height: store.height,
        overflow: 'hidden',
        backgroundColor: store.grey
      }
    }
    return (
      <div style={ styles.container }>
        { /* Utils */ }
        <URLHandler />

        { /* Map Handlers */ }
        <NorthArrow />
        <TiltView />
        <ZoomOut />
        <ZoomIn />
        <Basemap />

        { /* Extras */ }
        <Search />
        <Attribution />
        <Logo />
        <MGRS />
        <Settings />

        { /* Maps */ }
        <Map>
          <Crosshair />
        </Map>
        <MapMini />
        { /*
        <RightClickOptions />
        <MapRight />
        <MyPosition />
        <CompareSwiper />
        */ }
      </div>
    )
  }
}
