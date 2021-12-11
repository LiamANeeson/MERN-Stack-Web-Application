import React, { useEffect } from 'react';


const MySavedPosts = ({savedPosts, setSavedPosts}) => {
    useEffect(() => {
        if (!savedPosts.length) getSavedPosts()
    }, [savedPosts])

    async function getSavedPosts() {
        console.log('here')
        const response = await fetch('http://localhost:1337/api/saved-posts', {
            method:'GET',
            headers: {
                'Content-Type': 'application/json', 
                'x-access-token': localStorage.getItem('token'),
            },
        })
        const data = await response.json()
        setSavedPosts(data.savedPosts)
    }

    return (
        <div>
            {
                savedPosts.length
                ? savedPosts.map(post => (
                    <div key={post._id}>
                        <h2 id="title">Title: {post.title} </h2>
                        <h3 id="author">{post.author}</h3>
                        <p>{post.text}</p>
                    </div>
                ))
                : <h3>No posts to display</h3>
            }
        </div>
    )
}

export default MySavedPosts

