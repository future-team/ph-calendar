'use strict';

exports.__esModule = true;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _TopPanel = require('./TopPanel');

var _TopPanel2 = _interopRequireDefault(_TopPanel);

var _utils = require('./utils');

require('./less/style.less');

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