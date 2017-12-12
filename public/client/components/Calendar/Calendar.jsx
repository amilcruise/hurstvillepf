import React from 'react';
import CalendarGrid from './CalendarGrid';

const dayNames = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
]

const calendar = [];

class Calendar extends React.Component {

    constructor(props) {
        super(props);

        console.log(this.props.signOut);
    }

    render() {
        return (
            <CalendarGrid 
                dayNames={dayNames}
                apiToken={this.props.apiToken}
                signOut={this.props.signOut}
                group={this.props.group}
            />
    )}
}

export default Calendar;
