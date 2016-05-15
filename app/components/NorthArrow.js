import React from 'react'
import { Glyphicon } from 'react-bootstrap'
import { observer } from 'mobx-react'
import { store } from '../store'

@observer
export default class NorthArrow extends React.Component {
  static defaultProps = {
    zIndex: 15,
    bottom: 175,
    right: 10,
    width: 60,
    height: 60
  }

  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.state = {
      hover: false
    }
  }

  componentDidMount() {
    map.on('rotate', this.getBearing.bind(this))
    this.setState({ active: true })
  }

  getBearing(e) {
    this.setState({ bearing: map.getBearing() })
  }

  handleClick() {
    let bearingSwitch = {
      0: 90,
      90: 180,
      180: 270,
      270: 0
    }
    map.flyTo({ bearing: bearingSwitch[store.bearing] || 0 })
  }

  render() {
    const styles = {
      container : {
        position : 'absolute',
        cursor: `pointer`,
        top: this.props.top,
        bottom: this.props.bottom,
        right: this.props.right,
        left: this.props.left,
        zIndex: this.props.zIndex,
        width: this.props.width,
        height: this.props.height,
        overflow: 'none'
      },
      northArrow : {
        position : 'absolute',
        width: this.props.width,
        height: this.props.height,
        transform: `rotate(${ store.bearing }deg)`,
        WebkitFilter: (!store.bearing) ? `grayscale(1)` : ``,
        backgroundImage: 'url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJ5ZXMiPz4KCjxzdmcgdmVyc2lvbj0iMS4xIiB2aWV3Qm94PSIwLjAgMC4wIDUzMy4zMzMzMzMzMzMzMzM0IDUzMy4zMzMzMzMzMzMzMzM0IiBmaWxsPSJub25lIiBzdHJva2U9Im5vbmUiIHN0cm9rZS1saW5lY2FwPSJzcXVhcmUiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PGNsaXBQYXRoIGlkPSJwLjAiPjxwYXRoIGQ9Im0wIDBsNTMzLjMzMzMgMGwwIDUzMy4zMzMzbC01MzMuMzMzMyAwbDAgLTUzMy4zMzMzeiIgY2xpcC1ydWxlPSJub256ZXJvIj48L3BhdGg+PC9jbGlwUGF0aD48ZyBjbGlwLXBhdGg9InVybCgjcC4wKSI+PHBhdGggZmlsbD0iIzAwMDAwMCIgZmlsbC1vcGFjaXR5PSIwLjAiIGQ9Im0wIDBsNTMzLjMzMzMgMGwwIDUzMy4zMzMzbC01MzMuMzMzMyAweiIgZmlsbC1ydWxlPSJub256ZXJvIj48L3BhdGg+PHBhdGggZmlsbD0iI2ZmMDAwMCIgZD0ibTIwNy40OTQ0NiAyNzUuMzYzOGw1My4xODExMDcgLTE2NS41NDMzbDUzLjE4MTA5IDE2NS41NDMzeiIgZmlsbC1ydWxlPSJub256ZXJvIj48L3BhdGg+PHBhdGggZmlsbD0iI2ZmZmZmZiIgZD0ibTIwNy40OTQ0NiAyNzUuMzY0NDRsNTMuMTgxMTA3IDE2NS41NDMzM2w1My4xODEwOSAtMTY1LjU0MzMzeiIgZmlsbC1ydWxlPSJub256ZXJvIj48L3BhdGg+PC9nPjwvc3ZnPgoK)'
      },
      background : {
        position : 'absolute',
        width: this.props.width,
        height: this.props.height,
        transition: 'all 0.3s',
        WebkitFilter: (this.state.hover) ? `invert(0.2)` : ``,
        backgroundImage: 'url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJ5ZXMiPz4KCjxzdmcgdmVyc2lvbj0iMS4xIiB2aWV3Qm94PSIwLjAgMC4wIDUzMy4zMzMzMzMzMzMzMzM0IDUzMy4zMzMzMzMzMzMzMzM0IiBmaWxsPSJub25lIiBzdHJva2U9Im5vbmUiIHN0cm9rZS1saW5lY2FwPSJzcXVhcmUiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PGNsaXBQYXRoIGlkPSJwLjAiPjxwYXRoIGQ9Im0wIDBsNTMzLjMzMzMgMGwwIDUzMy4zMzMzbC01MzMuMzMzMyAwbDAgLTUzMy4zMzMzeiIgY2xpcC1ydWxlPSJub256ZXJvIj48L3BhdGg+PC9jbGlwUGF0aD48ZyBjbGlwLXBhdGg9InVybCgjcC4wKSI+PHBhdGggZmlsbD0iIzAwMDAwMCIgZmlsbC1vcGFjaXR5PSIwLjAiIGQ9Im0wIDBsNTMzLjMzMzMgMGwwIDUzMy4zMzMzbC01MzMuMzMzMyAweiIgZmlsbC1ydWxlPSJub256ZXJvIj48L3BhdGg+PHBhdGggZmlsbD0iIzAwMDAwMCIgZD0ibTguOTg0MjUyIDI2Ni42NjkyOGwwIDBjMCAtMTQyLjMxNTUgMTE1LjM2OTUyIC0yNTcuNjg1MDMgMjU3LjY4NTAzIC0yNTcuNjg1MDNsMCAwYzY4LjM0MjM1IDAgMTMzLjg4NTUzIDI3LjE0ODg4IDE4Mi4yMTA4NSA3NS40NzQyYzQ4LjMyNTMxNyA0OC4zMjUzMTcgNzUuNDc0MTggMTEzLjg2ODUxNSA3NS40NzQxOCAxODIuMjEwODNsMCAwYzAgMTQyLjMxNTUyIC0xMTUuMzY5NTEgMjU3LjY4NTAzIC0yNTcuNjg1MDMgMjU3LjY4NTAzbDAgMGMtMTQyLjMxNTUgMCAtMjU3LjY4NTAzIC0xMTUuMzY5NTEgLTI1Ny42ODUwMyAtMjU3LjY4NTAzeiIgZmlsbC1ydWxlPSJub256ZXJvIj48L3BhdGg+PHBhdGggZmlsbD0iIzQzNDM0MyIgZD0ibTE1Mi40OTUxMiAyNzEuNDQ2MzJsMCAwYzAgLTYyLjUxNjg5IDUxLjExNzA5NiAtMTEzLjE5Njg1IDExNC4xNzMyMiAtMTEzLjE5Njg1bDAgMGMzMC4yODA2NCAwIDU5LjMyMTA0NSAxMS45MjYwNTYgODAuNzMyNjY2IDMzLjE1NDU4N2MyMS40MTE2MjEgMjEuMjI4NTMgMzMuNDQwNTUgNTAuMDIwNTg0IDMzLjQ0MDU1IDgwLjA0MjI3bDAgMGMwIDYyLjUxNjg3NiAtNTEuMTE3MDk2IDExMy4xOTY4NCAtMTE0LjE3MzIyIDExMy4xOTY4NGwwIDBjLTYzLjA1NjEyIDAgLTExNC4xNzMyMiAtNTAuNjc5OTYyIC0xMTQuMTczMjIgLTExMy4xOTY4NHoiIGZpbGwtcnVsZT0ibm9uemVybyI+PC9wYXRoPjxwYXRoIGZpbGw9IiMwMDAwMDAiIGZpbGwtb3BhY2l0eT0iMC4wIiBkPSJtNDE3LjIzMzU4IDE2OC40ODI5NGM2LjExNzI0ODUgMTUuNjA1ODY1NSAzNS43MDQ3NDIgNjIuNjczNjYgMzYuNzAzNDMgOTMuNjM1MTZjMC45OTg2ODc3NCAzMC45NjE1MTcgLTI1LjU5Mjc0MyA3Ni43NzgyMyAtMzAuNzExMzA0IDkyLjEzMzg4IiBmaWxsLXJ1bGU9Im5vbnplcm8iPjwvcGF0aD48cGF0aCBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMjQuMCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIGQ9Im00MTcuMjMzNTggMTY4LjQ4Mjk0YzYuMTE3MjQ4NSAxNS42MDU4NjU1IDM1LjcwNDc0MiA2Mi42NzM2NiAzNi43MDM0MyA5My42MzUxNmMwLjk5ODY4Nzc0IDMwLjk2MTUxNyAtMjUuNTkyNzQzIDc2Ljc3ODIzIC0zMC43MTEzMDQgOTIuMTMzODgiIGZpbGwtcnVsZT0ibm9uemVybyI+PC9wYXRoPjxwYXRoIGZpbGw9IiNmZmZmZmYiIGQ9Im00MTEuOTg5MDQgMzAwLjMxODZsMjUuNDY3MTYzIDIxLjcyNDQyNmwzNS45NTUzODMgMTEuMjM2MjA2bC03MS45MDgxMSA1My4xODExMnoiIGZpbGwtcnVsZT0ibm9uemVybyI+PC9wYXRoPjxwYXRoIGZpbGw9IiMwMDAwMDAiIGZpbGwtb3BhY2l0eT0iMC4wIiBkPSJtMTA0LjExNDU0IDE2Mi40NTgwMWMtNi4xMTcyMzMzIDE1LjYwNTg2NTUgLTM1LjcwNDcyIDYyLjY3MzY2IC0zNi43MDM0MDcgOTMuNjM1MTZjLTAuOTk4Njg3NzQgMzAuOTYxNTE3IDI1LjU5MjczNSA3Ni43NzgyMyAzMC43MTEyOCA5Mi4xMzM4NSIgZmlsbC1ydWxlPSJub256ZXJvIj48L3BhdGg+PHBhdGggc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjI0LjAiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBkPSJtMTA0LjExNDU0IDE2Mi40NTgwMWMtNi4xMTcyMzMzIDE1LjYwNTg2NTUgLTM1LjcwNDcyIDYyLjY3MzY2IC0zNi43MDM0MDcgOTMuNjM1MTZjLTAuOTk4Njg3NzQgMzAuOTYxNTE3IDI1LjU5MjczNSA3Ni43NzgyMyAzMC43MTEyOCA5Mi4xMzM4NSIgZmlsbC1ydWxlPSJub256ZXJvIj48L3BhdGg+PHBhdGggZmlsbD0iI2ZmZmZmZiIgZD0ibTEwOS4zNTkxMSAyOTQuMjkzNjdsLTI1LjQ2NzE5NCAyMS43MjQ0MjZsLTM1Ljk1NTM4IDExLjIzNjIwNmw3MS45MDgxNCA1My4xODExMnoiIGZpbGwtcnVsZT0ibm9uemVybyI+PC9wYXRoPjwvZz48L3N2Zz4KCg==)'
      }
    }
    return (
      <div
        style={ styles.container }
        onClick={ this.handleClick }
        onMouseEnter={ () => this.setState({ hover: true }) }
        onMouseLeave={ () => this.setState({ hover: false }) }
        >
        <div style={ styles.background }></div>
        <div style={ styles.northArrow }></div>
      </div>
    )
  }
}
