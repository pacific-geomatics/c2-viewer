/**
 * North Arrow
 */
import React from 'react'
import { Glyphicon } from 'react-bootstrap'

class NorthArrow extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      display: this.props.display,
      opacity: this.props.opacity
    }
  }

  handleClick() {
    console.log('Clicked North Arrow')
  }

  render() {
    const styles = {
      container : {
        position : 'absolute',
        top: this.props.top,
        bottom: this.props.bottom,
        right: this.props.right,
        left: this.props.left,
        zIndex: this.props.zIndex,
        textAlign: 'center',
        verticalAlign: 'middle',
        width: 25,
        height: 25,
        opacity: (this.props.bearing) ? 1 : 0,
        cursor: 'pointer',
        borderRadius: '100%',
        transition: 'all 1s',
        backgroundColor: 'white',
        WebkitFilter: 'drop-shadow(1.5px 1.5px 1px black)',
      },
      northArrow : {
        fontSize: this.props.fontSize,
        color: 'rgb(165, 30, 30)',
        top: 3,
        transform: `rotate(${ this.props.bearing }deg)`
      }
    }
    return (
      <div
        style={ styles.container }
        onClick={ this.handleClick.bind(this) }
      >
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
  bearing: React.PropTypes.number,
  zIndex: React.PropTypes.number,
  opacity: React.PropTypes.number,
  display: React.PropTypes.string
}

NorthArrow.defaultProps = {
  glyph: 'arrow-up',
  zIndex: 10,
  bearing: 0,
  opacity: 1,
  display: ''
}

export default NorthArrow
