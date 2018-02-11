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
import { BrowserRouter as Router, Route, Link , Switch} from 'react-router-dom'

import Detail from "./components/Detail"


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
    const { classes, history } = this.props;
    return (
        <Router history={history}>
            <MuiThemeProvider theme={theme}>
                <div className="App">
                    <div className={classes.root}>
                        <AppBar position="static" color="primary">
                            <Toolbar>
                                <Typography variant="title" color="inherit">
                                    漫画1コマ検索
                                </Typography>
                            </Toolbar>
                        </AppBar>
                    </div>
                    <div>
                        <Switch>
                            <Route exact path='/' component={Main} />
                            <Route path='/images/:id' component={Detail} />
                        </Switch>
                    </div>
                </div>
            </MuiThemeProvider>
        </Router>
    );
  }
}

export default withStyles(styles)(App);
