/**
 * Crosshair
 */
import React from 'react'
import { Glyphicon } from 'react-bootstrap'

class Crosshair extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const style = {
      'position' : 'absolute'
     ,'top': this.props.top - this.props.fontSize / 2
     ,'left': this.props.left - this.props.fontSize / 2
     ,'zIndex': 10
     ,'transition': 'all 0.15s'
     ,'fontSize': this.props.fontSize
     ,'color': 'white'
     ,'textShadow': ' 1px 1px 2px black, 0 0 25px black, 0 0 5px black'
     ,'pointerEvents': 'none'
    }
    return <Glyphicon style={ style } glyph="screenshot" />
  }
}
Crosshair.propTypes = {
  left: React.PropTypes.number
 ,top: React.PropTypes.number
 ,fontSize: React.PropTypes.number
}
Crosshair.defaultProps = {
  left: 0
 ,top: 0
 ,fontSize: 25
}
export default Crosshair;
