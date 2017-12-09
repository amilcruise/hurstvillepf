import React from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import { blue50,blue200 } from 'material-ui/styles/colors';
import NavigationArrowForward from 'material-ui/svg-icons/navigation/arrow-forward';
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import moment from 'moment';

const styles = {
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        fontFamily: 'Roboto, sans-serif',
    },
    gridList: {
        width: '100%',
        height: 'auto',
    },
    tiles: {
        odd: {
            notToday: { 
                backgroundColor: blue50,
            },
            today: {
                backgroundColor: blue200,
            },
        },
        today: {
            backgroundColor: blue200,
        },
        notToday: {
            backgroundColor: {},
        },
        notThisMonth: {
            opacity: 0.2 
        }
    },
    gridListDayName: {
        width: '100%',
        height: 110,
    },
    dayNames: {
        height: 50,
        marginBottom: 20,
    }
};

const startDay = moment().clone().startOf('month').startOf('week').add(-1, 'day');
const endDay = moment().clone().endOf('month').endOf('week');

const getTileStyle = (day, index) => {
    const isToday = day.exactDate.format('YYYY-MM-DD') == moment().format('YYYY-MM-DD') ? 'today' : 'notToday';
    
    if (!day.isThisMonth) {
        return styles.tiles.notThisMonth;
    } else {
        if (index % 2) {
            return  styles.tiles[isToday];
        } else {
            return styles.tiles.odd[isToday];
        }
    }
}

class CalendarGrid extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            startDay: startDay,
            endDay: endDay,
            monthOfSelected: moment(),
            calendar: [],
        }
        
        this.forwardMonthClick = this.forwardMonthClick.bind(this);
        this.backMonthClick = this.backMonthClick.bind(this);
       //this.constructCalendarObject = this.constructCalendarObject.bind(this);
    }
    
    forwardMonthClick() {
        //const currentSelectedDate = this.state.startDay.clone();
        // const newStartDay = this.state.startDay.clone().add(1, 'M');
        // const newEndDay = this.state.endDay.clone().add(1, 'M');
        //console.log();

        this.setState((prevState, props) => {

            const calObject = this.constructCalendarObject(prevState, 1);

            return {
                startDay: calObject.newStartDay,
                endDay: calObject.newEndDay,
                monthOfSelected: calObject.newMonthOfSelected,
                calendar: calObject.calendar,
            }
        });
    }
    
    backMonthClick() {
        this.setState((prevState, props) => {

            const calObject = this.constructCalendarObject(prevState, -1);

            return {
                startDay: calObject.newStartDay,
                endDay: calObject.newEndDay,
                monthOfSelected: calObject.newMonthOfSelected,
                calendar: calObject.calendar,
            }
        });
    }

    constructCalendarObject(currentState, action){

        const newStartDay = currentState.monthOfSelected.clone().add(action,'M').startOf('month').startOf('week').add(-1, 'day');
        const newEndDay = currentState.monthOfSelected.clone().add(action,'M').endOf('month').endOf('week');
        const newMonthOfSelected = currentState.monthOfSelected.add(action,'M');

        const thisMonth = action ? newMonthOfSelected.month() + 1 : moment().month() + 1;
        const index = action ? newStartDay : currentState.startDay.clone();
        let calendar = [];

        
        while (index.isBefore(newEndDay, 'day')) {
            const dateClone = index.clone();
            
            calendar.push(
                {
                    date: index.add(1, 'day').date() + '',
                    exactDate: dateClone,
                    isThisMonth: thisMonth == dateClone.add(1, 'day').month() + 1,
                }
            );
        }

        return {
            newStartDay,
            newEndDay,
            newMonthOfSelected,
            calendar,
        };
    }

    componentDidMount(){
        this.setState((prevState, props) => {
            return {
                calendar: this.constructCalendarObject(prevState).calendar,
        }});
    }
    
    render(){
        return <div style={styles.root}>
        <GridList style={styles.gridListDayName} cellHeight={180} cols={7}>
        <Subheader>
            {this.state.monthOfSelected.clone().format('MMMM YYYY')}
        <IconButton tooltip="Back">
        <NavigationArrowBack onClick={this.backMonthClick} />
        </IconButton>
        <IconButton tooltip="Forward">
        <NavigationArrowForward onClick={this.forwardMonthClick}/>
        </IconButton>
        </Subheader>
        {
            this.props.dayNames.map((day, index) => 
            (
                <GridTile
                key={index}
                title={day}
                className="tiles"
                style={styles.dayNames}
                titleBackground='rgb(0, 150, 169)'
                >
                </GridTile>
            ))
        }
        </GridList>
        <GridList style={styles.gridList} cellHeight={120} cols={7}>
        {
            this.state.calendar.map((day, index) => 
            (
                <GridTile
                key={index}
                title={day.date}
                className="tiles"
                style={getTileStyle(day, index)}
                >
                </GridTile>
            )
        )
    }
    </GridList>
    </div>
}
}

export default CalendarGrid;