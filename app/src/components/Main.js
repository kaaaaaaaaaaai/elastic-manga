import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import { FormControl, FormLabel, FormControlLabel } from 'material-ui/Form';
import Grid from 'material-ui/Grid';
import Radio, { RadioGroup } from 'material-ui/Radio';
import Paper from 'material-ui/Paper';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    demo: {
        height: 240,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        height: '100%',
    },
    control: {
        padding: theme.spacing.unit * 2,
    },
    card: {
        maxWidth: 345,
    },
    media: {
        height: 200,
    }
});


class Main extends React.Component {

    constructor(props){
        super(props)
        this.handleChange = this.handleChange.bind(this)
        this.state = {
            data: []
        }
    }

    handleChange(event){
        console.log(event.target.value)
        console.log("call API")
        var arr = [
            {
                img_url:"https://i0.wp.com/solife-a.com/wp-content/uploads/2015/04/%E3%82%88%E3%81%A4%E3%81%B0%E3%81%A8%EF%BC%81.jpg?fit=315%2C291"
            },{
                img_url:"https://lh3.googleusercontent.com/-Hhd085ONnYI/VvIyEID8OlI/AAAAAAAAA2w/3WPb-KMHZEk/Yotsuba.png?imgmax=1600"
            },{
                img_url:"http://livedoor.blogimg.jp/jin115/imgs/0/2/022379f3.jpg"
            },{
                img_url:"http://cached2.static.festy.jp/thumbnail/?mediaPath=festy_production%2F2015%2F11%2F21%2F07%2F46%2F08%2F758%2Frzn1ssx.jpg&width=620&height&sha=8036a093e155cc5c784c21c4911819d1cd86ec60"
            },{
                img_url:"http://blogimg.goo.ne.jp/user_image/71/33/a738433ee6c87dd65d22ba8af074fff8.jpg"
            },
        ]
        this.setState({data:this.random(arr, 3)})
    };

    random(array, num) {
        var a = array;
        var t = [];
        var r = [];
        var l = a.length;
        var n = num < l ? num : l;
        while (n-- > 0) {
            var i = Math.random() * l | 0;
            r[n] = t[i] || a[i];
            --l;
            t[i] = t[l] || a[l];
        }
        return r;
    }


    render() {
        const { classes } = this.props;

        const cards = this.state.data.map(function(_data, index){
            return (
                <Grid item md={4} sm={4} xs={4} key={index}>
                <Card className={classes.card}>
                <CardMedia
                    className={classes.media}
                    image={_data.img_url}
                    title="Contemplative Reptile"
                />
                {/*<CardContent>*/}
                    {/*<Typography variant="headline" component="h2">*/}
                        {/*Lizard*/}
                    {/*</Typography>*/}
                    {/*<Typography component="p">*/}
                        {/*Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging*/}
                        {/*across all continents except Antarctica*/}
                    {/*</Typography>*/}
                {/*</CardContent>*/}
                <CardActions>
                    <Button size="small" color="primary">
                        Share
                    </Button>
                    <Button size="small" color="primary">
                        Learn More
                    </Button>
                </CardActions>
            </Card>
                </Grid>
                    )
        });
        return (
            <Grid container className={classes.root}>
                <Grid item xs={12} md={12} lg={12}>
                    <Grid
                        container
                        className={classes.demo}
                        alignItems="center"
                        justify="center"
                    >
                            <Grid item>
                                <Paper
                                    className={classes.paper}
                                >
                                    <FormControl fullWidth className={classes.formControl}>
                                        <InputLabel htmlFor="amount">Search</InputLabel>
                                        <Input
                                            id="adornment-amount"
                                            onChange={this.handleChange}
                                        />
                                    </FormControl>
                                </Paper>
                            </Grid>
                    </Grid>
                </Grid>
                <Grid container>
                    {cards}
                </Grid>
            </Grid>
        )

    }
}

export default withStyles(styles)(Main);
