/**
 * Crosshair
 */
import React from 'react'
import { Glyphicon } from 'react-bootstrap'

class Crosshair extends React.Component {

  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    let top = this.props.top - this.props.fontSize / 2
    let left = this.props.left - this.props.fontSize / 2

    const style = {
      'position' : 'absolute',
      'top': top,
      'left': left,
      'zIndex': 10,
      'transition': 'all 0.3s',
      'fontSize': this.props.fontSize,
      'color': 'white',
      'textShadow': ' 1px 1px 2px black, 0 0 25px black, 0 0 5px black',
      'pointerEvents': 'none'
    }

    return <Glyphicon style={ style } glyph="screenshot" />
  }
}

Crosshair.propTypes = {
  left: React.PropTypes.number,
  top: React.PropTypes.number,
  fontSize: React.PropTypes.number
}

Crosshair.defaultProps = {
  left: window.innerWidth / 2,
  top: window.innerHeight / 2,
  fontSize: 25
}

export default Crosshair
