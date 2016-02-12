/**
 * App Logo
 */
import React from 'react';

class Logo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { src: props.src, width: props.width }
  }
  handleClick(e) {
    if (this.state.brightness) {
      this.setState({ brightness: '' })
    } else {
      this.setState({ brightness: 'brightness(0.1)' })
    }
  }
  render() {
    const style = {
      'position' : 'absolute'
     ,'bottom': 15
     ,'left': 15
     ,'zIndex': 10
     ,'transition': 'all 1s'
     ,'WebkitFilter': this.state.brightness
    }
    return (
      <img
        style={ style }
        src={ this.state.src }
        width={ this.state.width }
        ref={(ref) => this.myLogo = ref}
        onClick={ this.handleClick.bind(this) }
      />
    )
  }
}

Logo.propTypes = { src: React.PropTypes.string, width: React.PropTypes.string }
Logo.defaultProps = { src: "images/pacgeo_logo_white_360px.png", width: '150px' }

export default Logo;
