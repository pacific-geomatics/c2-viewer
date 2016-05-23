import React, { Component } from 'react'
import { Glyphicon } from 'react-bootstrap'
import { observer } from 'mobx-react'
import { store } from '../store'

@observer
export default class Crosshair extends React.Component {
  constructor(props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
    this.state = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      accuracy: 'center',
      fontSize: 20
    }
  }

  componentWillReact() {
    if (store.mapMove) this.state.accuracy = 'center'
  }

  componentDidMount() {
    map.on('click', this.handleClick)
  }

  handleClick(e) {
    this.setState({
      x: e.point.x,
      y: e.point.y,
      accuracy: 'click'
    })
    store.positionLat = e.lngLat.lat
    store.positionLng = e.lngLat.lng
  }

  render() {
    // MobX Observables
    store.mapMove

    let fontSize = 20
    let x = this.state.x - fontSize / 2
    let y = this.state.y - fontSize / 2

    const style = {
      position : 'absolute',
      transform: `translate(${ x }px,${ y }px)`,
      zIndex: 35,
      transition: 'all 0.3s',
      fontSize: fontSize,
      color: 'white',
      textShadow: ' 1px 1px 2px black, 0 0 25px black, 0 0 5px black',
      pointerEvents: 'none',
      opacity: (this.state.accuracy == 'click') ? 1 : 0
    }

    return <Glyphicon style={ style } glyph="screenshot" />
  }
}
