import React, { Component } from 'react'

export default class Logo extends Component {

  render() {
    let style = {
      position: 'absolute',
      bottom: 13,
      left: 13,
      zIndex: 25,
      transition: 'all 1s',
      filter: `drop-shadow(1.5px 1.5px 0px black) drop-shadow(1px 1px 10px rgba(0, 0, 0, 0.60))`,
      WebkitFilter: `drop-shadow(1.5px 1.5px 0px black) drop-shadow(1px 1px 10px rgba(0, 0, 0, 0.60))`,
      WebkitUserSelect: 'none'
    }
    return (
      <img
        style={ style }
        src={ require("../images/pacgeo_logo_white_360px.png") }
        width={ 150 }
      />
    )
  }
}
