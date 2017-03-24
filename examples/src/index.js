import React, {Component, PropTypes} from 'react'
import ReactDom from 'react/lib/ReactDOM'
import PhCalendar from '../../src/index.js'
import './demo.less'

class Demo extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            defaultDate: null,
            values: [new Date(2017, 1, 24), new Date(2017, 2, 10)],
            disabled:[new Date(2017, 2, 14), new Date(2017, 2, 17)],// start end 包括
            config: {

            }
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
        return (
            <div className="rcs-demo">
                <PhCalendar values={this.state.values} dateChanged={this.chooseCallback} disabled={this.state.disabled} config={this.state.config}/>
            </div>
        )
    }
}

ReactDom.render(
    <Demo/>
    , document.getElementById('root')
)
