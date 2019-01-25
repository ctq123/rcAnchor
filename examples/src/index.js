import React from 'react'
import { render } from 'react-dom'
import { Anchor } from '../../src'
import './index.css'

const titleList1 = [
  { itemId: 1, name: 'item1' },
  { itemId: 2, name: 'item2' },
  { itemId: 3, name: 'item3' },
  { itemId: 4, name: 'item4' }
]

const titleList2 = [
  { itemId: 1, name: 'item1' },
  { itemId: 2, name: 'item2' },
  { itemId: 3, name: 'item3' },
  { itemId: 4, name: 'item4' },
  { itemId: 6, name: 'item6' },
  { itemId: 7, name: 'item7' },
  { itemId: 8, name: 'item8' },
  { itemId: 9, name: 'item9' },
  { itemId: 18, name: 'item18' },
  { itemId: 19, name: 'item19' }
]

class App extends React.Component {
  constructor(props) {
    super(props)
    const titleList = titleList1
    this.state = {
      titleList
    }
  }

  handleClickTitle(node) {
    console.log('node>>>', node)
    // const { titleList } = this.state
    // let arr = []
    // if (titleList && titleList.length > 5) {
    //   arr = titleList1
    // } else {
    //   arr = titleList2
    // }
    // this.setState({
    //   titleList: arr
    // })
  }

  render() {
    const { titleList } = this.state
    const generateBodyItem = titleList.map((item, index) => {
      if (item) {
        return <div key={index} data-item-id={item.itemId} className={(item.itemId > 5 && item.itemId < 10) ? 'my-body-item my-body-item2' : 'my-body-item'}>{item.name}</div>
      }
    })
    return (
      <div style={{ width: 300, height: 400, marginTop: 50, marginLeft: 200 }}>
        <Anchor titleList={titleList}
          className='my-rc-anchor' headerClassName='my-rc-anchor-header'
          titleClassName='my-rc-title-item' bodyClassName='my-rc-anchor-body'
          bodyHeightRealTime={true}
          onClick={this.handleClickTitle.bind(this)}
          >
          {generateBodyItem}
        </Anchor>
      </div>
    )
  }
}

render(<App />, document.getElementById('root'))
