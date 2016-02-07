/**
 * App Logo
 */
import React from 'react';
import classNames from 'classnames';

const styles = {
  logo: {
    'position' : 'absolute',
    'bottom': 15,
    'left': 15,
    'zIndex':10,
    'transition': 'all 1s'
  }
}
const logos = {
  grey : {
    name: 'grey',
    src: 'images/pacgeo_logo_grey_360px.png'
  },
  white : {
    name: 'white',
    src: 'images/pacgeo_logo_white_360px.png'
  }
}

class Logo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { checked: true, logo: logos.white, width: '150px' }
  }
  handleClick(e) {
    if (this.state.checked) {
      this.setState({ logo: logos.grey, width: '350px', checked: !this.state.checked})
    } else {
      this.setState({ logo: logos.white, width: '150px', checked: !this.state.checked})
    }
  }
  render() {
    return (
      <img
        style={ styles.logo }
        src={ this.state.logo.src }
        width={ this.state.width }
        alt='Logo'
        onClick={ this.handleClick.bind(this) }
      />
    )
  }
}

export default Logo;
