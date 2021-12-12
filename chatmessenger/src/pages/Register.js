import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { Typography } from '@material-ui/core'

function App() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function registerUser(event) {
    event.preventDefault()
    
    const response = await fetch('http://localhost:1337/api/register', {
      method:'POST',
      headers: {
        'Content-Type': 'application/json', 

      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    })

    const data = await response.json();
    if(data.status === 'ok') {
      navigate('/login')
    }
  }

  function navToLogin(event){
    navigate('/login')
  }
  
  return (
    <div>
      <Typography variant="h6">Register</Typography>
      <form onSubmit={registerUser}>
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
            <input type="submit"/>
          </form>
          <h1>Already a member<button onClick={navToLogin}>Log In</button></h1>
    </div>
  );
}

export default App;
