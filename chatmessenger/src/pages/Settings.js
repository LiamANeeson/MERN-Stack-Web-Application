import React, { useCallback, useEffect } from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { parseJwt } from '../utils/utils'

function Settings() {
    const navigate = useNavigate()
    const [currentUserData, setCurrentUserData] = useState({})
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')

    const getCurrentUserData = useCallback(async function () {
        await fetch('http://localhost:1337/api/current-user', {
            method:'GET',
            headers: {
                'Content-Type': 'application/json', 
                'x-access-token': localStorage.getItem('token'),
            },
        }).then(res => res.json())
        .then(data => {
            console.log(data)
            setCurrentUserData(data.user)
        }).catch(err => {
            console.log(err)
            setCurrentUserData({})
        })
    }, [])

    useEffect(() => {
        getCurrentUserData()
    }, [getCurrentUserData, setCurrentUserData])

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
            localStorage.setItem('token', data.user)
            alert('Profile Updated')
            navigate('/dashboard')
        } else {
            alert(data.error)
        }
    }
    
    return (
        <div>
            <h1>My profile</h1>
            {'profilePic' in currentUserData ? <img alt="profilepic" src={currentUserData.profilePic} /> : null}
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
