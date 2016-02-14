/**
 * Right Click Options
 */
import React from 'react'
import {
  ButtonGroup
 ,Button
 ,MenuItem
 ,OverlayTrigger
 ,Popover
 ,NavItem
 ,Nav } from 'react-bootstrap'

class RightClickOptions extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      top: props.top
     ,left: props.left
     ,display: props.display
    }
  }
  componentWillReceiveProps(nextProps) {
    let display = 'none'
    if ( nextProps.action ) {
      display = ''
    }
    this.setState({
      display: display
     ,top: nextProps.top
     ,left: nextProps.left
    })
  }
  handleSelect(selectedKey) {
    console.log(selectedKey)
    this.setState({ display: 'none' })
  }
  render() {
    const style = {
      'position' : 'absolute'
     ,'top': this.state.top
     ,'left': this.state.left
     ,'zIndex': 15
     ,'display': this.state.display
     ,'backgroundColor': 'white'
     ,'borderRadius': 5
     ,'border': '2px solid #1d8893'
     ,'boxShadow': '5px 5px 15px rgba(0, 0, 0, 0.50)'
    }
    return (
      <Nav
        bsStyle="pills"
        style={ style }
        stacked
        onSelect={ this.handleSelect.bind(this) }>
        <NavItem eventKey={ 'directionsFrom' }>Directions from here</NavItem>
        <NavItem eventKey={ 'directionsTo' }>Directions to here</NavItem>
        <NavItem eventKey={ 'whatsHere' }>What's here?</NavItem>
        <NavItem eventKey={ 'searchNearby' }>Search nearby</NavItem>
      </Nav>
    )
  }
}
RightClickOptions.propTypes = {
  top: React.PropTypes.number
 ,left: React.PropTypes.number
 ,action: React.PropTypes.bool
}
RightClickOptions.defaultProps = {
  top: 0
 ,left: 0
 ,action: false
}
export default RightClickOptions;
