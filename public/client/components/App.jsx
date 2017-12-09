import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DashboardContainer from './Dashboard/DashboardContainer';

export default class App extends React.Component {
  render() {
    return (
      <MuiThemeProvider>
        <DashboardContainer />
      </MuiThemeProvider>
    );
  }
}