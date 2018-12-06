'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

require('./Anchor.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * platform: github
 * author: ctq123
 * date: 2018-11-09
 */
var Anchor = function (_React$Component) {
  _inherits(Anchor, _React$Component);

  function Anchor(props) {
    _classCallCheck(this, Anchor);

    var _this = _possibleConstructorReturn(this, (Anchor.__proto__ || Object.getPrototypeOf(Anchor)).call(this, props));

    _this.state = {
      activeID: undefined,
      headerHeight: 0,
      bodyMaxHeight: '100%'
    };
    return _this;
  }

  _createClass(Anchor, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      this.setBodyHeight();
      var cont = this.getEleByClass('rc-anchor-body', 'single');
      var scrollFunc = function scrollFunc(e) {
        _this2.handleScroll(e);
      };
      if (cont) {
        cont.addEventListener('scroll', scrollFunc);
        this._scrollFunc = scrollFunc;
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var container = this.getEleByClass('rc-anchor-body', 'single');
      if (container) {
        container.removeEventListener('scroll', this._scrollFunc);
      }
    }
  }, {
    key: 'handleScroll',
    value: function handleScroll(e) {
      var target = e.target;
      // console.log("e>>", e)
      var activeID = void 0;

      var children = target && target.children;
      if (children && children.length) {
        for (var i = 0; i < children.length; i++) {
          var ele = children[i];
          // console.log("ele.offsetTop>>", ele.offsetTop, "target.offsetTop>>", target.offsetTop)
          // console.log("this.state.headerHeight>>", this.state.headerHeight, "target.scrollTop>>", target.scrollTop)
          var valid = ele.offsetTop - target.offsetTop > target.scrollTop - this.state.headerHeight;
          if (valid) {
            activeID = ele.getAttribute('data-item-id');
            break;
          }
        }
      }
      if (activeID) {
        this.setState({
          activeID: activeID
        });
      }
    }
  }, {
    key: 'setBodyHeight',
    value: function setBodyHeight() {
      var headDirection = this.props.headDirection;

      var maxHeight = this.props.maxHeight;
      if (headDirection === 'row' && maxHeight > 0) {
        var header = this.getEleByClass('rc-anchor-header', 'single');
        var headerHeight = header && header.offsetHeight || 0;
        var bodyMaxHeight = maxHeight - headerHeight || '100%';
        this.setState({
          headerHeight: headerHeight,
          bodyMaxHeight: bodyMaxHeight
        });
      }
    }
  }, {
    key: 'scrollToBlock',
    value: function scrollToBlock(e) {
      e.preventDefault();
      var target = e.target;
      // console.log("e2>>", e)
      this.removeActiveClass();
      var itemId = target.getAttribute('data-item-id');
      if (itemId) {
        var container = this.getEleByClass('rc-anchor-body', 'single');
        var eles = container && container.children;
        if (!eles || !eles.length) {
          return target;
        }
        var offsetTop = void 0,
            ele = null,
            parentEle = null;
        offsetTop = container.firstChild && container.firstChild.offsetTop || 0;
        for (var i = 0; i < eles.length; i++) {
          ele = eles[i];
          // console.log("ele.offsetTop=", ele.offsetTop, "offsetTop=", offsetTop)
          if (ele && ele.getAttribute('data-item-id') === itemId) {
            if (ele) {
              container.scrollTop = ele.offsetTop - offsetTop;
            }
            break;
          }
        }
      }
      this.props.onClick(target);
    }
  }, {
    key: 'getEleByClass',
    value: function getEleByClass(className) {
      var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'multi';

      var res = void 0;
      if (className) {
        var thisNode = _reactDom2.default.findDOMNode(this);
        var nodes = thisNode.getElementsByClassName(className);
        if (type !== 'multi' && nodes && nodes.length) {
          res = nodes[0];
        } else {
          res = nodes;
        }
      }
      return res;
    }
  }, {
    key: 'removeActiveClass',
    value: function removeActiveClass() {
      var items = this.getEleByClass('rc-title-item');
      for (var i in items) {
        if (items[i]) {
          this.removeClassName(items[i], 'rc-title-item-active');
        }
      }
    }
  }, {
    key: 'hasClassName',
    value: function hasClassName(obj, cla) {
      var classNameStr = obj.className;
      if (classNameStr) {
        var reg = new RegExp('(\\s|^)' + cla + '(\\s|$)');
        return classNameStr.match(reg);
      }
      return false;
    }
  }, {
    key: 'removeClassName',
    value: function removeClassName(obj, cla) {
      if (this.hasClassName(obj, cla)) {
        var reg = new RegExp('(\\s|^)' + cla + '(\\s|$)');
        obj.className = obj.className.replace(reg, '');
      }
    }
  }, {
    key: 'generateHeaderItem',
    value: function generateHeaderItem(items) {
      var _this3 = this;

      var titlecls = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

      if (items && Array.isArray(items)) {
        return items.map(function (item) {
          if (item && item.itemId) {
            var cls = !_this3.state.activeID || _this3.state.activeID === item.itemId ? 'rc-title-item rc-title-item-active' : 'rc-title-item';
            var tcls = titlecls ? cls + ' ' + titlecls : cls;
            if (!_this3.state.activeID) {
              _this3.state.activeID = item.itemId;
            }
            return _react2.default.createElement(
              'div',
              { key: item.itemId, className: tcls, 'data-item-id': item.itemId, onClick: _this3.scrollToBlock.bind(_this3) },
              item.name
            );
          }
        });
      }
      return null;
    }
  }, {
    key: 'render',
    value: function render() {
      var maxHeight = this.props.maxHeight;
      var titleList = this.props.titleList;
      var bodyMaxHeight = this.state.bodyMaxHeight;
      var _props = this.props,
          headDirection = _props.headDirection,
          className = _props.className,
          headerClassName = _props.headerClassName,
          titleClassName = _props.titleClassName,
          bodyClassName = _props.bodyClassName;

      var concls = className ? 'rc-anchor ' + className : 'rc-anchor';
      var headcls = 'rc-anchor-header';
      headcls += headDirection === 'row' ? ' rc-anchor-header-row' : ' rc-anchor-header-col';
      headcls += headerClassName ? ' ' + headerClassName : '';
      var bodycls = bodyClassName ? 'rc-anchor-body ' + bodyClassName : 'rc-anchor-body';
      var style = maxHeight > 0 ? { maxHeight: maxHeight } : {};
      return _react2.default.createElement(
        'div',
        { className: concls, style: style },
        _react2.default.createElement(
          'div',
          { className: headcls },
          this.generateHeaderItem(titleList, titleClassName)
        ),
        _react2.default.createElement(
          'div',
          { className: bodycls, style: { maxHeight: bodyMaxHeight } },
          this.props.children
        )
      );
    }
  }]);

  return Anchor;
}(_react2.default.Component);

Anchor.propTypes = {
  maxHeight: _propTypes2.default.number.isRequired,
  titleList: _propTypes2.default.array.isRequired,
  headDirection: _propTypes2.default.oneOf(['row', 'col']),
  className: _propTypes2.default.string,
  headerClassName: _propTypes2.default.string,
  titleClassName: _propTypes2.default.string,
  bodyClassName: _propTypes2.default.string,
  onClick: _propTypes2.default.func
};

Anchor.defaultProps = {
  headDirection: 'row',
  className: '',
  headerClassName: '',
  titleClassName: '',
  bodyClassName: '',
  onClick: function onClick() {}
};

exports.default = Anchor;