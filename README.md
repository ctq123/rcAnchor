# rc-anchor
这是一个react锚点组件（滚动游标），可内嵌多个在同一个页面，相互独立互不影响，提供横向和纵向排版，css样式完全自定义

## React Anchor
[![Build Status](https://travis-ci.org/ctq123/rcAnchor.svg?branch=master&foo=bar)](https://travis-ci.org/ctq123/rcAnchor)
[![NPM version](https://img.shields.io/badge/npm-v5.7.1-green.svg?style=flat)](https://www.npmjs.com/package/rc-anchor)
[![codecov](https://codecov.io/gh/ctq123/rcAnchor/branch/master/graph/badge.svg)](https://codecov.io/gh/ctq123/rcAnchor)

## Demo
![image](https://github.com/ctq123/rcAnchor/blob/master/examples/gif/example1.gif)
![image](https://github.com/ctq123/rcAnchor/blob/master/examples/gif/example2.gif)
# install
npm install rc-anchor --save-dev
# Usage

## 横向例子
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
      <div style={{ width: 300, Height: 400, marginTop: 50, marginLeft: 200 }}>
        <Anchor titleList={titleList}
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
css
```
.my-rc-anchor {
  padding: 5px;
  border: 1px solid #e4e4e4;
}

.my-rc-anchor .my-rc-anchor-header {
  padding: 5px 0px;
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

## 纵向例子
![image](https://github.com/ctq123/rcAnchor/blob/master/examples/gif/example2.gif)

```
mport React from 'react'
import { Anchor } from 'rc-anchor'

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  handleClickTitle(node) {
    console.log('node>>>', node)
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
      <div style={{ width: 300, Height: 400, marginTop: 50, marginLeft: 200 }}>
        <Anchor titleList={titleList}
          className='my-rc-anchor' headerClassName='my-rc-anchor-header2'
          titleClassName='my-rc-title-item' bodyClassName='my-rc-anchor-body'
          onClick={this.handleClickTitle.bind(this)}
          headDirection='col'
          >
          {generateBodyItem}
        </Anchor>
      </div>
    )
  }
}
```
css

```
.my-rc-anchor {
  padding: 5px;
  border: 1px solid #e4e4e4;
}

.my-rc-anchor .my-rc-anchor-header2 {
  position: relative;
  float: right;
}

.my-rc-anchor .my-rc-title-item {
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
titleList | 头部显示名称数组，数组对象必须包含两个属性{itemId, name} | array |  | 是
headDirection | 方向，横向或垂直 | enum ('row'|'col') | 'row' | 否
bodyHeightRealTime | 组件body最大高度是否实时获取，仅当headDirection='row'时有效 | bool | false | 否
onClick | 点击头部名称回调函数 | function | (e)=>{} | 否
className | 该组件的className | string | '' | 否
headerClassName | 该组件头部的className | string | '' | 否
titleClassName | 该组件头部名称标签的className，活动标签写死为'rc-title-item-active'可重写 | string | '' | 否
bodyClassName | 该组件body内容的className | string | '' | 否