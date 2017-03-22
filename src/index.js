import React, {Component, PropTypes} from 'react'
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
        weekStart: PropTypes.number,
        weekLabel: PropTypes.array,
        dateChanged: PropTypes.func,
        weekChanged: PropTypes.func,
        defaultDate: PropTypes.object,
        setMark: React.PropTypes.arrayOf(PropTypes.shape({
            date: PropTypes.string,
            count: PropTypes.number,
            format: PropTypes.function
        }))
    }
    static defaultProps = {
        showPreMonthDay: false,
        showNextMonthDay: false,
        weekStart: 1,
        weekLabel: ['日', '一', '二', '三', '四', '五', '六'],
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
        defaultDate: new Date(),
        dateChanged: function(){},
        weekChanged: function(){}
    }
    constructor(props, context) {
        super(props, context)
        this.screen = window.screen
        // TODO
        const date = new Date()
        const year = date.getFullYear()
        const month = date.getMonth()
        this.state = {
            monthRange: [new Date(year, month-1), new Date(year, month), new Date(year, month + 1)], // 始终为三个月的显示，
            dateRange: []
        }
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
        const _self = this
        this.longTouch = false
        setTimeout(function() {
            _self.longTouch = true
        }, 200)
        // Get the original touch position.
        this.touchstartx =  evt.touches[0].pageX
        this.touchstarty =  evt.touches[0].pageY
       /* this.setState({
            swipeClass: 'ph-calendar_touch-start'
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
            swipeClass: 'ph-calendar_touch-move'
        })*/
    }
    onTouchEndHandler(evt) {
        evt.stopPropagation()
        // evt.preventDefault()
        const clientWidth = this.screen.width
        const clientHeight = this.screen.height
        const absX = Math.abs(this.movex)
        const absY = Math.abs(this.movey)
        let swipeClass = 'ph-calendar_touch-recover'
        if(this.longTouch === true) {
            // 长滑动是翻页
            // TODO 这里要做缓存处理
            if (absY > clientHeight / 3) {
                if(this.movey > 0) {// down
                    swipeClass = 'ph-calendar_touch-end-down'

                } else { // up
                    swipeClass = 'ph-calendar_touch-end-up'
                }
                this.setMonthRange(this.movey)
                /*setTimeout(()=>{
                    this.setState({
                        swipeClass: ''
                    })
                },500)*/
            }
            // 选中
            console.log(absY)
        }else {
            // 点击
            // const clickDate = evt.target.closest('.week-item').dataset.date
            //this.setActiveDate(new Date(clickDate))
            console.log(absY)
        }
        /*this.setState({
            distance: 0,
            swipeClass: swipeClass
        })*/
    }
    setMonthRange(type) {
        const monthRange = this.state.monthRange
        if(type > 0){// next
            const last = monthRange[monthRange.length-1]
            monthRange.push(new Date(last.getFullYear(), last.getMonth()+1))
            monthRange.splice(0, 1)
            this.setState({
                monthRange: monthRange
            })
        }else {// prev
            console.log('prev')
            const first = monthRange[0]
            monthRange.unshift(new Date(first.getFullYear(), first.getMonth()-1))
            this.setState({
                monthRange: monthRange.slice(0, 2)
            })
        }
    }
    chooseDate(date, evt) {
        evt.stopPropagation()
        evt.preventDefault()
        let dateR = this.state.dateRange
        if(dateR.length < 2){
            //compare
            if(dateR.length === 1){
                if(dateR[0].getTime() > date.date.getTime()){
                    dateR[1] = dateR[0]
                    dateR[0] = date.date
                }else{
                    dateR.push(date.date)
                }
            }else{
                dateR.push(date.date)
            }
        }else{
            dateR = [date.date]
        }
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
        // 这里计算很有问题
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
    renderYearSelect(){
        console.log('显示年份选择面板')
    }
    renderMonthSelect(){
        console.log('显示月份选择面板')
    }
    getDayStyle(date){
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
    render(){
        const currentDate = this.state.monthRange[0]
        const {weekStart, weekLabel} = this.props
        return (
            <div className="ph-calendar_container">
                <div className="ph-calendar_header-fixed">
                    <div className="ph-calendar_week-label">
                        {
                            weekLabel.map((item, index)=>{
                                return <p key={index}>{weekLabel[(index+weekStart)%weekLabel.length]}</p>
                            })
                        }
                    </div>
                    <div className="ph-calendar_date">
                        <p><span onClick={this.renderYearSelect.bind(this)}>{currentDate.getFullYear()}</span><span>年</span><span onClick={this.renderMonthSelect.bind(this)}>{currentDate.getMonth()+1}</span><span>月</span></p>
                    </div>
                    {/*<div className="ph-calendar_date-choose">

                    </div>*/}
                </div>
                <div className="ph-calendar_content"
                     onTouchStart={::this.onTouchStartHandler}
                     onTouchMove={::this.onTouchMoveHandler}
                     onTouchEnd={::this.onTouchEndHandler}
                >
                    {
                        this.state.monthRange.map((monthItem, monthIndex)=>{
                            const year = monthItem.getFullYear()
                            const month = monthItem.getMonth()
                            return <div className="ph-calendar_month" key={monthIndex}>
                                    <div className="ph-calendar_month-title">
                                        <p>{year}年{month+1}月</p>
                                    </div>
                                    <ul className="ph-calendar_month-week">
                                        {
                                            this.renderMonth(year, month).map((dayItem, dayIndex)=>{
                                                const style = this.getDayStyle(dayItem.date)
                                                if(style){
                                                    return (
                                                        <li key={dayIndex} onClick={this.chooseDate.bind(this, dayItem)} className={style.className + ' day_status_'+ dayItem.type }>
                                                            <div className="day">{dayItem.date.getDate()}</div>
                                                            <div className="week">{dayItem.weekLabel}</div>
                                                            {dayItem.event && <div className="event"><p>{dayItem.event}</p></div>}
                                                            <div className="choose">{style.type == 0? '': (style.type == -1?'开始':'结束')}</div>
                                                        </li>
                                                    )
                                                }else{
                                                    return (
                                                        <li key={dayIndex} onClick={this.chooseDate.bind(this, dayItem)} className={'day_status_'+ dayItem.type }>
                                                            <div className="day">{dayItem.date.getDate()}</div>
                                                            <div className="week">{dayItem.weekLabel}</div>
                                                            {dayItem.event && <div className="event"><p>{dayItem.event}</p></div>}
                                                        </li>
                                                    )
                                                }
                                            })
                                        }
                                    </ul>
                                </div>
                        })
                    }
                </div>
            </div>
        )
    }
}