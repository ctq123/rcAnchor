# rc-anchor
这是一个react锚点组件，可内嵌多个在同一个页面，相互独立互不影响，并且css样式可自定义

## React Anchor
[![Build Status](https://travis-ci.org/ctq123/rcAnchor.svg?branch=master&foo=bar)](https://travis-ci.org/ctq123/rcAnchor)
[![NPM version](https://img.shields.io/badge/npm-v5.7.1-green.svg?style=flat)](https://www.npmjs.com/package/rc-anchor)
[![codecov](https://codecov.io/gh/ctq123/rcAnchor/branch/master/graph/badge.svg)](https://codecov.io/gh/ctq123/rcAnchor)

## Demo
![image](https://github.com/ctq123/rcAnchor/blob/master/examples/gif/example1.gif)
# install
npm install rc-anchor --save-dev
# Usage

## sample usage
![image](https://github.com/ctq123/rcAnchor/blob/master/examples/gif/example1.gif)
```
mport React from 'react'
import { Anchor } from 'rc-anchor'

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  handleClickTitle(node) {
    // console.log('node>>>', node)
  }

  render() {
    const titleList = [
      { itemId: '1', name: 'item1' },
      { itemId: '2', name: 'item2' },
      { itemId: '3', name: 'item3' },
      { itemId: '4', name: 'item4' }
    ]
    const generateBodyItem = titleList.map((item, index) => {
      if (item) {
        return <div key={index} data-item-id={item.itemId} className='my-body-item'>{item.name}</div>
      }
    })
    return (
      <div style={{ width: 300, marginTop: 50, marginLeft: 200 }}>
        <Anchor maxHeight={400} titleList={titleList}
          className='my-rc-anchor' headerClassName='my-rc-anchor-header'
          titleClassName='my-rc-title-item' bodyClassName='my-rc-anchor-body'
          onClick={this.handleClickTitle.bind(this)}
          >
          {generateBodyItem}
        </Anchor>
      </div>
    )
  }
}
```

```
.my-rc-anchor {
  padding: 5px;
  border: 1px solid #e4e4e4;
}

.my-rc-anchor .my-rc-anchor-header {
  padding: 5px 0px;
}

.my-rc-anchor .my-rc-anchor-header2 {
  position: relative;
  float: left;
}

.my-rc-anchor .my-rc-title-item {
  margin-right: 10px;
  padding: 2px 3px;
}

.my-rc-anchor .rc-title-item-active {
  background-color: blue;
  color: white;
}

.my-rc-anchor .my-rc-anchor-body {
  border-top: 1px solid #e4e4e4;
}

.my-rc-anchor .my-body-item {
  height: 200px;
  padding: 5px;
}

.my-rc-anchor .my-body-item:nth-child(odd) {
  background-color: green
}

.my-rc-anchor .my-body-item:nth-child(even) {
  background-color: red
}
```

# Prop Types

属性 | 描述 | 类型 | 默认值 | 是否必填
---|---|---|---|--
maxHeight | 最大高度 | number |  | 是
titleList | 头部显示名称数组 | array |  | 是
headDirection | 方向，横向或垂直 | enum ('row'|'col') | 'row' | 否
onClick | 点击头部名称回调函数 | function | (e)=>{} | 否
className | 该组件的className | string | '' | 否
headerClassName | 该组件头部的className | string | '' | 否
titleClassName | 该组件头部名称标签的className，活动标签写死为'rc-title-item-active'可重写 | string | '' | 否
bodyClassName | 该组件body内容的className | string | '' | 否