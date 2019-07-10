# rc-anchor

English | [简体中文](./README.md) 

This is a react anchor component (scroll cursor) that can be embedded multiple times on the same page, independent of each other, providing horizontal and vertical layout, css style fully customizable

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

## horizontal demo
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

## vertical demo
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

props | description | type | default | isRequired
---|---|---|---|--
titleList | The header displays an array of names, and the array object must contain two properties.{itemId, name} | array |  | Y
headDirection | the header direction, horizontal or vertical | enum ('row', 'col') | 'row' | N
bodyHeightRealTime | whether the maximum height of the component body is acquired in real time, only valid when headDirection='row | bool | false | N
bounds | the Anchor area boundary | number | 5(px) | N
onClick | click on the head name callback function | function | (e)=>{} | N
className | the className of the component | string | '' | N
headerClassName | the className of the component header | string | '' | N
titleClassName | the className of the component headerTitle，the className of active headerTitle is 'rc-title-item-active' | string | '' | N
bodyClassName | the className of the component body | string | '' | N