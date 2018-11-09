import React from 'react'
import { render } from 'react-dom'

class App extends React.Component {
  constructor(props) {
    super(props)
  }
  
  render () {
    return (
      <div style={{width: 300, marginTop: 400, marginLeft: 200}}>
        
      </div>
    )
  }
}

render(<App />, document.getElementById('root'))
