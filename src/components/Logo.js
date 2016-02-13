/**
 * Logo
 */
import React from 'react';

class Logo extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const style = {
      'position' : 'absolute'
     ,'bottom': 15
     ,'left': 15
     ,'zIndex': 15
     ,'transition': 'all 1s'
     ,'WebkitFilter': 'drop-shadow(1.5px 1.5px 0px black) drop-shadow(1px 1px 10px black)'
     ,'pointerEvents': 'none'
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
  src: React.PropTypes.string
 ,width: React.PropTypes.number
}
Logo.defaultProps = {
  src: "images/pacgeo_logo_white_360px.png"
 ,width: 150
}
export default Logo;
