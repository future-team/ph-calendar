import React, {Component, PropTypes} from 'react'
import TopPanel from './TopPanel'
import {checkType} from './utils'
import './less/style.less'

// element-closest | CC0-1.0 | github.com/jonathantneal/closest
(function (ElementProto) {
    if (typeof ElementProto.matches !== 'function') {
        ElementProto.matches = ElementProto.msMatchesSelector || ElementProto.mozMatchesSelector || ElementProto.webkitMatchesSelector || function matches(selector) {
                var element = this
                var elements = (element.document || element.ownerDocument).querySelectorAll(selector)
                var index = 0

                while (elements[index] && elements[index] !== element) {
                    ++index
                }

                return Boolean(elements[index])
            }
    }
    if (typeof ElementProto.closest !== 'function') {
        ElementProto.closest = function closest(selector) {
            var element = this

            while (element && element.nodeType === 1) {
                if (element.matches(selector)) {
                    return element
                }

                element = element.parentNode
            }

            return null
        }
    }
})(window.Element.prototype)
export default class PhCalendar extends Component {
    static propTypes = {
        monthCount: PropTypes.number,
        weekStart: PropTypes.number,
        weekLabel: PropTypes.array,
        dateChanged: PropTypes.func,
        range: PropTypes.bool,
        disabled: PropTypes.array,// 如果是恰好两个值，则表示是范围([null, date]表示什么时间之前，[date, null]表示什么时间之后，[date,date]表示区间)，一个或者多个则表示是单点禁用
        values: PropTypes.array,
        events: React.PropTypes.arrayOf(PropTypes.shape({
            date: PropTypes.object,
            name: PropTypes.string,
            format: PropTypes.function
        }))
    }
    static defaultProps = {
        monthCount: 5,
        weekStart: 1,
        weekLabel: ['日', '一', '二', '三', '四', '五', '六'],
        range: true, // 是否支持范围选择
        disabled: [],
        values: [],
        events: [
            {
                date: new Date(2017, 1, 10),
                name: '家立减'
            },
            {
                date: new Date(2017, 1, 22),
                name: '团购'
            },
            {
                date: new Date(2017, 2, 10),
                name: '劳动节'
            },
            {
                date: new Date(2017, 2, 15),
                name: '哈哈哈'
            }
        ],
        dateChanged: function(){}
    }
    constructor(props, context) {
        super(props, context)
        const values = props.values
        this.screen = window.screen
        // TODO

        this.state = {
            layer: false,
            monthRange: this.getMonthRange(this.getCenterDateByValues(values)), // 月份的列表
            yearRange: [], // 选择年份的列表
            dateRange: values, // 选择日期的范围,如果是只有一个，则默认是单选了
            changeDate: false,
            changeDateYear: false,
            changeDateMonth: false
        }
    }
    componentWillReceiveProps(nextPros) {
        const values = nextPros.values
        this.setState({
            dateRange: values,
            monthRange: this.getMonthRange(this.getCenterDateByValues(values))
        })
    }
    getCenterDateByValues(values){
        if(values.length && checkType(values[0], 'date')){
            return values[0]
        }
        return new Date()
    }
    checkDisableDate(date) {
        const disabled = this.props.disabled
        const len = disabled.length
        const dateTime =  date.getTime()
        let result = false
        if(len == 0){
            return false
        }
        if(len == 2){// 区间
            const start = disabled[0]
            const end = disabled[1]
            if(start == null){
                return dateTime <= end.getTime()
            }
            if(end == null){
                return dateTime >= start.getTime()
            }
            return dateTime <= end.getTime() && dateTime >= start.getTime()
        }
        if(len == 1 || len > 2){
            disabled.map((item)=>{
                if(item.toLocaleDateString() == date.toLocaleString()) result = true
            })
        }
        return result
    }
    checkEvent(date) {
        let name = ''
        this.props.events.forEach((item)=>{
            if(item.date.toLocaleString() == date.toLocaleString()){
                name = item.name
            }
        })
        return name
    }
    onTouchStartHandler(evt) {
        evt.stopPropagation()
        // evt.preventDefault()
        this.longTouch = false
        setTimeout(()=>{
            this.longTouch = true
        }, 200)
        // Get the original touch position.
        this.touchstartx =  evt.touches[0].pageX
        this.touchstarty =  evt.touches[0].pageY
       /* this.setState({
            swipeClass: 'ph-c-touch-start'
        })*/
    }
    onTouchMoveHandler(evt) {
        evt.stopPropagation()
        // evt.preventDefault()
        this.touchmovex =  evt.touches[0].pageX
        this.touchmovey =  evt.touches[0].pageY
        this.movex = this.touchstartx - this.touchmovex
        this.movey = this.touchstarty - this.touchmovey
        /*this.setState({
            disX: this.movex,
            disY: this.movey,
            swipeClass: 'ph-c-touch-move'
        })*/
    }
    changeMonthRangeHandler(evt) {
        evt.stopPropagation()
        // evt.preventDefault()
        const clientHeight = this.screen.height
        const absY = Math.abs(this.movey)
        let swipeClass = 'ph-c-touch-recover'
        if(this.longTouch === true) {
            // 长滑动是翻页
            // TODO 这里要做缓存处理
            if (absY > clientHeight / 3) {
                if(this.movey > 0) {// down
                    swipeClass = 'ph-c-touch-end-down'

                } else { // up
                    swipeClass = 'ph-c-touch-end-up'
                }
                this.scrollChangeMonth(this.movey)
                /*setTimeout(()=>{
                    this.setState({
                        swipeClass: ''
                    })
                },500)*/
            }
            // 选中
            console.log(absY, swipeClass)
        }else {
            // 点击
            // const clickDate = evt.target.closest('.week-item').dataset.date
            //this.setActiveDate(new Date(clickDate))
            console.log(absY, swipeClass)
        }
        /*this.setState({
            distance: 0,
            swipeClass: swipeClass
        })*/
    }
    scrollChangeMonth(type){
        let monthRange = this.state.monthRange
        let date = new Date()
        if(type > 0){// next
            date = monthRange[3]
        }else {// prev
            date = monthRange[1]
        }
        this.setState({
            monthRange: this.getMonthRange(date)
        })
    }
    // 渲染5个，在前后各加减
    getMonthRange(date){
        let month = date.getMonth()
        const year = date.getFullYear()
        let arr = []
        for(let i = -2; i < 3; i++){
            arr.push(new Date(year, month+i))
        }
        return arr
    }
    chooseDate(data, evt) {
        evt.stopPropagation()
        evt.preventDefault()
        let dateR = this.state.dateRange
        const date = data.date
        if(['pre', 'next'].indexOf(data.type) != -1 || this.checkDisableDate(date)){
            return null
        }
        if(dateR.length < 2){
            //compare
            if(dateR.length === 1){
                if(dateR[0].getTime() > date.getTime()){
                    dateR[1] = dateR[0]
                    dateR[0] = date
                }else{
                    dateR.push(date)
                }
            }else{
                dateR.push(date)
            }
        }else{
            dateR = [date]
        }
        this.props.dateChanged(dateR)
        this.setState({
            dateRange: dateR
        })
    }
    /**
     *
     * @param year
     * @param month base on 0, eg: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11
     */
    renderMonth(year, month){
        const {weekStart, weekLabel} = this.props
        const firstDate = new Date(year, month, 1)
        const lastDate = new Date(year, month+1, 0)
        const days = lastDate.getDate()
        const firstDateWeek = firstDate.getDay()
        const lines = Math.ceil((days+firstDateWeek-weekStart)/7)
        const count = lines * weekLabel.length
        let daysArr = []
        let i = 0, dateItem = firstDate
        dateItem.setDate(1 - firstDateWeek + weekStart)
        while (i < count){
            let item = {
                weekLabel: weekLabel[dateItem.getDay()],
                event: this.checkEvent(dateItem),
                date: new Date(dateItem)
            }
            if(i < firstDateWeek - weekStart) {
                // pre month
                item.type = 'pre'
            }else if(i > days + firstDateWeek - weekStart - 1){
                // next month
                item.type = 'next'
            }else{
                // current month
                item.type = 'current'
            }
            daysArr.push(item)
            i++
            dateItem.setDate(dateItem.getDate()+1)
        }
        return daysArr
    }
    getDayStyle(data){
        const date = data.date
        if(['pre', 'next'].indexOf(data.type) != -1){
            return null
        }
        const chooseStart = this.state.dateRange[0]
        const chooseEnd = this.state.dateRange[1]
        if(chooseStart) {
            if(chooseStart.toLocaleString() === date.toLocaleString()){
                return {
                    type: -1,
                    className: 'choose-start'
                }
            }
        }
        if(chooseEnd) {
            if(date.getTime() < chooseEnd.getTime() && date.getTime() > chooseStart.getTime()){
                return {
                    type: 0,
                    className: 'choose-between'
                }
            }

            if(date.toLocaleString() === chooseEnd.toLocaleString()){
                return {
                    type: 1,
                    className: 'choose-end'
                }
            }
        }
        return null
    }
    titleDateChanged(date){
        this.setState({
            monthRange: this.getMonthRange(date),
            layer: false
        })
    }
    titleClick(){
        // trigger layer
        this.setState({
            layer: true
        })
    }
    // will delete
    renderDataToUlStyle(year, month){
        return (
            <ul className="ph-c-clearfix ph-c-month-week">
                {
                    this.renderMonth(year, month).map((dayItem, dayIndex)=>{
                        const style = this.getDayStyle(dayItem.date)
                        if(style){
                            return (
                                <li key={dayIndex} onClick={this.chooseDate.bind(this, dayItem)} className={style.className + ' day_status_'+ dayItem.type }>
                                    <div className="day">{dayItem.date.getDate()}</div>
                                    {dayItem.event && <div className="event"><p>{dayItem.event}</p></div>}
                                    <div className="choose">{style.type == 0? '': (style.type == -1?'开始':'结束')}</div>
                                </li>
                            )
                        }else{
                            return (
                                <li key={dayIndex} onClick={this.chooseDate.bind(this, dayItem)} className={'day_status_'+ dayItem.type }>
                                    <div className="day">{dayItem.date.getDate()}</div>
                                    {dayItem.event && <div className="event"><p>{dayItem.event}</p></div>}
                                </li>
                            )
                        }
                    })
                }
            </ul>
        )
    }
    renderDataToTableStyle(year, month){
        // group month data
        const monthData = this.renderMonth(year, month)
        const groupLen = this.props.weekLabel.length
        const result = Array.apply(null, {
            length: Math.ceil(monthData.length / groupLen)
        }).map((x, i) => {
            return monthData.slice(i * groupLen, (i + 1) * groupLen);
        });
        // render td
        return (
            <table className="ph-c-month-week-table" cellSpacing={0} cellPadding={0}>
                <thead>
                    <tr><th></th><th></th><th></th><th></th><th></th><th></th><th></th></tr>
                </thead>
                <tbody>
                {
                    result.map((group, i)=>{
                        return (
                            <tr key={i}>
                                {
                                    group.map((dayItem, dayIndex)=>{
                                        const style = this.getDayStyle(dayItem)
                                        const isDisabled = this.checkDisableDate(dayItem.date) ? 'day_disabled':''
                                        if(style){
                                            return (
                                                <td key={dayIndex} onClick={this.chooseDate.bind(this, dayItem)} className={style.className + ' day_status_'+ dayItem.type + ' ' + isDisabled}>
                                                    <div>
                                                        <div className="day">{dayItem.date.getDate()}</div>
                                                        {dayItem.event && <div className="event"><p>{dayItem.event}</p></div>}
                                                        <div className="choose">{style.type == 0? '': (style.type == -1?'开始':'结束')}</div>
                                                    </div>
                                                </td>
                                            )
                                        }else{
                                            return (
                                                <td key={dayIndex} onClick={this.chooseDate.bind(this, dayItem)} className={'day_status_'+ dayItem.type  + ' ' + isDisabled}>
                                                    <div>
                                                        <div className="day">{dayItem.date.getDate()}</div>
                                                        {dayItem.event && <div className="event"><p>{dayItem.event}</p></div>}
                                                    </div>
                                                </td>
                                            )
                                        }
                                    })
                                }
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>

        )
    }
    render(){
        const {weekStart, weekLabel} = this.props
        const currentDate = this.state.monthRange[0]
        return (
            <div className="ph-c-container">
                <div className="ph-c-header-fixed">
                    <div className="ph-c-week-label">
                        {
                            weekLabel.map((item, index)=>{
                                return <p key={index}>{weekLabel[(index+weekStart)%weekLabel.length]}</p>
                            })
                        }
                    </div>
                    <div className="ph-c-date">
                        <TopPanel date={currentDate} dateChanged={::this.titleDateChanged} titleClick={::this.titleClick}/>
                    </div>
                </div>
                <div className="ph-c-content"
                     onTouchStart={::this.onTouchStartHandler}
                     onTouchMove={::this.onTouchMoveHandler}
                     onTouchEnd={::this.changeMonthRangeHandler}
                >
                    {
                        this.state.monthRange.map((monthItem, monthIndex)=>{
                            const year = monthItem.getFullYear()
                            const month = monthItem.getMonth()
                            return (
                                <div className="ph-c-month" key={monthIndex}>
                                    <div className="ph-c-month-title">
                                        <p>{year}年{month+1}月</p>
                                    </div>
                                    <div className="ph-c-month-week-container">
                                        {
                                            this.renderDataToTableStyle(year, month)
                                        }
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                {this.state.layer && <div className="ph-c-top-panel-layer"></div>}
            </div>
        )
    }
}