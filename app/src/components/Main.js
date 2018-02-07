import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';


const styles = {
    root: {
        width: '100%',
    },
};

class Main extends Component {

    constructor(props){
        super(props)
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                {/*search bar*/}

                {/* result box */}
            </div>
        );
    }
}

export default withStyles(styles)(Main);
