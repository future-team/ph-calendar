import React, {Component, PropTypes} from 'react'
import ReactDom from 'react/lib/ReactDOM'
import PhCalendar from '../../src/index.js'
import './demo.less'

class Demo extends Component {
    static propTypes = {
        date: PropTypes.object
    };
    static defaultProps={
        date: new Date()
    };
    constructor(props, context) {
        super(props, context)
        this.state = {
            defaultDate: null,
            date: new Date(),
            config: {}
        }
    }
    componentWillMount() {}
    componentDidMount() {}
    componentWillReceiveProps() {}
    shouldComponentUpdate() {return true}
    render() {
        return (
            <div className="rcs-demo">
                <PhCalendar date={this.state.date} config={this.state.config}/>
            </div>
        )
    }
}

ReactDom.render(
    <Demo/>
    , document.getElementById('root')
)
