import React, {Component, PropTypes} from 'react'
import TopPanel from './TopPanel'
import {checkType, dateFormat} from './utils'
import '../less/style.less'
import * as fastclick from 'fastclick'
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
// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
// MIT license
;(function() {
    var lastTime = 0
    var vendors = ['ms', 'moz', 'webkit', 'o']
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame']
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
            || window[vendors[x]+'CancelRequestAnimationFrame']
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback) {
            var currTime = new Date().getTime()
            var timeToCall = Math.max(0, 16 - (currTime - lastTime))
            var id = window.setTimeout(function() { callback(currTime + timeToCall) },
                timeToCall)
            lastTime = currTime + timeToCall
            return id
        }

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id)
        }
}())
export default class PhCalendar extends Component {
    static propTypes = {
        monthCount: PropTypes.number, // 3~12
        weekStart: PropTypes.number, // 0~6
        monthStart: PropTypes.string, // ['top', 'center', 'bottom']
        weekLabel: PropTypes.array,
        range: PropTypes.bool,
        disabled: PropTypes.array,
        values: PropTypes.array,
        format: PropTypes.string,
        events: React.PropTypes.arrayOf(PropTypes.shape({
            date: PropTypes.object,
            name: PropTypes.string
        })),
        dateChose: PropTypes.func,
    }
    static defaultProps = {
        format: 'yyyy-MM-dd',
        monthCount: 6,
        monthStart: 'top',
        weekStart: 1,
        weekLabel: ['日', '一', '二', '三', '四', '五', '六'],
        range: true,
        disabled: [],
        values: [],
        events: [],
        dateChose: function(){}
    }
    constructor(props, context) {
        super(props, context)
        const values = props.values
        this.screen = window.screen
        this.state = {
            layer: false,
            monthRange: this.getMonthRange(this.getDateFromValues(values)),
            dateRange: values,
            changeDate: false,
            titleDate: this.getDateFromValues(values, true)
        }
    }
    componentWillReceiveProps(nextPros) {
        const values = nextPros.values
        this.setState({
            dateRange: values,
            titleDate: this.getDateFromValues(values, true),
            monthRange: this.getMonthRange(this.getDateFromValues(values))
        })
    }
    componentDidMount() {
        document.addEventListener('scroll', ()=>{
            this.onScrollHandler()
        }, false)
        // remove click delay
        fastclick.attach(document.body)
        requestAnimationFrame(()=>{
            this.initTitleDateAndScrollTop()
        })
    }
    componentDidUpdate(){
    }
    // event callback
    dataChoseCallback(){
        let {dateRange} = this.state
        dateRange = dateRange.map((item)=>{
            return dateFormat(item, this.props.format)
        })
        this.props.dateChose(dateRange)
    }
    initTitleDateAndScrollTop(date){
        const doms = []
        const {monthRange, titleDate} = this.state
        const topDate = checkType(date, 'date') ? date : titleDate
        const dateStr = topDate.getFullYear()+'-'+topDate.getMonth()
        let titleIndex = null
        Array.prototype.forEach.call(document.getElementsByClassName('ph-c-month'), (item, index)=>{
            const title = item.getElementsByClassName('ph-c-month-title')[0]
            const offsetTitle = item.offsetTop + title.clientHeight
            const offsetBottom = item.offsetTop + item.clientHeight
            const date = monthRange[index]
            const yearMonth = date.getFullYear()+'-'+date.getMonth()
            if(yearMonth === dateStr && titleIndex === null){
                titleIndex = index
            }
            doms.push({
                offsetTitle: offsetTitle,
                offsetBottom: offsetBottom,
                date: date
            })
        })
        this.monthDOMArr = doms
        let scrollTop = 0
        if(titleIndex !== null){
            scrollTop = doms[titleIndex].offsetTitle - 70
        }
        setTimeout(()=>{
            document.documentElement.scrollTop = document.body.scrollTop = scrollTop
        },10)
    }
    getDateFromValues(values, force0){
        let {monthStart} = this.props
        let index = 0
        if(monthStart === 'bottom' && !force0){
            index = 1
        }
        if(values && values.length && checkType(values[index], 'date')){
            return values[index]
        }
        return new Date()
    }

