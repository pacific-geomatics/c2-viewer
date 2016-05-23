import React, { Component } from 'react'
import { Button, Input, ButtonGroup } from 'react-bootstrap'
import { observer } from 'mobx-react'
import { store } from '../store'

@observer
export default class Activate extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const styles = {
      container: {
        position: 'absolute',
        bottom: 25,
        right: 50,
        zIndex: 15
      }
    }
    return (
      <div style={ styles.container }>
        <input
          bsSize="large"
          type="text"
          value={ store.search }
          className={ 'search' }
          bsStyle='default'
          placeholder="Enter MapID..."
          onKeyDown={ (e) => console.log(e) }
          onChange={ () => console.log('hello') }
          block
        />
        <Button
          bsSize='large'
          >
          Activate
        </Button>
      </div>
    )
  }
}
