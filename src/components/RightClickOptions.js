/**
 * Right Click Options
 */
import React from 'react'
import { NavItem, Nav } from 'react-bootstrap'

class RightClickOptions extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      top: props.top,
      left: props.left,
      show: props.show
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.top && nextProps.left) {
      let offsetTop = window.innerHeight - (nextProps.top + this.RightClickOptions.offsetHeight + this.props.buffer)
      let offsetLeft = window.innerWidth - (nextProps.left + this.RightClickOptions.offsetWidth + this.props.buffer)

      if (offsetTop > 0) { offsetTop = 0 }
      if (offsetLeft > 0) { offsetLeft = 0 }

      this.setState({
        show: nextProps.show,
        offsetTop: offsetTop,
        offsetLeft: offsetLeft,
        top: nextProps.top + offsetTop,
        left: nextProps.left + offsetLeft
      })
    }
  }

  handleBlur(e) {
    console.log('blur/RightClickOptions')
    this.setState({ show: false })
  }

  handleSelect(selectedKey) {
    this.setState({ show: false })
  }

  render() {
    const style = {
      position : 'absolute',
      top: this.state.top,
      left: this.state.left,
      backgroundColor: 'white',
      zIndex: 15,
      borderRadius: 5,
      width: 170,
      border: '2px solid #1d8893',
      boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.50)',
      display: (this.state.show) ? '' : 'none'
    }

    return (
      <div
        ref={ (ref) => this.RightClickOptions = ref }
        style={ style }
        >
        <Nav
          bsStyle="pills"
          stacked
          onBlur={ this.handleBlur.bind(this) }
          onSelect={ this.handleSelect.bind(this) }
          >
          <NavItem eventKey={ 'directionsFrom' }>Directions from here</NavItem>
          <NavItem eventKey={ 'directionsTo' }>Directions to here</NavItem>
          <NavItem eventKey={ 'whatsHere' }>What's here?</NavItem>
          <NavItem eventKey={ 'searchNearby' }>Search nearby</NavItem>
        </Nav>
      </div>
    )
  }
}

RightClickOptions.propTypes = {
  top: React.PropTypes.number,
  left: React.PropTypes.number,
  show: React.PropTypes.bool,
  buffer: React.PropTypes.number
}

RightClickOptions.defaultProps = {
  top: 0,
  left: 0,
  buffer: 5,
  height: 170,
  width: 170,
  show: false
}

export default RightClickOptions;
