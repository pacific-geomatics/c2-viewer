/**
 * Right Click Options
 */
import React from 'react'
import { ButtonGroup, Button, MenuItem } from 'react-bootstrap'

class RightClickOptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      top: this.props.top
     ,left: this.props.left
     ,display: this.props.display
    }
  }
  handleClickDirectionsFrom() {
    console.log('Directions from here')
    this.handleClick()
  }
  handleClickDirectionsTo() {
    console.log('Directions to here')
    this.handleClick()
  }
  handleClickWhatsHere() {
    console.log(`What's here?`)
    this.handleClick()
  }
  handleClickSearchNearby() {
    console.log('Search nearby')
    this.handleClick()
  }
  handleClick() {
    this.setState({ display: 'none' })
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      display: nextProps.display
     ,top: nextProps.top
     ,left: nextProps.left
    })
  }
  render() {
    const style = {
      'position' : 'absolute'
     ,'top': this.state.top
     ,'left': this.state.left
     ,'zIndex': 15
     ,'display': this.state.display
    }
    return (
      <ButtonGroup vertical style={ style }>
        <Button onClick={ this.handleClickDirectionsFrom.bind(this) }>Directions from here</Button>
        <Button onClick={ this.handleClickDirectionsTo.bind(this) }>Directions to here</Button>
        <Button onClick={ this.handleClickWhatsHere.bind(this) }>What's here?</Button>
        <Button onClick={ this.handleClickSearchNearby.bind(this) }>Search nearby</Button>
      </ButtonGroup>
    )
  }
}
RightClickOptions.propTypes = {
  top: React.PropTypes.number
 ,left: React.PropTypes.number
 ,display: React.PropTypes.string
}
RightClickOptions.defaultProps = {
  display: 'none'
}
export default RightClickOptions;
