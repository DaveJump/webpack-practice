import React from 'react'
import 'styles/list.scss'

class App extends React.Component {
  constructor () {
    super()
  }
  render() {
    return (
      <div className="server-render-root">
        <h2>Server Rendered Content.</h2>
        <p>Happy Coding.</p>
      </div>
    )
  }
}

export default <App />
