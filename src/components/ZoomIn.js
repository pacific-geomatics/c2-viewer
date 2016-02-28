/**
 * Zoom Out
 */
import React from 'react'
import { Glyphicon } from 'react-bootstrap'

class ZoomOut extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      hover: false
    }
  }

  handleClick() {
    let zoom = window._map.getZoom()

    window._map.flyTo({
      zoom: zoom + 1
    })
  }

  handleMouseOver() {
    this.setState({ hover: true })
  }

  handleMouseOut() {
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
        top: this.props.height / 2 - (this.props.fontSize / 2),
        fontSize: this.props.fontSize,
        textShadow: (this.state.hover) ? `0 0 7px white` : ``,
        color: (this.state.hover) ? `rgb(255, 255, 255)` : `rgb(190, 190, 190)`
      }
    }
    return (
      <div
        style={ styles.container }
        onClick={ this.handleClick.bind(this) }
        onMouseOver={ this.handleMouseOver.bind(this) }
        onMouseOut={ this.handleMouseOut.bind(this) }

        onTouchStart={ this.handleMouseOver.bind(this) }
        onTouchCancel={ this.handleMouseOut.bind(this) }
        onTouchEnd={ this.handleMouseOut.bind(this) }
        >
        <Glyphicon style={ styles.glyph } glyph='plus' />
      </div>
    )
  }
}

ZoomOut.propTypes = {
  right: React.PropTypes.number,
  bottom: React.PropTypes.number,
  left: React.PropTypes.number,
  top: React.PropTypes.number,
  zIndex: React.PropTypes.number,
  width: React.PropTypes.number,
  height: React.PropTypes.number,
  fontSize: React.PropTypes.number
}

ZoomOut.defaultProps = {
  zIndex: 15,
  bottom: 70,
  right: 22,
  width: 35,
  height: 35,
  fontSize: 18
}

export default ZoomOut