import { useEffect, useState } from "react";
import { Container, makeStyles } from "@material-ui/core";
import Post from "./Post";
import {getPosts} from '../utils/utils';

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(10),
  },
}));

const Feed = (props) => {
  const classes = useStyles();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (!posts.length) getPosts(setPosts);
  }, [posts]);

  const getFilteredPosts = () => {
    // if (authorFilterValue) {
    //   return posts.filter(post =>
    //     authorFilterValue.length ? post.author == authorFilterValue : true
    //   )
    // } else {
      return posts
    // }
  }

  return (
    <Container className={classes.container}>
      {
        getFilteredPosts().map(post =>
          <Post title={post.title} author={post.author} text={post.text} />
        )
      }
    </Container>
  );
};

export default Feed;
