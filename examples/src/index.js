import React from 'react'
import { render } from 'react-dom'
import { Anchor } from '../../src'
import './index.css'

class App extends React.Component {
  constructor(props) {
    super(props)
  }
  
  render () {
    const titleList = [
      {itemId: '1', name: 'item1'},
      {itemId: '2', name: 'item2'},
      {itemId: '3', name: 'item3'},
      {itemId: '4', name: 'item4'}
    ]
    const generateBodyItem = titleList.map((item, index) => {
      if (item) {
        return <div key={index} data-item-id={item.itemId} className='body-item'>{item.name}</div>
      }
    })
    return (
      <div style={{width: 300, marginTop: 50, marginLeft: 200}}>
        {/* <Anchor maxHeight={300} titleList={titleList}>
          {generateBodyItem}
        </Anchor> */}
        <br/>
        <br/>
        <Anchor maxHeight={400} titleList={titleList}>
          {generateBodyItem}
        </Anchor>
      </div>
    )
  }
}

render(<App />, document.getElementById('root'))