    /**
     * 检查禁用的日期
     * @param date
     * @return {boolean}
     */
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
            const dateStr = date.toLocaleDateString()
            disabled.map((item)=>{
                if(item.toLocaleDateString() == dateStr) result = true
            })
        }
        return result
    }
    checkEvent(date) {
        let name = ''
        const dateString = date.toLocaleDateString()
        this.props.events.forEach((item)=>{
            if(item.date.toLocaleDateString() == dateString){
                name = item.name
            }
        })
        return name
    }
    getMonthRange(date){
        let month = date.getMonth()
        const year = date.getFullYear()
        let {monthCount, monthStart} = this.props
        // 最小为3，最大为12
        if(monthCount < 3 || monthCount > 12){
            monthCount = 6
        }
        if(['top', 'center', 'bottom'].indexOf(monthStart) === -1){
            monthStart = 'top'
        }
        let start = 0
        switch (monthStart) {
            case 'top':
                start = 0
                break
            case 'center':
                start = 1-Math.ceil(monthCount/2)
                break
            case 'bottom':
                start = 1-monthCount
                break
        }
        let arr = []
        for(let i = 0; i < monthCount; i++){
            arr.push(new Date(year, month+start))
            start++
        }
        return arr
    }

    /**
     * set choose date
     * @param data
     * @return {null}
     */
    chooseDate(data) {
        const {range} = this.props
        let dateR = this.state.dateRange
        const date = data.date
        if(['pre', 'next'].indexOf(data.type) != -1 || this.checkDisableDate(date)){
            return null
        }
        if(!range){
            dateR = [date]
        }else{
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
        }
        this.setState({
            dateRange: dateR
        })
        if(!range || dateR.length == 2){
            requestAnimationFrame(()=>{
                this.dataChoseCallback()
            })
        }
    }
    /**
     * @param year
     * @param month base on 0, eg: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11
     */
    renderMonth(year, month){
        const {weekStart, weekLabel} = this.props
        const weekLen = weekLabel.length
        const firstDate = new Date(year, month, 1)
        const lastDate = new Date(year, month+1, 0)
        const days = lastDate.getDate()
        const firstDateWeek = firstDate.getDay()
        const blank = (firstDateWeek - weekStart + weekLen)%weekLen
        const lines = Math.ceil((days+blank)/weekLabel.length)
        const count = lines * weekLabel.length
        let daysArr = []
        let i = 0, dateItem = firstDate
        dateItem.setDate(1 - blank)
        while (i < count){
            const date = new Date(dateItem)
            let item = {
                weekLabel: weekLabel[dateItem.getDay()],
                event: this.checkEvent(dateItem),
                date: date,
                day: date.getDate(),
                week: date.getDay(),
                month: date.getMonth(),
                year: date.getFullYear()
            }
            if(i < blank) {
                // pre month
                item.type = 'pre'
            }else if(i > days+blank-1){
                // next month
                item.type = 'next'
            }else{
                // current month
                item.type = 'current'
            }
            // get style
            item.status = this.getDayStyle(item)
            // check disabled
            item.disabled = this.checkDisableDate(date)
            daysArr.push(item)
            i++
            dateItem.setDate(dateItem.getDate()+1)
        }
        return daysArr
    }

    /**
     * mark choose date style
     * @param data
     * @return {*}
     */
    getDayStyle(data){
        if(['pre', 'next'].indexOf(data.type) != -1){
            return null
        }
        const {range} = this.props
        const date = data.date
        const dateStr = date.toLocaleDateString()
        const dateTime = date.getTime()
        const chooseStart = this.state.dateRange[0]
        const chooseEnd = this.state.dateRange[1]
        if(!range){
            if(chooseStart && chooseStart.toLocaleDateString() === dateStr){
                return {
                    type: 2,
                    className: 'choose-one',
                    text: ''
                }
            }
            return null
        }

        if(chooseStart) {
            if(chooseStart.toLocaleDateString() === dateStr){
                return {
                    type: -1,
                    className: 'choose-start',
                    text: '开始'
                }
            }
        }
        if(chooseEnd) {
            if(dateTime < chooseEnd.getTime() && dateTime > chooseStart.getTime()){
                return {
                    type: 0,
                    className: 'choose-between',
                    text: ''
                }
            }
            if(dateStr === chooseEnd.toLocaleDateString()){
                return {
                    type: 1,
                    className: 'choose-end',
                    text: '结束'
                }
            }
        }
        return null
    }
    onChooseHandler(evt){
        evt.stopPropagation()
        // deal click event
        const dom = evt.target.closest('.day-item')
        if(dom && dom.dataset){
            const dataset = dom.dataset
            this.chooseDate({
                type: dataset.type,
                date: new Date(dataset.date)
            })
        }
    }

    /**
     * scroll event be listened for change title date
     */
    onScrollHandler() {
        if(this.timer) {
            cancelAnimationFrame(this.timer)
        }
        this.timer = requestAnimationFrame(()=>{
            const monthDoms = this.monthDOMArr
            const titleDate = this.state.titleDate
            // body
            const scrollTop = document.body.scrollTop + 70
            const len = monthDoms.length
            const currentDate = (()=>{
                for(let i=0; i<len; i++){
                    if(scrollTop < monthDoms[i].offsetBottom) return monthDoms[i].date
                }
            })()
            if(titleDate.toLocaleString() != currentDate.toLocaleString()){
                this.setState({
                    titleDate: currentDate
                })
            }
        })
    }
    renderDataToUlStyle(year, month){
        const range = this.props.range
        const monthArr = this.renderMonth(year, month)
        return (
            <ul className="ph-c-clearfix ph-c-month-week">
                {
                    monthArr.map((dayItem, dayIndex)=>{
                        const style = dayItem.status
                        const isDisabled = dayItem.disabled ? 'day_disabled' : ''
                        if(style){
                            return (<li key={dayIndex} data-type={dayItem.type} data-date={dayItem.date} className={'day-item ' + style.className + ' day_status_'+ dayItem.type  + ' ' + isDisabled}>
                                    <div className="day">{dayItem.day}</div>
                                    {dayItem.event && <div className="event"><p>{(range && style.type != 0)? '': dayItem.event}</p></div>}
                                    {range && <div className="choose">{style.text}</div>}</li>)
                        }else{
                            return (<li key={dayIndex} data-type={dayItem.type} data-date={dayItem.date} className={'day-item day_status_'+ dayItem.type   + ' ' + isDisabled}>
                                    <div className="day">{dayItem.day}</div>
                                    {dayItem.event && <div className="event"><p>{dayItem.event}</p></div>}</li>)
                        }
                    })
                }
            </ul>
        )
    }
    /**
     * top panel click chang date callback
     * @param date
     */
    titleClickCallback(){
        // only trigger layer
        this.setState({
            layer: true
        })
    }
    titleDateChanged(date){
        this.setState({
            changeDate: false,
            monthRange: this.getMonthRange(date),
            layer: false
        })
        requestAnimationFrame(()=>{
            this.initTitleDateAndScrollTop(date)
        })
    }
    render(){
        const {weekStart, weekLabel} = this.props
        const {titleDate, layer, monthRange} = this.state
        return (
            <div className="ph-c-container">
                <div className="ph-c-header-fixed">
                    <div className="ph-c-week-label">
                        {
                            weekLabel.map((item, index)=>{
                                return <p key={index}>{weekLabel[(index+weekStart)%weekLabel.length]}</p>
                            })
                        }
                    </div><TopPanel date={titleDate} dateChanged={::this.titleDateChanged} titleClick={::this.titleClickCallback}/>
                </div>
                <div className="ph-c-content" onClick={::this.onChooseHandler}>
                    {
                        monthRange.map((monthItem, monthIndex)=>{
                            const year = monthItem.getFullYear()
                            const month = monthItem.getMonth()
                            return (<div key={monthIndex} className="ph-c-month"><div
                                className="ph-c-month-title"><p>{dateFormat(monthItem, 'yyyy年MM月')}</p></div><div
                                className="ph-c-month-week-container">{this.renderDataToUlStyle(year, month)}</div></div>)
                        })
                    }
                </div>
                {layer && <div className="ph-c-top-panel-layer"/>}
            </div>
        )
    }
}