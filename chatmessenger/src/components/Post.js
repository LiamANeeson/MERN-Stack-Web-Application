import React from "react";
import {
  Button,
  CardActions,
  Card,
  CardActionArea,
  CardContent,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { getLikedPosts, getSavedPosts } from "../utils/utils";



const useStyles = makeStyles((theme) => ({
  card: {
    marginBottom: theme.spacing(5),
  },
  media: {},
}));

const Post = props => {
  const classes = useStyles();

  async function savePost(postID) {
    const response = await fetch("http://localhost:1337/api/save-post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        postID: postID,
      }),
    });

    const data = await response.json();
    if (data.status === "ok") {
      getSavedPosts(props.setSavedPosts)
    }
  }

  async function likePost(postID) {
    const response = await fetch("http://localhost:1337/api/like-post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        postID: postID,
      }),
    });
    console.log(response)
    const data = await response.json();
    if (data.status === "ok") {
      getLikedPosts(props.setLikedPosts)
    }
  }

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5">
            {props.title}
          </Typography>
          <Typography variant="subtitle1">
            {props.author}
          </Typography>
          <Typography variant="body1">
            {props.text}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button>Share</Button>
        <Button
          onClick={() => likePost(props.id)}
          disabled={props.isLikedPost}>
            {props.isLikedPost ? "Liked" : "Like"}
        </Button>
        <Button
          onClick={() => savePost(props.id)}
          disabled={props.isSavedPost}>
            {props.isSavedPost ? "Saved" : "Save"}
        </Button>
      </CardActions>
    </Card>
  );
};

export default Post;
