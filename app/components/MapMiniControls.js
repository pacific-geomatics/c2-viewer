import React from 'react'
import { Glyphicon } from 'react-bootstrap'
import { observer } from 'mobx-react'
import { store } from '../store'

@observer
export default class MapMiniControls extends React.Component {
  constructor(props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
    this.state = { hover: false }
  }

  handleClick() {
    store.mapMiniActive = !store.mapMiniActive
  }

  render() {
    const styles = {
      container: {
        position: 'absolute',
        bottom: store.isXs ? 60 - 10 : 60,
        left: store.isXs ? 25 - 10 : 25,
        zIndex: 35,
        backgroundColor: `rgb(25, 25, 25)`,
        cursor: `pointer`,
        borderRadius: '50%',
        width: 35,
        height: 35,
        textAlign: 'center',
        perspective: '50px'
      },
      glyph: {
        position: 'relative',
        top: 9,
        fontSize: 18,
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
        <Glyphicon style={ styles.glyph } glyph={ store.mapMiniActive ? 'minus' : 'plus' } />
      </div>
    )
  }
}
