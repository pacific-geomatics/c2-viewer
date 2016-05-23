import React, { Component } from 'react'
import { Button, ButtonGroup } from 'react-bootstrap'
import { observer } from 'mobx-react'
import { store } from '../store'
import { getMGRS } from '../utils'

@observer
export default class MGRS extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const styles = {
      container: {
        position: 'absolute',
        top: 10,
        width: '100%',
        zIndex: 15,
        textAlign: 'center',
        pointerEvents: 'none'
      },
      mgrs: {
        pointerEvents: 'auto',
        fontFamily: 'fledgling',
        border: 'none',
        color: 'white',
        fontSize: '5em',
        fontWeight: 'bold',
        textShadow: '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black'
      }
    }
    return (
      <div style={ styles.container }>
        <span style={ styles.mgrs }>{ getMGRS(store.positionLat, store.positionLng, store.zoom) }</span>
      </div>
    )
  }
}
