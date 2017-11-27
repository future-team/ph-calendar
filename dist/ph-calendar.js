(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("react")) : factory(root["React"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__) {
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
	
	exports.__esModule = true;
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _TopPanel = __webpack_require__(3);
	
	var _TopPanel2 = _interopRequireDefault(_TopPanel);
	
	var _utils = __webpack_require__(5);
	
	__webpack_require__(6);
	
	var _fastclick = __webpack_require__(4);
	
	var fastclick = _interopRequireWildcard(_fastclick);
	
	// element-closest | CC0-1.0 | github.com/jonathantneal/closest
	(function (ElementProto) {
	    if (typeof ElementProto.matches !== 'function') {
	        ElementProto.matches = ElementProto.msMatchesSelector || ElementProto.mozMatchesSelector || ElementProto.webkitMatchesSelector || function matches(selector) {
	            var element = this;
	            var elements = (element.document || element.ownerDocument).querySelectorAll(selector);
	            var index = 0;
	
	            while (elements[index] && elements[index] !== element) {
	                ++index;
	            }
	
	            return Boolean(elements[index]);
	        };
	    }
	    if (typeof ElementProto.closest !== 'function') {
	        ElementProto.closest = function closest(selector) {
	            var element = this;
	
	            while (element && element.nodeType === 1) {
	                if (element.matches(selector)) {
	                    return element;
	                }
	
	                element = element.parentNode;
	            }
	
	            return null;
	        };
	    }
	})(window.Element.prototype);
	// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
	// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
	// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
	// MIT license
	(function () {
	    var lastTime = 0;
	    var vendors = ['ms', 'moz', 'webkit', 'o'];
	    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
	        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
	        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
	    }
	
	    if (!window.requestAnimationFrame) window.requestAnimationFrame = function (callback) {
	        var currTime = new Date().getTime();
	        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
	        var id = window.setTimeout(function () {
	            callback(currTime + timeToCall);
	        }, timeToCall);
	        lastTime = currTime + timeToCall;
	        return id;
	    };
	
	    if (!window.cancelAnimationFrame) window.cancelAnimationFrame = function (id) {
	        clearTimeout(id);
	    };
	})();
	
	var PhCalendar = (function (_Component) {
	    _inherits(PhCalendar, _Component);
	
	    _createClass(PhCalendar, null, [{
	        key: 'propTypes',
	        value: {
	            monthCount: _react.PropTypes.number, // 3~12
	            weekStart: _react.PropTypes.number, // 0~6
	            monthStart: _react.PropTypes.string, // ['top', 'center', 'bottom']
	            weekLabel: _react.PropTypes.array,
	            range: _react.PropTypes.bool,
	            disabled: _react.PropTypes.array,
	            values: _react.PropTypes.array,
	            format: _react.PropTypes.string,
	            events: _react2['default'].PropTypes.arrayOf(_react.PropTypes.shape({
	                date: _react.PropTypes.object,
	                name: _react.PropTypes.string
	            })),
	            dateChose: _react.PropTypes.func
	        },
	        enumerable: true
	    }, {
	        key: 'defaultProps',
	        value: {
	            format: 'yyyy-MM-dd',
	            monthCount: 6,
	            monthStart: 'top',
	            weekStart: 1,
	            weekLabel: ['日', '一', '二', '三', '四', '五', '六'],
	            range: true,
	            disabled: [],
	            values: [],
	            events: [],
	            dateChose: function dateChose() {}
	        },
	        enumerable: true
	    }]);
	
	    function PhCalendar(props, context) {
	        _classCallCheck(this, PhCalendar);
	
	        _Component.call(this, props, context);
	        var values = props.values;
	        this.screen = window.screen;
	        this.state = {
	            layer: false,
	            monthRange: this.getMonthRange(this.getDateFromValues(values)),
	            dateRange: values,
	            changeDate: false,
	            titleDate: this.getDateFromValues(values, true)
	        };
	    }
	
	    PhCalendar.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextPros) {
	        var values = nextPros.values;
	        this.setState({
	            dateRange: values,
	            titleDate: this.getDateFromValues(values, true),
	            monthRange: this.getMonthRange(this.getDateFromValues(values))
	        });
	    };
	
	    PhCalendar.prototype.componentDidMount = function componentDidMount() {
	        var _this = this;
	
	        document.addEventListener('scroll', function () {
	            _this.onScrollHandler();
	        }, false);
	        // remove click delay
	        fastclick.attach(document.body);
	        requestAnimationFrame(function () {
	            _this.initTitleDateAndScrollTop();
	        });
	    };
	
	    PhCalendar.prototype.componentDidUpdate = function componentDidUpdate() {};
	
	    // event callback
	
	    PhCalendar.prototype.dataChoseCallback = function dataChoseCallback() {
	        var _this2 = this;
	
	        var dateRange = this.state.dateRange;
	
	        dateRange = dateRange.map(function (item) {
	            return _utils.dateFormat(item, _this2.props.format);
	        });
	        this.props.dateChose(dateRange);
	    };
	
	    PhCalendar.prototype.initTitleDateAndScrollTop = function initTitleDateAndScrollTop(date) {
	        var doms = [];
	        var _state = this.state;
	        var monthRange = _state.monthRange;
	        var titleDate = _state.titleDate;
	
	        var topDate = _utils.checkType(date, 'date') ? date : titleDate;
	        var dateStr = topDate.getFullYear() + '-' + topDate.getMonth();
	        var titleIndex = null;
	        Array.prototype.forEach.call(document.getElementsByClassName('ph-c-month'), function (item, index) {
	            var title = item.getElementsByClassName('ph-c-month-title')[0];
	            var offsetTitle = item.offsetTop + title.clientHeight;
	            var offsetBottom = item.offsetTop + item.clientHeight;
	            var date = monthRange[index];
	            var yearMonth = date.getFullYear() + '-' + date.getMonth();
	            if (yearMonth === dateStr && titleIndex === null) {
	                titleIndex = index;
	            }
	            doms.push({
	                offsetTitle: offsetTitle,
	                offsetBottom: offsetBottom,
	                date: date
	            });
	        });
	        this.monthDOMArr = doms;
	        var scrollTop = 0;
	        if (titleIndex !== null) {
	            scrollTop = doms[titleIndex].offsetTitle - 70;
	        }
	        setTimeout(function () {
	            document.documentElement.scrollTop = document.body.scrollTop = scrollTop;
	        }, 10);
	    };
	
	    PhCalendar.prototype.getDateFromValues = function getDateFromValues(values, force0) {
	        var monthStart = this.props.monthStart;
	
	        var index = 0;
	        if (monthStart === 'bottom' && !force0) {
	            index = 1;
	        }
	        if (values && values.length && _utils.checkType(values[index], 'date')) {
	            return values[index];
	        }
	        return new Date();
	    };
	
	    /**
	     * 检查禁用的日期
	     * @param date
	     * @return {boolean}
	     */
	
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
	            (function () {
	                var dateStr = date.toLocaleDateString();
	                disabled.map(function (item) {
	                    if (item.toLocaleDateString() == dateStr) result = true;
	                });
	            })();
	        }
	        return result;
	    };
	
	    PhCalendar.prototype.checkEvent = function checkEvent(date) {
	        var name = '';
	        var dateString = date.toLocaleDateString();
	        this.props.events.forEach(function (item) {
	            if (item.date.toLocaleDateString() == dateString) {
	                name = item.name;
	            }
	        });
	        return name;
	    };
	
	    PhCalendar.prototype.getMonthRange = function getMonthRange(date) {
	        var month = date.getMonth();
	        var year = date.getFullYear();
	        var _props = this.props;
	        var monthCount = _props.monthCount;
	        var monthStart = _props.monthStart;
	
	        // 最小为3，最大为12
	        if (monthCount < 3 || monthCount > 12) {
	            monthCount = 6;
	        }
	        if (['top', 'center', 'bottom'].indexOf(monthStart) === -1) {
	            monthStart = 'top';
	        }
	        var start = 0;
	        switch (monthStart) {
	            case 'top':
	                start = 0;
	                break;
	            case 'center':
	                start = 1 - Math.ceil(monthCount / 2);
	                break;
	            case 'bottom':
	                start = 1 - monthCount;
	                break;
	        }
	        var arr = [];
	        for (var i = 0; i < monthCount; i++) {
	            arr.push(new Date(year, month + start));
	            start++;
	        }
	        return arr;
	    };
	
	    /**
	     * set choose date
	     * @param data
	     * @return {null}
	     */
	
	    PhCalendar.prototype.chooseDate = function chooseDate(data) {
	        var _this3 = this;
	
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
	        this.setState({
	            dateRange: dateR
	        });
	        if (!range || dateR.length == 2) {
	            requestAnimationFrame(function () {
	                _this3.dataChoseCallback();
	            });
	        }
	    };
	
	    /**
	     * @param year
	     * @param month base on 0, eg: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11
	     */
	
	    PhCalendar.prototype.renderMonth = function renderMonth(year, month) {
	        var _props2 = this.props;
	        var weekStart = _props2.weekStart;
	        var weekLabel = _props2.weekLabel;
	
	        var weekLen = weekLabel.length;
	        var firstDate = new Date(year, month, 1);
	        var lastDate = new Date(year, month + 1, 0);
	        var days = lastDate.getDate();
	        var firstDateWeek = firstDate.getDay();
	        var blank = (firstDateWeek - weekStart + weekLen) % weekLen;
	        var lines = Math.ceil((days + blank) / weekLabel.length);
	        var count = lines * weekLabel.length;
	        var daysArr = [];
	        var i = 0,
	            dateItem = firstDate;
	        dateItem.setDate(1 - blank);
	        while (i < count) {
	            var date = new Date(dateItem);
	            var item = {
	                weekLabel: weekLabel[dateItem.getDay()],
	                event: this.checkEvent(dateItem),
	                date: date,
	                day: date.getDate(),
	                week: date.getDay(),
	                month: date.getMonth(),
	                year: date.getFullYear()
	            };
	            if (i < blank) {
	                // pre month
	                item.type = 'pre';
	            } else if (i > days + blank - 1) {
	                // next month
	                item.type = 'next';
	            } else {
	                // current month
	                item.type = 'current';
	            }
	            // get style
	            item.status = this.getDayStyle(item);
	            // check disabled
	            item.disabled = this.checkDisableDate(date);
	            daysArr.push(item);
	            i++;
	            dateItem.setDate(dateItem.getDate() + 1);
	        }
	        return daysArr;
	    };
	
	    /**
	     * mark choose date style
	     * @param data
	     * @return {*}
	     */
	
	    PhCalendar.prototype.getDayStyle = function getDayStyle(data) {
	        if (['pre', 'next'].indexOf(data.type) != -1) {
	            return null;
	        }
	        var range = this.props.range;
	
	        var date = data.date;
	        var dateStr = date.toLocaleDateString();
	        var dateTime = date.getTime();
	        var chooseStart = this.state.dateRange[0];
	        var chooseEnd = this.state.dateRange[1];
	        if (!range) {
	            if (chooseStart && chooseStart.toLocaleDateString() === dateStr) {
	                return {
	                    type: 2,
	                    className: 'choose-one',
	                    text: ''
	                };
	            }
	            return null;
	        }
	
	        if (chooseStart) {
	            if (chooseStart.toLocaleDateString() === dateStr) {
	                return {
	                    type: -1,
	                    className: 'choose-start',
	                    text: '开始'
	                };
	            }
	        }
	        if (chooseEnd) {
	            if (dateStr === chooseEnd.toLocaleDateString()) {
	                return {
	                    type: 1,
	                    className: 'choose-end',
	                    text: '结束'
	                };
	            }
	            if (dateTime < chooseEnd.getTime() && dateTime > chooseStart.getTime()) {
	                return {
	                    type: 0,
	                    className: 'choose-between',
	                    text: ''
	                };
	            }
	        }
	        return null;
	    };
	
	    PhCalendar.prototype.onChooseHandler = function onChooseHandler(evt) {
	        evt.stopPropagation();
	        // deal click event
	        var dom = evt.target.closest('.day-item');
	        if (dom && dom.dataset) {
	            var dataset = dom.dataset;
	            this.chooseDate({
	                type: dataset.type,
	                date: new Date(dataset.date)
	            });
	        }
	    };
	
	    /**
	     * scroll event be listened for change title date
	     */
	
	    PhCalendar.prototype.onScrollHandler = function onScrollHandler() {
	        var _this4 = this;
	
	        if (this.timer) {
	            cancelAnimationFrame(this.timer);
	        }
	        this.timer = requestAnimationFrame(function () {
	            var monthDoms = _this4.monthDOMArr;
	            var titleDate = _this4.state.titleDate;
	            // body
	            var scrollTop = document.body.scrollTop + 70;
	            var len = monthDoms.length;
	            var currentDate = (function () {
	                for (var i = 0; i < len; i++) {
	                    if (scrollTop < monthDoms[i].offsetBottom) return monthDoms[i].date;
	                }
	            })();
	            if (titleDate.toLocaleString() != currentDate.toLocaleString()) {
	                _this4.setState({
	                    titleDate: currentDate
	                });
	            }
	        });
	    };
	
	    PhCalendar.prototype.renderDataToUlStyle = function renderDataToUlStyle(year, month) {
	        var range = this.props.range;
	        var monthArr = this.renderMonth(year, month);
	        return _react2['default'].createElement(
	            'ul',
	            { className: 'ph-c-clearfix ph-c-month-week' },
	            monthArr.map(function (dayItem, dayIndex) {
	                var style = dayItem.status;
	                var isDisabled = dayItem.disabled ? 'day_disabled' : '';
	                if (style) {
	                    return _react2['default'].createElement(
	                        'li',
	                        { key: dayIndex, 'data-type': dayItem.type, 'data-date': dayItem.date, className: 'day-item ' + style.className + ' day_status_' + dayItem.type + ' ' + isDisabled },
	                        _react2['default'].createElement(
	                            'div',
	                            { className: 'day' },
	                            dayItem.day
	                        ),
	                        dayItem.event && _react2['default'].createElement(
	                            'div',
	                            { className: 'event' },
	                            _react2['default'].createElement(
	                                'p',
	                                null,
	                                range && style.type != 0 ? '' : dayItem.event
	                            )
	                        ),
	                        range && _react2['default'].createElement(
	                            'div',
	                            { className: 'choose' },
	                            style.text
	                        )
	                    );
	                } else {
	                    return _react2['default'].createElement(
	                        'li',
	                        { key: dayIndex, 'data-type': dayItem.type, 'data-date': dayItem.date, className: 'day-item day_status_' + dayItem.type + ' ' + isDisabled },
	                        _react2['default'].createElement(
	                            'div',
	                            { className: 'day' },
	                            dayItem.day
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
	                    );
	                }
	            })
	        );
	    };
	
	    /**
	     * top panel click chang date callback
	     * @param date
	     */
	
	    PhCalendar.prototype.titleClickCallback = function titleClickCallback() {
	        // only trigger layer
	        this.setState({
	            layer: true
	        });
	    };
	
	    PhCalendar.prototype.titleDateChanged = function titleDateChanged(date) {
	        var _this5 = this;
	
	        this.setState({
	            changeDate: false,
	            monthRange: this.getMonthRange(date),
	            layer: false
	        });
	        requestAnimationFrame(function () {
	            _this5.initTitleDateAndScrollTop(date);
	        });
	    };
	
	    PhCalendar.prototype.render = function render() {
	        var _this6 = this;
	
	        var _props3 = this.props;
	        var weekStart = _props3.weekStart;
	        var weekLabel = _props3.weekLabel;
	        var _state2 = this.state;
	        var titleDate = _state2.titleDate;
	        var layer = _state2.layer;
	        var monthRange = _state2.monthRange;
	
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
	                _react2['default'].createElement(_TopPanel2['default'], { date: titleDate, dateChanged: this.titleDateChanged.bind(this), titleClick: this.titleClickCallback.bind(this) })
	            ),
	            _react2['default'].createElement(
	                'div',
	                { className: 'ph-c-content', onClick: this.onChooseHandler.bind(this) },
	                monthRange.map(function (monthItem, monthIndex) {
	                    var year = monthItem.getFullYear();
	                    var month = monthItem.getMonth();
	                    return _react2['default'].createElement(
	                        'div',
	                        { key: monthIndex, className: 'ph-c-month' },
	                        _react2['default'].createElement(
	                            'div',
	                            {
	                                className: 'ph-c-month-title' },
	                            _react2['default'].createElement(
	                                'p',
	                                null,
	                                _utils.dateFormat(monthItem, 'yyyy年MM月')
	                            )
	                        ),
	                        _react2['default'].createElement(
	                            'div',
	                            {
	                                className: 'ph-c-month-week-container' },
	                            _this6.renderDataToUlStyle(year, month)
	                        )
	                    );
	                })
	            ),
	            layer && _react2['default'].createElement('div', { className: 'ph-c-top-panel-layer' })
	        );
	    };
	
	    return PhCalendar;
	})(_react.Component);
	
	exports['default'] = PhCalendar;
	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _fastclick = __webpack_require__(4);
	
	var fastclick = _interopRequireWildcard(_fastclick);
	
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
	
	    TopPanel.prototype.componentDidMount = function componentDidMount() {
	        // remove click delay
	        fastclick.attach(document.body);
	    };
	
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
	        } else {
	            // deal click event
	            var year = parseInt(evt.target.closest('.item').dataset.year);
	            this.setItem(year, 'year');
	        }
	    };
	
	    TopPanel.prototype.changeMonthHandler = function changeMonthHandler(evt) {
	        evt.stopPropagation();
	        // deal click event
	        var month = parseInt(evt.target.closest('.item').dataset.month);
	        this.setItem(month, 'month');
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
	        var month = date.getMonth() + 1;
	        month = (month + '').length > 1 ? month : '0' + month;
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
	                    month
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
	                month,
	                '月'
	            );
	        }
	    };
	
	    TopPanel.prototype.renderContent = function renderContent() {
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
	                                { key: index, className: 'item', 'data-year': item },
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
	                    {
	                        className: 'ph-c-top-panel-content',
	                        onClick: this.changeMonthHandler.bind(this)
	                    },
	                    _react2['default'].createElement(
	                        'ul',
	                        { className: 'ph-c-clearfix' },
	                        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(function (item, index) {
	                            return _react2['default'].createElement(
	                                'li',
	                                { key: index, className: 'item', 'data-month': item },
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
	
	    TopPanel.prototype.setItem = function setItem(data, type) {
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
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;;(function () {
		'use strict';
	
		/**
		 * @preserve FastClick: polyfill to remove click delays on browsers with touch UIs.
		 *
		 * @codingstandard ftlabs-jsv2
		 * @copyright The Financial Times Limited [All Rights Reserved]
		 * @license MIT License (see LICENSE.txt)
		 */
	
		/*jslint browser:true, node:true*/
		/*global define, Event, Node*/
	
	
		/**
		 * Instantiate fast-clicking listeners on the specified layer.
		 *
		 * @constructor
		 * @param {Element} layer The layer to listen on
		 * @param {Object} [options={}] The options to override the defaults
		 */
		function FastClick(layer, options) {
			var oldOnClick;
	
			options = options || {};
	
			/**
			 * Whether a click is currently being tracked.
			 *
			 * @type boolean
			 */
			this.trackingClick = false;
	
	
			/**
			 * Timestamp for when click tracking started.
			 *
			 * @type number
			 */
			this.trackingClickStart = 0;
	
	
			/**
			 * The element being tracked for a click.
			 *
			 * @type EventTarget
			 */
			this.targetElement = null;
	
	
			/**
			 * X-coordinate of touch start event.
			 *
			 * @type number
			 */
			this.touchStartX = 0;
	
	
			/**
			 * Y-coordinate of touch start event.
			 *
			 * @type number
			 */
			this.touchStartY = 0;
	
	
			/**
			 * ID of the last touch, retrieved from Touch.identifier.
			 *
			 * @type number
			 */
			this.lastTouchIdentifier = 0;
	
	
			/**
			 * Touchmove boundary, beyond which a click will be cancelled.
			 *
			 * @type number
			 */
			this.touchBoundary = options.touchBoundary || 10;
	
	
			/**
			 * The FastClick layer.
			 *
			 * @type Element
			 */
			this.layer = layer;
	
			/**
			 * The minimum time between tap(touchstart and touchend) events
			 *
			 * @type number
			 */
			this.tapDelay = options.tapDelay || 200;
	
			/**
			 * The maximum time for a tap
			 *
			 * @type number
			 */
			this.tapTimeout = options.tapTimeout || 700;
	
			if (FastClick.notNeeded(layer)) {
				return;
			}
	
			// Some old versions of Android don't have Function.prototype.bind
			function bind(method, context) {
				return function() { return method.apply(context, arguments); };
			}
	
	
			var methods = ['onMouse', 'onClick', 'onTouchStart', 'onTouchMove', 'onTouchEnd', 'onTouchCancel'];
			var context = this;
			for (var i = 0, l = methods.length; i < l; i++) {
				context[methods[i]] = bind(context[methods[i]], context);
			}
	
			// Set up event handlers as required
			if (deviceIsAndroid) {
				layer.addEventListener('mouseover', this.onMouse, true);
				layer.addEventListener('mousedown', this.onMouse, true);
				layer.addEventListener('mouseup', this.onMouse, true);
			}
	
			layer.addEventListener('click', this.onClick, true);
			layer.addEventListener('touchstart', this.onTouchStart, false);
			layer.addEventListener('touchmove', this.onTouchMove, false);
			layer.addEventListener('touchend', this.onTouchEnd, false);
			layer.addEventListener('touchcancel', this.onTouchCancel, false);
	
			// Hack is required for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
			// which is how FastClick normally stops click events bubbling to callbacks registered on the FastClick
			// layer when they are cancelled.
			if (!Event.prototype.stopImmediatePropagation) {
				layer.removeEventListener = function(type, callback, capture) {
					var rmv = Node.prototype.removeEventListener;
					if (type === 'click') {
						rmv.call(layer, type, callback.hijacked || callback, capture);
					} else {
						rmv.call(layer, type, callback, capture);
					}
				};
	
				layer.addEventListener = function(type, callback, capture) {
					var adv = Node.prototype.addEventListener;
					if (type === 'click') {
						adv.call(layer, type, callback.hijacked || (callback.hijacked = function(event) {
							if (!event.propagationStopped) {
								callback(event);
							}
						}), capture);
					} else {
						adv.call(layer, type, callback, capture);
					}
				};
			}
	
			// If a handler is already declared in the element's onclick attribute, it will be fired before
			// FastClick's onClick handler. Fix this by pulling out the user-defined handler function and
			// adding it as listener.
			if (typeof layer.onclick === 'function') {
	
				// Android browser on at least 3.2 requires a new reference to the function in layer.onclick
				// - the old one won't work if passed to addEventListener directly.
				oldOnClick = layer.onclick;
				layer.addEventListener('click', function(event) {
					oldOnClick(event);
				}, false);
				layer.onclick = null;
			}
		}
	
		/**
		* Windows Phone 8.1 fakes user agent string to look like Android and iPhone.
		*
		* @type boolean
		*/
		var deviceIsWindowsPhone = navigator.userAgent.indexOf("Windows Phone") >= 0;
	
		/**
		 * Android requires exceptions.
		 *
		 * @type boolean
		 */
		var deviceIsAndroid = navigator.userAgent.indexOf('Android') > 0 && !deviceIsWindowsPhone;
	
	
		/**
		 * iOS requires exceptions.
		 *
		 * @type boolean
		 */
		var deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent) && !deviceIsWindowsPhone;
	
	
		/**
		 * iOS 4 requires an exception for select elements.
		 *
		 * @type boolean
		 */
		var deviceIsIOS4 = deviceIsIOS && (/OS 4_\d(_\d)?/).test(navigator.userAgent);
	
	
		/**
		 * iOS 6.0-7.* requires the target element to be manually derived
		 *
		 * @type boolean
		 */
		var deviceIsIOSWithBadTarget = deviceIsIOS && (/OS [6-7]_\d/).test(navigator.userAgent);
	
		/**
		 * BlackBerry requires exceptions.
		 *
		 * @type boolean
		 */
		var deviceIsBlackBerry10 = navigator.userAgent.indexOf('BB10') > 0;
	
		/**
		 * Determine whether a given element requires a native click.
		 *
		 * @param {EventTarget|Element} target Target DOM element
		 * @returns {boolean} Returns true if the element needs a native click
		 */
		FastClick.prototype.needsClick = function(target) {
			switch (target.nodeName.toLowerCase()) {
	
			// Don't send a synthetic click to disabled inputs (issue #62)
			case 'button':
			case 'select':
			case 'textarea':
				if (target.disabled) {
					return true;
				}
	
				break;
			case 'input':
	
				// File inputs need real clicks on iOS 6 due to a browser bug (issue #68)
				if ((deviceIsIOS && target.type === 'file') || target.disabled) {
					return true;
				}
	
				break;
			case 'label':
			case 'iframe': // iOS8 homescreen apps can prevent events bubbling into frames
			case 'video':
				return true;
			}
	
			return (/\bneedsclick\b/).test(target.className);
		};
	
	
		/**
		 * Determine whether a given element requires a call to focus to simulate click into element.
		 *
		 * @param {EventTarget|Element} target Target DOM element
		 * @returns {boolean} Returns true if the element requires a call to focus to simulate native click.
		 */
		FastClick.prototype.needsFocus = function(target) {
			switch (target.nodeName.toLowerCase()) {
			case 'textarea':
				return true;
			case 'select':
				return !deviceIsAndroid;
			case 'input':
				switch (target.type) {
				case 'button':
				case 'checkbox':
				case 'file':
				case 'image':
				case 'radio':
				case 'submit':
					return false;
				}
	
				// No point in attempting to focus disabled inputs
				return !target.disabled && !target.readOnly;
			default:
				return (/\bneedsfocus\b/).test(target.className);
			}
		};
	
	
		/**
		 * Send a click event to the specified element.
		 *
		 * @param {EventTarget|Element} targetElement
		 * @param {Event} event
		 */
		FastClick.prototype.sendClick = function(targetElement, event) {
			var clickEvent, touch;
	
			// On some Android devices activeElement needs to be blurred otherwise the synthetic click will have no effect (#24)
			if (document.activeElement && document.activeElement !== targetElement) {
				document.activeElement.blur();
			}
	
			touch = event.changedTouches[0];
	
			// Synthesise a click event, with an extra attribute so it can be tracked
			clickEvent = document.createEvent('MouseEvents');
			clickEvent.initMouseEvent(this.determineEventType(targetElement), true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
			clickEvent.forwardedTouchEvent = true;
			targetElement.dispatchEvent(clickEvent);
		};
	
		FastClick.prototype.determineEventType = function(targetElement) {
	
			//Issue #159: Android Chrome Select Box does not open with a synthetic click event
			if (deviceIsAndroid && targetElement.tagName.toLowerCase() === 'select') {
				return 'mousedown';
			}
	
			return 'click';
		};
	
	
		/**
		 * @param {EventTarget|Element} targetElement
		 */
		FastClick.prototype.focus = function(targetElement) {
			var length;
	
			// Issue #160: on iOS 7, some input elements (e.g. date datetime month) throw a vague TypeError on setSelectionRange. These elements don't have an integer value for the selectionStart and selectionEnd properties, but unfortunately that can't be used for detection because accessing the properties also throws a TypeError. Just check the type instead. Filed as Apple bug #15122724.
			if (deviceIsIOS && targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time' && targetElement.type !== 'month') {
				length = targetElement.value.length;
				targetElement.setSelectionRange(length, length);
			} else {
				targetElement.focus();
			}
		};
	
	
		/**
		 * Check whether the given target element is a child of a scrollable layer and if so, set a flag on it.
		 *
		 * @param {EventTarget|Element} targetElement
		 */
		FastClick.prototype.updateScrollParent = function(targetElement) {
			var scrollParent, parentElement;
	
			scrollParent = targetElement.fastClickScrollParent;
	
			// Attempt to discover whether the target element is contained within a scrollable layer. Re-check if the
			// target element was moved to another parent.
			if (!scrollParent || !scrollParent.contains(targetElement)) {
				parentElement = targetElement;
				do {
					if (parentElement.scrollHeight > parentElement.offsetHeight) {
						scrollParent = parentElement;
						targetElement.fastClickScrollParent = parentElement;
						break;
					}
	
					parentElement = parentElement.parentElement;
				} while (parentElement);
			}
	
			// Always update the scroll top tracker if possible.
			if (scrollParent) {
				scrollParent.fastClickLastScrollTop = scrollParent.scrollTop;
			}
		};
	
	
		/**
		 * @param {EventTarget} targetElement
		 * @returns {Element|EventTarget}
		 */
		FastClick.prototype.getTargetElementFromEventTarget = function(eventTarget) {
	
			// On some older browsers (notably Safari on iOS 4.1 - see issue #56) the event target may be a text node.
			if (eventTarget.nodeType === Node.TEXT_NODE) {
				return eventTarget.parentNode;
			}
	
			return eventTarget;
		};
	
	
		/**
		 * On touch start, record the position and scroll offset.
		 *
		 * @param {Event} event
		 * @returns {boolean}
		 */
		FastClick.prototype.onTouchStart = function(event) {
			var targetElement, touch, selection;
	
			// Ignore multiple touches, otherwise pinch-to-zoom is prevented if both fingers are on the FastClick element (issue #111).
			if (event.targetTouches.length > 1) {
				return true;
			}
	
			targetElement = this.getTargetElementFromEventTarget(event.target);
			touch = event.targetTouches[0];
	
			if (deviceIsIOS) {
	
				// Only trusted events will deselect text on iOS (issue #49)
				selection = window.getSelection();
				if (selection.rangeCount && !selection.isCollapsed) {
					return true;
				}
	
				if (!deviceIsIOS4) {
	
					// Weird things happen on iOS when an alert or confirm dialog is opened from a click event callback (issue #23):
					// when the user next taps anywhere else on the page, new touchstart and touchend events are dispatched
					// with the same identifier as the touch event that previously triggered the click that triggered the alert.
					// Sadly, there is an issue on iOS 4 that causes some normal touch events to have the same identifier as an
					// immediately preceeding touch event (issue #52), so this fix is unavailable on that platform.
					// Issue 120: touch.identifier is 0 when Chrome dev tools 'Emulate touch events' is set with an iOS device UA string,
					// which causes all touch events to be ignored. As this block only applies to iOS, and iOS identifiers are always long,
					// random integers, it's safe to to continue if the identifier is 0 here.
					if (touch.identifier && touch.identifier === this.lastTouchIdentifier) {
						event.preventDefault();
						return false;
					}
	
					this.lastTouchIdentifier = touch.identifier;
	
					// If the target element is a child of a scrollable layer (using -webkit-overflow-scrolling: touch) and:
					// 1) the user does a fling scroll on the scrollable layer
					// 2) the user stops the fling scroll with another tap
					// then the event.target of the last 'touchend' event will be the element that was under the user's finger
					// when the fling scroll was started, causing FastClick to send a click event to that layer - unless a check
					// is made to ensure that a parent layer was not scrolled before sending a synthetic click (issue #42).
					this.updateScrollParent(targetElement);
				}
			}
	
			this.trackingClick = true;
			this.trackingClickStart = event.timeStamp;
			this.targetElement = targetElement;
	
			this.touchStartX = touch.pageX;
			this.touchStartY = touch.pageY;
	
			// Prevent phantom clicks on fast double-tap (issue #36)
			if ((event.timeStamp - this.lastClickTime) < this.tapDelay) {
				event.preventDefault();
			}
	
			return true;
		};
	
	
		/**
		 * Based on a touchmove event object, check whether the touch has moved past a boundary since it started.
		 *
		 * @param {Event} event
		 * @returns {boolean}
		 */
		FastClick.prototype.touchHasMoved = function(event) {
			var touch = event.changedTouches[0], boundary = this.touchBoundary;
	
			if (Math.abs(touch.pageX - this.touchStartX) > boundary || Math.abs(touch.pageY - this.touchStartY) > boundary) {
				return true;
			}
	
			return false;
		};
	
	
		/**
		 * Update the last position.
		 *
		 * @param {Event} event
		 * @returns {boolean}
		 */
		FastClick.prototype.onTouchMove = function(event) {
			if (!this.trackingClick) {
				return true;
			}
	
			// If the touch has moved, cancel the click tracking
			if (this.targetElement !== this.getTargetElementFromEventTarget(event.target) || this.touchHasMoved(event)) {
				this.trackingClick = false;
				this.targetElement = null;
			}
	
			return true;
		};
	
	
		/**
		 * Attempt to find the labelled control for the given label element.
		 *
		 * @param {EventTarget|HTMLLabelElement} labelElement
		 * @returns {Element|null}
		 */
		FastClick.prototype.findControl = function(labelElement) {
	
			// Fast path for newer browsers supporting the HTML5 control attribute
			if (labelElement.control !== undefined) {
				return labelElement.control;
			}
	
			// All browsers under test that support touch events also support the HTML5 htmlFor attribute
			if (labelElement.htmlFor) {
				return document.getElementById(labelElement.htmlFor);
			}
	
			// If no for attribute exists, attempt to retrieve the first labellable descendant element
			// the list of which is defined here: http://www.w3.org/TR/html5/forms.html#category-label
			return labelElement.querySelector('button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea');
		};
	
	
		/**
		 * On touch end, determine whether to send a click event at once.
		 *
		 * @param {Event} event
		 * @returns {boolean}
		 */
		FastClick.prototype.onTouchEnd = function(event) {
			var forElement, trackingClickStart, targetTagName, scrollParent, touch, targetElement = this.targetElement;
	
			if (!this.trackingClick) {
				return true;
			}
	
			// Prevent phantom clicks on fast double-tap (issue #36)
			if ((event.timeStamp - this.lastClickTime) < this.tapDelay) {
				this.cancelNextClick = true;
				return true;
			}
	
			if ((event.timeStamp - this.trackingClickStart) > this.tapTimeout) {
				return true;
			}
	
			// Reset to prevent wrong click cancel on input (issue #156).
			this.cancelNextClick = false;
	
			this.lastClickTime = event.timeStamp;
	
			trackingClickStart = this.trackingClickStart;
			this.trackingClick = false;
			this.trackingClickStart = 0;
	
			// On some iOS devices, the targetElement supplied with the event is invalid if the layer
			// is performing a transition or scroll, and has to be re-detected manually. Note that
			// for this to function correctly, it must be called *after* the event target is checked!
			// See issue #57; also filed as rdar://13048589 .
			if (deviceIsIOSWithBadTarget) {
				touch = event.changedTouches[0];
	
				// In certain cases arguments of elementFromPoint can be negative, so prevent setting targetElement to null
				targetElement = document.elementFromPoint(touch.pageX - window.pageXOffset, touch.pageY - window.pageYOffset) || targetElement;
				targetElement.fastClickScrollParent = this.targetElement.fastClickScrollParent;
			}
	
			targetTagName = targetElement.tagName.toLowerCase();
			if (targetTagName === 'label') {
				forElement = this.findControl(targetElement);
				if (forElement) {
					this.focus(targetElement);
					if (deviceIsAndroid) {
						return false;
					}
	
					targetElement = forElement;
				}
			} else if (this.needsFocus(targetElement)) {
	
				// Case 1: If the touch started a while ago (best guess is 100ms based on tests for issue #36) then focus will be triggered anyway. Return early and unset the target element reference so that the subsequent click will be allowed through.
				// Case 2: Without this exception for input elements tapped when the document is contained in an iframe, then any inputted text won't be visible even though the value attribute is updated as the user types (issue #37).
				if ((event.timeStamp - trackingClickStart) > 100 || (deviceIsIOS && window.top !== window && targetTagName === 'input')) {
					this.targetElement = null;
					return false;
				}
	
				this.focus(targetElement);
				this.sendClick(targetElement, event);
	
				// Select elements need the event to go through on iOS 4, otherwise the selector menu won't open.
				// Also this breaks opening selects when VoiceOver is active on iOS6, iOS7 (and possibly others)
				if (!deviceIsIOS || targetTagName !== 'select') {
					this.targetElement = null;
					event.preventDefault();
				}
	
				return false;
			}
	
			if (deviceIsIOS && !deviceIsIOS4) {
	
				// Don't send a synthetic click event if the target element is contained within a parent layer that was scrolled
				// and this tap is being used to stop the scrolling (usually initiated by a fling - issue #42).
				scrollParent = targetElement.fastClickScrollParent;
				if (scrollParent && scrollParent.fastClickLastScrollTop !== scrollParent.scrollTop) {
					return true;
				}
			}
	
			// Prevent the actual click from going though - unless the target node is marked as requiring
			// real clicks or if it is in the whitelist in which case only non-programmatic clicks are permitted.
			if (!this.needsClick(targetElement)) {
				event.preventDefault();
				this.sendClick(targetElement, event);
			}
	
			return false;
		};
	
	
		/**
		 * On touch cancel, stop tracking the click.
		 *
		 * @returns {void}
		 */
		FastClick.prototype.onTouchCancel = function() {
			this.trackingClick = false;
			this.targetElement = null;
		};
	
	
		/**
		 * Determine mouse events which should be permitted.
		 *
		 * @param {Event} event
		 * @returns {boolean}
		 */
		FastClick.prototype.onMouse = function(event) {
	
			// If a target element was never set (because a touch event was never fired) allow the event
			if (!this.targetElement) {
				return true;
			}
	
			if (event.forwardedTouchEvent) {
				return true;
			}
	
			// Programmatically generated events targeting a specific element should be permitted
			if (!event.cancelable) {
				return true;
			}
	
			// Derive and check the target element to see whether the mouse event needs to be permitted;
			// unless explicitly enabled, prevent non-touch click events from triggering actions,
			// to prevent ghost/doubleclicks.
			if (!this.needsClick(this.targetElement) || this.cancelNextClick) {
	
				// Prevent any user-added listeners declared on FastClick element from being fired.
				if (event.stopImmediatePropagation) {
					event.stopImmediatePropagation();
				} else {
	
					// Part of the hack for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
					event.propagationStopped = true;
				}
	
				// Cancel the event
				event.stopPropagation();
				event.preventDefault();
	
				return false;
			}
	
			// If the mouse event is permitted, return true for the action to go through.
			return true;
		};
	
	
		/**
		 * On actual clicks, determine whether this is a touch-generated click, a click action occurring
		 * naturally after a delay after a touch (which needs to be cancelled to avoid duplication), or
		 * an actual click which should be permitted.
		 *
		 * @param {Event} event
		 * @returns {boolean}
		 */
		FastClick.prototype.onClick = function(event) {
			var permitted;
	
			// It's possible for another FastClick-like library delivered with third-party code to fire a click event before FastClick does (issue #44). In that case, set the click-tracking flag back to false and return early. This will cause onTouchEnd to return early.
			if (this.trackingClick) {
				this.targetElement = null;
				this.trackingClick = false;
				return true;
			}
	
			// Very odd behaviour on iOS (issue #18): if a submit element is present inside a form and the user hits enter in the iOS simulator or clicks the Go button on the pop-up OS keyboard the a kind of 'fake' click event will be triggered with the submit-type input element as the target.
			if (event.target.type === 'submit' && event.detail === 0) {
				return true;
			}
	
			permitted = this.onMouse(event);
	
			// Only unset targetElement if the click is not permitted. This will ensure that the check for !targetElement in onMouse fails and the browser's click doesn't go through.
			if (!permitted) {
				this.targetElement = null;
			}
	
			// If clicks are permitted, return true for the action to go through.
			return permitted;
		};
	
	
		/**
		 * Remove all FastClick's event listeners.
		 *
		 * @returns {void}
		 */
		FastClick.prototype.destroy = function() {
			var layer = this.layer;
	
			if (deviceIsAndroid) {
				layer.removeEventListener('mouseover', this.onMouse, true);
				layer.removeEventListener('mousedown', this.onMouse, true);
				layer.removeEventListener('mouseup', this.onMouse, true);
			}
	
			layer.removeEventListener('click', this.onClick, true);
			layer.removeEventListener('touchstart', this.onTouchStart, false);
			layer.removeEventListener('touchmove', this.onTouchMove, false);
			layer.removeEventListener('touchend', this.onTouchEnd, false);
			layer.removeEventListener('touchcancel', this.onTouchCancel, false);
		};
	
	
		/**
		 * Check whether FastClick is needed.
		 *
		 * @param {Element} layer The layer to listen on
		 */
		FastClick.notNeeded = function(layer) {
			var metaViewport;
			var chromeVersion;
			var blackberryVersion;
			var firefoxVersion;
	
			// Devices that don't support touch don't need FastClick
			if (typeof window.ontouchstart === 'undefined') {
				return true;
			}
	
			// Chrome version - zero for other browsers
			chromeVersion = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [,0])[1];
	
			if (chromeVersion) {
	
				if (deviceIsAndroid) {
					metaViewport = document.querySelector('meta[name=viewport]');
	
					if (metaViewport) {
						// Chrome on Android with user-scalable="no" doesn't need FastClick (issue #89)
						if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
							return true;
						}
						// Chrome 32 and above with width=device-width or less don't need FastClick
						if (chromeVersion > 31 && document.documentElement.scrollWidth <= window.outerWidth) {
							return true;
						}
					}
	
				// Chrome desktop doesn't need FastClick (issue #15)
				} else {
					return true;
				}
			}
	
			if (deviceIsBlackBerry10) {
				blackberryVersion = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/);
	
				// BlackBerry 10.3+ does not require Fastclick library.
				// https://github.com/ftlabs/fastclick/issues/251
				if (blackberryVersion[1] >= 10 && blackberryVersion[2] >= 3) {
					metaViewport = document.querySelector('meta[name=viewport]');
	
					if (metaViewport) {
						// user-scalable=no eliminates click delay.
						if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
							return true;
						}
						// width=device-width (or less than device-width) eliminates click delay.
						if (document.documentElement.scrollWidth <= window.outerWidth) {
							return true;
						}
					}
				}
			}
	
			// IE10 with -ms-touch-action: none or manipulation, which disables double-tap-to-zoom (issue #97)
			if (layer.style.msTouchAction === 'none' || layer.style.touchAction === 'manipulation') {
				return true;
			}
	
			// Firefox version - zero for other browsers
			firefoxVersion = +(/Firefox\/([0-9]+)/.exec(navigator.userAgent) || [,0])[1];
	
			if (firefoxVersion >= 27) {
				// Firefox 27+ does not have tap delay if the content is not zoomable - https://bugzilla.mozilla.org/show_bug.cgi?id=922896
	
				metaViewport = document.querySelector('meta[name=viewport]');
				if (metaViewport && (metaViewport.content.indexOf('user-scalable=no') !== -1 || document.documentElement.scrollWidth <= window.outerWidth)) {
					return true;
				}
			}
	
			// IE11: prefixed -ms-touch-action is no longer supported and it's recomended to use non-prefixed version
			// http://msdn.microsoft.com/en-us/library/windows/apps/Hh767313.aspx
			if (layer.style.touchAction === 'none' || layer.style.touchAction === 'manipulation') {
				return true;
			}
	
			return false;
		};
	
	
		/**
		 * Factory method for creating a FastClick object
		 *
		 * @param {Element} layer The layer to listen on
		 * @param {Object} [options={}] The options to override the defaults
		 */
		FastClick.attach = function(layer, options) {
			return new FastClick(layer, options);
		};
	
	
		if (true) {
	
			// AMD. Register as an anonymous module.
			!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
				return FastClick;
			}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else if (typeof module !== 'undefined' && module.exports) {
			module.exports = FastClick.attach;
			module.exports.FastClick = FastClick;
		} else {
			window.FastClick = FastClick;
		}
	}());


/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';
	
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
	    },
	    /**
	     * 对Date的扩展，将 Date 转化为指定格式的String
	     * 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q) 可以用 1-2 个占位符
	     * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
	     * eg:
	     * (new Date()).pattern('yyyy-MM-dd hh:mm:ss.S') ==> 2007-07-02 08:09:04.423
	     * (new Date()).pattern('yyyy-MM-dd E HH:mm:ss') ==> 2007-03-10 二 20:09:04
	     * (new Date()).pattern('yyyy-MM-dd EE hh:mm:ss') ==> 2007-03-10 周二 08:09:04
	     * (new Date()).pattern('yyyy-MM-dd EEE hh:mm:ss') ==> 2007-03-10 星期二 08:09:04
	     * (new Date()).pattern('yyyy-M-d h:m:s.S') ==> 2007-7-2 8:9:4.18
	     */
	    dateFormat: function dateFormat(date, fmt) {
	        if (!this.checkType(date, 'date')) return '';
	        var o = {
	            'M+': date.getMonth() + 1,
	            //月份
	            'd+': date.getDate(),
	            //日
	            'h+': date.getHours() % 12 == 0 ? 12 : date.getHours() % 12,
	            //小时
	            'H+': date.getHours(),
	            //小时
	            'm+': date.getMinutes(),
	            //分
	            's+': date.getSeconds(),
	            //秒
	            'q+': Math.floor((date.getMonth() + 3) / 3),
	            //季度
	            'S': date.getMilliseconds() //毫秒
	        };
	        var week = {
	            '0': '日',
	            '1': '一',
	            '2': '二',
	            '3': '三',
	            '4': '四',
	            '5': '五',
	            '6': '六'
	        };
	        if (/(y+)/.test(fmt)) {
	            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
	        }
	        if (/(E+)/.test(fmt)) {
	            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length > 1 ? RegExp.$1.length > 2 ? '星期' : '周' : '') + week[date.getDay() + '']);
	        }
	        for (var k in o) {
	            if (new RegExp('(' + k + ')').test(fmt)) {
	                fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
	            }
	        }
	        return fmt;
	    }
	};
	exports['default'] = Utils;
	module.exports = exports['default'];

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(7);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(9)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/less-loader/index.js!./style.less", function() {
				var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/less-loader/index.js!./style.less");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(8)();
	// imports
	
	
	// module
	exports.push([module.id, "* {\n  -webkit-touch-callout: none;\n  /* prevent callout to copy image, etc when tap to hold */\n  -webkit-text-size-adjust: none;\n  /* prevent webkit from resizing text to fit */\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n  /* prevent tap highlight color / shadow */\n  -webkit-user-select: none;\n  /* prevent copy paste, to allow, change 'none' to 'text' */\n}\nhtml,\nbody {\n  touch-action: manipulation;\n}\nbody {\n  padding: 0;\n  margin: 0;\n}\n.ph-c-clearfix:before,\n.ph-c-clearfix:after {\n  display: table;\n  content: \" \";\n}\n.ph-c-clearfix:after {\n  clear: both;\n}\n.ph-c-container {\n  padding-top: 70px;\n}\n.ph-c-container ul {\n  margin: 0;\n  padding-left: 0;\n  list-style: none;\n}\n.ph-c-container p {\n  margin: 0;\n}\n.ph-c-container .ph-c-top-panel-layer {\n  position: fixed;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  background: rgba(0, 0, 0, 0.4);\n  z-index: 0;\n}\n.ph-c-container .ph-c-header-fixed {\n  box-shadow: inset 0px 3px 1px -3px rgba(115, 115, 115, 0.75);\n  position: fixed;\n  width: 100%;\n  top: 0;\n  background: #fff;\n  z-index: 1000;\n}\n.ph-c-container .ph-c-header-fixed .ph-c-week-label {\n  height: 25px;\n  box-shadow: 0px -1px 9px -1px rgba(115, 115, 115, 0.75);\n}\n.ph-c-container .ph-c-header-fixed .ph-c-week-label p {\n  display: inline-block;\n  width: 14.285%;\n  text-align: center;\n  font-size: 13px;\n}\n.ph-c-container .ph-c-top-panel {\n  padding-top: 10px;\n  padding-bottom: 10px;\n}\n.ph-c-container .ph-c-top-panel p {\n  height: 25px;\n  text-align: center;\n}\n.ph-c-container .ph-c-top-panel .ph-c-top-panel-title {\n  font-size: 15px;\n}\n.ph-c-container .ph-c-top-panel .ph-c-top-panel-container {\n  font-size: 13px;\n}\n.ph-c-container .ph-c-top-panel .ph-c-top-panel-container .ph-c-top-panel-content .item {\n  float: left;\n  width: 25%;\n  text-align: center;\n  padding-top: 3px;\n  padding-bottom: 3px;\n}\n.ph-c-container .ph-c-top-panel .ph-c-top-panel-container .ph-c-top-panel-content .item .active {\n  color: #FF6633;\n}\n.ph-c-container .ph-c-content .ph-c-month {\n  overflow: hidden;\n}\n.ph-c-container .ph-c-content .ph-c-month .ph-c-month-title {\n  text-align: center;\n  padding-top: 10px;\n  padding-bottom: 10px;\n}\n.ph-c-container .ph-c-content .ph-c-month .ph-c-month-title p {\n  height: 25px;\n  color: #111;\n  font-size: 15px;\n}\n.ph-c-container .ph-c-content .ph-c-month:first-child .ph-c-month-title {\n  display: none;\n}\n.ph-c-container .ph-c-content .ph-c-month .ph-c-month-week {\n  border-top: 1px solid #E1E1E1;\n  margin-right: -1px;\n}\n.ph-c-container .ph-c-content .ph-c-month .ph-c-month-week li {\n  float: left;\n  font-size: 15px;\n  width: 14.285%;\n  height: 60px;\n  text-align: center;\n  border: 1px solid transparent;\n  border-right-color: #E1E1E1;\n  border-bottom-color: #E1E1E1;\n  box-sizing: border-box;\n  overflow: hidden;\n}\n.ph-c-container .ph-c-content .ph-c-month .ph-c-month-week li .day {\n  margin-top: 10px;\n}\n.ph-c-container .ph-c-content .ph-c-month .ph-c-month-week li .event {\n  position: relative;\n  color: #FD0000;\n  margin-top: 5px;\n  font-size: 8px;\n}\n.ph-c-container .ph-c-content .ph-c-month .ph-c-month-week li .event:before {\n  content: ' ';\n  position: absolute;\n  width: 4px;\n  height: 4px;\n  border-radius: 4px;\n  left: 50%;\n  margin-left: -2px;\n  margin-top: 3px;\n  top: -6px;\n  background-color: #FD0000;\n}\n.ph-c-container .ph-c-content .ph-c-month .ph-c-month-week li .choose {\n  margin-top: 5px;\n  font-size: 10px;\n}\n.ph-c-container .ph-c-content .ph-c-month .ph-c-month-week li:first-child {\n  border-left-color: transparent;\n}\n.ph-c-container .ph-c-content .ph-c-month .ph-c-month-week li:last-child {\n  border-right-color: transparent;\n}\n.ph-c-container .ph-c-content .ph-c-month .ph-c-month-week li.day_status_pre .day,\n.ph-c-container .ph-c-content .ph-c-month .ph-c-month-week li.day_status_next .day,\n.ph-c-container .ph-c-content .ph-c-month .ph-c-month-week li.day_status_pre .week,\n.ph-c-container .ph-c-content .ph-c-month .ph-c-month-week li.day_status_next .week,\n.ph-c-container .ph-c-content .ph-c-month .ph-c-month-week li.day_status_pre .event,\n.ph-c-container .ph-c-content .ph-c-month .ph-c-month-week li.day_status_next .event {\n  display: none;\n}\n.ph-c-container .ph-c-content .ph-c-month .ph-c-month-week li.day_status_current {\n  color: #000;\n}\n.ph-c-container .ph-c-content .ph-c-month .ph-c-month-week li.choose-end,\n.ph-c-container .ph-c-content .ph-c-month .ph-c-month-week li.choose-start,\n.ph-c-container .ph-c-content .ph-c-month .ph-c-month-week li.choose-one {\n  background: #FF6633;\n  color: #ffffff;\n  border-color: #FF6633;\n}\n.ph-c-container .ph-c-content .ph-c-month .ph-c-month-week li.choose-end .event,\n.ph-c-container .ph-c-content .ph-c-month .ph-c-month-week li.choose-start .event,\n.ph-c-container .ph-c-content .ph-c-month .ph-c-month-week li.choose-one .event {\n  color: #ffffff;\n}\n.ph-c-container .ph-c-content .ph-c-month .ph-c-month-week li.choose-end .event:before,\n.ph-c-container .ph-c-content .ph-c-month .ph-c-month-week li.choose-start .event:before,\n.ph-c-container .ph-c-content .ph-c-month .ph-c-month-week li.choose-one .event:before {\n  background-color: #ffffff;\n}\n.ph-c-container .ph-c-content .ph-c-month .ph-c-month-week li.choose-between {\n  background: #FFD3C6;\n  color: #FF6633;\n}\n.ph-c-container .ph-c-content .ph-c-month .ph-c-month-week li.day_disabled {\n  color: #cccccc;\n}\n.ph-c-container .ph-c-content .ph-c-month .ph-c-month-week li.day_disabled .day,\n.ph-c-container .ph-c-content .ph-c-month .ph-c-month-week li.day_disabled .week,\n.ph-c-container .ph-c-content .ph-c-month .ph-c-month-week li.day_disabled .event {\n  color: #cccccc;\n}\n", ""]);
	
	// exports


/***/ },
/* 8 */
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
/* 9 */
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


/***/ }
/******/ ])
});
;