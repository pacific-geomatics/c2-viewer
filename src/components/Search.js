/**
 * Search
 */
import React from 'react'
import { Input } from 'react-bootstrap'

class Search extends React.Component {

  constructor(props) {
    super(props)

    this.handleFocus.bind(this)
    this.handleClick.bind(this)
  }

  handleFocus(e) {
    console.log('focus/search')
  }

  handleClick() {
    if (this.myTextInput !== null) {
      this.myTextInput.focus()
    }
  }

  render() {
    const style = {
      position : 'absolute',
      top: 15,
      left: 15,
      zIndex: 20,
      transition: 'all 1s',
      WebkitFilter: 'drop-shadow(1px 1px 10px rgba(0, 0, 0, 0.75))',
      WebkitUserSelect: 'none'
    }
    return (
      <div onFocus={ this.handleFocus } style={ style }>
        <Input type="text" bsSize='large' placeholder='Search' ref={(ref) => this.myTextInput = ref} />
      </div>
    )
  }
}

Search.propTypes = { }

Search.defaultProps = { }

export default Search
