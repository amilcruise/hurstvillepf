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

const getTileStyle = (day, index) => {
    const isToday = day.date == moment().date() ? 'today' : 'notToday';
    console.log(day.date == moment().date());
    
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
        
        this.forwardMonthClick = this.forwardMonthClick.bind(this);
        this.backMonthClick = this.backMonthClick.bind(this);
    }
    
    forwardMonthClick(month, nextMonth) {
        
    }
    
    backMonthClick(month, prevMonth) {
        
    }

    // componentDidMount(){
    //     this.constructCalendarObject();
    // }
    
    // componentDidUpdate(){
    //     this.constructCalendarObject();
    // }
    
    render(){
        return <div style={styles.root}>
        <GridList style={styles.gridListDayName} cellHeight={180} cols={7}>
        <Subheader>
        December
        <IconButton tooltip="Back">
        <NavigationArrowBack onClick={this.forwardMonthClick} />
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
            this.props.calendar.map((day, index) => 
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