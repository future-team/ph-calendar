import React, {Component, PropTypes} from 'react'
import ReactDom from 'react/lib/ReactDOM'
import PhCalendar from '../../src/index.js'
import './demo.less'

class Demo extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            values: [new Date(2017, 1, 24), new Date(2017, 2, 25)],
            disabled: [new Date(2017, 2, 14), new Date(2017, 2, 17), new Date(2017, 2, 3)],// start end 包括
            weekStart: 1,
            monthCount: 3,
            range: true,
            monthStart: 'top', //['top', 'center', 'bottom']
            //weekLabel: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
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
            ]
        }
    }
    componentWillMount() {}
    componentDidMount() {}
    componentWillReceiveProps() {}
    shouldComponentUpdate() {return true}
    chooseCallback(data){
        console.log('选择后的日期', data)
    }
    render() {
        const {values, disabled, weekStart, events, weekLabel, range, monthCount, monthStart} = this.state
        return (
            <div className="rcs-demo">
                <PhCalendar values={values}
                    dateChose={this.chooseCallback}
                    disabled={disabled}
                    events={events}
                    monthCount={monthCount}
                    weekStart={weekStart}
                    weekLabel={weekLabel}
                    range={range}
                    monthStart={monthStart}
                />
            </div>
        )
    }
}
ReactDom.render(
    <Demo/>
    , document.getElementById('root')
)
