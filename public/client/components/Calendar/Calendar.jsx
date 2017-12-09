import React from 'react';
import moment from 'moment';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import { blue50,blue200 } from 'material-ui/styles/colors';

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

const dayNames = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
]
let calendar = [];
const thisMonth = moment().month() + 1;
const index = startDay.clone();

while (index.isBefore(endDay, 'day')) {
    const dateClone = index.clone();

    calendar.push(
        {
            date: index.add(1, 'day').date() + '',
            isThisMonth: thisMonth == dateClone.add(1, 'day').month() + 1,
        }
    );
}

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

const Calendar = () => (
    <div style={styles.root}>
    <GridList style={styles.gridListDayName} cellHeight={180} cols={7}>
    <Subheader>December</Subheader>
    {
        dayNames.map((day, index) => 
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
        calendar.map((day, index) => 
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
);

export default Calendar;