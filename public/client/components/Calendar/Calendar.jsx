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
    }

    render() {
        return (
            <CalendarGrid 
                dayNames={dayNames}
            />
    )}
}

export default Calendar;
