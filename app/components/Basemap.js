import React from 'react'
import { Glyphicon } from 'react-bootstrap'
import { observer } from 'mobx-react'
import { store } from '../store'

export default class Basemap extends React.Component {
  static defaultProps = {
    zIndex: 15,
    bottom: 15,
    right: 22,
    width: 35,
    height: 35,
    fontSize: 18
  }

  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.state = {
      hover: false
    }
  }

  handleClick() {
    if (store.style < store.styleMax) store.style ++
    else store.style = 1
    map.setStyle(store.styleTable[store.style])
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
        onClick={ this.handleClick }
        onMouseEnter={ () => this.setState({ hover: true }) }
        onMouseLeave={ () => this.setState({ hover: false }) }
        >
        <Glyphicon style={ styles.glyph } glyph='globe' />
      </div>
    )
  }
}
