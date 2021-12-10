import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { parseJwt } from '../utils/utils'

function Settings() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [username, setUsername] = useState(localStorage.getItem('username'))
    // Delete Account
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

    //Update Account Information
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
    
    return (
        <div>
            <h1>Delete or Update Your Profile Information</h1>
            <h1>Delete</h1>
            <button onClick={deleteAccount}>Delete your profile</button>
            <h1>Update Account Details</h1>
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
        </div>
    )
}

export default Settings
