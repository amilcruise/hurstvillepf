import React from 'react';

class ScheduleEditDialog extends React.Component{
    render() {
        return (
            <Dialog
            title="Add Item"
            actions={actions}
            modal={false}
            open={this.state.scheduleDialogOpen}
            onRequestClose={this.handleScheduleCancel}
        >
            <DropDownMenu style={{display:'inline-block'}} value={this.state.scheduleGroup} onChange={this.handleGroupChange}>
                <MenuItem value={1} primaryText="Team 1" />
                <MenuItem value={2} primaryText="Team 2" />
                <MenuItem value={3} primaryText="Team 3" />
            </DropDownMenu>
            <DatePicker 
                hintText="Schedule Date"
                id="schedule_date_from"
                hintText="Schedule Date" 
                value={this.state.scheduleDate}
                onChange={this.handleScheduleDateChange}
                floatingLabelText="Schedule Date"
                style={{display:'inline-block',float: 'right'}}
            />
            <TextField
                hintText="Schedule Title"
                id="schedule_title"
                onChange={this.handleScheduleDialogOnChange}
                value={this.state.scheduleTitle}
                floatingLabelText="Schedule Title"
                style={{width:'100%'}}
            />
            <TextField
                hintText="Schedule Description"
                id="schedule_description"
                onChange={this.handleScheduleDialogOnChange}
                value={this.state.scheduleDescription}
                multiLine={true}
                floatingLabelText="Schedule Description"
                className="schedule-description"
            />
        </Dialog>
        )
    }
}