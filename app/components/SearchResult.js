import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { store } from '../store'
import { getBounds } from '../utils'

@observer
export default class SearchResult extends Component {
  constructor(props) {
    super(props)
    this.handleMouseEnter = this.handleMouseEnter.bind(this)
    this.handleMouseLeave = this.handleMouseLeave.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.state = {
      hover: (store.selection == this.props.index)
    }
  }

  componentWillReact() {
    if (store.selection == this.props.index) this.setState({ hover: true })
    else this.setState({ hover: false })
  }

  handleClick(e) {
    let geometry = this.props.geometry
    let bounds = getBounds(geometry.bounds)
    let center = [geometry.location.lng, geometry.location.lat]
    if (bounds) map.fitBounds(bounds)
    else if (center) map.flyTo({center: center, zoom: 13})
    store.results = []
    store.search = this.props.formatted_address
    store.positionLat = geometry.location.lat
    store.positionLng = geometry.location.lng
  }

  handleMouseEnter() {
    store.selection = -1
    this.setState({ hover: true })
  }

  handleMouseLeave() {
    this.setState({ hover: false })
  }

  render() {
    // Mobx Observables
    store.selection

    const styles = {
      result: {
        fontFamily: 'fledgling',
        border: 'none',
        cursor: `pointer`,
        color: (this.state.hover) ? '#FB7461' : 'white',
        textAlign: 'left',
        fontSize: '3em',
        outline: 'none',
        backgroundColor: 'transparent',
        transition: 'none',
        fontWeight: 'bold',
        WebKitTransition: 'none',
        textShadow: '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black'
      }
    }
    return (
      <div
        style={ styles.result}
        onClick={ this.handleClick }
        onMouseEnter={ this.handleMouseEnter }
        onMouseLeave={ this.handleMouseLeave }
        onKeyDown={ this.handleKeyDown }
        block>
        { this.props.formatted_address }
      </div>
    )
  }
}
