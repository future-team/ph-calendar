'use strict';

exports.__esModule = true;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _TopPanel = require('./TopPanel');

var _TopPanel2 = _interopRequireDefault(_TopPanel);

var _utils = require('./utils');

require('./less/style.less');

var _fastclick = require('fastclick');

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
            monthCount: _react.PropTypes.number,
            weekStart: _react.PropTypes.number,
            weekLabel: _react.PropTypes.array,
            range: _react.PropTypes.bool, // 是否支持范围选择
            disabled: _react.PropTypes.array, // 如果是恰好两个值，则表示是范围([null, date]表示什么时间之前，[date, null]表示什么时间之后，[date,date]表示区间)，一个或者多个则表示是单点禁用
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
            monthCount: 6, // 渲染头部年月的前后一年的时间
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
        // 标记当前可视的为monthRange的第一个
        this.screen = window.screen;
        var monthRange = this.getMonthRange(this.getCenterDateByValues(values));
        this.state = {
            layer: false,
            monthRange: monthRange, // 月份的列表
            dateRange: values, // 选择日期的范围,如果是只有一个，则默认是单选了
            changeDate: false,
            titleDate: monthRange[0]
        };
    }

    PhCalendar.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextPros) {
        var values = nextPros.values;
        var monthRange = this.getMonthRange(this.getCenterDateByValues(values));
        this.setState({
            dateRange: values,
            titleDate: monthRange[0],
            monthRange: monthRange
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

    // event callback

    PhCalendar.prototype.dataChoseCallback = function dataChoseCallback() {
        var _this2 = this;

        var dateRange = this.state.dateRange;

        dateRange = dateRange.map(function (item) {
            return _utils.dateFormat(item, _this2.props.format);
        });
        this.props.dateChose(dateRange);
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
    };

    PhCalendar.prototype.getCenterDateByValues = function getCenterDateByValues(values) {
        if (values.length && _utils.checkType(values[0], 'date')) {
            return values[0];
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
        var count = this.props.monthCount;
        // 最小为3，最大为12
        if (count < 3 || count > 12) {
            count = 6;
        }
        var middle = Math.ceil(count / 2);
        var arr = [];
        for (var i = 1 - middle; i < middle; i++) {
            arr.push(new Date(year, month + i));
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
        var _props = this.props;
        var weekStart = _props.weekStart;
        var weekLabel = _props.weekLabel;

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
            if (dateTime < chooseEnd.getTime() && dateTime > chooseStart.getTime()) {
                return {
                    type: 0,
                    className: 'choose-between',
                    text: ''
                };
            }
            if (dateStr === chooseEnd.toLocaleDateString()) {
                return {
                    type: 1,
                    className: 'choose-end',
                    text: '结束'
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
            var scrollTop = document.body.scrollTop;
            var len = monthDoms.length;
            var currentIndex = (function () {
                for (var i = 0; i < len; i++) {
                    if (scrollTop < monthDoms[i].offsetBottom) return i;
                }
            })();
            var currentDate = monthDoms[currentIndex].date;
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
            _this5.initTitleDateAndScrollTop();
        });
    };

    PhCalendar.prototype.render = function render() {
        var _this6 = this;

        var _props2 = this.props;
        var weekStart = _props2.weekStart;
        var weekLabel = _props2.weekLabel;
        var _state = this.state;
        var titleDate = _state.titleDate;
        var layer = _state.layer;
        var monthRange = _state.monthRange;

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
                                _utils.dateFormat(monthItem, 'yyyy年MM月dd日')
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