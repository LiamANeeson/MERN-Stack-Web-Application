import React, { useEffect, useState} from 'react'
import jwt from 'jsonwebtoken'
import { useNavigate } from 'react-router-dom'
import { parseJwt } from '../utils/utils'
import axios from 'axios'
  
const Dashboard = () => {
    const navigate = useNavigate()
    const [quote, setQuote] = useState('')
    const [tempQuote, setTempQuote] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [username, setUsername] = useState(localStorage.getItem('username'))
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [text, setText] = useState('')
    const [posts, setPosts] = useState([])

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
// Delete Account ------------------------------------------------------------
    async function deleteAccount(event) {
        event.preventDefault()

        const req = await fetch('http://localhost:1337/api/delete', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',                
                'x-access-token': localStorage.getItem('token'),
            },
        })

        const data = await req.json()
        if(data.status === 'ok') {
            alert('Profile Updated')
            navigate('/')
        } else {
            alert(data.error)
        }
    }
// Update Account ------------------------------------------------------------
    async function updateAccount(event) {
        event.preventDefault()
        console.log({
            name: name,
            email: email, 
            password: password, 
            id: parseJwt(localStorage.getItem('token')).id,
        })
        const req = await fetch('http://localhost:1337/api/update', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',                
                'x-access-token': localStorage.getItem('token'),
            },
            body: JSON.stringify({
                name: name,
                email: email, 
                password: password, 
                id: parseJwt(localStorage.getItem('token')).id,
            }),
        })

        const data = await req.json()
        if(data.status === 'ok') {
            localStorage.setItem('username', parseJwt(data.user).name)
            setUsername(parseJwt(data.user).name)
            localStorage.setItem('token', data.user)
            alert('Profile Updated')
            navigate('/dashboard')
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
    return (
        <div>
            <h1>Hello, {username}!! :)</h1>
            <button onClick={deleteAccount}>Delete your profile</button>
            <h1>Update Account</h1>
            <form onSubmit={updateAccount}>
            <input 
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Name" 
            />
            <br/>
            <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Email"
            />
            <br/>
            <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
            />
            <br/>
            <input type="submit" value="update"/>
          </form>
          <br/>
          <br/>
          {/* -----------------------Search---------------------------- */}
          {/* <input
          type="search"
          placeholder="Search"
          name="searchTerm"
          ></input> */}
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