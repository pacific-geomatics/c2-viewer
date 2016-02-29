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
      top: this.props.top,
      bottom: this.props.bottom,
      right: this.props.right,
      left: this.props.left,
      zIndex: this.props.zIndex,
      WebkitFilter: 'drop-shadow(1px 1px 10px rgba(0, 0, 0, 0.50))',
      WebkitUserSelect: 'none'
    }
    return (
      <div onFocus={ this.handleFocus } style={ style }>
        <Input type="text" bsSize='large' placeholder='Search' ref={(ref) => this.myTextInput = ref} />
      </div>
    )
  }
}

Search.propTypes = {
  top: React.PropTypes.number,
  bottom: React.PropTypes.number,
  left: React.PropTypes.number,
  right: React.PropTypes.number,
  zIndex: React.PropTypes.number
}

Search.defaultProps = {
  zIndex: 15,
  top: 10,
  left: 70
}

export default Search
