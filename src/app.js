/**
 * C2 Viewer App
 * References:
 * https://facebook.github.io/react/docs/perf.html
 * https://github.com/hgoebl/mobile-detect.js
 * http://csstriggers.com/
 * https://github.com/joshwcomeau/react-flip-move/blob/master/docs/how-it-works.md
 * http://www.w3schools.com/cssref/css3_pr_perspective.asp
 */
import React from 'react'
import ReactDOM from 'react-dom'
import Map from './components/Map'
import Logo from './components/Logo'
import ZoomIn from './components/ZoomIn'
import Search from './components/Search'
import MapMini from './components/MapMini'
import ZoomOut from './components/ZoomOut'
import MapRight from './components/MapRight'
import TiltView from './components/TiltView'
import Settings from './components/Settings'
import Crosshair from './components/Crosshair'
import NorthArrow from './components/NorthArrow'
import MyPosition from './components/MyPosition'
import Attribution from './components/Attribution'
import NoClickZone from './components/NoClickZone'
import CompareSwiper from './components/CompareSwiper'
import RightClickOptions from './components/RightClickOptions'


class App extends React.Component {

  constructor(props) {
    super(props)

    this.state = { active: false }
  }

  componentDidMount() {
    this.setState({ active: true })
  }

  render() {
    return (
      <div>
        { this.state.active && <NorthArrow /> }
        { this.state.active && <TiltView /> }
        { this.state.active && <MyPosition /> }
        { this.state.active && <ZoomOut /> }
        { this.state.active && <ZoomIn /> }
        { this.state.active && <Settings /> }
        { this.state.active && <Attribution /> }
        { this.state.active && <RightClickOptions /> }
        { this.state.active && <Crosshair /> }
        { this.state.active && <Search /> }
        { this.state.active && <Logo /> }
        { this.state.active && <CompareSwiper /> }

        <MapRight lng={ this.props.lng } lat={ this.props.lat } zoom={ this.props.zoom } active={ this.state.active }/>
        <MapMini lng={ this.props.lng } lat={ this.props.lat } zoom={ this.props.zoom } active={ this.state.active }/>
        <Map lng={ this.props.lng } lat={ this.props.lat } zoom={ this.props.zoom } active={ this.state.active }/>
      </div>
    )
  }
}

App.propTypes = {
  lat: React.PropTypes.number,
  lng: React.PropTypes.number,
  zoom: React.PropTypes.number
}

App.defaultProps = {
  lat: 36.31545,
  lng: 43.14998,
  zoom: 13
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)
