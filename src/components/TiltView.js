/**
 * TiltView
 */
import React from 'react'
import { Glyphicon } from 'react-bootstrap'

class TiltView extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      pitch: 0,
      hover: false,
      active: false
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleMouseEnter = this.handleMouseEnter.bind(this)
    this.handleMouseLeave = this.handleMouseLeave.bind(this)
  }

  componentDidMount() {
    this.setState({ active: true })
  }

  handleClick() {
    let pitchCurrent = window._map.getPitch()
    let pitchSwitch = {
      0: 45,
      45: 90,
      90: 0
    }
    let pitch = pitchSwitch[pitchCurrent] || 0

    window._map.flyTo({ pitch: pitch })
    this.setState({ pitch: pitch })
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
        top: this.props.top,
        bottom: this.props.bottom,
        right: this.props.right,
        left: this.props.left,
        zIndex: this.props.zIndex,
        backgroundColor: `rgb(25, 25, 25)`,
        cursor: `pointer`,
        borderRadius: '4px',
        width: this.props.width,
        height: this.props.height,
        textAlign: 'center',
        perspective: '50px'
      },
      glyph: {
        position: 'relative',
        transition: 'all 0.5s',
        top: this.props.height / 2 - (this.props.fontSize / 2),
        WebkitTransform: `rotateX(${ this.state.pitch / 1.3 }deg)`,
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
        <Glyphicon style={ styles.glyph } glyph='th' />
      </div>
    )
  }
}

TiltView.propTypes = {
  right: React.PropTypes.number,
  bottom: React.PropTypes.number,
  left: React.PropTypes.number,
  top: React.PropTypes.number,
  zIndex: React.PropTypes.number,
  width: React.PropTypes.number,
  height: React.PropTypes.number,
  fontSize: React.PropTypes.number
}

TiltView.defaultProps = {
  zIndex: 15,
  bottom: 110,
  right: 22,
  width: 35,
  height: 35,
  fontSize: 18
}

export default TiltView
