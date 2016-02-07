/**
 * C2 Viewer App
 */
import React from 'react';
import ReactDOM from 'react-dom';
import Logo from './components/Logo';
import Map from './components/Map';
import Search from './components/Search';

class App extends React.Component {
  render() {
    return (
      <section>
        <Search />
        <Logo />
        <Map center={ [43.128, 36.32] }
             style='mapbox://styles/mapbox/satellite-hybrid-v8'
             zoom={ 15 } />
      </section>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
