/**
 * Search
 */
import React from 'react';
import { Input } from 'react-bootstrap';


class Search extends React.Component {
  constructor(props) {
    super(props)
  }
  handleFocus(e) {
    console.log('focus/search')
  }
  handleClick() {
    if (this.myTextInput !== null) {
      this.myTextInput.focus();
    }
  }
  render() {
    const style = {
      'position' : 'absolute',
      'top': 15,
      'left': 15,
      'zIndex': 10,
      'transition': 'all 1s'
    }
    return (
      <div onFocus={ this.handleFocus.bind(this) } style={ style }>
        <Input type="text" bsSize='large' placeholder='Search' ref={(ref) => this.myTextInput = ref} />
      </div>
    )
  }
}
Search.propTypes = { }
Search.defaultProps = { }
export default Search;
