import React, { useEffect } from 'react';
import { Typography, makeStyles } from '@material-ui/core';
import { getSavedPosts } from '../utils/utils';

const useStyles = makeStyles((theme) => ({
    savePostsTitle:{
        fontSize: 36,
        fontWeight: 500,
        color: "#555",
    }
}));

const MySavedPosts = ({savedPosts, setSavedPosts}) => {
    const classes = useStyles();

    useEffect(() => {
        if (!savedPosts.length && localStorage.getItem('token')) getSavedPosts(setSavedPosts)
    }, [savedPosts, setSavedPosts])

    const getNoSavedPostsText = () => {
        if (localStorage.getItem('token')) {
            return <Typography variant="body2">No posts to display</Typography>
        } else {
            return  <Typography variant="body2">Please log in to see saved posts.</Typography>
        }
    }

    return (
        <div>
            <Typography className={classes.savePostsTitle}>Saved Posts</Typography> 
            {
                savedPosts.length
                ? savedPosts.map(post => (
                    <div key={post._id}>
                        <h2 id="title">Title: {post.title} </h2>
                        <h3 id="author">{post.author}</h3>
                        <p>{post.text}</p>
                    </div>
                ))
                : getNoSavedPostsText()
            }
        </div>
    )
}

export default MySavedPosts

