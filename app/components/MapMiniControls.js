/**
 * Zoom In
 */
import React from 'react'
import { Glyphicon } from 'react-bootstrap'

class MapMiniControls extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      hover: false,
      active: false
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleMouseEnter = this.handleMouseEnter.bind(this)
    this.handleMouseLeave = this.handleMouseLeave.bind(this)
  }

  handleClick() {
    this.props.handleClick()
    this.setState({ active: !this.state.active })
  }

  handleMouseEnter() {
    this.setState({ hover: true })
  }

  handleMouseLeave() {
    this.setState({ hover: false })
  }

  render() {
    const styles = {
      container: {
        position: 'absolute',
        bottom: (this.props.windowTotal > 1600) ? this.props.bottom: this.props.bottom - 10,
        left: (this.props.windowTotal > 1600) ? this.props.left: this.props.left - 10,
        right: this.props.right,
        top: this.props.top,
        zIndex: this.props.zIndex,
        backgroundColor: `rgb(25, 25, 25)`,
        cursor: `pointer`,
        borderRadius: '50%',
        width: this.props.width,
        height: this.props.height,
        textAlign: 'center',
        perspective: '50px'
      },
      glyph: {
        position: 'relative',
        top: this.props.height / 2 - (this.props.fontSize / 2),
        fontSize: this.props.fontSize,
        textShadow: (this.state.hover) ? `0 0 7px white` : ``,
        color: (this.state.hover) ? `rgb(255, 255, 255)` : `rgb(190, 190, 190)`
      }
    }
    return (
      <div
        style={ styles.container }
        onClick={ this.handleClick }
        onMouseEnter={ this.handleMouseEnter }
        onMouseLeave={ this.handleMouseLeave }
        >
        <Glyphicon style={ styles.glyph } glyph={ this.state.active ? 'plus' : 'minus' } />
      </div>
    )
  }
}

MapMiniControls.propTypes = {
  right: React.PropTypes.number,
  bottom: React.PropTypes.number,
  left: React.PropTypes.number,
  top: React.PropTypes.number,
  zIndex: React.PropTypes.number,
  width: React.PropTypes.number,
  height: React.PropTypes.number,
  fontSize: React.PropTypes.number,
  windowTotal: React.PropTypes.number
}

MapMiniControls.defaultProps = {
  zIndex: 35,
  bottom: 60,
  left: 25,
  width: 35,
  height: 35,
  fontSize: 18
}

export default MapMiniControls
