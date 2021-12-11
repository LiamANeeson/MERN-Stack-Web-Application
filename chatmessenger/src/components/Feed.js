import { useEffect } from "react";
import { Container, makeStyles } from "@material-ui/core";
import Post from "./Post";
import {getPosts} from '../utils/utils';

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(10),
  },
}));

const Feed = ({authorFilterValue, posts, setPosts, savedPostIDs, setSavedPosts}) => {
  const classes = useStyles();

  useEffect(() => {
    if (!posts.length) getPosts(setPosts);
  }, [posts]);

  const getFilteredPosts = () => {
    if (authorFilterValue) {
      return posts.filter(post =>
        authorFilterValue.length ? post.author == authorFilterValue : true
      )
    } else {
      return posts
    }
  }

  return (
    <Container className={classes.container}>
      {
        getFilteredPosts().map(post =>
          <Post
            key={post._id}
            id={post._id}
            title={post.title}
            author={post.author} text={post.text}
            isSavedPost={savedPostIDs.includes(post._id)}
            setSavedPosts={setSavedPosts} />
        )
      }
    </Container>
  );
};

export default Feed;
