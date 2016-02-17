/**
 * CompareSwiper
 *
 * This component was inspired by @fallsemo (Tristen) at Mapbox
 * https://github.com/mapbox/mapbox-gl-compare
 */

import React from 'react'

class CompareSwiper extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      left: this.props.left,
      dragging: this.props.dragging
    }
  }

  componentDidMount() {
    window.addEventListener('mousemove', this.handleMouseMove.bind(this) )
    window.addEventListener('mouseup', this.handleMouseUp.bind(this) )
    window.addEventListener('touchmove', this.handleMouseMove.bind(this) )
    window.addEventListener('touchend', this.handleMouseUp.bind(this) )
    window.addEventListener('resize', this.handleResize.bind(this) )
  }

  handleMouseDown(e) {
    this.setState({ dragging: true })
  }

  handleMouseUp(e) {
    this.setState({ dragging: false })
  }

  handleResize(e) {
    let x = this.state.left
    let clientWidth = window.innerWidth
    if (x > clientWidth) x = clientWidth
    this.setState({ left: x })
  }

  handleMouseMove(e) {
    if (this.state.dragging) {
      this.setState({ left: this.getX(e) })
    }
  }

  getX(e) {
    let x = e.clientX
    let clientWidth = window.innerWidth
    if (x < 0) x = 0
    if (x > clientWidth) x = clientWidth
    return x
  }

  render() {
    const styles = {
      mapboxglCompare : {
        backgroundColor: '#fff',
        position: 'absolute',
        width: '2px',
        height: '100%',
        transform: `translate(${ this.state.left }px, 0px)`,
        zIndex: 10,
        userSelect: 'none'
      },
      compareSwiper : {
        backgroundColor: '#3887be',
        boxShadow: 'inset 0 0 0 2px #fff',
        display: 'inline-block',
        borderRadius: '50%',
        position: 'absolute',
        width: '60px',
        height: '60px',
        top: '50%',
        left: '-30px',
        margin: '-30px 1px 0',
        color: '#fff',
        cursor: 'ew-resize',
      	backgroundImage: 'url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+PHN2ZyAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgICB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIiAgIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyIgICB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgICB4bWxuczpzb2RpcG9kaT0iaHR0cDovL3NvZGlwb2RpLnNvdXJjZWZvcmdlLm5ldC9EVEQvc29kaXBvZGktMC5kdGQiICAgeG1sbnM6aW5rc2NhcGU9Imh0dHA6Ly93d3cuaW5rc2NhcGUub3JnL25hbWVzcGFjZXMvaW5rc2NhcGUiICAgd2lkdGg9IjYwIiAgIGhlaWdodD0iNjAiICAgdmVyc2lvbj0iMS4xIiAgIHZpZXdCb3g9IjAgMCA2MCA2MCIgICBpZD0ic3ZnNTQzNCIgICBpbmtzY2FwZTp2ZXJzaW9uPSIwLjkxK2RldmVsK29zeG1lbnUgcjEyOTExIiAgIHNvZGlwb2RpOmRvY25hbWU9Imwtci5zdmciPiAgPG1ldGFkYXRhICAgICBpZD0ibWV0YWRhdGE1NDQ0Ij4gICAgPHJkZjpSREY+ICAgICAgPGNjOldvcmsgICAgICAgICByZGY6YWJvdXQ9IiI+ICAgICAgICA8ZGM6Zm9ybWF0PmltYWdlL3N2Zyt4bWw8L2RjOmZvcm1hdD4gICAgICAgIDxkYzp0eXBlICAgICAgICAgICByZGY6cmVzb3VyY2U9Imh0dHA6Ly9wdXJsLm9yZy9kYy9kY21pdHlwZS9TdGlsbEltYWdlIiAvPiAgICAgICAgPGRjOnRpdGxlPjwvZGM6dGl0bGU+ICAgICAgPC9jYzpXb3JrPiAgICA8L3JkZjpSREY+ICA8L21ldGFkYXRhPiAgPGRlZnMgICAgIGlkPSJkZWZzNTQ0MiIgLz4gIDxzb2RpcG9kaTpuYW1lZHZpZXcgICAgIHBhZ2Vjb2xvcj0iI2ZmZmZmZiIgICAgIGJvcmRlcmNvbG9yPSIjNjY2NjY2IiAgICAgYm9yZGVyb3BhY2l0eT0iMSIgICAgIG9iamVjdHRvbGVyYW5jZT0iMTAiICAgICBncmlkdG9sZXJhbmNlPSIxMCIgICAgIGd1aWRldG9sZXJhbmNlPSIxMCIgICAgIGlua3NjYXBlOnBhZ2VvcGFjaXR5PSIwIiAgICAgaW5rc2NhcGU6cGFnZXNoYWRvdz0iMiIgICAgIGlua3NjYXBlOndpbmRvdy13aWR0aD0iMTI4NiIgICAgIGlua3NjYXBlOndpbmRvdy1oZWlnaHQ9Ijc1MSIgICAgIGlkPSJuYW1lZHZpZXc1NDQwIiAgICAgc2hvd2dyaWQ9InRydWUiICAgICBpbmtzY2FwZTp6b29tPSI0IiAgICAgaW5rc2NhcGU6Y3g9IjI1Ljg4OTgzMSIgICAgIGlua3NjYXBlOmN5PSIzNC4zODE4MzMiICAgICBpbmtzY2FwZTp3aW5kb3cteD0iMCIgICAgIGlua3NjYXBlOndpbmRvdy15PSIyMyIgICAgIGlua3NjYXBlOndpbmRvdy1tYXhpbWl6ZWQ9IjAiICAgICBpbmtzY2FwZTpjdXJyZW50LWxheWVyPSJzdmc1NDM0IiAgICAgaW5rc2NhcGU6b2JqZWN0LW5vZGVzPSJ0cnVlIiAgICAgaW5rc2NhcGU6c25hcC1zbW9vdGgtbm9kZXM9InRydWUiPiAgICA8aW5rc2NhcGU6Z3JpZCAgICAgICB0eXBlPSJ4eWdyaWQiICAgICAgIGlkPSJncmlkNTk4OSIgLz4gIDwvc29kaXBvZGk6bmFtZWR2aWV3PiAgPHBhdGggICAgIHN0eWxlPSJmaWxsOiNmZmZmZmY7ZmlsbC1ydWxlOmV2ZW5vZGQ7c3Ryb2tlOm5vbmU7c3Ryb2tlLXdpZHRoOjFweDtzdHJva2UtbGluZWNhcDpidXR0O3N0cm9rZS1saW5lam9pbjptaXRlcjtzdHJva2Utb3BhY2l0eToxIiAgICAgZD0iTSAyNSAyNCBMIDE2IDMwIEwgMjUgMzYgTCAyNSAyNCB6IE0gMzUgMjQgTCAzNSAzNiBMIDQ0IDMwIEwgMzUgMjQgeiAiICAgICBpZD0icGF0aDU5OTUiIC8+PC9zdmc+)'
      }
    }
    return (
      <div style={ styles.mapboxglCompare }>
        <div
          style={ styles.compareSwiper }
          onMouseDown={ this.handleMouseDown.bind(this) }
          onTouchStart={ this.handleMouseDown.bind(this) }
          onMouseMove={ this.state.dragging ? this.handleMouseDown.bind(this) : null }
          onTouchEnd={ this.handleMouseUp.bind(this) }
          onMouseUp={ this.handleMouseUp.bind(this) }
        ></div>
      </div>
    )
  }
}

CompareSwiper.propTypes = {
  //before: React.PropTypes.obj,
  //after: React.PropTypes.obj
  left: React.PropTypes.number,
  dragging: React.PropTypes.bool
}

CompareSwiper.defaultProps = {
  left: window.innerWidth / 2,
  dragging: false
}

export default CompareSwiper
