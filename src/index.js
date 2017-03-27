import React, {Component, PropTypes} from 'react'
import TopPanel from './TopPanel'
import {checkType} from './utils'
import './less/style.less'

export default class PhCalendar extends Component {
    static propTypes = {
        monthCount: PropTypes.number,
        weekStart: PropTypes.number,
        weekLabel: PropTypes.array,
        dateChanged: PropTypes.func,
        range: PropTypes.bool, // 是否支持范围选择
        disabled: PropTypes.array,// 如果是恰好两个值，则表示是范围([null, date]表示什么时间之前，[date, null]表示什么时间之后，[date,date]表示区间)，一个或者多个则表示是单点禁用
        values: PropTypes.array,
        events: React.PropTypes.arrayOf(PropTypes.shape({
            date: PropTypes.object,
            name: PropTypes.string,
            format: PropTypes.function
        }))
    }
    static defaultProps = {
        monthCount: 6, // 渲染头部年月的前后一年的时间
        weekStart: 1,
        weekLabel: ['日', '一', '二', '三', '四', '五', '六'],
        range: true,
        disabled: [],
        values: [],
        events: [],
        dateChanged: function(){}
    }
    constructor(props, context) {
        super(props, context)
        const values = props.values
        this.screen = window.screen
        const monthRange = this.getMonthRange(this.getCenterDateByValues(values))
        this.state = {
            layer: false,
            monthRange: monthRange, // 月份的列表
            yearRange: [], // 选择年份的列表
            dateRange: values, // 选择日期的范围,如果是只有一个，则默认是单选了
            changeDate: false,
            changeDateYear: false,
            changeDateMonth: false,
            titleDate: monthRange[6]
        }
    }
    componentWillReceiveProps(nextPros) {
        const values = nextPros.values
        const monthRange = this.getMonthRange(this.getCenterDateByValues(values))
        this.setState({
            dateRange: values,
            titleDate: monthRange[6],
            monthRange: monthRange
        })
    }
    componentDidMount() {
        // 计算每个日历月份的高度，为scroll到当前区域改变当前月份的时间做准备
        this.initTitleDateAndScrollTop()
    }
    initTitleDateAndScrollTop(){
        const doms = []
        const {monthRange} = this.state
        Array.prototype.forEach.call(document.getElementsByClassName('ph-c-month'), (item, index)=>{
            const title = item.getElementsByClassName('ph-c-month-title')[0]
            doms.push({
                offsetTitle: item.offsetTop + title.clientHeight,
                offsetBottom: item.offsetTop + item.clientHeight,
                date: monthRange[index]
            })
        })
        this.monthDOMArr = doms
        this.refs.phContentWrap.scrollTop = doms[6].offsetTitle
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
    // 渲染12个，一年的，在前后各加减
    getMonthRange(date){
        let month = date.getMonth()
        const year = date.getFullYear()
        const count = this.props.monthCount
        const start = count/2-1
        const end = count/2
        let arr = []
        for(let i = -start; i < end; i++){
            arr.push(new Date(year, month+i))
        }
        return arr
    }
    chooseDate(data, evt) {
        evt.stopPropagation()
        evt.preventDefault()
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
        const {range} = this.props
        const date = data.date
        if(['pre', 'next'].indexOf(data.type) != -1){
            return null
        }
        const chooseStart = this.state.dateRange[0]
        const chooseEnd = this.state.dateRange[1]
        if(!range){
            if(chooseStart && chooseStart.toLocaleString() === date.toLocaleString()){
                return {
                    type: 2,
                    className: 'choose-one'
                }
            }
            return null
        }

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
        setTimeout(()=>{
            this.initTitleDateAndScrollTop()
        }, 0)
    }
    titleClick(){
        // trigger layer
        this.setState({
            layer: true
        })
    }
    onScrollHandler() {
        const monthDoms = this.monthDOMArr
        const titleDate = this.state.titleDate
        const scrollTop = this.refs.phContentWrap.scrollTop
        const len = monthDoms.length
        const currentDate = (()=>{
            for(let i=0; i<len; i++){
                if(scrollTop < monthDoms[i].offsetBottom) return monthDoms[i].date
            }
        })()
        if(titleDate.toLocaleString() != currentDate.toLocaleString()){
            /*this.setState({
                titleDate: currentDate
            })*/
        }
    }
    renderDataToTableStyle(year, month){
        // group month data
        const monthData = this.renderMonth(year, month)
        const groupLen = this.props.weekLabel.length
        const range = this.props.range
        const result = Array.apply(null, {
            length: Math.ceil(monthData.length / groupLen)
        }).map((x, i) => {
            return monthData.slice(i * groupLen, (i + 1) * groupLen)
        })
        // render td
        return (
            <table className="ph-c-month-week-table" cellSpacing={0} cellPadding={0}>
                <thead>
                    <tr><th/><th/><th/><th/><th/><th/><th/></tr>
                </thead>
                <tbody>
                {
                    result.map((group, i)=>{
                        return (
                            <tr key={i}>
                                {
                                    group.map((dayItem, dayIndex)=>{
                                        const style = this.getDayStyle(dayItem)
                                        const isDisabled = this.checkDisableDate(dayItem.date) ? 'day_disabled' : ''
                                        if(style){
                                            return (
                                                <td key={dayIndex} onClick={this.chooseDate.bind(this, dayItem)} className={style.className + ' day_status_'+ dayItem.type + ' ' + isDisabled}>
                                                    <div>
                                                        <div className="day">{dayItem.date.getDate()}</div>
                                                        {dayItem.event && <div className="event"><p>{dayItem.event}</p></div>}
                                                        {range && <div className="choose">{style.type == 0 ? '': (style.type == -1?'开始':'结束')}</div>}
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
                        <TopPanel date={this.state.titleDate} dateChanged={::this.titleDateChanged} titleClick={::this.titleClick}/>
                    </div>
                </div>
                <div className="ph-c-content-wrap" ref="phContentWrap" onScroll={::this.onScrollHandler}>
                    <div className="ph-c-content" ref="phContent">
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
                </div>
                {this.state.layer && <div className="ph-c-top-panel-layer"/>}
            </div>
        )
    }
}