import React, { Component } from 'react';
import Grid from 'material-ui/Grid';
import Helmet from "react-helmet";
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import Avatar from 'material-ui/Avatar';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import Attachment from "material-ui-icons/Attachment"
import axios from "axios/index";

const styles = theme => ({
    card: {
        maxWidth: 345,
    },
    media: {
        height: 200,
    },
    demo: {
        height: 240,
        margin: 50
    },
    url_text:{
        textAlign: "center"
    }
});

const s3 = "https://s3-ap-northeast-1.amazonaws.com/manga-one";


class Detail extends React.Component{
    constructor(props){
        super(props)
        this.getDataById = this.getDataById.bind(this)

        this.state = {image_url:"http://www.filife.com/wp-content/themes/qaengine/img/default-thumbnail.jpg"}
        console.log(this.state.image_url);

        if(typeof(this.props.location.state) == "undefined"){
            console.log("aaaaaaa")
            this.getDataById(this.props.match.params.id)
        }else{
            console.log("bbbbb")

            this.state = this.props.location.state
        }
    }

    componentWillMount() {
        this.setState({image_url:"http://www.filife.com/wp-content/themes/qaengine/img/default-thumbnail.jpg"})

    }

    getDataById(id){
        console.log()
        axios.get(`http://localhost:9200/prod/image/${id}`).then((res) => {
            console.log(res)
            this.setState(res.data._source)
        });
    }
    render(){
        const {classes} = this.props
        return (
            <Grid container>
                <Helmet title={'sambaiz.net'}
                        meta={[
                            {"name": "twitter:card", "content": "summary"},
                            {"name": "twitter:title", "content": "漫画1コマ検索"},
                            {"name": "twitter:description", "content": "漫画1コマ検索"},
                            {"property": "og:title", "content": "漫画1コマ検索"},
                            {"property": "og:type", "content": "blog"},
                            {"property": "og:image", "content": "http://d2wgaf7ubdj1mv.cloudfront.net/my.jpg"},
                            {"property": "og:url", "content": window.location.href}
                        ]}
                />
                <Grid container>
                    <Grid
                        container
                        className={classes.demo}
                        alignItems="center"
                        justify="center"
                    >
                        <Grid item md={4} sm={4} xs={4}></Grid>
                        <Grid item md={4} sm={4} xs={4}>
                            <Card className={classes.card}>
                                <CardMedia
                                    className={classes.media}
                                    image={`${s3}/thumbnails/${this.state._id}.${this.state._source.extension}`}
                                    title="Contemplative Reptile"
                                />
                            </Card>
                        </Grid>
                        <Grid item md={4} sm={4} xs={4}></Grid>

                        <Paper className={classes.paper}>
                        <Grid container wrap="nowrap">
                            <Grid item>
                                <Typography className={classes.url_text}><Attachment></Attachment></Typography>
                            </Grid>
                            <Grid item xs>
                                <Typography className={classes.url_text}>{window.location.href}</Typography>
                            </Grid>
                        </Grid>
                    </Paper>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

export default withStyles(styles)(Detail)