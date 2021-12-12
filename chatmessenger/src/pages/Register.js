import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { Button, Grid, Input, makeStyles, Typography } from '@material-ui/core'
import Navbar from '../components/Navbar';

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
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const classes = useStyles()

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
      <Navbar />
      <Grid container
        direction="column"
        alignItems="center"
        justifyContent="center"
        className={classes.container} >
          <Grid item>
            <Typography variant="h6">Register</Typography>
          </Grid>
          <form onSubmit={registerUser}>
            <Grid item className={classes.formElement}>
              <Input 
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Name" 
              />
            </Grid>
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
                Register
              </Button>
            </Grid>
              </form>
            <Grid item className={classes.formElement}>
              <Typography variant="h5">
                <Button variant="outlined" onClick={navToLogin}>Log in instead</Button>
              </Typography>
            </Grid>
      </Grid>
    </div>
  );
}

export default App;
