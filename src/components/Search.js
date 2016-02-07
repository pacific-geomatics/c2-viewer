/**
 * App Logo
 */
import React from 'react';
import classNames from 'classnames';

const style = {
  'position' : 'absolute',
  'top': 15,
  'left': 15,
  'zIndex': 10,
  'transition': 'all 1s'
}

class Search extends React.Component {
  constructor(props) {
    super(props);
  }
  handleClick() {
    if (this.myTextInput !== null) {
      this.myTextInput.focus();
    }
  }
  render() {
    return (
      <div style={ style }>
        <input type="text" ref={(ref) => this.myTextInput = ref} />
        <input
          type="button"
          value="Focus the text input"
          onClick={this.handleClick.bind(this)}
        />
      </div>
    )
  }
}

export default Search;
