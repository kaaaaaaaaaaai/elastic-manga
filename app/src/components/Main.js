import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import { FormControl, FormLabel, FormControlLabel } from 'material-ui/Form';
import Grid from 'material-ui/Grid';
import Radio, { RadioGroup } from 'material-ui/Radio';
import Paper from 'material-ui/Paper';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import axios from "axios"
import Typography from 'material-ui/Typography';
import { Link } from 'react-router-dom'


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

const s3 = "https://s3-ap-northeast-1.amazonaws.com/manga-one";

class Main extends React.Component {

    constructor(props){
        super(props)
        this.handleChange = this.handleChange.bind(this)
        this.state = {
            data: []
        }
        this.getAll()
    }
    getAll(){
        var query = {
            "size": 10
        };
        axios.get("https://search-manga-image-sdozidc55hog2xc6ryonyshlja.ap-northeast-1.es.amazonaws.com/prod/image/_search", {
            params: {
                source: JSON.stringify(query),
                source_content_type: 'application/json'
            }
        }).then((res) => {
            console.log(res)
            console.log(res.data.hits.hits);
            this.setState({data :res.data.hits.hits})
        });
    }
    handleChange(event){
        console.log(event.target.value)
        console.log("call API")
        var query = {
            "query": {
                "constant_score": {
                    "filter": {
                        "bool": {
                            "should": [
                                {
                                    "term": {
                                        "tags.keyword": event.target.value
                                    }
                                },
                                {
                                    "wildcard": {
                                        "plane_tags.keyword": `*${event.target.value}*`
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        }
        console.log(query)
        axios.get("https://search-manga-image-sdozidc55hog2xc6ryonyshlja.ap-northeast-1.es.amazonaws.com/image/_search", {
            params: {
                source: JSON.stringify(query),
                source_content_type: 'application/json'
            }
        }).then((res) => {
            console.log(res)
            console.log(res.data.hits.hits);
            this.setState({data :res.data.hits.hits})
        });
    };


    render() {
        const { classes } = this.props;

        const cards = this.state.data.map(function(_data, index){
            return (
                <Grid item md={4} sm={4} xs={4} key={index}>
                <Card className={classes.card}>
                <CardMedia
                    className={classes.media}
                    image={`${s3}/thumbnails/${_data._id}.${_data._source.extension}`}
                    title="Contemplative Reptile"
                />
                <CardActions>
                    <Link to={{pathname:`/images/${_data._id}`, state:_data}}>
                        <Button variant="raised" fullWidth={true} color="primary">
                            get Share URL
                        </Button>
                    </Link>
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
                                    <FormControl className={classes.formControl}>
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
