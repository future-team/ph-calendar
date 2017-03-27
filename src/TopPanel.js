import React, {Component, PropTypes} from 'react'
import * as fastclick from 'fastclick'
export default class TopPanel extends Component {
    static propTypes = {
        date: PropTypes.object,
        dateChanged: PropTypes.func,
        titleClick: PropTypes.func
    }
    static defaultProps = {
        date: new Date(),
        dateChanged: function(){},
        titleClick: function(){}
    }
    constructor(props, context) {
        super(props, context)
        this.screen = window.screen
        const year = props.date.getFullYear()
        const years = this.getYears(year)
        this.state = {
            date: props.date,
            changeDate: false,
            changeYear: false,
            changeMonth: false,
            years: years
        }
    }
    componentDidMount() {
        // remove click delay
        fastclick.attach(document.body)
    }
    componentWillReceiveProps(nextProps){
        // only update title
        this.setState({
            date: nextProps.date
        })
    }
    onTouchStartHandler(evt) {
        evt.stopPropagation()
        this.longTouch = false
        setTimeout(()=>{
            this.longTouch = true
        }, 200)
        this.touchstartx =  evt.touches[0].pageX
    }
    onTouchMoveHandler(evt) {
        evt.stopPropagation()
        this.touchmovex =  evt.touches[0].pageX
        this.movex = this.touchstartx - this.touchmovex
    }
    changeYearRangeHandler(evt){
        evt.stopPropagation()
        const clientWidth = this.screen.width
        const absX = Math.abs(this.movex)
        if(this.longTouch === true) {
            // 长滑动是翻页
            // TODO 这里要做缓存处理
            if (absX > clientWidth / 3) {
                this.setYearRange(this.movex)
            }
        }else{
            // deal click event
            const year = parseInt(evt.target.closest('.item').dataset.year)
            this.setItem(year, 'year')
        }
    }
    changeMonthHandler(evt){
        evt.stopPropagation()
        // deal click event
        const month = parseInt(evt.target.closest('.item').dataset.month)
        this.setItem(month, 'month')
    }
    getYears(year){
        const startYear = year - 6
        const endYear = year + 6
        let years = []
        for(let i = startYear; i < endYear; i++){
            years.push(i)
        }
        return years
    }
    setYearRange(type){
        let {years} = this.state
        if(type > 0){// left
            const last = years[years.length-1]
            const max = last + 12
            for(let i = last; i < max; i++ ){
                years.push(i)
            }
            years.splice(0, 12)
        }else {// right
            const first = years[0]
            const min = first - 12
            for(let i = first-1; i > min; i--){
                years.unshift(i)
            }
            years = years.slice(0, 12)
        }
        this.setState({
            years: years
        })
    }
    renderYearSelect(evt){
        this.props.titleClick(evt)
        this.setState({
            changeDate: true,
            changeYear: true,
            changeMonth: false
        })
    }
    renderMonthSelect(evt){
        this.props.titleClick(evt)
        this.setState({
            changeDate: true,
            changeYear: false,
            changeMonth: true
        })
    }
    renderTitle(){
        const {changeDate, changeYear, changeMonth, date, years} = this.state
        const year = date.getFullYear()
        const month = date.getMonth()
        if(!changeDate){ // 切换时间 or 月份
            return (<p><span
                onClick={this.renderYearSelect.bind(this)}>{year}</span>年<span
                onClick={this.renderMonthSelect.bind(this)}>{month+1}</span>月</p>)
        }else if(changeYear){
            return (<p><span>{years[0]}年-{years.slice(-1)[0]}年</span></p>)
        }else if(changeMonth) {
            return (<p><span
                onClick={this.renderYearSelect.bind(this)}>{year}</span>年{month+1}月</p>)
        }
    }
    renderContent(){
        const {changeDate, changeYear, changeMonth, date, years} = this.state
        const year = date.getFullYear()
        const month = date.getMonth()
        if(!changeDate){ // 切换时间 or 月份
            return ''
        }else if(changeYear){
            // 获取年的范围
            return (<div className="ph-c-top-panel-container"><div
                className="ph-c-top-panel-content"
                onTouchStart={::this.onTouchStartHandler}
                onTouchMove={::this.onTouchMoveHandler}
                onTouchEnd={::this.changeYearRangeHandler}><ul className="ph-c-clearfix">{
                years.map((item, index)=>{
                    return <li key={index} className="item" data-year={item}><div className={ item == year ? 'active' : ''}>{ item }</div></li>
                })
            }</ul></div></div>)
        }else if(changeMonth) {
            return (<div className="ph-c-top-panel-container"><div
                className="ph-c-top-panel-content"
                onClick={::this.changeMonthHandler}
            ><ul className="ph-c-clearfix">{
                [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((item, index)=>{
                    return <li key={index} className="item" data-month={item}><div className={ item == month ? 'active' : ''}>{ item+1 }月</div></li>
                })
            }</ul></div></div>)
        }
    }
    setItem(data, type){
        const date = this.state.date
        if(type == 'year'){
            date.setFullYear(data)
            this.setState({
                date: date,
                changeDate: true,
                changeYear: false,
                changeMonth: true
            })
        }
        if(type == 'month'){
            date.setMonth(data)
            this.props.dateChanged(date)
            this.setState({
                date: date,
                changeDate: false,
                changeYear: false,
                changeMonth: false
            })
        }
    }
    render(){
        return (
            <div className="ph-c-top-panel">
                <div className="ph-c-top-panel-title">{
                    this.renderTitle()
                }</div>
                {
                    this.renderContent()
                }
            </div>
        )
    }
}