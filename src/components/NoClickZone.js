/**
 * No Click Zone
 */
import React from 'react'

class NoClickZone extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const style = {
      'position' : 'absolute'
     ,'zIndex': 5
     ,'top': this.props.top
     ,'bottom': this.props.bottom
     ,'left': this.props.left
     ,'right': this.props.right
     ,'width': this.props.width
     ,'height': this.props.height
     ,'backgroundColor': 'black'
     ,'WebkitFilter': 'opacity(0)'
    }
    return <div style={ style }></div>
  }
}

NoClickZone.propTypes = {
  left: React.PropTypes.number
 ,right: React.PropTypes.number
 ,top: React.PropTypes.number
 ,bottom: React.PropTypes.number
 ,width: React.PropTypes.number
}
NoClickZone.defaultProps = { }
export default NoClickZone;
