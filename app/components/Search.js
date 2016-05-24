import React from 'react'
import { Glyphicon, Input } from 'react-bootstrap'
import { observer } from 'mobx-react'
import { store } from '../store'
import { Result, SearchRemove, Remove } from '../components'
import { getBounds, getCenter } from '../utils/mapHandlers'

@observer
export default class Search extends React.Component {
  constructor(props) {
    super(props)
    this.getLocation = this.getLocation.bind(this)
    this.handleKeyEnter = this.handleKeyEnter.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  getLocation(location) {
    let bounds = map.getBounds()
    let url = `${ store.mapboxGeocoder }${ location }.json?access_token=${ store.token }`
    fetch(url).then(response => response.json())
      .then(data => {
        if (location == store.search) store.results = data.features.slice(0, 3)
      })
      .catch(error => console.log("Error found"))
  }

  handleKeyEnter(e) {
    let result = store.results[store.selection]
    if (result) {
      let bounds = getBounds(result.bbox)
      let center = result.geometry.coordinates
      if (bounds) map.fitBounds(bounds)
      else if (center) map.flyTo({center: center, zoom: 13})
      store.results = []
      store.search = result.place_name
    }
  }

  handleKeyDown(e) {
    if (e.key == 'Enter') this.handleKeyEnter()
    if (e.key == 'ArrowDown') store.selection = Math.min(store.results.length, store.selection + 1)
    if (e.key == 'ArrowUp') store.selection = Math.max(0, store.selection - 1)
  }

  handleChange(e) {
    store.selection = 0
    store.search = e.target.value
    if (store.search) this.getLocation(store.search)
    else store.results = []
  }

  render() {
    const styles = {
      container: {
        position: 'absolute',
        left: '20%',
        right: '20%',
        width: '60%',
        top: 50,
        zIndex: 60,
      },
      remove: {
        position: 'absolute',
        right: 10,
        color: 'white',
        fontSize: '2.5em',
        top: 30,
        cursor: `pointer`,
        textShadow: '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black'
      },
      search: {
        fontFamily: 'fledgling',
        border: 'none',
        color: 'white',
        borderBottom: 'white',
        borderBottomStyle: 'dashed',
        borderBottomWidth: 'thin',
        fontSize: '6em',
        outline: 'none',
        backgroundColor: 'transparent',
        transition: 'none',
        fontWeight: 'bold',
        width: '100%',
        WebKitTransition: 'none',
        textShadow: '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black'
      }
    }

    return (
      <div style={ styles.container } block>
        <SearchRemove />
        <input
          bsSize="large"
          type="text"
          bsStyle="link"
          ref="search"
          style={ styles.search }
          value={ store.search }
          className={ 'search' }
          bsStyle='default'
          placeholder="Choose a city..."
          onKeyDown={ this.handleKeyDown }
          onChange={ this.handleChange }
          block
        />
        { store.results.map((result, index) =>
          <Result key={ result.id } index={ index } { ...result } />
        )}
      </div>
    )
  }
}
