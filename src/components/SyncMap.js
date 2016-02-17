/**
 * Sync Map
 */
import React from 'react'

class SyncMap extends React.Component {

  constructor(props) {
    super(props)

    this.state = { }
  }

  componentWillReceiveProps(nextProps) {
    let positionLeft = this.getPosition(nextProps.left)
    let positionRight = this.getPosition(nextProps.right)

    if (this.state) {

      if (JSON.stringify(this.state.positionLeft) != JSON.stringify(positionLeft)) {
        nextProps.right.jumpTo(positionLeft)

      } else if (JSON.stringify(this.state.positionRight) != JSON.stringify(positionRight)) {
        nextProps.left.jumpTo(positionRight)
      }
    }

    this.setState({
      positionLeft: positionLeft,
      positionRight: positionRight
    })
  }

  getPosition(map) {
    return {
      center: map.getCenter(),
      zoom: map.getZoom(),
      bearing: map.getBearing(),
      pitch: map.getPitch()
    }
  }

  render() {
    return <div></div>
  }
}

SyncMap.propTypes = {
  left: React.PropTypes.object,
  right: React.PropTypes.object
}

SyncMap.defaultProps = {

}

export default SyncMap
