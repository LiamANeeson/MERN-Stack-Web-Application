import React, { useEffect, useState } from 'react';


const MySavedPosts = props => {
    const [savedPosts, setSavedPosts] = useState([])

    useEffect(() => {
        if (!savedPosts) getSavedPosts()
    }, [savedPosts])

    async function getSavedPosts() {
        const response = await fetch('http://localhost:1337/api/saved-posts', {
            method:'GET',
            headers: {
              'Content-Type': 'application/json', 
              'x-access-token': localStorage.getItem('token'),
            },
          }).then(response => {
              console.log(response.data)
            setSavedPosts(response.data.user.savedPosts)
          })
    
          const data = await response.json();
          if(data.status === 'ok') {
            alert("Posts retrieved successfully.")
          }
    }

    return (
        <div>
            {
                savedPosts.length || console.log(savedPosts)
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

