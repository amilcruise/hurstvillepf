import React from 'react';
import moment from 'moment';
import CalendarGrid from './CalendarGrid';

const startDay = moment().clone().startOf('month').startOf('week').add(-1, 'day');
const endDay = moment().clone().endOf('month').endOf('week');

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

        this.state = {
            startDay: startDay,
            endDay: endDay,
            calendar: [],
        }
        
        this.constructCalendarObject = this.constructCalendarObject.bind(this);
    }

    constructCalendarObject(){
        const thisMonth = moment().month() + 1;
        const index = this.state.startDay.clone();
        let calendar = [];
        
        while (index.isBefore(this.state.endDay, 'day')) {
            const dateClone = index.clone();
            
            calendar.push(
                {
                    date: index.add(1, 'day').date() + '',
                    isThisMonth: thisMonth == dateClone.add(1, 'day').month() + 1,
                }
            );
        }

        this.setState({
            calendar: calendar
        });
    }

    componentDidMount(){
        this.constructCalendarObject();
        console.log(this.state);
    }

    render() {
        return (
            <CalendarGrid 
                dayNames={dayNames}
                calendar={this.state.calendar}
            />
    )}
}

export default Calendar;

// const forwardMonthClick = (month, nextMonth) => {

// }

// const backMonthClick = (month, nextMonth) => {
    
// }
