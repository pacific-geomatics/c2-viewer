/**
 * Settings
 */
import React from 'react'
import { Modal, Button, Input, Jumbotron, ButtonInput } from 'react-bootstrap'
import SettingsControl from './SettingsControl'
import { mapStyles } from '../utils/mapStyles'

class Settings extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      show: false,
      showCompareSwiper: this.props.showCompareSwiper,
      mapLeftStyle: this.props.mapLeftStyle,
      mapRightStyle: this.props.mapRightStyle
    }
    this.showModal = this.showModal.bind(this)
    this.hideModal = this.hideModal.bind(this)
    this.handleMapLeftStyle = this.handleMapLeftStyle.bind(this)
    this.handleMapRightStyle = this.handleMapRightStyle.bind(this)
    this.handleShowCompareSwiper = this.handleShowCompareSwiper.bind(this)
  }

  showModal() {
    this.setState({ show: true })
  }

  hideModal() {
    this.setState({ show: false })
  }

  handleShowCompareSwiper(e) {
    this.setState({ showCompareSwiper: !this.state.showCompareSwiper })
    this.props.handleShowCompareSwiper()
  }

  handleMapLeftStyle(e) {
    let value = e.target.value
    window._map.setStyle(mapStyles[value])
    this.setState({ mapLeftStyle: value })
  }

  handleMapRightStyle(e) {
    let value = e.target.value
    window._mapRight.setStyle(mapStyles[value])
    this.setState({ mapRightStyle: value })
  }

  render() {
    const styles = {
      settings: {
        position: 'absolute',
        backgroundColor: `rgb(25, 25, 25)`,
        top: this.props.top,
        bottom: this.props.bottom,
        right: this.props.right,
        left: this.props.left,
        zIndex: this.props.zIndex,
        width: this.props.width,
        height: this.props.height
      }
    }
    return (
      <div>
        <SettingsControl onClick={ this.showModal } />
        <Modal
          show={ this.state.show }
          onHide={ this.hideModal }
          >
          <Modal.Header>
            <h1>Basemaps</h1>
          </Modal.Header>

          <Modal.Body>
            <form>
              <Input type="checkbox" label="Compare Slider" checked={ this.props.showCompareSwiper } onChange={ this.handleShowCompareSwiper } />
              <Input type="select" label="Map Left" value={ this.state.mapLeftStyle } onChange={ this.handleMapLeftStyle }>
                <option value="pacgeo">Imagery - World View 3</option>
                <option value="hybrid">Imagery - Mapbox Basemap</option>
                <option value="streets">Vector - Streets</option>
                <option value="dark">Vector - Dark</option>
                <option value="ski">Vector - Swiss Ski</option>
                <option value="emerald">Vector - Emerald</option>
              </Input>
              <Input type="select" label="Map Right" value={ this.state.mapRightStyle } onChange={ this.handleMapRightStyle }>
                <option value="pacgeo">Imagery - World View 3</option>
                <option value="hybrid">Imagery - Mapbox Basemap</option>
                <option value="streets">Vector - Streets</option>
                <option value="dark">Vector - Dark</option>
                <option value="ski">Vector - Swiss Ski</option>
                <option value="emerald">Vector - Emerald</option>
              </Input>
            </form>
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={ this.hideModal }>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

Settings.propTypes = {
  right: React.PropTypes.number,
  bottom: React.PropTypes.number,
  left: React.PropTypes.number,
  top: React.PropTypes.number,
  zIndex: React.PropTypes.number,
  width: React.PropTypes.number,
  showCompareSwiper: React.PropTypes.bool,
  imagery: React.PropTypes.string,
  vector: React.PropTypes.string
}

Settings.defaultProps = {
  zIndex: 100,
  top: 0,
  bottom: 0,
  left: -400,
  width: 400,
  imagery: 'pacgeo',
  vector: 'outdoor'
}

export default Settings
