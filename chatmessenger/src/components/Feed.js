import { useEffect, useState } from "react";
import { Container, makeStyles, Typography } from "@material-ui/core";
import Post from "./Post";
import { getPosts, getPostsByCategory } from '../utils/utils';

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(10),
  },
}));

const Feed = ({authorFilterValue, category, posts, setPosts, savedPostIDs, setSavedPosts, likedPostIDs, setLikedPosts}) => {
  const classes = useStyles()

  useEffect(() => {
    if (!posts.length && !category){
      getPosts(setPosts);
    }
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
        getFilteredPosts().length
        ? getFilteredPosts().map(post =>
          <Post
            key={post._id}
            id={post._id}
            title={post.title}
            author={post.author} text={post.text}
            isLikedPost={likedPostIDs.includes(post._id)}
            setLikedPosts={setLikedPosts}
            isSavedPost={savedPostIDs.includes(post._id)}
            setSavedPosts={setSavedPosts}
            getPostsByCategory={getPostsByCategory} />
        )
        : <Typography variant="body1">No posts to display.</Typography>
      }
    </Container>
  );
};

export default Feed;
