/**
 * App Logo
 */
import React from 'react';
import classNames from 'classnames';


const logos = {
  grey : {
    src: 'images/pacgeo_logo_grey_360px.png'
  },
  white : {
    src: 'images/pacgeo_logo_white_360px.png'
  }
}

class Logo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { checked: props.checked, logo: props.logo, width: props.width }
  }
  handleClick(e) {
    console.log(this.myLogo)
    if (this.state.checked) {
      this.setState({ logo: "grey", width: '350px', checked: !this.state.checked})
    } else {
      this.setState({ logo: "white", width: '150px', checked: !this.state.checked})
    }
  }
  render() {
    const style = {
      'position' : 'absolute',
      'bottom': 15,
      'left': 15,
      'zIndex':10,
      'transition': 'all 1s'
    }
    return (
      <img
        style={ style }
        src={ logos[this.state.logo].src }
        width={ this.state.width }
        ref={(ref) => this.myLogo = ref}
        onClick={ this.handleClick.bind(this) }
      />
    )
  }
}
Logo.propTypes = { checked: React.PropTypes.bool.isRequired, logo: React.PropTypes.string, width: React.PropTypes.string }
Logo.defaultProps = { checked: true, logo: "white", width: '150px' }

export default Logo;
