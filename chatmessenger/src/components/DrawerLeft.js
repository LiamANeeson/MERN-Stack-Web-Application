import React from 'react';
import { Container, makeStyles, Typography } from "@material-ui/core";
import { Home, People, Settings, ExitToApp } from "@material-ui/icons";
import { allowedCategories, getPostsByCategory } from '../utils/utils';
import { logout } from '../utils/utils';


const useStyles = makeStyles((theme) => ({
  container: {
    height: "100vh",
    color: "white",
    paddingTop: theme.spacing(10),
    backgroundColor: theme.palette.primary.main,
    position: "sticky",
    top: 0,
  },
  item: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(5),
    [theme.breakpoints.up("sm")]: {
      marginBottom: theme.spacing(4),
      cursor: "pointer",
    },
  },
  text: {
    fontWeight: 500,
    padding: "5%",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
}));

const DrawerLeft = ({setCategory, setPosts}) => {
  const classes = useStyles()

  const handleCategoryChange = (category) => {
    setCategory(category)
    getPostsByCategory(category, setPosts)
  }

  return (
    <Container className={classes.container}>
      <div className={classes.item} onClick={() => handleCategoryChange('')}>
        <Home />
        <Typography className={classes.text}>Home</Typography>
      </div>
      <div className={classes.item}>
        <People />
        <Typography className={classes.text}>Groups</Typography>
      </div>
      {Object.keys(allowedCategories).map(category => (
        <div key={category} onClick={() => handleCategoryChange(category)} className={classes.item}>
          {React.createElement(allowedCategories[category].icon)}
          <Typography className={classes.text}>{category}</Typography>
        </div>
      ))}
      <div className={classes.item}>
        <Settings />
        <Typography className={classes.text}>Settings</Typography>
      </div>
      {
        localStorage.getItem('token')
        ? (
          <div className={classes.item} onClick={logout}>
            <ExitToApp />
            <Typography className={classes.text}>Logout</Typography>
          </div>
        ) : null
      }
    </Container>
  );
};

export default DrawerLeft;
