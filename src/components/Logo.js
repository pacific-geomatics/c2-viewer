/**
 * Logo
 */
import React from 'react'

class Logo extends React.Component {

  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    let black = 'rgba(0, 0, 0, 0.60)'
    let style = {
      position: 'absolute',
      bottom: this.props.bottom,
      left: this.props.left,
      zIndex: 15,
      transition: 'all 1s',
      filter: `drop-shadow(1.5px 1.5px 0px black) drop-shadow(1px 1px 10px ${ black })`,
      WebkitFilter: `drop-shadow(1.5px 1.5px 0px black) drop-shadow(1px 1px 10px ${ black })`,
      WebkitUserSelect: 'none'
    }
    return (
      <img
        style={ style }
        src={ this.props.src }
        width={ this.props.width }
      />
    )
  }
}

Logo.propTypes = {
  src: React.PropTypes.string,
  width: React.PropTypes.number,
  left: React.PropTypes.number,
  right: React.PropTypes.number,
  bottom: React.PropTypes.number,
  top: React.PropTypes.number
}

Logo.defaultProps = {
  src: "images/pacgeo_logo_white_360px.png",
  width: 150,
  left: 13,
  bottom: 5
}

export default Logo
