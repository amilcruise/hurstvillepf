import React from 'react';
import GridTile from 'material-ui/GridList/GridTile';
import IconButton from 'material-ui/IconButton';
import AddIcon from 'material-ui/svg-icons/content/add-box';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import ViewIcon from 'material-ui/svg-icons/image/remove-red-eye';
import { grey700, grey900 } from 'material-ui/styles/colors';

class CalendarTile extends React.Component {
    
    constructor(props) {
        
        super(props);
        
        this.mouseEnter = this.mouseEnter.bind(this);
        this.mouseLeave = this.mouseLeave.bind(this);
        this.handleAddSchedule = this.handleAddSchedule.bind(this);
        this.handleEditSchedule = this.handleEditSchedule.bind(this);
        this.handleDeleteSchedule = this.handleDeleteSchedule.bind(this);
        this.handleViewSchedule = this.handleViewSchedule.bind(this);
        
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
            scheduleDescription: this.props.description,
            scheduleDate: this.props.actualDate.exactDate.toDate(),
            scheduleAction: 'add',
        }
        
        this.props.handler(e, scheduleDialogState);
    }
    
    handleEditSchedule(e) {   
        
        const scheduleDialogState = {
            scheduleDialogOpen: true,
            scheduleTitle: this.props.subtitle,
            scheduleDescription: this.props.description,
            scheduleDate: this.props.actualDate.exactDate.toDate(),
            scheduleAction: 'edit',
            scheduleId: this.props.hasSchedule,
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

    handleViewSchedule(e) {
        this.props.viewHandler(e, {
            scheduleTitle: this.props.subtitle,
            scheduleDescription: this.props.description,
            scheduleDate: this.props.actualDate.exactDate.toDate(),
            scheduleId: this.props.hasSchedule,
        })
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
                        style={{marginLeft: 'calc(50% - 24px)'}}
                        iconStyle={{color: grey700}}
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
                            tooltipPosition="bottom-right"
                            onClick={this.handleEditSchedule}
                            style={{padding:5, width: 20, height: 20}}
                            iconStyle={{width: 18, height: 18, color: grey700}}
                        >
                            <EditIcon />
                        </IconButton>
                        <IconButton
                            tooltip="View"
                            onClick={this.handleViewSchedule}
                            style={{position:'absolute', left: '50%', marginLeft: -30, top: 5}}
                            iconStyle={{width: 40, height: 40}}
                         >
                            <ViewIcon />
                        </IconButton>
                        <IconButton 
                            tooltip="Delete Item"
                            tooltipPosition="bottom-left"
                            onClick={this.handleDeleteSchedule}
                            style={{padding:5, width: 20, height: 20, float: 'right', marginRight: 5}}
                            iconStyle={{width: 18, height: 18, color: grey700 }}
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