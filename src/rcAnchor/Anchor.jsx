import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import './Anchor.css'

/**
 * platform: github
 * author: ctq123
 * date: 2018-11-09
 */
class Anchor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeID: undefined,
      bodyMaxHeight: '100%'
    }
  }

  componentDidMount() {
    this.setBodyHeight()
    const cont = this.getEleByClass('rc-anchor-body', 'single')
    const scrollFunc = (e) => {
      this.handleScroll(e)
    }
    if (cont) {
      cont.addEventListener('scroll', scrollFunc)
      this._scrollFunc = scrollFunc
    }
  }

  componentWillUnmount() {
    const container = this.getEleByClass('rc-anchor-body', 'single')
    if (container) {
      container.removeEventListener('scroll', this._scrollFunc)
    }
  }

  handleScroll(e) {
    const target = e.target
    const func = function() {
      let res
      const scrollTop = target.scrollTop
      const children = target.children
      if (!children || !children.length) {
        return res
      }
      for(let i = 0; i < children.length; i++) {
        const ele = children[i]
        // console.log("ele.offsetTop>>", ele.offsetTop, "scrollTop>>", scrollTop)
        if(ele.offsetTop > scrollTop) {
          return ele.getAttribute('data-item-id')
        }
      }
    }
    // console.log("activeID>>", activeID)
    const activeID = func()
    if (activeID) {
      this.setState({
        activeID
      })
    }
  }

  setBodyHeight() {
    const { headDirection } = this.props
    const maxHeight = this.props.maxHeight 
    if (headDirection === 'row' && maxHeight > 0) {
      const header = this.getEleByClass('rc-anchor-header', 'single')
      const hh = (header && header.offsetHeight) || 0
      const bodyMaxHeight = (maxHeight - hh) || '100%'
      this.setState({
        bodyMaxHeight
      })
    }
  }

  scrollToBlock(e) {
    e.preventDefault()
    const target = e.target
    this.removeActiveClass()
    const itemId = target.getAttribute('data-item-id')
    if (itemId) {
      // this.setState({
      //   activeID: itemId
      // })
      const container = this.getEleByClass('rc-anchor-body', 'single')
      const eles = container && container.children
      if (!eles || !eles.length) {
        return target
      }
      let offsetTop, ele = null, parentEle = null
      offsetTop = (container.firstChild && container.firstChild.offsetTop) || 0
      for(let i = 0; i < eles.length; i++) {
        ele = eles[i]
        if (ele && ele.getAttribute('data-item-id') === itemId) {
          if (ele) {
            container.scrollTop = ele.offsetTop - offsetTop
          }
          break
        }
      }
    }
    return target
  }

  getEleByClass(className, type='multi') {
    let res
    if (className) {
      const thisNode = ReactDOM.findDOMNode(this)
      const nodes = thisNode.getElementsByClassName(className)
      if (type !== 'multi' && nodes && nodes.length) {
        res = nodes[0]
      } else {
        res = nodes
      }
    }
    return res
  }

  removeActiveClass () {
    const items = this.getEleByClass('header-item')
    for (let i in items) {
      if (items[i]) {
        this.removeClassName(items[i], 'active-item')
      }
    }
  }

  hasClassName (obj, cla) {
    const classNameStr = obj.className
    if (classNameStr) {
      var reg = new RegExp('(\\s|^)' + cla + '(\\s|$)')
      return classNameStr.match(reg)
    }
    return false
  }

  removeClassName (obj, cla) {
    if (this.hasClassName(obj, cla)) {
      var reg = new RegExp('(\\s|^)' + cla + '(\\s|$)')
      obj.className = obj.className.replace(reg, '')
    }
  }

  generateHeaderItem (items, titlecls='') {
    if (items && Array.isArray(items)) {
      return items.map((item) => {
        if (item && item.itemId) {
          const cls = !this.state.activeID || this.state.activeID === item.itemId ? 'header-item active-item' : 'header-item'
          const tcls = titlecls ? (cls + ' ' + titlecls) : cls
          if (!this.state.activeID) {
            this.state.activeID = item.itemId
          }
          return <div key={item.itemId} className={tcls} data-item-id={item.itemId} onClick={this.scrollToBlock.bind(this)}>{item.name}</div>
        }
      })
    }
    return null
  }

  render() {
    const maxHeight = this.props.maxHeight
    const titleList = this.props.titleList
    const { bodyMaxHeight } = this.state
    const { className, headerClassName, titleClassName, bodyClassName } = this.props
    const concls = className ? 'rc-anchor ' + className : 'rc-anchor'
    const headcls = headerClassName ? 'rc-anchor-header ' + headerClassName : 'rc-anchor-header'
    const bodycls = bodyClassName ? 'rc-anchor-body ' + bodyClassName : 'rc-anchor-body'
    const style = maxHeight > 0 ? { maxHeight } : {}
    return (
      <div className={concls} style={style}>
        <div className={headcls}>
          {this.generateHeaderItem(titleList, titleClassName)}
        </div>
        <div className={bodycls} style={{maxHeight: bodyMaxHeight}}>
          { this.props.children }
        </div>
      </div>
    )
  }
}

Anchor.propTypes = {
  maxHeight: PropTypes.number.isRequired,
  titleList: PropTypes.array.isRequired,
  headDirection: PropTypes.oneOf(['row', 'col']),
  className: PropTypes.string,
  headerClassName: PropTypes.string,
  titleClassName: PropTypes.string,
  bodyClassName: PropTypes.string,
}

Anchor.defaultProps = {
  headDirection: 'row',
  className: '',
  headerClassName: '',
  titleClassName: '',
  bodyClassName: '',
}


export default Anchor
