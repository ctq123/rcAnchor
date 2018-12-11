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
      clickActiveID: undefined,
      headerOffsetTop: 0,
      bodyMaxHeight: '100%',
      bounds: (props.bounds > 0 && props.bounds) || 5
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

  componentDidUpdate() {
    if (this.props.bodyHeightRealTime) {
      const res = this.getMaxHeight()
      this.state.headerOffsetTop = res[0]
      this.state.bodyMaxHeight = res[1]
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
    // console.log("e>>", e)
    const { headerOffsetTop, clickActiveID, bounds } = this.state
    let activeID

    if (clickActiveID) {
      activeID = clickActiveID
    } else {
      const children = target && target.children
      const firstChildOffsetTop = (target.firstChild && target.firstChild.offsetTop) || 0
      if (children && children.length) {
        for(let i = 0; i < children.length; i++) {
          const ele = children[i]
          // console.log("ele", ele)
          // console.log("target.scrollTop>>", target.scrollTop, "ele.offsetTop>>", ele.offsetTop, "firstChildOffsetTop>>", firstChildOffsetTop)
          const valid = target.scrollTop - (ele.offsetTop - firstChildOffsetTop - 2 * headerOffsetTop) + bounds
          // console.log("valid", valid)
          if (valid > 0) {
            activeID = ele.getAttribute('data-item-id')
          } else {
            break
          }
        }
      }
    }
    
    if (activeID) {
      this.setState({
        activeID,
        clickActiveID: undefined
      })
    }
  }

  getMaxHeight() {
    const { headDirection } = this.props 
    let res = [0, '100%']
    if (headDirection === 'row') {
      const container = ReactDOM.findDOMNode(this)
      const header = this.getEleByClass('rc-anchor-header', 'single')
      const containerHeight = (container && container.clientHeight) || 0
      const headerHeight = (header && header.clientHeight) || 0
      const headerOffsetTop = (header && header.offsetTop) || 0
      // console.log("containerHeight=", container.clientHeight, " headerHeight=", headerHeight)
      let bodyMaxHeight = (containerHeight - headerHeight - headerOffsetTop * 2)
      bodyMaxHeight = (bodyMaxHeight > 0 && bodyMaxHeight) || '100%'
      res = [headerOffsetTop, bodyMaxHeight]
    }
    return res
  }

  setBodyHeight() {
    if (this.props.headDirection === 'row') {
      const res = this.getMaxHeight()
      this.setState({
        headerOffsetTop: res[0],
        bodyMaxHeight: res[1]
      })
    }
  }

  scrollToBlock(e) {
    e.preventDefault()
    const target = e.target
    // console.log("e2>>", e)
    this.removeActiveClass()
    const itemId = target.getAttribute('data-item-id')   
    if (itemId) {
      const container = this.getEleByClass('rc-anchor-body', 'single')
      const eles = container && container.children
      if (eles && eles.length) {
        let offsetTop, ele = null, parentEle = null
        offsetTop = (container.firstChild && container.firstChild.offsetTop) || 0
        for(let i = 0; i < eles.length; i++) {
          ele = eles[i]
          // console.log("ele.offsetTop=", ele.offsetTop, "offsetTop=", offsetTop)
          if (ele && ele.getAttribute('data-item-id') === itemId) {
            if (ele) {
              container.scrollTop = ele.offsetTop - offsetTop
            }
            break
          }
        }
      }
      
      this.setState({
        activeID: itemId,
        clickActiveID: itemId
      })
    }
    this.props.onClick(target)
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
    const items = this.getEleByClass('rc-title-item')
    for (let i in items) {
      if (items[i]) {
        this.removeClassName(items[i], 'rc-title-item-active')
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
          const cls = !this.state.activeID || this.state.activeID == item.itemId ? 'rc-title-item rc-title-item-active' : 'rc-title-item'
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
    const titleList = this.props.titleList
    const { bodyMaxHeight } = this.state
    const { headDirection, className, headerClassName, titleClassName, bodyClassName } = this.props
    const concls = className ? 'rc-anchor ' + className : 'rc-anchor'
    let headcls = 'rc-anchor-header'
    headcls += (headDirection === 'row' ? ' rc-anchor-header-row' : ' rc-anchor-header-col')
    headcls += (headerClassName ? (' ' + headerClassName) : '')
    const bodycls = bodyClassName ? 'rc-anchor-body ' + bodyClassName : 'rc-anchor-body'
    return (
      <div className={concls}>
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
  titleList: PropTypes.array.isRequired,
  headDirection: PropTypes.oneOf(['row', 'col']),
  className: PropTypes.string,
  headerClassName: PropTypes.string,
  titleClassName: PropTypes.string,
  bodyClassName: PropTypes.string,
  onClick: PropTypes.func,
  bodyHeightRealTime: PropTypes.bool,
  bounds: PropTypes.number
}

Anchor.defaultProps = {
  headDirection: 'row',
  className: '',
  headerClassName: '',
  titleClassName: '',
  bodyClassName: '',
  onClick: () => {},
  bodyHeightRealTime: false,
  bounds: 5,
}


export default Anchor
