import React from 'react'
import commonStyle from 'styles/common.scss'

class Home extends React.Component {
  render () {
    return (
      <div
        style={{ color: commonStyle.successColor }}
        className="component-home">
        Hello React!
      </div>
    )
  }
}

export default Home
