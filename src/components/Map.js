/**
 * Mapbox Map
 */
import React from 'react';
import classNames from 'classnames';
import map from '../app';

class Map extends React.Component {
  handleClick(e) {
    console.log(e.nativeEvent.which);
    console.log(e.type);
    console.log(e.nativeEvent);
    console.log(e.nativeEvent.x, e.nativeEvent.y);
  }
  render() {
    return (
      <div id="map"
        onDoubleClick={ this.handleClick }
        onDrag={ this.handleClick }
        onKeyDown={ this.handleClick }
        onClick={ this.handleClick }
        onContextMenu={ this.handleClick }
        onMouseOver={ this.handleClick }
        onWheel={ this.handleClick }
        onCopy={ this.handleClick }
        onPaste={ this.handleClick }>
      </div>
    )
  }
}

export default Map;
