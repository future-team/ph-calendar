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

var PhCalendar = (function (_Component) {
    _inherits(PhCalendar, _Component);

    _createClass(PhCalendar, null, [{
        key: 'propTypes',
        value: {
            monthCount: _react.PropTypes.number,
            weekStart: _react.PropTypes.number,
            weekLabel: _react.PropTypes.array,
            dateChose: _react.PropTypes.func,
            range: _react.PropTypes.bool, // 是否支持范围选择
            disabled: _react.PropTypes.array, // 如果是恰好两个值，则表示是范围([null, date]表示什么时间之前，[date, null]表示什么时间之后，[date,date]表示区间)，一个或者多个则表示是单点禁用
            values: _react.PropTypes.array,
            format: _react.PropTypes.string,
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
            format: 'yyyy-MM-dd',
            monthCount: 12, // 渲染头部年月的前后一年的时间
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
        this.currentIndex = 0;
        this.screen = window.screen;
        var monthRange = this.getMonthRange(this.getCenterDateByValues(values));
        this.state = {
            layer: false,
            monthRange: monthRange, // 月份的列表
            yearRange: [], // 选择年份的列表
            dateRange: values, // 选择日期的范围,如果是只有一个，则默认是单选了
            changeDate: false,
            titleDate: monthRange[Math.floor(props.monthCount / 2)]
        };
    }

    PhCalendar.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextPros) {
        var values = nextPros.values;
        var monthRange = this.getMonthRange(this.getCenterDateByValues(values));
        this.setState({
            dateRange: values,
            titleDate: monthRange[Math.floor(nextPros.monthCount / 2)],
            monthRange: monthRange
        });
    };

    PhCalendar.prototype.componentDidMount = function componentDidMount() {
        var _this = this;

        this.initTitleDateAndScrollTop();
        document.addEventListener('scroll', function () {
            _this.onScrollHandler();
        }, false);
        // remove click delay
        fastclick.attach(document.body);
    };

    // event callback

    PhCalendar.prototype.dataChoseCallback = function dataChoseCallback() {
        var _this2 = this;

        var dateRange = this.state.dateRange;

        dateRange.map(function (item) {
            return _utils.dateFormat(item, _this2.props.format);
        });
        this.props.dateChose(dateRange);
    };

    PhCalendar.prototype.initTitleDateAndScrollTop = function initTitleDateAndScrollTop() {
        var doms = [];
        var monthRange = this.state.monthRange;

        // const bodyScrollTop = document.body.scrollTop
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

    PhCalendar.prototype.getMonthRange = function getMonthRange(date) {
        var month = date.getMonth();
        var year = date.getFullYear();
        var count = this.props.monthCount;
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
        var range = this.props.range;

        var dateR = this.state.dateRange;
        var date = data.date;
        if (['pre', 'next'].indexOf(data.type) != -1 || this.checkDisableDate(date)) {
            return null;
        }
        if (!range) {
            dateR = [date];
            // single choose
            this.dataChoseCallback();
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
                    // range choose
                    this.dataChoseCallback();
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
        var _this3 = this;

        var monthDoms = this.monthDOMArr;
        var titleDate = this.state.titleDate;
        // body
        var scrollTop = window.document.body.scrollTop;
        var len = monthDoms.length;
        var currentIndex = (function () {
            for (var i = 0; i < len; i++) {
                if (scrollTop < monthDoms[i].offsetBottom) return i;
            }
        })();
        if (this.timer) {
            window.clearTimeout(this.timer);
        }
        this.timer = setTimeout(function () {
            var currentDate = monthDoms[currentIndex].date;
            if (titleDate.toLocaleString() != currentDate.toLocaleString()) {
                _this3.setState({
                    titleDate: currentDate
                });
            }
        }, 25);
        // 持续滚动？
        if (this.currentIndex !== currentIndex) {
            // direction
            if (currentIndex == len - 2 || currentIndex == 0) {
                this.continuousUpdateMonth(this.currentIndex, currentIndex);
            }
            this.currentIndex = currentIndex;
        }
    };

    PhCalendar.prototype.continuousUpdateMonth = function continuousUpdateMonth() /*curIndex, cacheIndex*/{}
    // todo

    // will delete
    ;

    PhCalendar.prototype.renderDataToUlStyle = function renderDataToUlStyle(year, month) {
        var range = this.props.range;
        return _react2['default'].createElement(
            'ul',
            { className: 'ph-c-clearfix ph-c-month-week' },
            this.renderMonth(year, month).map(function (dayItem, dayIndex) {
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
                                dayItem.event
                            )
                        ),
                        range && _react2['default'].createElement(
                            'div',
                            { className: 'choose' },
                            style.type == 0 ? '' : style.type == -1 ? '开始' : '结束'
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

    PhCalendar.prototype.renderDataToTableStyle = function renderDataToTableStyle(year, month) {
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
                            var style = dayItem.status;
                            var isDisabled = dayItem.disabled ? 'day_disabled' : '';
                            if (style) {
                                return _react2['default'].createElement(
                                    'td',
                                    { key: dayIndex, 'data-type': dayItem.type, 'data-date': dayItem.date, className: 'day-item ' + style.className + ' day_status_' + dayItem.type + ' ' + isDisabled },
                                    _react2['default'].createElement(
                                        'div',
                                        null,
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
                                    { key: dayIndex, 'data-type': dayItem.type, 'data-date': dayItem.date, className: 'day-item day_status_' + dayItem.type + ' ' + isDisabled },
                                    _react2['default'].createElement(
                                        'div',
                                        null,
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
                                    )
                                );
                            }
                        })
                    );
                })
            )
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
        var _this4 = this;

        this.setState({
            changeDate: false,
            monthRange: this.getMonthRange(date),
            layer: false
        });
        setTimeout(function () {
            _this4.initTitleDateAndScrollTop();
        }, 0);
    };

    PhCalendar.prototype.render = function render() {
        var _this5 = this;

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
                _react2['default'].createElement(_TopPanel2['default'], { date: this.state.titleDate, dateChanged: this.titleDateChanged.bind(this), titleClick: this.titleClickCallback.bind(this) })
            ),
            _react2['default'].createElement(
                'div',
                { className: 'ph-c-content', onClick: this.onChooseHandler.bind(this) },
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
                            _this5.renderDataToUlStyle(year, month)
                        )
                    );
                })
            ),
            this.state.layer && _react2['default'].createElement('div', { className: 'ph-c-top-panel-layer' })
        );
    };

    return PhCalendar;
})(_react.Component);

exports['default'] = PhCalendar;
module.exports = exports['default'];