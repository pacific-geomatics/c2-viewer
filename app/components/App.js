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
import { classicStyle } from '../utils'


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

    // Load Basemaps
    if (store.server) {
      // Mapbox Atlas Server config
      store.styleTable = [
        {name: 'Mapbox Satellite', style: classicStyle(`${ store.server }/v4/mapbox.satellite-afternoon/{z}/{x}/{y}@2x.png`, 'satellite')},
        {name: 'Mapbox Outdoor', style: classicStyle(`${ store.server }/v4/mapbox.mapbox-outdoors/{z}/{x}/{y}@2x.png`, 'outdoors')},
        {name: 'Mapbox Light', style: classicStyle(`${ store.server }/v4/mapbox.light/{z}/{x}/{y}@2x.png`, 'light')},
        {name: 'Mapbox OSM Bright', style: classicStyle(`${ store.server }/v4/mapbox.osm-bright/{z}/{x}/{y}@2x.png`, 'osm-bright')},
      ]
      store.mapboxGeocoder = `${ store.server }/v4/geocode/mapbox.places/`
    } else {
      // Mapbox Online config
      store.styleTable = [
        {name: 'Mapbox Satellite', style: 'mapbox://styles/mapbox/satellite-streets-v9'},
        {name: 'Mapbox Outdoor (Vector)', style: 'mapbox://styles/mapbox/outdoors-v9'},
        {name: 'Mapbox Outdoor (Classic)', style: classicStyle(`https://api.mapbox.com/v4/mapbox.outdoors/{z}/{x}/{y}@2x.png?access_token=${ this.token }`, 'outdoors')},
      ]
      store.mapboxGeocoder = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'
    }

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
