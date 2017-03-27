'use strict';

exports.__esModule = true;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _fastclick = require('fastclick');

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
        if (this.longTouch !== true) {
            // deal click event
            var month = parseInt(evt.target.closest('.item').dataset.month);
            this.setItem(month, 'month');
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
                        onClick: this.changeYearRangeHandler.bind(this) },
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