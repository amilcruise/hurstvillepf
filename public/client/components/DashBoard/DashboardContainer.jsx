import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import AppBar from 'material-ui/AppBar';
import Calendar from '../Calendar/Calendar';
import TopAppMenu from './TopAppMenu';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';

const styles = {
    raisedButton: {
        height: 0,
        marginTop: 10,
    }
};



class DashboardContainer extends React.Component {

    constructor(props) {
        super(props);

        this.handleSignInClick = this.handleSignInClick.bind(this);
        this.handleSignInClose = this.handleSignInClose.bind(this);
        this.handleSignInSubmit = this.handleSignInSubmit.bind(this);
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handler = this.handler.bind(this);

        let session = localStorage.getItem("session");

        if (session) {
            session = JSON.parse(session);
        }

        this.state = {
            signInDialogOpen: false,
            email: '',
            password: '',
            loggedIn: session ? session.loggedIn : false,
            loggedInToken: session ? session.loggedInToken : null,
        }
    }

    handleSignInClick() {
        this.setState({
            signInDialogOpen: true,
        });
    }

    handleSignInClose() {
        this.setState({
            signInDialogOpen: false,
        });
    }

    handleSignInSubmit() {
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

                self.handleSignInClose();
            }
        });
    }

    handleFieldChange(event) {
        console.log(self);
        if (event.target.id === 'login_email') {
            this.setState({
                email: event.target.value
            });
        } else if (event.target.id === 'login_password') {
            this.setState({
                password: event.target.value
            });
        }
    }

    handler(e) {
        e.preventDefault();

        localStorage.setItem('session','');

        this.setState({
            loggedIn: false,
            loggedInToken: null,
        });
      }

    render (){

        const actions = [
            <FlatButton
              label="Cancel"
              primary={true}
              onClick={this.handleSignInClose}
            />,
            <FlatButton
              label="Submit"
              primary={true}
              keyboardFocused={true}
              onClick={this.handleSignInSubmit}
            />,
        ];

        return (
            <div>
                <AppBar title="Hurstville Pathfinder" showMenuIconButton={false} >
                    
                    { !this.state.loggedIn && (
                         <RaisedButton 
                            label="Sign In" 
                            style={styles.raisedButton}
                            onClick={this.handleSignInClick}
                          />
                    )} 
                    { this.state.loggedIn && (<TopAppMenu signOut={this.handler} />) }
                </AppBar>

                { this.state.loggedIn && (<Calendar apiToken={this.state.loggedInToken} />) }

                <Dialog
                    title="Sign In"
                    actions={actions}
                    modal={false}
                    open={this.state.signInDialogOpen}
                    onRequestClose={this.handleSignInClose}
                    >
                    <TextField
                        hintText="email"
                        id="login_email"
                        onChange={this.handleFieldChange}
                    />
                    <TextField
                        hintText="password"
                        id="login_password"
                        onChange={this.handleFieldChange}
                        type="password"
                    />
                </Dialog>
            </div>
        )
    }
};

export default DashboardContainer;