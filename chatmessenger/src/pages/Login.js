import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { parseJwt } from '../utils/utils'
import Navbar from '../components/Navbar'
import { Button, Grid, Input, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(10),
  },
  formElement: {
    marginTop: theme.spacing(3),
  }
}));

function App() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const classes = useStyles()

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
        window.location.href= '/dashboard'
      }
      else{
        alert('Please check your username and password')
      }
    }
  function navToRegister(event){
    navigate('/register')
  }

  return (
    <div>
      <Navbar />
      <Grid container
        direction="column"
        alignItems="center"
        justifyContent="center"
        className={classes.container} >
        <Grid item>
          <Typography variant="h3">Log in</Typography>
        </Grid>
        <form onSubmit={loginUser} id="loginForm">
          <Grid item className={classes.formElement}>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
            />
          </Grid>
          <Grid item className={classes.formElement}>
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
            />
          </Grid>
          <Grid item className={classes.formElement}>
            <Button type="submit" variant="contained">
              Log In
            </Button>
          </Grid>
        </form>
        <Grid item className={classes.formElement}>
          <Typography variant="h5">
            <Button variant="outlined" onClick={navToRegister}>Sign up instead</Button>
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
