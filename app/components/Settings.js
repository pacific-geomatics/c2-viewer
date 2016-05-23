import React, { Component } from 'react'
import { Modal, Button, Input, ButtonInput, Grid, Row, Col } from 'react-bootstrap'
import { MapBasemap, SettingsControl } from '../components'
import { observer } from 'mobx-react'
import { store } from '../store'

@observer
export default class Settings extends Component {
  constructor(props) {
    super(props)
    this.state = { show: false }
  }

  render() {
    const styles = {
      settings: {
        position: 'absolute',
        backgroundColor: `rgb(25, 25, 25)`,
        zIndex: 100
      }
    }
    return (
      <div>
        <SettingsControl onClick={ () => this.setState({ show: true }) } />
        <Modal
          show={ this.state.show }
          onHide={ () => this.setState({ show: false }) }
          >
          <Modal.Header>
            <h1>Basemaps</h1>
          </Modal.Header>

          <Modal.Body>
            { Object.keys(store.styleTable).map((key, index) =>
              <MapBasemap key={ key } { ...store.styleTable[key] } />
            )}
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={ () => this.setState({ show: false }) }>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}
