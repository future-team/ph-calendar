# ph-calendar
calendar component for phoenix-ui

# Install
```javascript
$ npm install ph-calendar --save 
```
# Usage

```javascript
import React, {Component, PropTypes} from 'react'
import PhCalendar from 'ph-calendar'

class Demo extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            values: [new Date(2017, 1, 24), new Date(2017, 2, 10)],
            disabled:[new Date(2017, 2, 14), new Date(2017, 2, 17)],// start end 包括
        }
    }
    chooseCallback(data){
        console.log('choose date', data)
    }
    render() {
        return (
            <div className="rcs-demo">
                <PhCalendar values={this.state.values} dateChanged={this.chooseCallback} disabled={this.state.disabled}/>
            </div>
        )
    }
}
```

# Documentation
`values` <Array>: set calendar choose range or date, if set two `Date` that mean should choose range, or only one `Date` mean select     
`dateChanged` <Function>: set calendar choose range or date, if set two `Date` that mean should choose range, or only one `Date` mean select     
`disabled` <Array>: set calendar disabled range or date, if set two `Date` that mean disabled range, or mean only disabled some date in this array    

# Example


# Command

# Repair