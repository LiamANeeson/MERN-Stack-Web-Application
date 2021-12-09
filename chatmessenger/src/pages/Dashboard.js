import React, { useEffect, useState} from 'react'
import MySavedPosts from './MySavedPosts'
import jwt from 'jsonwebtoken'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Navbar from '../components/Navbar'
import Add from '../components/Add'

const Dashboard = () => {
    const navigate = useNavigate()
    const [quote, setQuote] = useState('')
    const [tempQuote, setTempQuote] = useState('')
    const [username, setUsername] = useState(localStorage.getItem('username'))
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [text, setText] = useState('')
    const [posts, setPosts] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [authorFilterValue, setAuthorFilterValue] = useState('')

    async function populateQuote() {
        const req = await fetch('http://localhost:1337/api/quote', {
            headers: {
                'x-access-token': localStorage.getItem('token'),
            },
        })

        const data = await req.json()
        if(data.status === 'ok') {
            setQuote(data.quote)
        } else {
            alert(data.error)
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            const user = jwt.decode(token)
                if (!user) {
                    localStorage.removeItem('token');
                    navigate('/login');
                } else {
                    populateQuote()
                }
        }
    }, [navigate])
// Quote Functionality -------------------------------------------------------
    async function updateQuote(event) {
        event.preventDefault()

        const req = await fetch('http://localhost:1337/api/quote', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',                
                'x-access-token': localStorage.getItem('token'),
            },
            body: JSON.stringify({
                quote: tempQuote,
            }),
        })

        const data = await req.json()
        if(data.status === 'ok') {
            setQuote(tempQuote)
            setTempQuote('')
        } else {
            alert(data.error)
        }
    }
    // Create a Post 
    async function createPost(event) {
        event.preventDefault()
        
        const response = await fetch('http://localhost:1337/api/post', {
          method:'POST',
          headers: {
            'Content-Type': 'application/json', 
            'x-access-token': localStorage.getItem('token'),
          },
          body: JSON.stringify({
            title,
            author,
            text,
            // userID,
          }),
        })
  
        const data = await response.json();
        if(data.status === 'ok') {
          alert("Post Success")
        }
      }

    const state = {
        title: '',
        body: '',
        posts:[]
    };

    useEffect(() => {
        if (!posts.length) getPosts()
    }, [posts])

    //Get Posts
    const getPosts = () => {
        axios.get(
            'http://localhost:1337/api/posts',
            {
                headers: {
                    'Content-Type': 'application/json', 
                }
            }
        ).then(response => {
            setPosts(response.data.posts)
            console.log('Data has been received!')
        }).catch(err => {
            console.log(err)
            alert('Error retrieving data!!!')
        })
    }

    useEffect(() => {
        if (searchTerm) {
            axios.get(
                'http://localhost:1337/api/search', {
                params: {query: searchTerm}
            }).then(response => {
                setPosts(response.data.foundPosts)
                console.log('Data has been received!')
            }).catch(err => {
                if (err.response.status !== 404){
                    alert('Error retrieving data!!!')
                }
            })
        }
    }, [searchTerm])

    const getUniquePostFields = (fieldName) => {
        const foundItems = []

        for (let post of posts) {
            if (!foundItems.includes(post[fieldName])) {
                foundItems.push(post[fieldName])
            }
        }

        return foundItems.map(
            foundItem => (
                <option
                    key={foundItem}
                    value={foundItem} >
                        {foundItem}
                </option>
            )
        )
    }

    async function savePost(postID) {
        const response = await fetch('http://localhost:1337/api/save-post', {
            method:'POST',
            headers: {
              'Content-Type': 'application/json', 
              'x-access-token': localStorage.getItem('token'),
            },
            body: JSON.stringify({
                postID: postID
            }),
          })
    
          const data = await response.json();
          if(data.status === 'ok') {
            alert("Post saved successfully.")
          }
    }

    return (
        <div>
            <Navbar />
            <br/>
            <br/>
            <br/>
            <br/>
            <h1>Hello, {username}!! :)</h1>
          <br/>
          <br/>
          {/* -----------------------Search---------------------------- */}
          <input
            type="search"
            placeholder="Search"
            name="searchTerm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <br/>
          <br/>
          {/* -----------------------Filter---------------------------- */}
          <label htmlFor="authorFilter">Author:</label>
          <select
            name="authorFilter"
            placeholder="Filter"
            value={authorFilterValue}
            onChange={(e) => setAuthorFilterValue(e.target.value)} >
                <option
                    key={0}
                    value={''} >
                        All
                </option>
                {getUniquePostFields("author")}
          </select>
          <br/>
          {/* -------------------Create Post-------------------- */}
          <form onSubmit={createPost}>
          <input 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="title"
            placeholder="Post Title" 
          />
          <br/>
          <br/>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            type="text"
            placeholder="Insert Post Here"
          />
          <br/>
            <input type="submit" value="Create Post"/>
          </form>
          <h1>Posts</h1>
            {
                posts
                ? (posts.filter(post => authorFilterValue.length ? (post.author == authorFilterValue) : true).map((post, index) => (
                    <div key={post._id}>
                        <h2 id="title">Title: {post.title} </h2>
                        <h3 id="author">{post.author}</h3>
                        <p>{post.text}</p>
                        <button onClick={() => savePost(post._id)}>Save Post</button>
                    </div>
                )))
                : <h3>No posts to display</h3>
            }
          
          <h1>My Saved Posts</h1>
          <MySavedPosts />
          <Add />
        </div>
    )
}

export default Dashboard;

{/* <h1>Your quote: {quote || 'No qoute found'}</h1>
            <form onSubmit={updateQuote}>
                <input type="text"
                    placeholder="Quote" 
                    value={tempQuote} 
                    onChange={(e) => setTempQuote(e.target.value)}
                />
                <input type="submit" value="Update quote" />
            </form> */}