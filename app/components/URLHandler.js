import React, { Component } from 'react'
import { hashHistory } from 'react-router'
import { computed } from 'mobx'
import { observer } from 'mobx-react'
import { store } from '../store'

@observer
export default class URLHandler extends React.Component {

  componentWillReact() {
    hashHistory.push({
      pathname: `/${ store.zoom }/${ store.lat }/${ store.lng }/${ store.bearing }/${ store.pitch }/app`,
      query: {
        search: store.search,
        mapStyle: store.mapStyle,
        access_token: store.access_token
      }
    })
  }

  render() {
    store.lat
    store.lng
    store.zoom
    store.bearing
    store.pitch
    store.style
    store.search
    store.mapStyle
    return <div></div>
  }
}
