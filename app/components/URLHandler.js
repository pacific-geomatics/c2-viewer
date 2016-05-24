import React, { Component } from 'react'
import { hashHistory } from 'react-router'
import { computed } from 'mobx'
import { observer } from 'mobx-react'
import { store } from '../store'

@observer
export default class URLHandler extends React.Component {

  componentWillReact() {
    let query = {}
    if (store.access_token) { query['access_token'] = store.access_token }
    if (store.server) { query['server'] = store.server }
    if (store.search) { query['search'] = store.search }
    if (store.mapStyle) { query['mapStyle'] = store.mapStyle }

    hashHistory.push({
      pathname: `/${ store.zoom }/${ store.lat }/${ store.lng }/${ store.bearing }/${ store.pitch }/app`,
      query: query
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
