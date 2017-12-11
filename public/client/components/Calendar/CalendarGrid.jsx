import React from 'react';
import { GridList, GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import { blue50, blue200, grey900, lightBlue50, blueGrey50 } from 'material-ui/styles/colors';
import SvgIcons from 'material-ui/svg-icons';
import NavigationArrowForward from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import NavigationArrowBack from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import moment from 'moment';
import CalendarTile from './CalendarTile';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
require('./CalendarGrid.scss');

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
            backgroundColor: lightBlue50,
            color: grey900,
        },
        notThisMonth: {
            opacity: 0.5,
            backgroundColor: blueGrey50,
        }
    },
    gridListDayName: {
        width: '100%',
        height: 110,
    },
    dayNames: {
        height: 50,
        marginBottom: 20,
    },
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

const titleStyle = (schedule) => {
    
    if (!schedule) return;
    
    let style = {};
    
    if (schedule.items === 0) {
        style.titleBackground = 'rgba(0, 0, 0, 0)';
        style.titleStyle = {
            color: grey900,
        };
    } else {
        style.titleBackground = 'rgba(0, 32, 218, 0.4)'
    }
    
    return style;
}

class CalendarGrid extends React.Component {
    
    constructor(props) {
        super(props);
        
        this.forwardMonthClick = this.forwardMonthClick.bind(this);
        this.backMonthClick = this.backMonthClick.bind(this);
        this.insertSchedule = this.insertSchedule.bind(this);
        this.handleScheduleSubmit = this.handleScheduleSubmit.bind(this);
        this.handleScheduleCancel = this.handleScheduleCancel.bind(this); 
        this.scheduleDialogHandler = this.scheduleDialogHandler.bind(this);
        
        this.state = {
            startDay: startDay,
            endDay: endDay,
            monthOfSelected: moment(),
            calendar: this.constructCalendarObject({
                monthOfSelected: moment(),
                startDay: startDay,
                endDay: endDay,
            }).calendar,
            schedules: [],
            scheduleDialogOpen: false,
        }
    }
    
    forwardMonthClick() {
        this.setState((prevState, props) => {
            
            const calObject = this.constructCalendarObject(prevState, 1);
            this.getScheduleData(calObject.calendar);
            
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
            
            this.getScheduleData(calObject.calendar);
            
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
            startDay,
            endDay,
            newMonthOfSelected,
            calendar,
        }
    }
    
    insertSchedule(schedules, calendarDate) {
        
        let items = 0;
        let titles = "";
        let descs = "";
        let id;
        
        if (schedules && calendarDate) {
            for(let i = 0; i < schedules.length; i++) {
                if (schedules[i].date_from === calendarDate.format('YYYY-MM-DD')) {
                    items++;
                    titles = titles + (items > 1 ? ", " : "") + schedules[i].title;
                    descs = descs + (items > 1 ? ", " : "") + schedules[i].description;
                    id = schedules[i].id;
                }
            }
        }
        
        return {
            title: titles,
            description: descs,
            items: items,
            id: id,
        }
    }
    
    getScheduleData(calendar) {
        const self = this;
        fetch('http://localhost:8000/api/schedule/?api_token=' + self.props.apiToken + 
        '&start_date=' + calendar[0].exactDate.format('YYYY-MM-DD') + 
        '&end_date=' + calendar[calendar.length -1].exactDate.format('YYYY-MM-DD'))
        .then(function(response) {
            return response.json()
        }).then(function(data) {
            //self.setState({ data }, () => console.log(self.state));
            if (data && data.status === 'success'){
                self.setState({
                    schedules: data.schedules,
                });
            }
        });
    }
    
    handleScheduleCancel() {
        this.setState({
            scheduleDialogOpen: false,
        });
    }
    
    handleScheduleSubmit() {
        const self = this;
        fetch('http://localhost:8000/api/login/?email=' + self.state.email + '&password=' + self.state.password )
        .then(function(response) {
            return response.json()
        }).then(function(data) {
            //self.setState({ data }, () => console.log(self.state));
            if (data && data.status === 'success'){
                self.setState({
                    loggedIn: true,
                    loggedInToken: data.api_token,
                });
                
                localStorage.setItem('session', JSON.stringify({
                    loggedIn: true,
                    loggedInToken: data.api_token,
                }))
                
                self.handleAddScheduleCancel();
            }
        });
    }
    
    componentDidMount(){
        this.getScheduleData(this.state.calendar);
    }
    
    scheduleDialogHandler(e, scheduleState) {
        e.preventDefault();
        
        this.setState(scheduleState);
    }
    
    render(){
        
        const actions = [
            <FlatButton
            label="Cancel"
            primary={true}
            onClick={this.handleScheduleCancel}
            />,
            <FlatButton
            label="Submit"
            primary={true}
            keyboardFocused={true}
            onClick={this.handleScheduleSubmit}
            />,
        ];
        
        return (<div style={styles.root}>
            <GridList style={styles.gridListDayName} cellHeight={180} cols={7}>
            <Subheader className="grid-list__heading__container">
            <h3 className="grid-list__heading">{this.state.monthOfSelected.clone().format('MMMM YYYY')}</h3>
            <div className="calendar-nav">
            <IconButton tooltip="Back">
            <NavigationArrowBack onClick={this.backMonthClick} />
            </IconButton>
            <IconButton tooltip="Forward">
            <NavigationArrowForward onClick={this.forwardMonthClick}/>
            </IconButton>
            </div>
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
                this.state.calendar.map((day, index) => {
                    
                    const schedule = this.insertSchedule(this.state.schedules, day.exactDate);
                    
                    return (
                        <CalendarTile
                        key={index}
                        title={day.date}
                        subtitle={schedule.title}
                        titleBackground={titleStyle(schedule).titleBackground}
                        className="tiles"
                        style={getTileStyle(day, index)}
                        titleStyle={titleStyle(schedule).titleStyle}
                        isThisMonth={day.isThisMonth}
                        hasSchedule={schedule.id}
                        handler={this.scheduleDialogHandler}
                        actualDate={day}
                        >
                        </CalendarTile>
                    )
                }
                
            )
        }
        </GridList>
        
        <Dialog
            title="Add Item"
            actions={actions}
            modal={false}
            open={this.state.scheduleDialogOpen}
            onRequestClose={this.handleScheduleCancel}
        >
            <DatePicker 
                hintText="Schedule Date" 
                value={this.state.scheduleDate}
            />
            <TextField
                hintText="Schedule Title"
                id="schedule_title"
                onChange={this.handleFieldChange}
                value={this.state.scheduleTitle}
            />
            <TextField
                hintText="Schedule Description"
                id="schedule_Description"
                onChange={this.handleFieldChange}
            />
        </Dialog>
        </div>
    )
}
}

export default CalendarGrid;