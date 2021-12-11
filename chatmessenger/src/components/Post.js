import {
  Button,
  CardActions,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  makeStyles,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import React, { useState, useEffect } from "react";

const useStyles = makeStyles((theme) => ({
  card: {
    marginBottom: theme.spacing(5),
  },
  media: {},
}));

const Post = props => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia className={classes.media} title="My Post" />
        <CardContent>
          <Typography gutterBottom variant="h5">
            {props.title}
          </Typography>
          <Typography variant="subtitle1">
            {props.author}
          </Typography>
          <Typography variant="body">
            {props.text}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button>Share</Button>
        <Button>Like</Button>
        <Button>Save</Button>
      </CardActions>
    </Card>
  );
};

export default Post;
