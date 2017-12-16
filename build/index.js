module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function getElementPosition(element) {
	var rect = element.getBoundingClientRect();
	var html = document.documentElement;
	var viewportBottom = window.innerHeight || html.clientHeight;
	return {
		fromTop: {
			top: rect.top,
			bottom: rect.bottom
		},
		fromBottom: {
			top: viewportBottom - rect.top,
			bottom: viewportBottom - rect.bottom
		}
	};
}

var OnScroll = function (_React$Component) {
	_inherits(OnScroll, _React$Component);

	function OnScroll(props) {
		_classCallCheck(this, OnScroll);

		var _this = _possibleConstructorReturn(this, (OnScroll.__proto__ || Object.getPrototypeOf(OnScroll)).call(this, props));

		_this.onScroll = function () {
			var position = getElementPosition(_this.element);
			var triggerBase = _this.props.triggerBase;

			var nextTriggers = _this.triggers.map(function (trigger) {
				var currentState = (!trigger.bottom || trigger.bottom < position.fromBottom[triggerBase]) && (!trigger.top || trigger.top < position.fromTop[triggerBase]);
				if (currentState !== trigger.lastState) {
					trigger.callback(currentState);
					var executionCount = (trigger.executionCount || 0) + 1;
					var repeat = trigger.repeat === 0 || executionCount < trigger.repeat;
					return repeat && _extends({}, trigger, { lastState: currentState, executionCount: executionCount });
				}
				return trigger;
			});
			_this.triggers = nextTriggers.filter(function (item) {
				return item;
			});
			if (_this.triggers.length === 0) {
				_this.unsubscribe();
			}
			_this.handlingScroll = false;
		};

		_this.handlingScroll = false;

		_this.handleScroll = function () {
			_this.handlingScroll = _this.handlingScroll || requestAnimationFrame(_this.onScroll);
		};

		_this.triggers = props.triggers.map(function (trigger) {
			return _extends({
				repeat: 0
			}, trigger, {
				executionCount: 0,
				lastState: false
			});
		});
		return _this;
	}

	_createClass(OnScroll, [{
		key: 'unsubscribe',
		value: function unsubscribe() {
			if (typeof window !== 'undefined' && window.removeEventListener) {
				window.removeEventListener('scroll', this.handleScroll);
			}
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			if (typeof window !== 'undefined' && window.addEventListener) {
				window.addEventListener('scroll', this.handleScroll);
			}
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			this.unsubscribe();
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			return _react2.default.createElement(
				'div',
				{
					ref: function ref(element) {
						_this2.element = element;
					},
					className: this.props.className
				},
				this.props.children
			);
		}
	}]);

	return OnScroll;
}(_react2.default.Component);

exports.default = OnScroll;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ })
/******/ ]);