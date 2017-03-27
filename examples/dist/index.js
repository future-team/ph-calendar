(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("react/lib/ReactDOM"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "react/lib/ReactDOM"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("react"), require("react/lib/ReactDOM")) : factory(root["React"], root["ReactDom"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactLibReactDOM = __webpack_require__(3);
	
	var _reactLibReactDOM2 = _interopRequireDefault(_reactLibReactDOM);
	
	var _srcIndexJs = __webpack_require__(4);
	
	var _srcIndexJs2 = _interopRequireDefault(_srcIndexJs);
	
	__webpack_require__(11);
	
	var Demo = (function (_React$Component) {
	    _inherits(Demo, _React$Component);
	
	    function Demo(props, context) {
	        _classCallCheck(this, Demo);
	
	        _React$Component.call(this, props, context);
	        this.state = {
	            values: [new Date(2017, 1, 24), new Date(2017, 2, 10)],
	            disabled: [new Date(2017, 2, 14), new Date(2017, 2, 17)], // start end 包括
	            weekStart: 0,
	            range: false,
	            weekLabel: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
	            events: [{
	                date: new Date(2017, 1, 10),
	                name: '家立减'
	            }, {
	                date: new Date(2017, 1, 22),
	                name: '团购'
	            }, {
	                date: new Date(2017, 2, 10),
	                name: '劳动节'
	            }, {
	                date: new Date(2017, 2, 15),
	                name: '哈哈哈'
	            }]
	        };
	    }
	
	    Demo.prototype.componentWillMount = function componentWillMount() {};
	
	    Demo.prototype.componentDidMount = function componentDidMount() {};
	
	    Demo.prototype.componentWillReceiveProps = function componentWillReceiveProps() {};
	
	    Demo.prototype.shouldComponentUpdate = function shouldComponentUpdate() {
	        return true;
	    };
	
	    Demo.prototype.chooseCallback = function chooseCallback(data) {
	        console.log('选择后的日期', data);
	    };
	
	    Demo.prototype.render = function render() {
	        var _state = this.state;
	        var values = _state.values;
	        var disabled = _state.disabled;
	        var weekStart = _state.weekStart;
	        var events = _state.events;
	        var weekLabel = _state.weekLabel;
	        var range = _state.range;
	
	        return _react2['default'].createElement(
	            'div',
	            { className: 'rcs-demo' },
	            _react2['default'].createElement(_srcIndexJs2['default'], { values: values,
	                dateChanged: this.chooseCallback,
	                disabled: disabled,
	                events: events,
	                weekStart: weekStart,
	                weekLabel: weekLabel,
	                range: range
	            })
	        );
	    };
	
	    return Demo;
	})(_react2['default'].Component);
	
	_reactLibReactDOM2['default'].render(_react2['default'].createElement(Demo, null), document.getElementById('root'));

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _TopPanel = __webpack_require__(5);
	
	var _TopPanel2 = _interopRequireDefault(_TopPanel);
	
	var _utils = __webpack_require__(6);
	
	__webpack_require__(7);
	
	var PhCalendar = (function (_Component) {
	    _inherits(PhCalendar, _Component);
	
	    _createClass(PhCalendar, null, [{
	        key: 'propTypes',
	        value: {
	            monthCount: _react.PropTypes.number,
	            weekStart: _react.PropTypes.number,
	            weekLabel: _react.PropTypes.array,
	            dateChanged: _react.PropTypes.func,
	            range: _react.PropTypes.bool, // 是否支持范围选择
	            disabled: _react.PropTypes.array, // 如果是恰好两个值，则表示是范围([null, date]表示什么时间之前，[date, null]表示什么时间之后，[date,date]表示区间)，一个或者多个则表示是单点禁用
	            values: _react.PropTypes.array,
	            events: _react2['default'].PropTypes.arrayOf(_react.PropTypes.shape({
	                date: _react.PropTypes.object,
	                name: _react.PropTypes.string,
	                format: _react.PropTypes['function']
	            }))
	        },
	        enumerable: true
	    }, {
	        key: 'defaultProps',
	        value: {
	            monthCount: 12, // 渲染头部年月的前后一年的时间
	            weekStart: 1,
	            weekLabel: ['日', '一', '二', '三', '四', '五', '六'],
	            range: true,
	            disabled: [],
	            values: [],
	            events: [],
	            dateChanged: function dateChanged() {}
	        },
	        enumerable: true
	    }]);
	
	    function PhCalendar(props, context) {
	        _classCallCheck(this, PhCalendar);
	
	        _Component.call(this, props, context);
	        var values = props.values;
	        this.screen = window.screen;
	        var monthRange = this.getMonthRange(this.getCenterDateByValues(values));
	        this.state = {
	            layer: false,
	            monthRange: monthRange, // 月份的列表
	            yearRange: [], // 选择年份的列表
	            dateRange: values, // 选择日期的范围,如果是只有一个，则默认是单选了
	            changeDate: false,
	            changeDateYear: false,
	            changeDateMonth: false,
	            titleDate: monthRange[6]
	        };
	    }
	
	    PhCalendar.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextPros) {
	        var values = nextPros.values;
	        var monthRange = this.getMonthRange(this.getCenterDateByValues(values));
	        this.setState({
	            dateRange: values,
	            titleDate: monthRange[6],
	            monthRange: monthRange
	        });
	    };
	
	    PhCalendar.prototype.componentDidMount = function componentDidMount() {
	        // 计算每个日历月份的高度，为scroll到当前区域改变当前月份的时间做准备
	        this.initTitleDateAndScrollTop();
	    };
	
	    PhCalendar.prototype.initTitleDateAndScrollTop = function initTitleDateAndScrollTop() {
	        var doms = [];
	        var monthRange = this.state.monthRange;
	
	        Array.prototype.forEach.call(document.getElementsByClassName('ph-c-month'), function (item, index) {
	            var title = item.getElementsByClassName('ph-c-month-title')[0];
	            doms.push({
	                offsetTitle: item.offsetTop + title.clientHeight,
	                offsetBottom: item.offsetTop + item.clientHeight,
	                date: monthRange[index]
	            });
	        });
	        this.monthDOMArr = doms;
	        this.refs.phContentWrap.scrollTop = doms[6].offsetTitle;
	    };
	
	    PhCalendar.prototype.getCenterDateByValues = function getCenterDateByValues(values) {
	        if (values.length && _utils.checkType(values[0], 'date')) {
	            return values[0];
	        }
	        return new Date();
	    };
	
	    PhCalendar.prototype.checkDisableDate = function checkDisableDate(date) {
	        var disabled = this.props.disabled;
	        var len = disabled.length;
	        var dateTime = date.getTime();
	        var result = false;
	        if (len == 0) {
	            return false;
	        }
	        if (len == 2) {
	            // 区间
	            var start = disabled[0];
	            var end = disabled[1];
	            if (start == null) {
	                return dateTime <= end.getTime();
	            }
	            if (end == null) {
	                return dateTime >= start.getTime();
	            }
	            return dateTime <= end.getTime() && dateTime >= start.getTime();
	        }
	        if (len == 1 || len > 2) {
	            disabled.map(function (item) {
	                if (item.toLocaleDateString() == date.toLocaleString()) result = true;
	            });
	        }
	        return result;
	    };
	
	    PhCalendar.prototype.checkEvent = function checkEvent(date) {
	        var name = '';
	        this.props.events.forEach(function (item) {
	            if (item.date.toLocaleString() == date.toLocaleString()) {
	                name = item.name;
	            }
	        });
	        return name;
	    };
	
	    // 渲染12个，一年的，在前后各加减
	
	    PhCalendar.prototype.getMonthRange = function getMonthRange(date) {
	        var month = date.getMonth();
	        var year = date.getFullYear();
	        var arr = [];
	        for (var i = -5; i < 6; i++) {
	            arr.push(new Date(year, month + i));
	        }
	        return arr;
	    };
	
	    PhCalendar.prototype.chooseDate = function chooseDate(data, evt) {
	        evt.stopPropagation();
	        evt.preventDefault();
	        var range = this.props.range;
	
	        var dateR = this.state.dateRange;
	        var date = data.date;
	        if (['pre', 'next'].indexOf(data.type) != -1 || this.checkDisableDate(date)) {
	            return null;
	        }
	        if (!range) {
	            dateR = [date];
	        } else {
	            if (dateR.length < 2) {
	                //compare
	                if (dateR.length === 1) {
	                    if (dateR[0].getTime() > date.getTime()) {
	                        dateR[1] = dateR[0];
	                        dateR[0] = date;
	                    } else {
	                        dateR.push(date);
	                    }
	                } else {
	                    dateR.push(date);
	                }
	            } else {
	                dateR = [date];
	            }
	        }
	        this.props.dateChanged(dateR);
	        this.setState({
	            dateRange: dateR
	        });
	    };
	
	    /**
	     *
	     * @param year
	     * @param month base on 0, eg: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11
	     */
	
	    PhCalendar.prototype.renderMonth = function renderMonth(year, month) {
	        var _props = this.props;
	        var weekStart = _props.weekStart;
	        var weekLabel = _props.weekLabel;
	
	        var firstDate = new Date(year, month, 1);
	        var lastDate = new Date(year, month + 1, 0);
	        var days = lastDate.getDate();
	        var firstDateWeek = firstDate.getDay();
	        var lines = Math.ceil((days + firstDateWeek - weekStart) / 7);
	        var count = lines * weekLabel.length;
	        var daysArr = [];
	        var i = 0,
	            dateItem = firstDate;
	        dateItem.setDate(1 - firstDateWeek + weekStart);
	        while (i < count) {
	            var item = {
	                weekLabel: weekLabel[dateItem.getDay()],
	                event: this.checkEvent(dateItem),
	                date: new Date(dateItem)
	            };
	            if (i < firstDateWeek - weekStart) {
	                // pre month
	                item.type = 'pre';
	            } else if (i > days + firstDateWeek - weekStart - 1) {
	                // next month
	                item.type = 'next';
	            } else {
	                // current month
	                item.type = 'current';
	            }
	            daysArr.push(item);
	            i++;
	            dateItem.setDate(dateItem.getDate() + 1);
	        }
	        return daysArr;
	    };
	
	    PhCalendar.prototype.getDayStyle = function getDayStyle(data) {
	        var range = this.props.range;
	
	        var date = data.date;
	        if (['pre', 'next'].indexOf(data.type) != -1) {
	            return null;
	        }
	        var chooseStart = this.state.dateRange[0];
	        var chooseEnd = this.state.dateRange[1];
	        if (!range) {
	            if (chooseStart && chooseStart.toLocaleString() === date.toLocaleString()) {
	                return {
	                    type: 2,
	                    className: 'choose-one'
	                };
	            }
	            return null;
	        }
	
	        if (chooseStart) {
	            if (chooseStart.toLocaleString() === date.toLocaleString()) {
	                return {
	                    type: -1,
	                    className: 'choose-start'
	                };
	            }
	        }
	        if (chooseEnd) {
	            if (date.getTime() < chooseEnd.getTime() && date.getTime() > chooseStart.getTime()) {
	                return {
	                    type: 0,
	                    className: 'choose-between'
	                };
	            }
	
	            if (date.toLocaleString() === chooseEnd.toLocaleString()) {
	                return {
	                    type: 1,
	                    className: 'choose-end'
	                };
	            }
	        }
	        return null;
	    };
	
	    PhCalendar.prototype.titleDateChanged = function titleDateChanged(date) {
	        var _this = this;
	
	        this.setState({
	            monthRange: this.getMonthRange(date),
	            layer: false
	        });
	        setTimeout(function () {
	            _this.initTitleDateAndScrollTop();
	        }, 300);
	    };
	
	    PhCalendar.prototype.titleClick = function titleClick() {
	        // trigger layer
	        this.setState({
	            layer: true
	        });
	    };
	
	    PhCalendar.prototype.onScrollHandler = function onScrollHandler() {
	        var monthDoms = this.monthDOMArr;
	        var titleDate = this.state.titleDate;
	        var scrollTop = this.refs.phContentWrap.scrollTop;
	        var len = monthDoms.length;
	        var currentDate = (function () {
	            for (var i = 0; i < len; i++) {
	                if (scrollTop < monthDoms[i].offsetBottom) return monthDoms[i].date;
	            }
	        })();
	        if (titleDate.toLocaleString() != currentDate.toLocaleString()) {
	            this.setState({
	                titleDate: currentDate
	            });
	        }
	    };
	
	    PhCalendar.prototype.renderDataToTableStyle = function renderDataToTableStyle(year, month) {
	        var _this2 = this;
	
	        // group month data
	        var monthData = this.renderMonth(year, month);
	        var groupLen = this.props.weekLabel.length;
	        var range = this.props.range;
	        var result = Array.apply(null, {
	            length: Math.ceil(monthData.length / groupLen)
	        }).map(function (x, i) {
	            return monthData.slice(i * groupLen, (i + 1) * groupLen);
	        });
	        // render td
	        return _react2['default'].createElement(
	            'table',
	            { className: 'ph-c-month-week-table', cellSpacing: 0, cellPadding: 0 },
	            _react2['default'].createElement(
	                'thead',
	                null,
	                _react2['default'].createElement(
	                    'tr',
	                    null,
	                    _react2['default'].createElement('th', null),
	                    _react2['default'].createElement('th', null),
	                    _react2['default'].createElement('th', null),
	                    _react2['default'].createElement('th', null),
	                    _react2['default'].createElement('th', null),
	                    _react2['default'].createElement('th', null),
	                    _react2['default'].createElement('th', null)
	                )
	            ),
	            _react2['default'].createElement(
	                'tbody',
	                null,
	                result.map(function (group, i) {
	                    return _react2['default'].createElement(
	                        'tr',
	                        { key: i },
	                        group.map(function (dayItem, dayIndex) {
	                            var style = _this2.getDayStyle(dayItem);
	                            var isDisabled = _this2.checkDisableDate(dayItem.date) ? 'day_disabled' : '';
	                            if (style) {
	                                return _react2['default'].createElement(
	                                    'td',
	                                    { key: dayIndex, onClick: _this2.chooseDate.bind(_this2, dayItem), className: style.className + ' day_status_' + dayItem.type + ' ' + isDisabled },
	                                    _react2['default'].createElement(
	                                        'div',
	                                        null,
	                                        _react2['default'].createElement(
	                                            'div',
	                                            { className: 'day' },
	                                            dayItem.date.getDate()
	                                        ),
	                                        dayItem.event && _react2['default'].createElement(
	                                            'div',
	                                            { className: 'event' },
	                                            _react2['default'].createElement(
	                                                'p',
	                                                null,
	                                                dayItem.event
	                                            )
	                                        ),
	                                        range && _react2['default'].createElement(
	                                            'div',
	                                            { className: 'choose' },
	                                            style.type == 0 ? '' : style.type == -1 ? '开始' : '结束'
	                                        )
	                                    )
	                                );
	                            } else {
	                                return _react2['default'].createElement(
	                                    'td',
	                                    { key: dayIndex, onClick: _this2.chooseDate.bind(_this2, dayItem), className: 'day_status_' + dayItem.type + ' ' + isDisabled },
	                                    _react2['default'].createElement(
	                                        'div',
	                                        null,
	                                        _react2['default'].createElement(
	                                            'div',
	                                            { className: 'day' },
	                                            dayItem.date.getDate()
	                                        ),
	                                        dayItem.event && _react2['default'].createElement(
	                                            'div',
	                                            { className: 'event' },
	                                            _react2['default'].createElement(
	                                                'p',
	                                                null,
	                                                dayItem.event
	                                            )
	                                        )
	                                    )
	                                );
	                            }
	                        })
	                    );
	                })
	            )
	        );
	    };
	
	    PhCalendar.prototype.render = function render() {
	        var _this3 = this;
	
	        var _props2 = this.props;
	        var weekStart = _props2.weekStart;
	        var weekLabel = _props2.weekLabel;
	
	        return _react2['default'].createElement(
	            'div',
	            { className: 'ph-c-container' },
	            _react2['default'].createElement(
	                'div',
	                { className: 'ph-c-header-fixed' },
	                _react2['default'].createElement(
	                    'div',
	                    { className: 'ph-c-week-label' },
	                    weekLabel.map(function (item, index) {
	                        return _react2['default'].createElement(
	                            'p',
	                            { key: index },
	                            weekLabel[(index + weekStart) % weekLabel.length]
	                        );
	                    })
	                ),
	                _react2['default'].createElement(
	                    'div',
	                    { className: 'ph-c-date' },
	                    _react2['default'].createElement(_TopPanel2['default'], { date: this.state.titleDate, dateChanged: this.titleDateChanged.bind(this), titleClick: this.titleClick.bind(this) })
	                )
	            ),
	            _react2['default'].createElement(
	                'div',
	                { className: 'ph-c-content-wrap', ref: 'phContentWrap', onScroll: this.onScrollHandler.bind(this) },
	                _react2['default'].createElement(
	                    'div',
	                    { className: 'ph-c-content', ref: 'phContent' },
	                    this.state.monthRange.map(function (monthItem, monthIndex) {
	                        var year = monthItem.getFullYear();
	                        var month = monthItem.getMonth();
	                        return _react2['default'].createElement(
	                            'div',
	                            { className: 'ph-c-month', key: monthIndex },
	                            _react2['default'].createElement(
	                                'div',
	                                { className: 'ph-c-month-title' },
	                                _react2['default'].createElement(
	                                    'p',
	                                    null,
	                                    year,
	                                    '年',
	                                    month + 1,
	                                    '月'
	                                )
	                            ),
	                            _react2['default'].createElement(
	                                'div',
	                                { className: 'ph-c-month-week-container' },
	                                _this3.renderDataToTableStyle(year, month)
	                            )
	                        );
	                    })
	                )
	            ),
	            this.state.layer && _react2['default'].createElement('div', { className: 'ph-c-top-panel-layer' })
	        );
	    };
	
	    return PhCalendar;
	})(_react.Component);
	
	exports['default'] = PhCalendar;
	module.exports = exports['default'];

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var TopPanel = (function (_Component) {
	    _inherits(TopPanel, _Component);
	
	    _createClass(TopPanel, null, [{
	        key: 'propTypes',
	        value: {
	            date: _react.PropTypes.object,
	            dateChanged: _react.PropTypes.func,
	            titleClick: _react.PropTypes.func
	        },
	        enumerable: true
	    }, {
	        key: 'defaultProps',
	        value: {
	            date: new Date(),
	            dateChanged: function dateChanged() {},
	            titleClick: function titleClick() {}
	        },
	        enumerable: true
	    }]);
	
	    function TopPanel(props, context) {
	        _classCallCheck(this, TopPanel);
	
	        _Component.call(this, props, context);
	        this.screen = window.screen;
	        var year = props.date.getFullYear();
	        var years = this.getYears(year);
	        this.state = {
	            date: props.date,
	            changeDate: false,
	            changeYear: false,
	            changeMonth: false,
	            years: years
	        };
	    }
	
	    TopPanel.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
	        // only update title
	        this.setState({
	            date: nextProps.date
	        });
	    };
	
	    TopPanel.prototype.onTouchStartHandler = function onTouchStartHandler(evt) {
	        var _this = this;
	
	        evt.stopPropagation();
	        this.longTouch = false;
	        setTimeout(function () {
	            _this.longTouch = true;
	        }, 200);
	        this.touchstartx = evt.touches[0].pageX;
	    };
	
	    TopPanel.prototype.onTouchMoveHandler = function onTouchMoveHandler(evt) {
	        evt.stopPropagation();
	        this.touchmovex = evt.touches[0].pageX;
	        this.movex = this.touchstartx - this.touchmovex;
	    };
	
	    TopPanel.prototype.changeYearRangeHandler = function changeYearRangeHandler(evt) {
	        evt.stopPropagation();
	        var clientWidth = this.screen.width;
	        var absX = Math.abs(this.movex);
	        if (this.longTouch === true) {
	            // 长滑动是翻页
	            // TODO 这里要做缓存处理
	            if (absX > clientWidth / 3) {
	                this.setYearRange(this.movex);
	            }
	        }
	    };
	
	    TopPanel.prototype.getYears = function getYears(year) {
	        var startYear = year - 6;
	        var endYear = year + 6;
	        var years = [];
	        for (var i = startYear; i < endYear; i++) {
	            years.push(i);
	        }
	        return years;
	    };
	
	    TopPanel.prototype.setYearRange = function setYearRange(type) {
	        var years = this.state.years;
	
	        if (type > 0) {
	            // left
	            var last = years[years.length - 1];
	            var max = last + 12;
	            for (var i = last; i < max; i++) {
	                years.push(i);
	            }
	            years.splice(0, 12);
	        } else {
	            // right
	            var first = years[0];
	            var min = first - 12;
	            for (var i = first - 1; i > min; i--) {
	                years.unshift(i);
	            }
	            years = years.slice(0, 12);
	        }
	        this.setState({
	            years: years
	        });
	    };
	
	    TopPanel.prototype.renderYearSelect = function renderYearSelect(evt) {
	        this.props.titleClick(evt);
	        this.setState({
	            changeDate: true,
	            changeYear: true,
	            changeMonth: false
	        });
	    };
	
	    TopPanel.prototype.renderMonthSelect = function renderMonthSelect(evt) {
	        this.props.titleClick(evt);
	        this.setState({
	            changeDate: true,
	            changeYear: false,
	            changeMonth: true
	        });
	    };
	
	    TopPanel.prototype.renderTitle = function renderTitle() {
	        var _state = this.state;
	        var changeDate = _state.changeDate;
	        var changeYear = _state.changeYear;
	        var changeMonth = _state.changeMonth;
	        var date = _state.date;
	        var years = _state.years;
	
	        var year = date.getFullYear();
	        var month = date.getMonth();
	        if (!changeDate) {
	            // 切换时间 or 月份
	            return _react2['default'].createElement(
	                'p',
	                null,
	                _react2['default'].createElement(
	                    'span',
	                    {
	                        onClick: this.renderYearSelect.bind(this) },
	                    year
	                ),
	                '年',
	                _react2['default'].createElement(
	                    'span',
	                    {
	                        onClick: this.renderMonthSelect.bind(this) },
	                    month + 1
	                ),
	                '月'
	            );
	        } else if (changeYear) {
	            return _react2['default'].createElement(
	                'p',
	                null,
	                _react2['default'].createElement(
	                    'span',
	                    null,
	                    years[0],
	                    '年-',
	                    years.slice(-1)[0],
	                    '年'
	                )
	            );
	        } else if (changeMonth) {
	            return _react2['default'].createElement(
	                'p',
	                null,
	                _react2['default'].createElement(
	                    'span',
	                    {
	                        onClick: this.renderYearSelect.bind(this) },
	                    year
	                ),
	                '年',
	                month + 1,
	                '月'
	            );
	        }
	    };
	
	    TopPanel.prototype.renderContent = function renderContent() {
	        var _this2 = this;
	
	        var _state2 = this.state;
	        var changeDate = _state2.changeDate;
	        var changeYear = _state2.changeYear;
	        var changeMonth = _state2.changeMonth;
	        var date = _state2.date;
	        var years = _state2.years;
	
	        var year = date.getFullYear();
	        var month = date.getMonth();
	        if (!changeDate) {
	            // 切换时间 or 月份
	            return '';
	        } else if (changeYear) {
	            // 获取年的范围
	            return _react2['default'].createElement(
	                'div',
	                { className: 'ph-c-top-panel-container' },
	                _react2['default'].createElement(
	                    'div',
	                    {
	                        className: 'ph-c-top-panel-content',
	                        onTouchStart: this.onTouchStartHandler.bind(this),
	                        onTouchMove: this.onTouchMoveHandler.bind(this),
	                        onTouchEnd: this.changeYearRangeHandler.bind(this) },
	                    _react2['default'].createElement(
	                        'ul',
	                        { className: 'ph-c-clearfix' },
	                        years.map(function (item, index) {
	                            return _react2['default'].createElement(
	                                'li',
	                                { key: index, className: 'item', onClick: _this2.setItem.bind(_this2, item, 'year') },
	                                _react2['default'].createElement(
	                                    'div',
	                                    { className: item == year ? 'active' : '' },
	                                    item
	                                )
	                            );
	                        })
	                    )
	                )
	            );
	        } else if (changeMonth) {
	            return _react2['default'].createElement(
	                'div',
	                { className: 'ph-c-top-panel-container' },
	                _react2['default'].createElement(
	                    'div',
	                    { className: 'ph-c-top-panel-content' },
	                    _react2['default'].createElement(
	                        'ul',
	                        { className: 'ph-c-clearfix' },
	                        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(function (item, index) {
	                            return _react2['default'].createElement(
	                                'li',
	                                { key: index, className: 'item', onClick: _this2.setItem.bind(_this2, item, 'month') },
	                                _react2['default'].createElement(
	                                    'div',
	                                    { className: item == month ? 'active' : '' },
	                                    item + 1,
	                                    '月'
	                                )
	                            );
	                        })
	                    )
	                )
	            );
	        }
	    };
	
	    TopPanel.prototype.setItem = function setItem(data, type, evt) {
	        evt.stopPropagation();
	        evt.preventDefault();
	        var date = this.state.date;
	        if (type == 'year') {
	            date.setFullYear(data);
	            this.setState({
	                date: date,
	                changeDate: true,
	                changeYear: false,
	                changeMonth: true
	            });
	        }
	        if (type == 'month') {
	            date.setMonth(data);
	            this.props.dateChanged(date);
	            this.setState({
	                date: date,
	                changeDate: false,
	                changeYear: false,
	                changeMonth: false
	            });
	        }
	    };
	
	    TopPanel.prototype.render = function render() {
	        return _react2['default'].createElement(
	            'div',
	            { className: 'ph-c-top-panel' },
	            _react2['default'].createElement(
	                'div',
	                { className: 'ph-c-top-panel-title' },
	                this.renderTitle()
	            ),
	            this.renderContent()
	        );
	    };
	
	    return TopPanel;
	})(_react.Component);
	
	exports['default'] = TopPanel;
	module.exports = exports['default'];

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";
	
	exports.__esModule = true;
	var Utils = {
	    /**
	     * check type
	     * @param obj
	     * @param type
	     * @returns {boolean}
	     */
	    checkType: function checkType(obj, type) {
	        return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase() === type;
	    },
	    /**
	     * detach env prefix
	     * @returns {boolean}
	     */
	    isMobile: function isMobile() {
	        var isM = false;
	        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
	            isM = true;
	        }
	        return isM;
	    },
	    daysInMonth: function daysInMonth(month, year) {
	        return new Date(year, month, 0).getDate();
	    }
	};
	exports["default"] = Utils;
	module.exports = exports["default"];

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(8);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(10)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/less-loader/index.js!./style.less", function() {
				var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/less-loader/index.js!./style.less");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(9)();
	// imports
	
	
	// module
	exports.push([module.id, "body {\n  padding: 0;\n  margin: 0;\n}\n.ph-c-clearfix:before,\n.ph-c-clearfix:after {\n  display: table;\n  content: \" \";\n}\n.ph-c-clearfix:after {\n  clear: both;\n}\n.ph-c-container {\n  padding-top: 26px;\n}\n.ph-c-container ul {\n  margin: 0;\n  padding-left: 0;\n  list-style: none;\n}\n.ph-c-container p {\n  margin: 0;\n}\n.ph-c-container .ph-c-top-panel-layer {\n  position: fixed;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  background: rgba(0, 0, 0, 0.4);\n  z-index: 0;\n}\n.ph-c-container .ph-c-header-fixed {\n  box-shadow: inset 0px 3px 1px -3px rgba(115, 115, 115, 0.75);\n  position: fixed;\n  width: 100%;\n  top: 0;\n  background: #fff;\n  z-index: 1000;\n}\n.ph-c-container .ph-c-header-fixed .ph-c-week-label {\n  height: 25px;\n  box-shadow: 0px -1px 9px -1px rgba(115, 115, 115, 0.75);\n}\n.ph-c-container .ph-c-header-fixed .ph-c-week-label p {\n  display: inline-block;\n  width: 14.285%;\n  text-align: center;\n  font-size: 13px;\n}\n.ph-c-container .ph-c-header-fixed .ph-c-date {\n  padding-top: 10px;\n  padding-bottom: 10px;\n}\n.ph-c-container .ph-c-header-fixed .ph-c-date p {\n  height: 25px;\n  text-align: center;\n}\n.ph-c-container .ph-c-top-panel .ph-c-top-panel-title {\n  font-size: 15px;\n}\n.ph-c-container .ph-c-top-panel .ph-c-top-panel-container {\n  font-size: 13px;\n}\n.ph-c-container .ph-c-top-panel .ph-c-top-panel-container .ph-c-top-panel-content .item {\n  float: left;\n  width: 25%;\n  text-align: center;\n  padding-top: 3px;\n  padding-bottom: 3px;\n}\n.ph-c-container .ph-c-top-panel .ph-c-top-panel-container .ph-c-top-panel-content .item .active {\n  color: #FF6633;\n}\n.ph-c-container .ph-c-content-wrap {\n  position: fixed;\n  top: 70px;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  overflow: auto;\n  z-index: 0;\n}\n.ph-c-container .ph-c-content .ph-c-month {\n  overflow: hidden;\n}\n.ph-c-container .ph-c-content .ph-c-month .ph-c-month-title {\n  text-align: center;\n  padding-top: 10px;\n  padding-bottom: 10px;\n}\n.ph-c-container .ph-c-content .ph-c-month .ph-c-month-title p {\n  height: 25px;\n  color: #111;\n  font-size: 15px;\n}\n.ph-c-container .ph-c-content .ph-c-month:first-child .ph-c-month-title {\n  display: none;\n}\n.ph-c-container .ph-c-content .ph-c-month .ph-c-month-week-table {\n  table-layout: fixed;\n  width: 100%;\n  text-align: center;\n  border-collapse: collapse;\n}\n.ph-c-container .ph-c-content .ph-c-month .ph-c-month-week-table tr td {\n  height: 60px;\n  border: 1px solid #E1E1E1;\n  font-size: 15px;\n  vertical-align: top;\n}\n.ph-c-container .ph-c-content .ph-c-month .ph-c-month-week-table tr td .day {\n  margin-top: 10px;\n}\n.ph-c-container .ph-c-content .ph-c-month .ph-c-month-week-table tr td .event {\n  position: relative;\n  color: #FD0000;\n  margin-top: 5px;\n  font-size: 8px;\n}\n.ph-c-container .ph-c-content .ph-c-month .ph-c-month-week-table tr td .event:before {\n  content: ' ';\n  position: absolute;\n  width: 4px;\n  height: 4px;\n  border-radius: 4px;\n  left: 50%;\n  margin-left: -2px;\n  margin-top: 3px;\n  top: -6px;\n  background-color: #FD0000;\n}\n.ph-c-container .ph-c-content .ph-c-month .ph-c-month-week-table tr td .choose {\n  margin-top: 5px;\n  font-size: 10px;\n}\n.ph-c-container .ph-c-content .ph-c-month .ph-c-month-week-table tr td:first-child {\n  border-left-color: transparent;\n}\n.ph-c-container .ph-c-content .ph-c-month .ph-c-month-week-table tr td:last-child {\n  border-right-color: transparent;\n}\n.ph-c-container .ph-c-content .ph-c-month .ph-c-month-week-table tr td.day_status_pre .day,\n.ph-c-container .ph-c-content .ph-c-month .ph-c-month-week-table tr td.day_status_next .day,\n.ph-c-container .ph-c-content .ph-c-month .ph-c-month-week-table tr td.day_status_pre .week,\n.ph-c-container .ph-c-content .ph-c-month .ph-c-month-week-table tr td.day_status_next .week,\n.ph-c-container .ph-c-content .ph-c-month .ph-c-month-week-table tr td.day_status_pre .event,\n.ph-c-container .ph-c-content .ph-c-month .ph-c-month-week-table tr td.day_status_next .event {\n  display: none;\n}\n.ph-c-container .ph-c-content .ph-c-month .ph-c-month-week-table tr td.day_status_current {\n  color: #000;\n}\n.ph-c-container .ph-c-content .ph-c-month .ph-c-month-week-table tr td.choose-end,\n.ph-c-container .ph-c-content .ph-c-month .ph-c-month-week-table tr td.choose-start,\n.ph-c-container .ph-c-content .ph-c-month .ph-c-month-week-table tr td.choose-one {\n  background: #FF6633;\n  color: #ffffff;\n  border-color: #FF6633;\n}\n.ph-c-container .ph-c-content .ph-c-month .ph-c-month-week-table tr td.choose-end .event,\n.ph-c-container .ph-c-content .ph-c-month .ph-c-month-week-table tr td.choose-start .event,\n.ph-c-container .ph-c-content .ph-c-month .ph-c-month-week-table tr td.choose-one .event {\n  color: #ffffff;\n}\n.ph-c-container .ph-c-content .ph-c-month .ph-c-month-week-table tr td.choose-end .event:before,\n.ph-c-container .ph-c-content .ph-c-month .ph-c-month-week-table tr td.choose-start .event:before,\n.ph-c-container .ph-c-content .ph-c-month .ph-c-month-week-table tr td.choose-one .event:before {\n  background-color: #ffffff;\n}\n.ph-c-container .ph-c-content .ph-c-month .ph-c-month-week-table tr td.choose-between {\n  background: #FFD3C6;\n  color: #FF6633;\n}\n.ph-c-container .ph-c-content .ph-c-month .ph-c-month-week-table tr td.day_disabled {\n  color: #cccccc;\n}\n.ph-c-container .ph-c-content .ph-c-month .ph-c-month-week-table tr td.day_disabled .day,\n.ph-c-container .ph-c-content .ph-c-month .ph-c-month-week-table tr td.day_disabled .week,\n.ph-c-container .ph-c-content .ph-c-month .ph-c-month-week-table tr td.day_disabled .event {\n  color: #cccccc;\n}\n", ""]);
	
	// exports


/***/ },
/* 9 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0;
	
	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function createStyleElement() {
		var styleElement = document.createElement("style");
		var head = getHeadElement();
		styleElement.type = "text/css";
		head.appendChild(styleElement);
		return styleElement;
	}
	
	function createLinkElement() {
		var linkElement = document.createElement("link");
		var head = getHeadElement();
		linkElement.rel = "stylesheet";
		head.appendChild(linkElement);
		return linkElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement());
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement();
			update = updateLink.bind(null, styleElement);
			remove = function() {
				styleElement.parentNode.removeChild(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement();
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				styleElement.parentNode.removeChild(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}
	
	function updateLink(linkElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		var blob = new Blob([css], { type: "text/css" });
	
		var oldSrc = linkElement.href;
	
		linkElement.href = URL.createObjectURL(blob);
	
		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(12);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(10)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/less-loader/index.js!./demo.less", function() {
				var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/less-loader/index.js!./demo.less");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(9)();
	// imports
	
	
	// module
	exports.push([module.id, "", ""]);
	
	// exports


/***/ }
/******/ ])
});
;