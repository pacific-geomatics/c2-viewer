/**
 * Right Click Options
 */
import React from 'react'
import {
  ButtonGroup,
  Button,
  MenuItem,
  OverlayTrigger,
  Overlay,
  Popover,
  NavItem,
  Nav,
  Modal } from 'react-bootstrap'

class RightClickOptions extends React.Component {

  constructor(props) {
    super(props)

    this.handleSelect = this.handleSelect.bind(this)

    this.state = {
      top: props.top,
      left: props.left,
      show: props.show
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log(window.innerWidth, window.innerHeight)
    console.log(nextProps.top, nextProps.left)
    console.log(this.container.offsetWidth, this.container.offsetHeight)

    this.setState({
      show: nextProps.show,
      top: nextProps.top,
      left: nextProps.left
    })
  }

  handleSelect(selectedKey) {
    console.log(selectedKey)
    this.setState({ showModal: false })
  }

  render() {
    const style = {
      position : 'absolute',
      top: this.state.top,
      left: this.state.left,
      backgroundColor: 'white',
      borderRadius: 5,
      border: '2px solid #1d8893',
      boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.50)'
    }

    return (
      <Overlay
        ref={ (ref) => this.container = ref }
        show={ this.state.show }
        onHide={() => this.setState({ show: false })}
        container={ this }
        style={ style }
      >
        <Nav
          bsStyle="pills"
          stacked
          onSelect={ this.handleSelect }
        >
          <NavItem eventKey={ 'directionsFrom' }>Directions from here</NavItem>
          <NavItem eventKey={ 'directionsTo' }>Directions to here</NavItem>
          <NavItem eventKey={ 'whatsHere' }>What's here?</NavItem>
          <NavItem eventKey={ 'searchNearby' }>Search nearby</NavItem>
        </Nav>
      </Overlay>
    )
  }
}

RightClickOptions.propTypes = {
  top: React.PropTypes.number,
  left: React.PropTypes.number,
  show: React.PropTypes.bool
}

RightClickOptions.defaultProps = {
  top: 0,
  left: 0,
  show: false
}

export default RightClickOptions;
