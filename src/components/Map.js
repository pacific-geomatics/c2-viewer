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

const tokenPart1 = 'pk.eyJ1Ij'
const tokenPart2 = 'oicG'
const tokenPart3 = 'FjZ2VvIiwiYSI'
const tokenPart4 = '6ImE2ZmE3YTQy'
const tokenPart5 = 'NmRjNTVmYTAxM'
const tokenPart6 = 'WE2YWZlNGFjZj'
const tokenPart7 = 'MzZWVhIn0.wRU'
const tokenPart8 = '0txw3VIEOVtyc'
const tokenPart9 = '8PCYdQ'
export const token = (tokenPart1 +
                    tokenPart2 +
                    tokenPart3 +
                    tokenPart4 +
                    tokenPart5 +
                    tokenPart6 +
                    tokenPart7 +
                    tokenPart8 +
                    tokenPart9)
