import { useState } from 'react';

function App() {
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  };

    async function loginUser(event) {
      event.preventDefault()
      
      const response = await fetch('http://localhost:1337/api/login', {
        method:'POST',
        headers: {
          'Content-Type': 'application/json', 
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })

      const data = await response.json();
      if(data.user){
        console.log(parseJwt(data.user))
        localStorage.setItem('username', parseJwt(data.user).name)
        localStorage.setItem('token', data.user)
        alert('Login successful')
        window.location.href= '/dashboard'
      }
      else{
        alert('Please check your username and password')
      }
    }

  return (
    <div>
      <form onSubmit={loginUser}>
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
        <input type="submit" value="Login"/>
      </form>
    </div>
  );
}

export default App;
