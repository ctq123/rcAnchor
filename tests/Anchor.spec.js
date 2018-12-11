import React from 'react'
import { mount, shallow, render } from 'enzyme'
import { Anchor } from '../src'

describe('Anchor unitTest', () => {
  const titleList = [
    { itemId: '1', name: 'item1' },
    { itemId: '2', name: 'item2' },
    { itemId: '3', name: 'item3' },
    { itemId: '4', name: 'item4' }
  ]
  let generateBodyItem

  beforeEach(() => {
    generateBodyItem = titleList.map((item, index) => {
      if (item) {
        return <div key={index} data-item-id={item.itemId} className='my-body-item'>{item.name}</div>
      }
    })
  })

  it('render incorrectly', () => {
    const wrapper = render(<Anchor>{generateBodyItem}</Anchor>)
    expect(wrapper).toThrowErrorMatchingSnapshot()
  })

  it('set headDirection', () => {
    const wrapper = mount(<Anchor titleList={titleList}>{generateBodyItem}</Anchor>)
    expect(wrapper.find('.rc-anchor-header-row').length).toEqual(1)

    wrapper.setProps({ headDirection: 'col' })
    expect(wrapper.find('.rc-anchor-header-col').length).toEqual(1)
  })

  it('set bodyHeightRealTime', () => {
    const wrapper = mount(<Anchor titleList={titleList}>{generateBodyItem}</Anchor>)
    expect(wrapper.props().bodyHeightRealTime).toEqual(false)

    wrapper.setProps({ bodyHeightRealTime: true })
    expect(wrapper.props().bodyHeightRealTime).toEqual(true)
  })

  it('set bounds', () => {
    const wrapper = mount(<Anchor titleList={titleList}>{generateBodyItem}</Anchor>)
    expect(wrapper.props().bounds).toEqual(5)

    wrapper.setProps({ bounds: 10 })
    expect(wrapper.props().bounds).toEqual(10)
  })

  it('set className', () => {
    const wrapper = mount(<Anchor titleList={titleList}>{generateBodyItem}</Anchor>)
    expect(wrapper.find('.my-anchor-class').length).toEqual(0)

    wrapper.setProps({ className: 'my-anchor-class' })
    expect(wrapper.find('.rc-anchor .my-anchor-class').length).toEqual(1)

    wrapper.setProps({ headerClassName: 'my-anchor-header-class' })
    expect(wrapper.find('.rc-anchor-header .rc-anchor-header-row .my-anchor-header-class').length).toEqual(1)

    wrapper.setProps({ titleClassName: 'my-anchor-header-title-class' })
    expect(wrapper.find('.my-anchor-header-title-class').length).toEqual(4)

    wrapper.setProps({ bodyClassName: 'rc-anchor-body-class' })
    expect(wrapper.find('.rc-anchor-body .rc-anchor-body-class').length).toEqual(1)
  })

  it('handle click event', () => {
    let cbNode
    const handleClick = (...args) => ([cbNode] = args)

    const wrapper = mount(<Anchor titleList={titleList} onClick={handleClick}>{generateBodyItem}</Anchor>)
    const node = wrapper.find('.rc-title-item').filterWhere(item => item.prop('data-item-id') === '3')
    node.simulate('click')
    expect(cbNode).not.toBe(undefined)
    expect(cbNode.getAttribute('data-item-id')).toBe('3')
  })

  it('handle scroll event', () => {
    const wrapper = mount(<Anchor titleList={titleList}>{generateBodyItem}</Anchor>)
    const node = wrapper.find('.rc-anchor-body')
    node.simulate('scroll')
    // console.log(node.debug())
    expect(node.instance().offsetTop).toEqual(0)
  })

})