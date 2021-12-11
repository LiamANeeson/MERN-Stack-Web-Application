import { Container, makeStyles } from "@material-ui/core";
import { useState } from "react";
import Post from "./Post";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(10),
  },
}));

const Feed = () => {
  const classes = useStyles();
  return (
    <Container className={classes.container}>
      <Post title="Choose the perfect design" />
      <Post title="Simply Recipes Less Stress. More Joy" />
      <Post title="What To Do In London" />
    </Container>
  );
};

export default Feed;
