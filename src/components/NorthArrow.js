/**
 * North Arrow
 */
import React from 'react'
import { Glyphicon } from 'react-bootstrap'

class NorthArrow extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    const styles = {
      container : {
        'position' : 'absolute',
        'top': this.props.top,
        'bottom': this.props.bottom,
        'right': this.props.right,
        'left': this.props.left,
        'zIndex': this.props.zIndex
      },
      northArrow : {
        'fontSize': this.props.fontSize
      }
    }
    return (
      <div style={ styles.container }>
        <Glyphicon style={ styles.northArrow } glyph={ this.props.glyph } />
      </div>
    )
  }
}

NorthArrow.propTypes = {
  right: React.PropTypes.number,
  bottom: React.PropTypes.number,
  left: React.PropTypes.number,
  top: React.PropTypes.number,
  fontSize: React.PropTypes.number,
  glyph: React.PropTypes.string,
  zIndex: React.PropTypes.number
}

NorthArrow.defaultProps = {
  glyph: 'arrow-up',
  zIndex: 10
}

export default NorthArrow
