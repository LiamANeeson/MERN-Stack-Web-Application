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

const Post = () => {
  const classes = useStyles();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (!posts.length) getPosts();
  }, [posts]);

  const getPosts = () => {
    axios
      .get("http://localhost:1337/api/posts", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setPosts(response.data.posts);
        console.log("Data has been received!");
      })
      .catch((err) => {
        console.log(err);
        alert("Error retrieving data!!!");
      });
  };
  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia className={classes.media} title="My Post" />
        <CardContent>
          <Typography gutterBottom variant="h5">
            {posts.title}
          </Typography>
          <Typography variant="body">
            Contrary to popular belief, Lorem Ipsum is not simply random text.
            It has roots in a piece of classical Latin literature from 45 BC,
            making it over 2000 years old. Richard McClintock, a Latin professor
            at Hampden-Sydney College in Virginia, looked up one of the more
            obscure Latin words, consectetur, from a Lorem Ipsum passage, and
            going through the cites of the word in classical literature,
            discovered the undoubtable source. Lorem Ipsum comes from sections
            1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes
            of Good and Evil) by Cicero, written in 45 BC. This book is a
            treatise on the theory of ethics, very popular during the
            Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit
            amet..", comes from a line in section 1.10.32.
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
