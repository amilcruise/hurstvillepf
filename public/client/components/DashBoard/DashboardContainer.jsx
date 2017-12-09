import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import Calendar from '../Calendar/Calendar';

const DashboardContainer = () => (
    <div>
        <AppBar title="Hurstville Pathfinder" showMenuIconButton={false} />
        <Calendar />
    </div>
);

export default DashboardContainer;