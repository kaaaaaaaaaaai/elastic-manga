import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { createMuiTheme } from 'material-ui/styles';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import createPalette from 'material-ui/styles/createPalette';
import blue from 'material-ui/colors/blue';
import pink from 'material-ui/colors/pink';
import red from 'material-ui/colors/red';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Main from "./components/Main";

const theme = createMuiTheme({
    palette: createPalette({
        primary: blue,
        accent: pink,
        error: red,
    }),
});

const styles = {
    root: {
        width: '100%',
    },
};

class App extends Component {
    render() {
    const { classes } = this.props;
    return (
        <MuiThemeProvider theme={theme}>
            <div className="App">
                <div className={classes.root}>
                    <AppBar position="static" color="primary">
                        <Toolbar>
                            <Typography variant="title" color="inherit">
                                1 piece
                            </Typography>
                        </Toolbar>
                    </AppBar>
                </div>

                <Main />
            </div>
        </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)(App);
