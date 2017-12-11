import React from 'react';
import GridTile from 'material-ui/GridList/GridTile';
import IconButton from 'material-ui/IconButton';
import AddIcon from 'material-ui/svg-icons/content/add-box';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import DeleteIcon from 'material-ui/svg-icons/action/delete';

class CalendarTile extends React.Component {
    
    constructor(props) {
        
        super(props);
        
        this.mouseEnter = this.mouseEnter.bind(this);
        this.mouseLeave = this.mouseLeave.bind(this);
        this.handleAddSchedule = this.handleAddSchedule.bind(this);
        this.handleEditSchedule = this.handleEditSchedule.bind(this);
        this.handleDeleteSchedule = this.handleDeleteSchedule.bind(this);
        
        this.state = {
            isMouseInside: false,
        }
    }
    
    mouseEnter() {
        this.setState({ isMouseInside: true });
    }
    
    mouseLeave() {
        this.setState({ isMouseInside: false });
    }
    
    handleAddSchedule(e) {   
        
        const scheduleDialogState = {
            scheduleDialogOpen: true,
            scheduleTitle: this.props.subtitle,
            scheduleDescription: this.props.title,
            scheduleDate: this.props.actualDate.exactDate.toDate(),
            scheduleAction: 'add',
        }
        
        this.props.handler(e, scheduleDialogState);
    }
    
    handleEditSchedule(e) {   
        
        const scheduleDialogState = {
            scheduleDialogOpen: true,
            scheduleTitle: this.props.subtitle,
            scheduleDescription: this.props.title,
            scheduleDate: this.props.actualDate.exactDate.toDate(),
            scheduleAction: 'edit',
        }
        
        this.props.handler(e, scheduleDialogState);
    }
    
    handleDeleteSchedule(e) {   
        
        const scheduleDialogState = {
            scheduleDialogOpen: false,
            scheduleId: this.props.hasSchedule,
            scheduleAction: 'delete',
        }
        
        this.props.handler(e, scheduleDialogState);
    }
    
    render() {
        return (<GridTile
            title={this.props.title}
            subtitle={this.props.subtitle}
            titleBackground={this.props.titleBackground}
            className={this.props.className}
            style={this.props.style}
            titleStyle={this.props.titleStyle}
            onMouseEnter={this.mouseEnter}
            onMouseLeave={this.mouseLeave}
            >
            { this.state.isMouseInside && 
                this.props.isThisMonth &&
                this.props.subtitle === '' && (
                    <IconButton 
                    tooltip="Add Item"
                    onClick={this.handleAddSchedule}
                    >
                    <AddIcon />
                    </IconButton>
                )}
                
                { this.state.isMouseInside && 
                    this.props.isThisMonth &&
                    this.props.subtitle && (
                        <div className=''>
                        <IconButton 
                        tooltip="Edit Item"
                        onClick={this.handleEditSchedule}
                        >
                        <EditIcon />
                        </IconButton>
                        <IconButton 
                        tooltip="Delete Item"
                        onClick={this.handleDeleteSchedule}
                        >
                        <DeleteIcon />
                        </IconButton>
                        </div>
                    )}
                    
                    </GridTile>
                )
            } 
        }
        
        export default CalendarTile;