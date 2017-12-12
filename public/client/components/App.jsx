import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DashboardContainer from './Dashboard/DashboardContainer';
import { BrowserRouter } from 'react-router-dom'

export default class App extends React.Component {

  constructor(props) {
    super(props); 
  }

  routeHandler(e, monthYear) {
    if (e) e.preventDefault();

    this.setState((prevState, props) => {

      // var attributeId = 1;
      // var stateObj = { page: monthYear };
      // history.pushState(stateObj, "Calendar", "/"+ attributeId);

      return { 
        monthYear: monthYear
      }
    });
  }
  
  render() {

    return (
      <BrowserRouter>
        <MuiThemeProvider>
          <DashboardContainer />
        </MuiThemeProvider>
      </BrowserRouter>
    );
  }
}